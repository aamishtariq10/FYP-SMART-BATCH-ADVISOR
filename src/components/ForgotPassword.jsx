import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formStates, setformStates] = useState({
    email: "",
    password: "",
    cPassword: "",
    errorMessage: "",
  });
  function changeHandler(e) {
    setformStates({ ...formStates, [e.target.name]: e.target.value });
  }
  async function resetPassword(e) {
    e.preventDefault();
    try {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      console.log("formstate", formStates);
      if (!formStates.email || !formStates.password || !formStates.cPassword) {
        setformStates({
          ...formStates,
          errorMessage: "All fields are required.",
        });
        alert('All fields are required.')
        return;
      }
      if (formStates.password.length < 8) {
        setformStates({
          ...formStates,
          errorMessage: "Password must be at least 8 characters long.",
        });
        alert("Password must be at least 8 characters long.")
        return;
      }
      if (!passwordRegex.test(formStates.password)) {
        setformStates({
          ...formStates,
          errorMessage: "Password must contain at least one letter, one number, and one special character.",
        });
        alert("Password must contain at least one letter, one number, and one special character")
        return;
      }
      if (formStates.password !== formStates.cPassword) {
        setformStates({
          ...formStates,
          errorMessage: "Passwords do not match.",
        });
        alert("Passwords do not match.")
        return;
      }
      const res = await fetch("http://localhost:5000/forgetpassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formStates.email,
          pass: formStates.password,
        }),
      });
      const data = await res.json();
      console.log("data", data);
      toast.info(data.message, { hideProgressBar: true });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      onSubmit={resetPassword}
      className="flex w-full h-full items-center justify-center"
    >
      <form className="w-1/2 flex flex-col space-y-5">
        <h1 className="text-2xl font-semibold">Password Reset</h1>
        <div className="flex flex-col space-y-2">
          <label>Enter your email</label>
          <input
            onChange={changeHandler}
            value={formStates.email}
            type="email"
            name="email"
            id=""
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Enter new password</label>
          <input
            onChange={changeHandler}
            value={formStates.password}
            type="password"
            name="password"
            id=""
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Confirm new password</label>
          <input
            onChange={changeHandler}
            value={formStates.cPassword}
            type="password"
            name="cPassword"
            id=""
          />
        </div>
        {formStates.errorMessage ? (
          <div className="text-red-500 text-sm">{formStates.errorMessage + " \n"}</div>
        ) : null}
        < div >
          <button
            onClick={resetPassword}
            type="submit"
            className="p-1 rounded-sm bg-[#282828] text-white"
          >
            Reset Password
          </button>
        </div>
      </form >
      <ToastContainer
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />


    </div >
  );
};

export default ForgotPassword;
