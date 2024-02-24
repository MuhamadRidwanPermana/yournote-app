import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";


export default function About({ open, onClose, showDrawer }) {
  return (
    <>
      <div className="Container mx-auto px-5 pb-5 max-w-4xl h-screen overflow-auto dark:bg-[#1e1e1e] duration-300">
        <Navbar onClose={onClose} open={open} showDrawer={showDrawer} />

        <div className="relative text-start bg-orange-600 bg-opacity-20 p-7 rounded-xl mb-3">
          <h1 className="text-orange-400 text-4xl border-b-2 border-orange-400 pb-2">
            <span className="font-semibold">YourNote.</span>
          </h1>

          <div className="w-full lg:h-32 h-28">
            <h2 className="pt-3 dark:text-white">
              <span className="text-orange-400 font-semibold"> YourNote. </span>
              is a simple Note web application.
            </h2>
          </div>

          <h5 className="absolute bottom-4 right-4 text-xs text-orange-400">
            Jan 1, 2024 | 07.00
          </h5>
        </div>

        <div className="h-fit grid grid-cols-2 grid-flow-row gap-5 my-5">
          <div className="relative row-span-2 text-start bg-orange-600 bg-opacity-20 w-auto h-full p-5 rounded-xl">
            <h1 className="text-slate-800 dark:text-white duration-300 lg:text-xl text-base pb-5">
              Here, you can
              <span className="text-orange-400 font-semibold"> Create </span>a
              Note, write whatever you like
            </h1>
            <h5 className="absolute bottom-4 right-4 lg:text-xs text-[8px] text-orange-400">
              Jan 1, 2024 | 07.00
            </h5>
          </div>
          <div className="relative text-start bg-orange-600 bg-opacity-20 w-auto h-full p-5 rounded-xl">
            <h1 className="text-slate-800 dark:text-white duration-300 lg:text-xl text-base pb-5">
              <span className="text-orange-400 font-semibold"> Edit </span>a
              Note and save it again.
            </h1>
            <h5 className="absolute bottom-4 right-4 lg:text-xs text-[8px] text-orange-400">
              Jan 1, 2024 | 07.00
            </h5>
          </div>
          <div className="relative row-span-2 text-start bg-orange-600 bg-opacity-20 w-auto h-full p-5 rounded-xl">
            <h1 className="text-slate-800 dark:text-white duration-300 lg:text-xl text-base pb-5">
              when it's done, just
              <span className="text-orange-400 font-semibold"> Delete </span>
              it and Create again.
            </h1>
            <h5 className="absolute bottom-4 right-4 lg:text-xs text-[8px] text-orange-400">
              Jan 1, 2024 | 07.00
            </h5>
          </div>
          <div className="relative text-start bg-orange-600 bg-opacity-20 w-auto h-full p-5 rounded-xl">
            <h1 className="text-slate-800 dark:text-white duration-300 lg:text-xl text-base pb-5">
              and finally, enjoy using this application.
            </h1>
            <h5 className="absolute bottom-4 right-4 lg:text-xs text-[8px] text-orange-400">
              Jan 1, 2024 | 07.00
            </h5>
          </div>
        </div>

        <Link to="/">
          <button className="bg-orange-400 hover:bg-orange-500 dark:text-[#1e1e1e] dark:font-semibold text-white font-normal text-lg w-full h-14 rounded-xl">
            Lets Create Now!
          </button>
        </Link>
      </div>
    </>
  );
}
