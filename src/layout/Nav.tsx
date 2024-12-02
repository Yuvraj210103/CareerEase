import { RxCross2 } from "react-icons/rx";
import Button from "../component/common/button/Button";
import { useState } from "react";
import { MdLogin, MdOutlineMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../@types/enum";

const Nav = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const mobileMenu = () => {
    setMobileNav(!mobileNav);
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full bg-surface shadow-lg border-b-[2px] border-inputBorder z-[10] fixed inset-x-0 top-0">
      <div className="flex items-center w-full px-4 md:px-8 py-4 justify-between max-w-[1280px] gap-4">
        <div className="flex items-center gap-4">
          {!mobileNav ? (
            <MdOutlineMenu
              onClick={mobileMenu}
              className="md:hidden text-3xl cursor-pointer"
            />
          ) : (
            <RxCross2
              onClick={mobileMenu}
              className="md:hidden text-3xl cursor-pointer"
            />
          )}
          <div className="flex items-center gap-10">
            <div
              onClick={() => window.location.reload()}
              className="flex items-center cursor-pointer"
            >
              <img
                src="/logo.png"
                alt=""
                className="md:h-[50px] md:w-[65px] h-[40px] w-[50px]"
              />
              <div className="font-bold text-xl">CareerEase</div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/">
                <div className="text-lg font-semibold cursor-pointer">Home</div>
              </Link>
              <Link to="/about">
                <div className="text-lg font-semibold cursor-pointer">
                  About Us
                </div>
              </Link>
              <Link to="/contact">
                <div className="text-lg font-semibold cursor-pointer">
                  Contact
                </div>
              </Link>
            </div>
          </div>
        </div>

        <Button
          label="Login/Signup"
          onClick={() => {
            navigate(PageRoutes.LOGIN);
          }}
          type="purple"
          className="hidden md:flex"
        />
        <MdLogin
          onClick={() => {
            navigate(PageRoutes.LOGIN);
          }}
          className="md:hidden text-2xl cursor-pointer"
        />
      </div>
      <div
        className={`${
          !mobileNav ? " fixed top-[-300px]" : "fixed top-0 "
        }   z-[0]  mt-16 w-full  overflow-x-hidden bg-surface shadow-md duration-500 md:hidden`}
      >
        <Link to="/">
          <div
            onClick={mobileMenu}
            className="mx-5 my-4  cursor-pointer list-none text-xl  font-semibold  lg:hover:underline"
          >
            Home
          </div>
        </Link>

        <Link to="/about">
          <div
            onClick={mobileMenu}
            className="mx-5 my-4  cursor-pointer list-none text-xl font-semibold   lg:hover:underline"
          >
            About Us
          </div>
        </Link>

        <Link to="contact">
          <div
            onClick={mobileMenu}
            className="mx-5 my-4  cursor-pointer list-none text-xl  font-semibold  lg:hover:underline"
          >
            Contact
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
