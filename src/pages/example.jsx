import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <div className="mx-auto max-w-4xl h-screen overflow-auto dark:bg-[#1e1e1e] duration-300">
        <div className="h-full flex flex-col items-center justify-center ">
          <div className="">
            <div className="text-start bg-orange-600 bg-opacity-20 lg:w-96 lg:h-96 lg:p-10 p-8 w-80 h-80 rounded-xl mb-3">
              <h1 className="text-orange-400 text-4xl border-b-2 border-orange-400 pb-2">
                <span className="font-semibold">About YourNote.</span>
              </h1>

              <div className="w-full lg:h-48 h-44">
                <h2 className="pt-3 dark:text-white">
                  <span className="text-orange-400 font-semibold">
                    {" "}
                    YourNote.{" "}
                  </span>
                  is a simple Note web application. In this application you can
                  Create a Note, Update and Edit, and Delete it.
                </h2>
              </div>

              <div className="relative w-full lg:h-9">
                <h5 className="absolute bottom-0 right-0 text-xs text-orange-400">
                  Jan 1, 2024 | 07.00
                </h5>
              </div>
            </div>

            <Link to="/">
              <button className="bg-orange-400 hover:bg-orange-500 text-white font-normal text-lg lg:w-96 w-80 h-14 mt-3 rounded-xl">
                Back to Home
              </button>
            </Link>

            <Link to="/guide1">
              <h1 className="text-center underline underline-offset-4 text-orange-400 my-5">
                Start Guide
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
