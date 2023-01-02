import React from "react";

export default function Service() {
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="flex flex-wrap px-8 items-center justify-center">
          <div className="w-full lg:w-1/2">
            <img
              src="assets/service.png"
              alt="service"
              className="w-1/2 mx-auto"
            />
          </div>
          <div className="w-full pt-10 lg:w-1/2 max-w-xl">
            <h2 className="font-semibold text-3xl leading-normal">
              Best Car Rental For Any Trip in Sleman!
            </h2>
            <p className="pt-5 leading-relaxed">
              Sewa mobil di Sleman bersama Binar Car Rental jaminan harga lebih
              murah dibandingkan yang lain, kondisi mobil baru, serta kualitas
              pelayanan terbaik untuk perjalanan wisata, bisnis, wedding,
              meeting, dll.
            </p>
            <div className="pt-2">
              <div className="flex py-2  lg:py-3">
                <img
                  src="assets/check.svg"
                  alt="check"
                  className="w-auto rounded-full mr-2"
                />
                <p>Sewa Mobil dengan supir di Sleman 12 jam</p>
              </div>
              <div className="flex py-2 lg:py-3">
                <img
                  src="assets/check.svg"
                  alt="check"
                  className="w-auto rounded-full mr-2"
                />
                <p>Sewa Mobil Lepas Kunci di Bali 24 Jam</p>
              </div>
              <div className="flex py-2 lg:py-3">
                <img
                  src="assets/check.svg"
                  alt="check"
                  className="w-auto rounded-full mr-2"
                />
                <p>
                  Sewa Mobil Jangka Panjang BulananSewa Mobil Jangka Panjang
                  Bulanan
                </p>
              </div>
              <div className="flex py-2 lg:py-3">
                <img
                  src="assets/check.svg"
                  alt="check"
                  className="w-auto rounded-full mr-2"
                />
                <p>Gratis Antar - Jemput Mobil di Bandara</p>
              </div>
              <div className="flex py-2 lg:py-3">
                <img
                  src="assets/check.svg"
                  alt="check"
                  className="w-auto rounded-full mr-2"
                />
                <p>Layanan Airport Transfer / Drop In Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
