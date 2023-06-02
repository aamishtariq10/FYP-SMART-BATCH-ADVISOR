import axios from "axios";

const sendRequest = (data) => {
  return new Promise((resolve, reject) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    const courseDetails = {
      StudentRegNo: user.StudentRegNo,
      StudentSemester: user.CurrentSemester,
      section: user.StudentSection,
      courses: data,
    };

    axios
      .post("http://localhost:5000/student/request/Coursereg", courseDetails, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        resolve(response.data); // Resolve with the response data
      })
      .catch((error) => {
        reject(error); // Reject with the error
      });
  });
};

export default sendRequest;
