import SidebarMobileHamburger from "../../icons/SidebarMobileHamburger";
import SidebarMobileClose from "../../icons/SidebarMobileClose";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export const Navbar = ({ handleSideBarStatus }) => {
  const [isActive, setActive] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");

  // const email = "aamishtariq943@gmail.com";
  const navigate = useNavigate();

  const toggleClass = () => {
    setActive(!isActive);
  };
  const SignoutButton = () => {
    axios
      .get("http://localhost:5000/logout")
      .then((res) => {
        toast.info("Logged Out Successfully");
      })
      .catch((err) => {
        toast.error("Error Logging Out");
      });

    localStorage.clear();

    navigate("/login");
  };
  const toggleSidebar = () => {
    handleSideBarStatus();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.role);
      setEmail(user.email);
      setProfile(user.profile);
    }
  }, []);

  return (
    <>
      <nav className="fixed z-30 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="py-3 px-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                onClick={toggleSidebar}
                className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
              >
                <SidebarMobileHamburger />
                <SidebarMobileClose />
              </button>
              <a href="/" className="lg:mr-14">
                <p className="lg:px-6"> Student Dashboard</p>
              </a>
            </div>
            <div className="flex items-center">
              <p className="font-semibold flex items-center space-x-4 px-4"></p>
              <p className="mr-2 hidden text-sm font-normal lg:block">
                Good Morning,
                <span className="ml-1 font-semibold">{username}</span>
              </p>

              <div className="ml-3 flex flex-none items-center">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    //className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-2"
                    onClick={toggleClass}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="flex-shrink-0 h-8 w-8 rounded-full">
                      <img
                        src={profile}
                        className="rounded-full"
                        alt="Profile"
                      />
                    </div>
                  </button>
                </div>
                <div
                  className={`absolute top-11 right-5 z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 ${
                    isActive ? "" : "hidden"
                  }`}
                  id="dropdown-2"
                >
                  <div className="px-4 py-4">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {username}
                    </span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                      {email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="/student/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={SignoutButton}
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
