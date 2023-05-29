import {
  ArrowRightOnRectangleIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  LockOpenIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="z-10 w-full text-lg text-white absolute top-5 flex items-center justify-center space-x-20 px-10">
      <Link to={"/"}>
        <p className="flex items-center space-x-2">
          <HomeIcon className="h-5" />
          <span>Home</span>
        </p>
      </Link>
      <Link to={"/login"}>
        <p className="flex items-center space-x-2">
          <ArrowRightOnRectangleIcon className="h-5" />
          <span>Login</span>
        </p>{" "}
      </Link>
      <a href={"/#contactus"}>
        <p className="flex items-center space-x-2">
          <LockOpenIcon className="h-5" />
          <span>Contact Us</span>
        </p>{" "}
      </a>
      <a href={"/#aboutus"}>
        <p className="flex items-center space-x-2">
          <DevicePhoneMobileIcon className="h-5" />
          <span>About Us</span>
        </p>{" "}
      </a>{" "}
    </div>
  );
};

export default Navbar;
