import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";
import { nanoid } from "nanoid";

export default function App() {
  const [trigger, setTrigger] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  // Creating a local storage
  React.useEffect(() => {
    if (notes.length > 0) localStorage.setItem("notes", JSON.stringify(notes));
  }, [trigger]);

  //Creating new note
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function onTrigger() {
    setTrigger(!trigger);
  }

  //Put the most recently modified note at the top
  function updateNote(text) {
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }
  //Deleting the notes
  function deleteNote(event, noteId) {
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  //Discarding the note
  function discardNote(id) {
    if (localStorage.getItem("notes")) {
      var tempNote = JSON.parse(localStorage.getItem("notes")).filter(
        (i) => i.id == id
      );
      var tempNotesArr = notes;
      var objIndex = tempNotesArr.findIndex((item) => item.id == id);
      tempNotesArr[objIndex].body = tempNote[0].body;
      // console.log(tempNotesArr);
      setNotes([...tempNotesArr]);
    } else {
      setNotes([]);
    }
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  //for searching the note
  function searchHandler(searchTerm) {
    setSearchTerm(searchTerm);
    if (searchTerm != "") {
      const newNotes = notes.filter((note) => {
        return Object.values(note)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newNotes);
    } else {
      setSearchResult(notes);
    }
  }

  return (
    <div>
      <main className="note">
        {notes.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderRadius: "10px",
            }}
          >
            <Sidebar
              notes={searchTerm.length < 1 ? notes : searchResult}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
              term={searchTerm}
              searchKeyword={searchHandler}
            />
            {currentNoteId && notes.length > 0 && (
              <Editor
                currentNote={findCurrentNote()}
                updateNote={updateNote}
                onTrigger={onTrigger}
                onDiscard={discardNote}
              />
            )}
          </div>
        ) : (
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button className="first-note" onClick={createNewNote}>
              Create one now
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
