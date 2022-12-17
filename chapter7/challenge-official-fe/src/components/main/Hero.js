import React from "react";

export default function Hero() {
  return (
    <div class=" container mx-auto pl-6 lg:pl-0">
      <div class="flex flex-wrap">
        <div class="w-10/12 mb-6 lg:w-1/2">
          <h1 class="font-bold text-5xl leading-normal mb-4">
            Sewa & Rental Mobil Terbaik di Kawasan Sleman
          </h1>
          <p class="font-light leading-relaxed mb-6 max-w-md">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            facere totam sint asperiores impedit beatae iste repellendus magni
            et culpa!
          </p>
          <div class="w-1/2 bg-green-600 p-3 flex justify-center rounded-lg cursor-pointer hover:shadow-2xl hover:opacity-90 transition duration-300 max-w-xs">
            <a href="#sewa" class="font-semibold text-white">
              Mulai Sewa Mobil
            </a>
          </div>
        </div>
        <div class="w-full relative -z-0 self-end lg:w-1/2">
          <img
            src="./mercedes.png"
            alt="mercedes"
            class="bg-transparent 2xl:scale-125 2xl:pl-10"
          />
          <div class="w-full h-4/6 bg-blue-900 rounded-tl-[50px] absolute bottom-0 left-0 -z-10 2xl:scale-125"></div>
        </div>
      </div>
    </div>
  );
}
