import React, { useState } from "react";
import Sidebar from "./Sidebar";


export default function Navbar({ showDrawer }) {

  return (
    <>
      <div className="sticky top-0 z-10 flex justify-between py-5 bg-white dark:bg-[#1e1e1e] duration-300">
        <h1 className="font-semibold text-orange-400 text-2xl">YourNote.</h1>
        <button onClick={showDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="18"
            viewBox="0 0 34 18"
            fill="none"
          >
            <path
              d="M3 3H31"
              stroke="#FE9237"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M9 15L30.7778 15"
              stroke="#FE9237"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

    </>
  );
}
