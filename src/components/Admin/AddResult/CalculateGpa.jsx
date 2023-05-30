import {  toast } from 'react-toastify';
import React, { useState, useEffect } from "react";
import {  Button} from '@mui/material';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const calculate = (filteredData) => {
    const { gpaSum, creditSum } = filteredData.reduce((result, item) => {
      const credit = item.CourseCredit ? parseInt(item.CourseCredit.split('(')[0]) : 0;
      const parsedCredit = isNaN(credit) ? 0 : credit;
      result.gpaSum += item.GPA * parsedCredit;
      result.creditSum += parsedCredit;
      return result;
    }, { gpaSum: 0, creditSum: 0 });
  
    if (creditSum === 0) {
      return 0;
    }
  
    const gpaAverage = gpaSum / creditSum;
  
    console.log('Sum of multiplied GPAs:', gpaSum);
    console.log('Sum of course credits:', creditSum);
    console.log('GPA Average:', gpaAverage);
  
    return gpaAverage;
  };
  


  
const CalculateGpa = (props) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { session, gpa, selectedRegNo, courseCredit, StudentStatus, courseCode, onGpaUpdate, ResultID, lg } = props
    const isDataMissing = !session || gpa == null || !selectedRegNo || !courseCredit || !StudentStatus || !courseCode || !lg;
    useEffect(() => {
        setDisabled(isDataMissing);
        setErrorMsg("please select all the fields")
    }, [isDataMissing]);

    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;

    const StudentRegNo = selectedRegNo
    const handleCalculateGpa = async (e) => {

        const newData = {
            ResultID,
            SessionYear: session,
            CourseCode: courseCode,
            CourseCredit: courseCredit,
            CourseStatus: StudentStatus,
            GPA: gpa,
            Grade_LG: lg,
        }
        try {
            const res = await axios.get(`http://localhost:5000/admin/results/get/semesterresults?selectedRegNo=${StudentRegNo}&session=${session}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
          
            if (res.status !== '200') {
                setErrorMsg(res.data.message)
            }
            if (!res.data.data) {
                onGpaUpdate(gpa)
            }
            else {
                const data = res.data.data;
                console.log(data);
                const sameResultID = ResultID ? [...data.filter(item => item.ResultID != newData.ResultID), newData] : data;
               console.log("same result id not included", sameResultID);
               console.log("results ", ResultID);
                let updatedData = sameResultID.filter(item => !(item.SessionYear === newData.SessionYear && item.CourseCode === newData.CourseCode));
                updatedData.push(newData);
                console.log("updated", updatedData);
                const filteredData = updatedData.filter(item => !(item.CourseStatus === 'withdraw' && item.Grade_LG === 'withdraw'));
                const semesterGpa = calculate(filteredData);
                console.log(semesterGpa);
                onGpaUpdate(semesterGpa);
            }
            //setStudentRegNo(regNosArray)
        }
        catch (err) {
            toast.error("Internal Server error ")
        }
    }
    return (
        <>
            <div className="w-full lg:w-1/2 lg:mr-4 mb-4">
                <Button type="button" onClick={handleCalculateGpa}
                    variant="contained" color="primary" disabled={disabled} >
                    Calculate Gpa
                </Button>
            </div>
        </>
    );
};

export default CalculateGpa;
