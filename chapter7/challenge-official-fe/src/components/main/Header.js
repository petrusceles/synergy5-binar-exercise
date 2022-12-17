import React from "react";

export default function Header() {
  return (
    <div className="w-full top-0 left-0 flex items-center absolute transition-all duration-200 ease-in-out">
      <div className="container mx-auto">
        <div class="flex items-center justify-between w-full relative px-8">
          <div class="py-8">
            <a href="#home" class="w-20 h-8 block bg-blue-900"></a>
          </div>

          <div class="flex">
            <button
              id="hamburger"
              name="hamburger"
              type="button"
              class="block absolute bottom-1/4 right-6 top-1/4 lg:hidden"
            >
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>

            <nav
              id="nav-menu"
              class="w-1/2 h-full fixed bg-white -right-[500px] z-[999] top-0 lg:bg-transparent lg:flex lg:absolute lg:w-3/4 transition-all duration-500 ease-in-out lg:right-0"
            >
              <ul class="block py-6 px-2 sm:px-5 md:px-10 lg:flex lg:items-center lg:w-full lg:justify-end">
                <div class="p-4 xl:px-10 w-full flex justify-between lg:hidden">
                  <h2 class="font-semibold text-xl">BCR</h2>
                  <button id="close">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-x"
                      viewBox="0 0 16 16"
                      transform="scale(3.0)"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
                <li class="group xl:px-10 p-4">
                  <a href="#service" class="text-lg">
                    Our Services
                  </a>
                </li>
                <li class="group xl:px-10 p-4">
                  <a href="#whyus" class="text-lg">
                    Why Us
                  </a>
                </li>
                <li class="group xl:px-10 p-4">
                  <a href="#testimonials" class="text-lg">
                    Testimonials
                  </a>
                </li>
                <li class="group xl:px-10 p-4">
                  <a href="#faq" class="text-lg">
                    FAQ
                  </a>
                </li>
                <div class="p-4 xl:px-10">
                  <button class="bg-green-500 py-2 px-4 font-semibold text-lg text-white rounded-lg">
                    Register
                  </button>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
