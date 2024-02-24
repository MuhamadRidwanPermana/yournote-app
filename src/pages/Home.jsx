import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-4xl h-screen overflow-auto dark:bg-[#1e1e1e] duration-300"> 
        <div className="h-full flex flex-col items-center justify-center">
          <div>
            <div className="text-start bg-orange-600 bg-opacity-20 lg:w-96 lg:h-96 lg:p-10 p-8 w-80 h-80 rounded-xl mb-3">
              <h1 className="text-orange-400 text-4xl border-b-2 border-orange-400 pb-2">
                <span className="font-semibold">Welcome!</span>
                <br /> to
                <span className="font-semibold"> YourNote.</span>
              </h1>

              <div className="w-full lg:h-48 h-44">
                <h2 className="pt-3 dark:text-white">
                  a simple
                  <span className="text-orange-400 font-semibold"> Note </span>
                  web application.
                </h2>
              </div>

              <div className="relative w-full lg:h-9">
                <h5 className="absolute bottom-0 right-0 text-xs text-orange-400">Jan 1, 2024  |  07.00</h5>
              </div>

            </div>
          </div>

          <Link to="/about">
            <div className="text-center w-full">
              <button className="bg-orange-400 hover:bg-orange-500 dark:text-[#1e1e1e] dark:font-semibold text-white font-normal text-lg lg:w-96 w-80 h-14 mt-3 rounded-xl">Get Started!</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
