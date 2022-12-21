import React from 'react'

export default function Footer() {
  return (
    <div className="pt-16 pb-20">
        <div className="container px-6">
            <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-1/4 flex justify-center">
                    <div className="w-full grid grid-rows-3 py-2 lg:px-7justify-center items-center">
                        <p className="text-lg">Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
                        <p className="text-lg">binarcarrental@gmail.com</p>
                        <p className="text-lg">081-233-334-808</p>
                    </div>
                </div>
                <div className="w-full lg:w-1/4 flex justify-center">
                    <div className="w-full grid gap-2 grid-rows-4 py-2 lg:px-7 lg:justify-center">
                        <a href="#service" className="font-semibold text-lg">Our Services</a>
                        <a href="#whyus" className="font-semibold text-lg">Why Us</a>
                        <a href="#testimonials" className="font-semibold text-lg">Testimonial</a>
                        <a href="#faq" className="font-semibold text-lg">FAQ</a>
                    </div>
                </div>
                <div className="w-full lg:w-1/4 flex lg:justify-center">
                    <div className="flex flex-wrap py-2 lg:h-0 lg:px-7 lg:justify-center">
                        <p className="text-lg w-full pb-2">Connect with us</p>
                        <div className="flex items-center w-full pt-2">
                            <img src="assets/icon_facebook.svg" className="pr-3" alt="facebook" />
                            <img src="assets/icon_instagram.svg" className="pr-3" alt="instagram" />
                            <img src="assets/icon_mail.svg" className="pr-3" alt="mail" />
                            <img src="assets/icon_twitter.svg" className="pr-3" alt="twitter" /> 
                            <img src="assets/icon_twitch.svg" className="pr-3" alt="twitch" />
                        </div>
                    </div>
                </div>
                <div className="w-full grid grid-rows-2 py-2 lg:w-1/4 lg:h-28 lg:justify-center">
                    <p className="text-lg">Copyright Binar 2022</p>
                    <a href="#home" className="w-20 h-8 block bg-blue-900"></a>
                </div>
            </div>
        </div>
    </div>
  )
}
