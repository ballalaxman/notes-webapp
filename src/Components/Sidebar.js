import React, { useRef } from "react";
export default function Sidebar(props) {
  // console.log(props);
  const inputEl = useRef("");
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote(event, note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  function getSearchTerm() {
    props.searchKeyword(inputEl.current.value);
  }

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      <div>
        <input
          ref={inputEl}
          type="text"
          placeHolder="Search here.."
          className="searchfield"
          value={props.term}
          onChange={getSearchTerm}
        ></input>
      </div>
      <hr />
      <div className="note-elements">
        {noteElements.length > 0 ? noteElements : "No notes available"}
      </div>
    </section>
  );
}
