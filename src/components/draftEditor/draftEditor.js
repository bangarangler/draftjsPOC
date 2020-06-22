import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

import styles from "./draftEditor.module.scss";

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      console.log("newState :>> ", newState);
      update(newState);
      return "handled";
    }
    return "not-handled";
  };

  const changeStyle = (style) => {
    update(RichUtils.toggleInlineStyle(editorState, `${style}`));
  };

  const onTab = (e) => {
    const maxDepth = 4;
    update(RichUtils.onTab(e, editorState, maxDepth));
  };

  const toggleBlockType = (blockType) => {
    update(RichUtils.toggleBlockType(editorState, blockType));
  };

  const update = (editorState) => setEditorState(editorState);

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

  const styleOptions = [
    {
      label: "B",
      style: "BOLD",
    },
    {
      label: "I",
      style: "ITALIC",
    },
    {
      label: "U",
      style: "UNDERLINE",
    },
    {
      label: "S",
      style: "STRIKETHROUGH",
    },
    {
      label: "Code",
      style: "CODE",
    },
  ];

  const blockTypeOptions = [
    {
      label: "H1",
      style: "header-one",
    },
    {
      label: "H2",
      style: "header-two",
    },
    {
      label: "H3",
      style: "header-three",
    },
    {
      label: "Blockquote",
      style: "blockquote",
    },
    {
      label: "UL",
      style: "unordered-list-item",
    },
    {
      label: "OL",
      style: "ordered-list-item",
    },
    {
      label: "Code Block",
      style: "code-block",
    },
  ];

  return (
    <>
      {blockTypeOptions.map((option) => {
        return (
          <button type="button" onClick={() => toggleBlockType(option.style)}>
            {option.label}
          </button>
        );
      })}
      {styleOptions.map((option) => {
        return (
          <button type="button" onClick={() => changeStyle(option.style)}>
            {option.label}
          </button>
        );
      })}
      <Editor
        editorState={editorState}
        onTab={onTab}
        handleKeyCommand={handleKeyCommand}
        onChange={update}
        blockStyleFn={pluarisBlockQuoteStyle}
      />
    </>
  );
};

export default DraftEditor;
