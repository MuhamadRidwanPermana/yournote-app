import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Notes from "./pages/Notes";
import EditNote from "./pages/EditNote";
import CreateNote from "./pages/CreateNote";

import Sidebar from "./Components/Sidebar";

function App() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  // console.log(notes)

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes notes={notes} setNotes={setNotes} showDrawer={showDrawer} open={open} onClose={onClose} />} />
          <Route path="/create" element={<CreateNote showDrawer={showDrawer} setNotes={setNotes} />} />
          <Route path="/edit/:id" element={<EditNote showDrawer={showDrawer} notes={notes} setNotes={setNotes} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About showDrawer={showDrawer} />} />
        </Routes>

          {/* Components */}
          <Sidebar open={open} onClose={onClose}/>
      </BrowserRouter>
    </>
  );
}

export default App;
