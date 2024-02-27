import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { v4 as uuid } from "uuid";

import useCreateDate from "../Components/useCreateDate";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateNote({ setNotes }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const date = useCreateDate();
  const navigate = useNavigate();

  const createNote = (e) => {
    e.preventDefault();

    if (title && description) {
      const note = {
        id: uuid(),
        title,
        description,
        date,
      };
      setNotes((prevNote) => [note, ...prevNote]);

      navigate("/");
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "link"],
        [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        ["clean"],
      ],
    },
  };

  return (
    <div className="Container mx-auto px-5 max-w-4xl h-screen overflow-auto dark:bg-[#1e1e1e] duration-300">
      <div className="sticky top-0 z-10 flex justify-between py-5 bg-white dark:bg-[#1e1e1e]">
        <Link to="/">
          <button className="bg-orange-100 hover:bg-orange-200 hover:duration-300 w-10 h-10 rounded-full">
            <svg
              className="w-3 h-3 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 13"
              fill="none"
            >
              <path
                d="M6.14576 11.2915L1 6.14576L6.14576 1"
                stroke="#FE9237"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>

      <form className="m-5 py-5" onSubmit={createNote}>
        <input
          type="text"
          className="w-full h-54 focus:outline-none placeholder:text-orange-200 text-orange-400 dark:bg-[#1e1e1e]"
          placeholder="Title . . ."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="border border-orange-200 my-5"></div>
        {/* <textarea
          className="w-full h-screen overflow-hidden bg-transparent focus:outline-none placeholder:text-orange-200 text-orange-400"
          placeholder="Description . . ."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea> */}
        <ReactQuill
          className="w-full dark:text-orange-400 text-orange-400"
          placeholder="Description . . ."
          theme="snow"
          modules={modules}
          value={description}
          onChange={setDescription}
        />
      </form>

      <div className="relative w-full h-9">
        <button
          className="Button-Create bg-orange-200 hover:bg-orange-300 hover:opacity-100 hover:duration-300 hover:text-orange-100 text-orange-400 font-normal text-lg w-14 h-14 rounded-full"
          onClick={createNote}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-check-lg w-10 h-10 mx-auto "
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
