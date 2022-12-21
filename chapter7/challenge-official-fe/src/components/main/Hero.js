import React from "react";
import { Link } from "react-router-dom";
export default function Hero({ isRentPage }) {
  return (
    <div className=" container mx-auto pl-6 lg:pl-0">
      <div className="flex flex-wrap">
        <div className="w-10/12 mb-6 lg:w-1/2">
          <h1 className="font-bold text-5xl leading-normal mb-4">
            Sewa & Rental Mobil Terbaik di Kawasan Sleman
          </h1>
          <p className="font-light leading-relaxed mb-6 max-w-md">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            facere totam sint asperiores impedit beatae iste repellendus magni
            et culpa!
          </p>
          {(() => {
            if (!isRentPage) {
              return (
                <div className="w-1/2 bg-green-600 p-3 flex justify-center rounded-lg cursor-pointer hover:shadow-2xl hover:opacity-90 transition duration-300 max-w-xs">
                  <Link to="/rent" className="font-semibold text-white">
                    Mulai Sewa Mobil
                  </Link>
                </div>
              );
            }
          })()}
        </div>
        <div className="w-full relative z-0 self-end lg:w-1/2">
          <img
            src="./mercedes.png"
            alt="mercedes"
            className="bg-transparent 2xl:scale-100 2xl:pl-10 relative -top-5"
          />
          <div className="w-full h-4/6 bg-blue-900 rounded-tl-[50px] absolute bottom-0 left-0 -z-10 2xl:scale-125"></div>
        </div>
      </div>
    </div>
  );
}
