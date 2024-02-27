import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Swal from "sweetalert2";

export default function Notes({ notes, setNotes, showDrawer, open, onClose }) {
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const Search = () => {
    setFilteredNotes(
      notes.filter((note) => {
        if (
          note.description.toLowerCase().includes(text.toLowerCase()) ||
          note.title.toLowerCase().includes(text.toLowerCase())
        ) {
          return note;
        } else {
          return null;

          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'Note Not Found!',
          //   confirmButtonColor: "#FE9237",
          //   confirmButtonText: "Oke",
          // }, );
        }
      })
    );
  };

  useEffect(Search, [text]);

  const [showSearchBox, setShowSearchBox] = useState(false);
  const onSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  const [showCheckBox, setShowCheckBox] = useState(false);
  const onCheckBox = () => {
    setShowCheckBox(!showCheckBox);
  };

  const [selected, setSelected] = useState([]);
  const handleSelect = (e) => {
    let isSelected = e.target.checked;
    let value = e.target.value;

    if (isSelected) {
      setSelected([...selected, value]);
      console.log("select");
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  const deleteNote = () => {
    if (selected.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "Note will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FE9237",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          setNotes(notes.filter((note) => !selected.includes(note.id)));
          setSelected([]);

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            confirmButtonText: "Oke",
            confirmButtonColor: "#FE9237",
          });
        } else {
          setSelected([]);
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select one or more notes to delete",
        confirmButtonColor: "#FE9237",
        confirmButtonText: "Oke",
      });
    }

    navigate("/");
  };

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const handleCheckAll = () => {
    if (notes.length === selected.length) {
      setSelected([]);
    } else {
      const selectedNote = notes.map((note) => {
        return note.id;
      });
      setSelected(selectedNote);
    }
  };

  const sortNotes = () => {
    setNotes([...filteredNotes].reverse());
  };

  return (
    <div className="Container dark:bg-[#1e1e1e] duration-300 mx-auto px-5 max-w-4xl h-screen overflow-auto">
      <Navbar onClose={onClose} open={open} showDrawer={showDrawer} />
      <div className="flex justify-end gap-4 text-orange-300 h-14 items-end">
        <input
          type="text"
          className={`w-full focus:outline-none border-b border-orange-300 placeholder:text-orange-200 placeholder:text-sm text-orange-400 dark:bg-[#1e1e1e] ${
            showSearchBox ? "" : "hidden"
          }`}
          placeholder="Search . . ."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            Search();
          }}
        />
        <button
          className={`${showCheckBox ? "" : "hidden"}`}
          onClick={deleteNote}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-trash3 h-5 m-auto text-orange-300"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </button>
        <button
          className={`${showCheckBox ? "" : "hidden"}`}
          onClick={handleCheckAll}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-ui-checks h-5 m-auto "
            viewBox="0 0 16 16"
          >
            <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
          </svg>
        </button>
        <button onClick={onCheckBox}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-check2-square h-5 m-auto text-orange-300"
            viewBox="0 0 16 16"
          >
            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
          </svg>
        </button>
        <button onClick={onSearchBox}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-search h-5 m-auto"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
        <button onClick={sortNotes}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-funnel h-5 m-auto"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
          </svg>
        </button>
      </div>

      {notes.length === 0 ? (
        <>
          <div className="duration-300 ease-in-out flex text-center w-full min-h-[calc(100vh-200px)] my-5 overflow-hidden">
            <div className="m-auto h-full w-full">
              <svg
                className="text-center m-auto w-1/2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                data-name="Layer 1"
                viewBox="0 0 485.83373 483.5"
              >
                <path
                  d="M677.54186,336.34717H597.80041a11.47812,11.47812,0,0,1-9.06567-4.39356h0a11.62154,11.62154,0,0,1-2.17652-9.96777,201.63052,201.63052,0,0,0-.00049-93.647,11.62425,11.62425,0,0,1,2.17676-9.96729,11.47753,11.47753,0,0,1,9.06592-4.39355h79.74145a11.6235,11.6235,0,0,1,11.439,9.75537,337.96108,337.96108,0,0,1,0,102.8584A11.6235,11.6235,0,0,1,677.54186,336.34717Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#e6e6e6"
                />
                <path
                  d="M597.80041,219.978a5.51264,5.51264,0,0,0-4.35449,2.1084,5.65943,5.65943,0,0,0-1.05371,4.85351,207.656,207.656,0,0,1,.00048,96.44531,5.65638,5.65638,0,0,0,1.053,4.85254l.00049.00049a5.5112,5.5112,0,0,0,4.35425,2.10889h79.74145a5.58248,5.58248,0,0,0,5.50879-4.667,331.9854,331.9854,0,0,0,0-101.03516,5.58248,5.58248,0,0,0-5.50879-4.667Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#fff"
                />
                <path
                  d="M660.14054,248.82872h-41.845a6.00633,6.00633,0,0,1-5.99977-5.99977v-2.34463a6.00633,6.00633,0,0,1,5.99977-5.99977h41.845a6.00633,6.00633,0,0,1,5.99976,5.99977V242.829A6.00632,6.00632,0,0,1,660.14054,248.82872Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#e6e6e6"
                />
                <path
                  d="M660.14054,278.4545h-41.845a6.00632,6.00632,0,0,1-5.99977-5.99976V270.1101a6.00632,6.00632,0,0,1,5.99977-5.99976h41.845a6.00632,6.00632,0,0,1,5.99976,5.99976v2.34464A6.00632,6.00632,0,0,1,660.14054,278.4545Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#e6e6e6"
                />
                <path
                  d="M660.14054,308.08029h-41.845a6.00633,6.00633,0,0,1-5.99977-5.99977v-2.34463a6.00632,6.00632,0,0,1,5.99977-5.99976h41.845a6.00632,6.00632,0,0,1,5.99976,5.99976v2.34463A6.00632,6.00632,0,0,1,660.14054,308.08029Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#e6e6e6"
                />
                <path
                  d="M827.54186,412.34717H747.80041a11.47812,11.47812,0,0,1-9.06567-4.39356h0a11.62154,11.62154,0,0,1-2.17652-9.96777,201.63052,201.63052,0,0,0-.00049-93.647,11.62425,11.62425,0,0,1,2.17676-9.96729,11.47753,11.47753,0,0,1,9.06592-4.39355h79.74145a11.6235,11.6235,0,0,1,11.439,9.75537,337.96108,337.96108,0,0,1,0,102.8584A11.6235,11.6235,0,0,1,827.54186,412.34717Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#e6e6e6"
                />
                <path
                  d="M747.80041,295.978a5.51264,5.51264,0,0,0-4.35449,2.1084,5.65943,5.65943,0,0,0-1.05371,4.85351,207.656,207.656,0,0,1,.00048,96.44531,5.65638,5.65638,0,0,0,1.053,4.85254l.00049.00049a5.5112,5.5112,0,0,0,4.35425,2.10889h79.74145a5.58248,5.58248,0,0,0,5.50879-4.667,331.9854,331.9854,0,0,0,0-101.03516,5.58248,5.58248,0,0,0-5.50879-4.667Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#fff"
                />
                <path
                  d="M668.54186,498.84717H588.80041a11.97546,11.97546,0,0,1-9.45825-4.584,12.1192,12.1192,0,0,1-2.27-10.394,201.13112,201.13112,0,0,0-.00049-93.41357,12.12077,12.12077,0,0,1,2.27026-10.39356,11.97561,11.97561,0,0,1,9.4585-4.584h79.74145a12.12667,12.12667,0,0,1,11.93311,10.1792,338.45925,338.45925,0,0,1,0,103.01074A12.12668,12.12668,0,0,1,668.54186,498.84717Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#f2f2f2"
                />
                <path
                  d="M810.14054,339.82872h-41.845a6.00633,6.00633,0,0,1-5.99977-5.99977v-2.34463a6.00633,6.00633,0,0,1,5.99977-5.99977h41.845a6.00633,6.00633,0,0,1,5.99976,5.99977V333.829A6.00632,6.00632,0,0,1,810.14054,339.82872Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#e6e6e6"
                />
                <path
                  d="M810.14054,369.4545h-41.845a6.00632,6.00632,0,0,1-5.99977-5.99976V361.1101a6.00632,6.00632,0,0,1,5.99977-5.99976h41.845a6.00632,6.00632,0,0,1,5.99976,5.99976v2.34464A6.00632,6.00632,0,0,1,810.14054,369.4545Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#e6e6e6"
                />
                <circle cx="271.81102" cy="228.5" r="23" fill="#fff" />
                <path
                  d="M639.89416,433.75h-8v-8a3,3,0,0,0-6,0v8h-8a3,3,0,0,0,0,6h8v8a3,3,0,0,0,6,0v-8h8a3,3,0,0,0,0-6Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#e6e6e6"
                />
                <path
                  d="M657.89416,225.25h-42a4.50508,4.50508,0,0,1-4.5-4.5v-8a4.50508,4.50508,0,0,1,4.5-4.5h42a4.50508,4.50508,0,0,1,4.5,4.5v8A4.50508,4.50508,0,0,1,657.89416,225.25Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#ccc"
                />
                <path
                  d="M809.89416,302.25h-42a4.50508,4.50508,0,0,1-4.5-4.5v-8a4.50508,4.50508,0,0,1,4.5-4.5h42a4.50508,4.50508,0,0,1,4.5,4.5v8A4.50508,4.50508,0,0,1,809.89416,302.25Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#ccc"
                />
                <polygon
                  points="88.596 471.061 100.856 471.061 104.689 423.773 88.594 423.773 88.596 471.061"
                  fill="#ffb8b8"
                />
                <path
                  d="M442.55234,675.30845l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38647,15.38623v.5l-39.53051.00146Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#2f2e41"
                />
                <polygon
                  points="22.596 471.061 34.856 471.061 40.689 423.773 22.594 423.773 22.596 471.061"
                  fill="#ffb8b8"
                />
                <path
                  d="M376.55234,675.30845l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38647,15.38623v.5l-39.53051.00146Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#2f2e41"
                />
                <path
                  d="M381.85436,664.37256a4.98141,4.98141,0,0,1-3.375-1.31836h0a4.961,4.961,0,0,1-1.61572-3.53711L371.947,483.30371l69.81115,17.45215,21.53955,64.61768a70.461,70.461,0,0,1,3.54541,25.82421l-2.67456,62.63672a4.996,4.996,0,0,1-4.99438,4.75879h-11.709a5.02349,5.02349,0,0,1-4.95483-4.32959l-8.3689-69.1416a37.82338,37.82338,0,0,0-5.53173-15.16406l-16.46949-26.07617a1.00011,1.00011,0,0,0-1.83764.41015L397.378,659.38037a4.99328,4.99328,0,0,1-4.687,4.39649l-10.552.58691C382.04406,664.36914,381.94934,664.37256,381.85436,664.37256Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#2f2e41"
                />
                <circle
                  cx="73.05767"
                  cy="136.40609"
                  r="24.56103"
                  fill="#ffb8b8"
                />
                <path
                  d="M441.4237,507.92236a5.07628,5.07628,0,0,1-1.25293-.15918H440.17l-69.26428-17.75976a4.9985,4.9985,0,0,1-3.66285-5.81543L383.15,398.49707a31.21377,31.21377,0,0,1,18.24975-22.53955,30.11308,30.11308,0,0,1,28.26563,2.07519c.96973.605,1.94653,1.26465,2.90259,1.96094a30.96046,30.96046,0,0,1,12.57885,24.5293l1.2649,98.32861a5.00656,5.00656,0,0,1-4.988,5.0708Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#fe9237"
                />
                <path
                  d="M378.03248,508.93008a10.05576,10.05576,0,0,1,4.214-14.83233l-3.08079-35.6018,16.326,8.84848.42262,32.4515a10.11027,10.11027,0,0,1-17.8818,9.13415Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#ffb8b8"
                />
                <path
                  d="M383.86511,489.38916a5.53224,5.53224,0,0,1-1.36573-.17285,5.49559,5.49559,0,0,1-3.97192-3.98633l-8.02319-31.88379a47.37028,47.37028,0,0,1,3.76123-33.13476l16.80884-32.88184a15.54083,15.54083,0,0,1,18.8081-11.01855,15.35574,15.35574,0,0,1,9.47485,7.10058,15.56707,15.56707,0,0,1,1.65406,11.91309l-23.92749,53.50586.28418,32.03564a5.5186,5.5186,0,0,1-3.58448,5.20459l-8.00732,2.97363A5.48,5.48,0,0,1,383.86511,489.38916Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#fe9237"
                />
                <path
                  d="M498.40087,495.83467a10.05578,10.05578,0,0,1-8.493-12.86954l-28.99341-20.88926,17.35654-6.60182,24.8717,20.84893a10.11027,10.11027,0,0,1-4.74186,19.51169Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#ffb8b8"
                />
                <path
                  d="M483.223,480.58057a5.52249,5.52249,0,0,1-2.46265-.58155L451.3612,465.28174a47.381,47.381,0,0,1-22.66064-24.46533L414.74328,406.626a15.54363,15.54363,0,0,1,3.91772-21.44434,15.35158,15.35158,0,0,1,11.59034-2.54346,15.56975,15.56975,0,0,1,10.08081,6.51221l24.94507,53.03955L489.743,462.87256a5.51764,5.51764,0,0,1,1.60669,6.11182l-2.96973,8.0083a5.474,5.474,0,0,1-2.00684,2.59619,5.49717,5.49717,0,0,1-3.15014.9917Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#fe9237"
                />
                <path
                  d="M424.98332,369.5931c1.305.571,3.97732-9.82732,2.78025-11.90707-1.78025-3.09293-1.675-3.07072-2.85681-5.117s-1.44623-4.84712.08417-6.64761,5.072-1.56163,5.77042.69581c-.4493-4.2878,3.79189-7.73454,7.993-8.70313s8.63244-.36723,12.85668-1.22917c4.90243-1.00032,10.00316-5.10972,8.04719-10.5007a7.5931,7.5931,0,0,0-1.48106-2.43408c-2.25993-2.54094-5.42117-3.62594-8.512-4.675-6.43006-2.18246-13.036-4.39233-19.82212-4.15141A28.7977,28.7977,0,0,0,404.3967,333.533a26.15571,26.15571,0,0,0-1.08344,4.02534c-2.32924,12.52423,4.94368,24.87794,16.75623,29.64715Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#2f2e41"
                />
                <polygon
                  points="38.9 273.343 39.457 240.414 56.9 205.343 42.9 241.343 38.9 273.343"
                  opacity="0.2"
                />
                <path
                  d="M554.16035,564.23244,480.522,533.63692a11.47817,11.47817,0,0,1-6.68609-7.53565h0a11.62155,11.62155,0,0,1,1.81454-10.04,201.63062,201.63062,0,0,0,35.9304-86.47983,11.62422,11.62422,0,0,1,5.83445-8.36925,11.47751,11.47751,0,0,1,10.05779-.57884l73.63839,30.59552a11.62349,11.62349,0,0,1,6.8205,13.39769,337.96147,337.96147,0,0,1-39.46512,94.98607A11.6235,11.6235,0,0,1,554.16035,564.23244Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#e6e6e6"
                />
                <path
                  d="M525.17093,426.17415a5.51263,5.51263,0,0,0-4.83017.27629,5.65945,5.65945,0,0,0-2.83529,4.07775,207.65608,207.65608,0,0,1-37.00407,89.064,5.65636,5.65636,0,0,0-.88946,4.88515l.00027.00064a5.51116,5.51116,0,0,0,3.21185,3.61814l73.63839,30.59552a5.58247,5.58247,0,0,0,6.87782-2.19616,331.98566,331.98566,0,0,0,38.76558-93.30238,5.58248,5.58248,0,0,0-3.29652-6.42343Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#fff"
                />
                <path
                  d="M564.38028,494.28148l-38.6424-16.05527a6.00633,6.00633,0,0,1-3.23855-7.84259l.8996-2.16518a6.00632,6.00632,0,0,1,7.84258-3.23856l38.6424,16.05527a6.00634,6.00634,0,0,1,3.23855,7.84259l-.8996,2.16518A6.00632,6.00632,0,0,1,564.38028,494.28148Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#fe9237"
                />
                <path
                  d="M553.01334,521.63984l-38.6424-16.05527a6.00633,6.00633,0,0,1-3.23855-7.84259l.89959-2.16518a6.00634,6.00634,0,0,1,7.84259-3.23856L558.517,508.39351a6.00633,6.00633,0,0,1,3.23856,7.84258l-.8996,2.16519A6.00632,6.00632,0,0,1,553.01334,521.63984Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#fe9237"
                />
                <path
                  d="M579.86437,455.832a4.48944,4.48944,0,0,1-1.68725-.33057l-38.938-15.74267a4.50518,4.50518,0,0,1-2.48535-5.8584l2.99878-7.417a4.50027,4.50027,0,0,1,5.85864-2.48486l38.938,15.74267a4.50518,4.50518,0,0,1,2.48535,5.8584l-2.99878,7.417a4.51079,4.51079,0,0,1-4.17139,2.81543Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#ccc"
                />
                <path
                  d="M498.08314,691.75h-140a1,1,0,1,1,0-2h140a1,1,0,0,1,0,2Z"
                  transform="translate(-357.08314 -208.25)"
                  fill="#ccc"
                />
              </svg>
              <h1 className="mt-5 dark:text-white duration-300">
                You haven't written anything here.
              </h1>
              <Link to="/create">
                <button className="bg-orange-400 hover:bg-orange-500 dark:text-[#1e1e1e] dark:font-semibold text-white font-normal text-lg w-full h-14 mt-5 rounded-xl">
                  Lets Create Now!
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link to={"/create"}>
            <button className="Button-Create bg-orange-400 hover:bg-orange-500 text-white font-normal text-lg w-14 h-14 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-plus w-10 h-10 mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          </Link>
        </>
      )}

      <div className="note__container my-5">
        {filteredNotes.map((note) => (
          <div key={note.id} className="relative">
            <div className="absolute w-full h-4">
              <input
                type="checkbox"
                className={`absolute z-10 top-2 right-2 w-full h-fit bg-red-500 ${
                  showCheckBox ? "" : "hidden"
                }`}
                value={note.id}
                onChange={handleSelect}
                checked={selected.includes(note.id)}
              />
            </div>
            <Link to={`/edit/${note.id}`} key={note.id} className="note z-1">
              <div className="relative z-1 text-start bg-orange-600 bg-opacity-20 w-full h-full p-5 rounded-xl">
                <h1 className="text-orange-400 lg:text-xl text-base font-semibold border-b-2 border-orange-400 pb-2">
                  {note.title.length > 20
                    ? note.title.substring(0, 20) + "..."
                    : note.title}
                </h1>
                <div className="w-full mb-5 pb-3">
                  <h2
                    className="pt-3 lg:text-base text-xs dark:text-white duration-300"
                    dangerouslySetInnerHTML={{
                      __html:
                        note.description.length > 100
                          ? note.description.substring(0, 100) + "..."
                          : note.description,
                    }}
                  ></h2>
                </div>
                <h5 className="absolute bottom-4 right-4 lg:text-xs text-[8px] text-orange-400">
                  {note.date}
                </h5>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* {filteredNotes.length === 0 ? ( 
      <>
        <div className="flex h-[calc(100vh-200px)] w-full">
          <div className="relative text-start bg-orange-600 bg-opacity-20 w-52 h-fit p-5 rounded-xl m-auto">
            <h1 className="text-orange-400 text-3xl font-semibold border-b-2 border-orange-400 pb-2">
              404
            </h1>
            <div className="w-full mb-5 pb-3">
              <h2 className="pt-3 text-sm dark:text-white duration-300">
                Note Not Found.
              </h2>
            </div>
            <h5 className="absolute bottom-4 right-4 lg:text-xs text-[8px] text-orange-400">
              Jan 01, 2024 | 2024
            </h5>
          </div>
        </div>
      </> 
      ) : (
      <>
      </>
      )} */}

      <div id="notFound" className="hidden w-96 h-96"></div>
    </div>
  );
}
