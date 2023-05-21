import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from "react";
import { Typography, Paper, FormControl, TextField, Button, Box, InputLabel, MenuItem, Select } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';



const calculate = (filteredData) => {

    const { gpaSum, creditSum } = filteredData.reduce((result, item) => {
        const credit = parseInt(item.CourseCredit.split('(')[0]);
        result.gpaSum += item.GPA * credit;
        result.creditSum += credit;
        return result;
    }, { gpaSum: 0, creditSum: 0 });
    const gpaAverage = gpaSum / creditSum;
    console.log('Sum of multiplied GPAs:', gpaSum);
    console.log('Sum of course credits:', creditSum);
    console.log('GPA Average:', gpaAverage);
    return gpaAverage
}

const CalculateGpa = (props) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { session, gpa, selectedRegNo, courseCredit, StudentStatus, onGpaUpdate } = props
    const isDataMissing = !session || gpa == null || !selectedRegNo || !courseCredit || !StudentStatus;
    useEffect(() => {
        setDisabled(isDataMissing);
        setErrorMsg("please select all the fields")
    }, [isDataMissing]);

    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
    console.log(session)
    console.log(gpa)
    console.log(selectedRegNo)
    console.log(courseCredit)
    console.log(StudentStatus)

    const StudentRegNo = selectedRegNo
    const handleCalculateGpa = async (e) => {

        const newData = {
            GPA: gpa,
            CourseCredit: courseCredit,
            CourseStatus: StudentStatus

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
            console.log(res)
            if (res.status !== '200') {
                setErrorMsg(res.data.message)
            }
            if (!res.data.data) {
                onGpaUpdate(gpa)
            }
            else {
                const data = res.data.data
                console.log("data", data)
                const updatedData = [...data, newData];
                console.log("updated ", updatedData)
                const filteredData = updatedData ? updatedData.filter(item => item.CourseStatus !== 'withdraw') : [];
                const semesterGpa = calculate(filteredData)
                console.log(semesterGpa)
                onGpaUpdate(semesterGpa)
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
