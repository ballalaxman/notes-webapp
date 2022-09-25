import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

export default function Editor({
  currentNote,
  updateNote,
  onTrigger,
  onDiscard,
}) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section
      className="pane editor"
      style={{
        position: "relative",
      }}
    >
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
      <div
        style={{
          position: "absolute",
          top: "700px",
          right: "50px",
          display: "flex",
          gap: "30px",
        }}
      >
        <button
          onClick={() => {
            onDiscard(currentNote.id);
          }}
          className="outlined"
        >
          Discard
        </button>
        <button onClick={onTrigger} className="contained">
          Update
        </button>
      </div>
    </section>
  );
}
