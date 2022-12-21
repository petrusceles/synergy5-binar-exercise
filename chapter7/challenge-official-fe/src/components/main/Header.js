import React from "react";
import { Link } from "react-router-dom";

export default function Header({ username, isLoggedIn, logout }) {
  return (
    <div className="w-full top-0 left-0 flex items-center absolute transition-all duration-200 ease-in-out">
      <div className="container mx-auto">
        <div className="flex items-center justify-between w-full relative px-8">
          <div className="py-8">
            <a href="#home" className="w-20 h-8 block bg-blue-900"></a>
          </div>

          <div className="flex">
            <button
              id="hamburger"
              name="hamburger"
              type="button"
              className="block absolute bottom-1/4 right-6 top-1/4 lg:hidden"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            <nav
              id="nav-menu"
              className="w-1/2 h-full fixed bg-white -right-[500px] z-[999] top-0 lg:bg-transparent lg:flex lg:absolute lg:w-3/4 transition-all duration-500 ease-in-out lg:right-0"
            >
              <ul className="block py-6 px-2 sm:px-5 md:px-10 lg:flex lg:items-center lg:w-full lg:justify-end">
                <div className="p-4 xl:px-10 w-full flex justify-between lg:hidden">
                  <h2 className="font-semibold text-xl">BCR</h2>
                  <button id="close">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                      transform="scale(3.0)"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
                <li className="group xl:px-10 p-4">
                  <a href="#service" className="text-lg">
                    Our Services
                  </a>
                </li>
                <li className="group xl:px-10 p-4">
                  <a href="#whyus" className="text-lg">
                    Why Us
                  </a>
                </li>
                <li className="group xl:px-10 p-4">
                  <a href="#testimonials" className="text-lg">
                    Testimonials
                  </a>
                </li>
                <li className="group xl:px-10 p-4">
                  <a href="#faq" className="text-lg">
                    FAQ
                  </a>
                </li>
                {(() => {
                  if (isLoggedIn) {
                    return (
                      <li className="group xl:px-10 p-4">
                        <p className="font-semibold text-lg text-green-700">{`Hi, ${username}!`}</p>
                      </li>
                    );
                  }
                })()}
                <div className="p-4 xl:px-10">
                  {(() => {
                    if (isLoggedIn) {
                      return (
                        <Link to={"/"}>
                          <button
                            className="bg-red-500 py-2 px-4 font-semibold text-lg text-white rounded-lg"
                            onClick={logout}
                          >
                            Logout
                          </button>
                        </Link>
                      );
                    }
                    return (
                      <Link to={"/register"}>
                        <button className="bg-green-500 py-2 px-4 font-semibold text-lg text-white rounded-lg">
                          Register
                        </button>
                      </Link>
                    );
                  })()}
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
