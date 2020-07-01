import React, { useState } from "react";
import "./App.css";
import DraftEditor from "./components/draftEditor/draftEditor";

function App() {
  const [insertTextContent, setInsertTextContent] = useState("");

  return (
    <div className="App">
      <div className="testContainer">
        <button
          onClick={() => {
            console.log("adding content to text editor");
            setInsertTextContent("WYSIWYG");
          }}
        >
          WYSIWYG
        </button>
        <form>
          <input type="text" />
        </form>
      </div>

      <DraftEditor
        insertTextContent={insertTextContent}
        setInsertTextContent={setInsertTextContent}
      />
    </div>
  );
}

export default App;
