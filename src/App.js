import React from "react";
import "./App.css";
import DraftEditor from "./components/draftEditor/draftEditor";

function App() {
  return (
    <div className="App">
      <button
        onClick={() => {
          console.log("adding content to text editor");
        }}
      >
        WYSIWYG
      </button>
      <DraftEditor />
    </div>
  );
}

export default App;
