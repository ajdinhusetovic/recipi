import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import useTokenExpiration from "@/utils/useTokenExpiration.tsx";

declare module "jwt-decode" {
  interface JwtPayload {
    username: string;
  }
}

const Navbar = () => {
  useTokenExpiration();

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = nav ? "auto" : "hidden";
    }
  };

  const navigate = useNavigate();

  let decodedToken;

  const token = localStorage.getItem("token");

  if (token) {
    decodedToken = jwtDecode(token);
  }

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
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

  return (
    <nav className={`w-full ${nav ? "" : "h-[100px] md:h-[150px]"} border-b`}>
      <div className="flex justify-between h-full w-11/12 mx-auto">
        <div
          className={`flex justify-between items-center h-full ${
            nav ? "" : "w-full md:w-1/3"
          }`}
        >
          {nav ? (
            ""
          ) : (
            <h1
              className="items-self-center text-5xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              Reci<span className="text-yellow-600 font-medium">pi</span>
            </h1>
          )}
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
            <li className="group transition-all duration-300 ease-in-out">
              <Link
                className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                to="/recipes/saved/"
              >
                Saved
              </Link>
            </li>
            {localStorage.getItem("token") ? (
              <>
                <li className="group transition-all duration-300 ease-in-out">
                  <Link
                    className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                    to={`/users/${decodedToken?.username}/`}
                  >
                    My Profile
                  </Link>
                </li>
                <BiLogOut onClick={handleLogout} size={30} />
              </>
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
          <li className="group transition-all duration-300 ease-in-out">
            <Link
              className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              to="/recipes/saved/"
            >
              Saved
            </Link>
          </li>
          {localStorage.getItem("token") ? (
            <>
              <li className="group transition-all duration-300 ease-in-out">
                <Link
                  className="bg-left-bottom bg-gradient-to-r from-violet-500 to-violet-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                  to={`/users/${decodedToken?.username}/`}
                >
                  My Profile
                </Link>
              </li>
              <BiLogOut
                onClick={handleLogout}
                size={30}
                className="cursor-pointer"
              />
            </>
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
