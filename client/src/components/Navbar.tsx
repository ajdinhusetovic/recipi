import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = nav ? "auto" : "hidden";
    }
  };

  return (
    <div className="flex justify-between p-5 items-center">
      <h1 className="text-4xl">LOGO</h1>
      <ul className="hidden md:flex gap-6">
        <li>
          <Link>Home</Link>
        </li>
        <li>
          <Link>User Favorites</Link>
        </li>
        <li>
          <Link>My Profile</Link>
        </li>
        <li>
          <Link>Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <div className={` md:hidden gap-6 z-10`} onClick={handleNav}>
        {nav ? <FaTimes size={25} /> : <RxHamburgerMenu size={25} />}
      </div>
      <ul
        className={`${
          nav
            ? "text-black opacity-100 bg-white transform translate-y-0"
            : "opacity-0 transform translate-y-full"
        } transition-transform absolute top-0 left-0 w-full flex flex-col justify-center items-center md:flex-row`}
        style={{ minHeight: nav ? "100vh" : "auto" }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link>User Favorites</Link>
        </li>
        <li>
          <Link>My Profile</Link>
        </li>
        <li>
          <Link>Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
