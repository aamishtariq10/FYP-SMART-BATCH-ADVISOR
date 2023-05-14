import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Loader } from "../ui/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  var userRole = localStorage.getItem("userRole");
  var userEmail = localStorage.getItem("email");

  useEffect(() => {
    setIsLoading(false);
    if (userRole === "admin" && userEmail) {
      navigate("/admin/profile");
    } else if (userRole === "" && userEmail) {
      navigate("/dashboard");
    } else if (userRole === "batch advisor" && userEmail) {
      navigate("/batchadvisor/profile");

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logIn(e) {
    e.preventDefault();
    setIsLoading(true);

    let values = { role, email, password };
    try {
      await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setErrorMsg(data.message);
          if (data.message === "Successfully login") {
            toast.success("You are successfully logged in!", {
              hideProgressBar: true,
            });
            localStorage.setItem(
              "user",
              JSON.stringify({
                email: data.data.payload.email,
                token: data.data.token,
                role: data.data.payload.role,
              })
            );

            setIsLoading(false);
            let role = data.data.payload.role;
            if ((role == 'student' || role == 'batch advisor') && data.data.payload.firstLogin === 1) {
              navigate("/forgot-password");
            }
            else {
              setTimeout(() => {
                if (role === "student") navigate("/dashboard", { replace: true });
                if (role === "admin") navigate("/admin/profile");
                if (role === "batch advisor") navigate("/batchadvisor/dashboard");
                window.location.reload();
              }, 1000);
            }
          } else if (data.status !== 200) {
            setIsLoading(false);
            toast.error(data.message);
          }
          else {

            toast.error(
              "Something went wrong, please try again later!",
            );
          }
          setIsLoading(false);
        });
    } catch (err) {
      toast.error("Something went wrong, please try again later!",);
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="mt-1">
                  <select
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={role}
                    onChange={(e) => setRole(e.target.value.toLowerCase())}
                  >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                    <option value="batch advisor">Batch Advisor</option>
                  </select>

                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                    // title="Minimum eight characters, at least one letter, one number and one special character:"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                {errorMsg ? (
                  <div className="text-red-500 text-sm">{errorMsg + " \n"}</div>
                ) : null

                }
              </div>
              <div>
                {isLoading ? (
                  <Loader center className="text-indigo-600" />
                ) : (
                  <button
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={logIn}
                  //onClick={navigate("/admin/profile")}
                  >
                    Sign in
                  </button>
                )}
              </div>
            </form>

            {/* <div className="mt-6">
               <div className="flex">
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign Up
                  </Link>{" "}

                </p> 
              </div> 
          </div> */}
          </div>
        </div>
      </div >
      <ToastContainer />
    </>
  );
}
