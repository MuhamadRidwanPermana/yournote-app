import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Segmented } from "antd";

export default function Sidebar({ onClose, open }) {
  // const option = [
  //   {
  //     id: 1,
  //     text: "Light",
  //     icon: "bi bi-sun-fill text-xl text-orange-400",
  //   },
  //   {
  //     id: 2,
  //     text: "Dark",
  //     icon: "bi bi-moon-fill text-xl text-orange-400",
  //   },
  //   {
  //     id: 3,
  //     text: "System",
  //     icon: "bi bi-laptop text-xl text-orange-400",
  //   },
  // ];

  // const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "System");
  // const e = document.documentElement;
  // const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // function onWindowMatch() {
  //   if (localStorage.theme === 'dark' || (!('theme' in localStorage) && darkQuery.matches)) {
  //     e.classList.add("dark");
  //     // document.body.classList.add("dark");
  //   } else {
  //     e.classList.remove("dark");
  //     // document.body.classList.remove("dark");
  //   }
  // }
  // onWindowMatch()

  // useEffect(( ) => {
  //   switch (theme) {
  //     case "Dark":
  //       e.classList.add("dark");
  //       // document.body.classList.add("dark");
  //       localStorage.setItem("theme", "Dark");
  //       break;
  //     case "Light":
  //       e.classList.remove("dark");
  //       // document.body.classList.remove("dark");
  //       localStorage.setItem("theme", "Light");
  //       break;
  //     default:
  //       localStorage.removeItem("theme");
  //       onWindowMatch();
  //       break;
  //   }
  // }, [theme]);

  // darkQuery.addEventListener("change", (e) => {
  //   if (localStorage.theme === 'dark' || (!('theme' in localStorage) && e.matches)) {
  //     e.classList.add("dark");
  //   } else {
  //     e.classList.remove("dark");
  //   }
  // })

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const showDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return (
    <Drawer
      onClose={onClose}
      open={open}
      closable={false}
      style={{ backgroundColor: "#FB923C" }}
      width={300}
      placement="right"
    >
      <div className="text-center relative h-full">
        <div>
          <p className="text-white text-lg">Theme</p>

          <div className="flex justify-center bg-orange-200 rounded-full p-2 w-fit h-fit mx-auto my-3" onClick={onClose}>
            <button
              className="dark:bg-orange-200 dark:text-orange-400 bg-white text-orange-400 text-xl w-8 h-8 rounded-full mx-1"
              onClick={showDarkMode}
            >
              <i className="bi bi-sun-fill" />
            </button>
            <button
              className="dark:bg-[#1e1e1e] bg-orange-200 text-orange-400 w-8 h-8 rounded-full mx-1"
              onClick={showDarkMode}
            >
              <i className="bi bi-moon-fill" />
            </button>
          </div>
        </div>

        <Link to="/home" onClick={onClose}>
          <button className="absolute inset-x-0 bottom-20">
            <p className="text-white text-sm underline underline-offset-4">
              Start Guide
            </p>
          </button>
        </Link>

        <Link to="/about" onClick={onClose}>
          <button className="absolute inset-x-0 bottom-10">
            <p className="text-white text-sm underline underline-offset-4">
              About YourNote.
            </p>
          </button>
        </Link>

        <p className="absolute inset-x-0 bottom-0 text-white text-xs mt-auto font-extralight italic">
          Copyright © 2024 YourNote.
        </p>
      </div>
    </Drawer>
  );
}
