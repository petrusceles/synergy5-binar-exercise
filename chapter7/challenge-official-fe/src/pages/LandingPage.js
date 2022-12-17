import React from "react";
import Header from "../components/main/Header";
import Hero from "../components/main/Hero";

export default function LandingPage() {
  return (
    <>
      <div className="bg-blue-200 w-full">
        <div className="container mx-auto">
          <Header />
        </div>
      </div>
      <div className="pt-40 bg-blue-100">
        <div className="container mx-auto">
          <Hero />
        </div>
      </div>
    </>
  );
}
