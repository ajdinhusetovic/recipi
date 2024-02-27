import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = "auto";
    }

    const handleBeforeUnload = () => {
      if (body) {
        body.style.overflow = "auto";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <nav className={`w-full ${nav ? "" : "h-[100px] md:h-[150px]"} border-b`}>
      <div className="flex justify-between h-full w-11/12 mx-auto">
        <div
          className={`flex justify-between items-center h-full ${
            nav ? "" : "w-full md:w-1/2"
          }`}
        >
          {nav ? "" : <h1 className="items-self-center text-4xl">LOGO</h1>}
          <div
            className={`md:hidden flex justify-end p-2 ${
              nav && "fixed top-0 right-0"
            }`}
            onClick={handleNav}
          >
            {nav ? <FaTimes size={25} /> : <RxHamburgerMenu size={25} />}
          </div>
        </div>
        {nav && (
          <ul className="md:hidden w-full h-screen flex flex-col items-center justify-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Link 2</li>
            <li>
              <Link to="/recipes/create-recipe">Add Recipe</Link>
            </li>
            <li>Link 4</li>
            <li>Link 5</li>
          </ul>
        )}

        <ul className="hidden md:flex items-center gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Link 2</li>
          <li>
            <Link to="/recipes/create-recipe/">Add Recipe</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
