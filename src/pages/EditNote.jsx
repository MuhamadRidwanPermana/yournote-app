import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useCreateDate from "../Components/useCreateDate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditNote({ notes, setNotes }) {
  const { id } = useParams();
  const note = notes.find((item) => item.id === id);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const date = useCreateDate();
  const navigate = useNavigate();

  const updateNote = (e) => {
    e.preventDefault();

    if (title && description) {
      const newNote = {
        ...note,
        title,
        description,
        date,
      };

      const newNotes = notes.map((item) => {
        if (item.id === id) {
          item = newNote;
        } else {
          console.log(item);
        }
        return item;
      });
      setNotes(newNotes);
    }

    navigate("/");
  };

  const deleteNote = () => {
    const newNotes = notes.filter((item) => item.id !== id);
    setNotes(newNotes);

    navigate("/");
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
          <button className="bg-orange-100 hover:duration-300 hover:bg-orange-200 w-10 h-10 rounded-full">
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

      <form className="m-5 py-5" onSubmit={updateNote}>
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
          className="relative w-full dark:text-orange-400"
          placeholder="Description . . ."
          theme="snow"
          modules={modules}
          value={description}
          onChange={setDescription}
        />
      </form>

      <div className="relative w-full h-9">
        <button
          className="Button-Delete bg-orange-100 hover:bg-orange-200 hover:text-orange-500 hover:duration-300 text-orange-300 font-normal text-lg w-10 h-10 rounded-full"
          onClick={deleteNote}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-trash w-4 h-4 mx-auto"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
        <button
          className="Button-Create bg-orange-100 hover:bg-orange-300 hover:opacity-100 hover:duration-300 hover:text-orange-100 text-orange-400 font-normal text-lg w-14 h-14 rounded-full"
          onClick={updateNote}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-check-lg w-10 h-10 mx-auto"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
