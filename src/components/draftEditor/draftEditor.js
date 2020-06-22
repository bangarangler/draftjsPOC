import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";

import styles from "./draftEditor.module.scss";

// Components
import BtnControls from "./BtnControls/BtnControls";

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Pull data from storage to pre fill in the editor.
  useEffect(() => {
    if (localStorage.getItem("content")) {
      console.log(JSON.parse(localStorage.getItem("content")));
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(localStorage.getItem("content")))
        )
      );
    }
  }, []);

  // ADD DATA TO STORAGE
  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem("content", JSON.stringify(rawContentState));
  }, [editorState]);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      console.log("newState :>> ", newState);
      update(newState);
      return "handled";
    }
    return "not-handled";
  };

  const update = (editorState) => setEditorState(editorState);

  const onTab = (e) => {
    const maxDepth = 4;
    update(RichUtils.onTab(e, editorState, maxDepth));
  };

  const pluarisBlockQuoteStyle = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "blockquote":
        return `${styles.blockQuote}`;
      case "unordered-list-item":
        return `${styles.ulItem}`;
      case "ordered-list-item":
        return `${styles.olItem}`;
      case "code-block":
        return `${styles.codeBlock}`;
      case "header-one":
        return `${styles.headerOne}`;
      case "header-two":
        return `${styles.headerTwo}`;
      case "header-three":
        return `${styles.headerThree}`;
      case "blockquote":
        return `${styles.blockQuote}`;
      default:
        return;
    }
  };

  return (
    <>
      <BtnControls update={update} editorState={editorState} />
      <Editor
        editorState={editorState}
        onTab={onTab}
        handleKeyCommand={handleKeyCommand}
        onChange={update}
        blockStyleFn={pluarisBlockQuoteStyle}
        spellCheck={true}
      />
    </>
  );
};

export default DraftEditor;
