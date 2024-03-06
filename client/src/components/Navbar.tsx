import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [cookie, setCookies, removeCookie] = useCookies();

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

  const handleLogout = () => {
    removeCookie("token");
    window.location.reload();
  };

  return (
    <nav className={`w-full ${nav ? "" : "h-[100px] md:h-[150px]"} border-b`}>
      <div className="flex justify-between h-full w-11/12 mx-auto">
        <div
          className={`flex justify-between items-center h-full ${
            nav ? "" : "w-full md:w-1/3"
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
          <ul className="md:hidden w-full h-screen flex flex-col items-center justify-center gap-2">
            <li className="group transition-all duration-300 ease-in-out">
              <Link
                className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="group transition-all duration-300 ease-in-out">
              <Link
                className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                to="/recipes/search"
              >
                Search
              </Link>
            </li>
            <li className="group transition-all duration-300 ease-in-out">
              <Link
                className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                to="/recipes/create-recipe/"
              >
                Add Recipe
              </Link>
            </li>
            {cookie.token ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <li className="group transition-all duration-300 ease-in-out">
                  <Link
                    className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="group transition-all duration-300 ease-in-out">
                  <Link
                    className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}

        <ul className="hidden md:flex items-center gap-5">
          <li className="group transition-all duration-300 ease-in-out">
            <Link
              className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="group transition-all duration-300 ease-in-out">
            <Link
              className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              to="/recipes/search"
            >
              Search
            </Link>
          </li>
          <li className="group transition-all duration-300 ease-in-out">
            <Link
              className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              to="/recipes/create-recipe/"
            >
              Add Recipe
            </Link>
          </li>
          {cookie.token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <li className="group transition-all duration-300 ease-in-out">
                <Link
                  className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="group transition-all duration-300 ease-in-out">
                <Link
                  className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
