import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

import styles from "./draftEditor.module.scss";

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const changeStyle = (style) => {
    update(RichUtils.toggleInlineStyle(editorState, `${style}`));
  };

  const pluarisBlockQuoteStyle = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return `${styles.blockQuote}`;
    }
    if (type === "unordered-list-item") {
      return `${styles.ulItem}`;
    }
    if (type === "ordered-list-item") {
      return `${styles.olItem}`;
    }
    if (type === "code-block") {
      return `${styles.codeBlock}`;
    }
    if (type === "header-one") {
      return `${styles.headerOne}`;
    }
    if (type === "header-two") {
      return `${styles.headerTwo}`;
    }
    if (type === "header-three") {
      return `${styles.headerThree}`;
    }
  };

  const onTab = (e) => {
    const maxDepth = 4;
    update(RichUtils.onTab(e, editorState, maxDepth));
  };

  const toggleBlockType = (blockType) => {
    update(RichUtils.toggleBlockType(editorState, blockType));
  };

  const update = (editorState) => setEditorState(editorState);

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

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      console.log("newState :>> ", newState);
      update(newState);
      return "handled";
    }
    return "not-handled";
  };
  return (
    <>
      <button type="button" onClick={() => changeStyle("BOLD")}>
        B
      </button>
      <button type="button" onClick={() => changeStyle("ITALIC")}>
        I
      </button>
      <button type="button" onClick={() => changeStyle("UNDERLINE")}>
        U
      </button>
      <button type="button" onClick={() => changeStyle("STRIKETHROUGH")}>
        S
      </button>
      <button type="button" onClick={() => toggleBlockType("blockquote")}>
        BlockQuote
      </button>
      <button
        type="button"
        onClick={() => toggleBlockType("unordered-list-item")}
      >
        UL
      </button>
      <button
        type="button"
        onClick={() => toggleBlockType("ordered-list-item")}
      >
        OL
      </button>
      <button type="button" onClick={() => toggleBlockType("code-block")}>
        Code Block
      </button>
      <button type="button" onClick={() => toggleBlockType("header-one")}>
        H1
      </button>
      <button type="button" onClick={() => toggleBlockType("header-two")}>
        H2
      </button>
      <button type="button" onClick={() => toggleBlockType("header-three")}>
        H3
      </button>
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
