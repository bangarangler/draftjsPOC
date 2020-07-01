import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  KeyBindingUtil,
  getDefaultKeyBinding,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";

//
import { findLinkEntities, DraftLink } from "./decorators/linkDecorator";

import styles from "./draftEditor.module.scss";

// Components
import BtnControls from "./BtnControls/BtnControls";
import { LinkControls } from "./decorators/linkDecorator";

const DraftEditor = ({ insertTextContent, setInsertTextContent }) => {
  const decorators = new CompositeDecorator([
    // FOR LINKS
    {
      strategy: findLinkEntities,
      component: DraftLink,
    },
  ]);
  // =============== FOR LINKS =============== //
  const [showURLInput, setshowURLInput] = useState(false);
  // =============== END FOR LINKS =============== //

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(decorators) // decorator is for links as well
  );

  // Pull data from storage to pre fill in the editor.
  useEffect(() => {
    if (localStorage.getItem("content")) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(localStorage.getItem("content"))),
          decorators
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

  function myKeyBindingFn(e) {
    // FOR LINKS
    if (
      e.keyCode === 76 /* l key and  */ &&
      KeyBindingUtil.hasCommandModifier(e) // command (ctrl or command key) are both being pressed
    ) {
      e.preventDefault();
      setshowURLInput(true);
    }
    return getDefaultKeyBinding(e);
  }

  // ================================ TESTING INSERT TEXT CONTENT SECTION ================================ //
  useEffect(() => {
    if (insertTextContent !== "") {
      console.log("resetting insertTextContent");
      const contentState = editorState.getCurrentContent();
      const targetRange = editorState.getSelection();
      const text = insertTextContent;
      const ncs = Modifier.insertText(contentState, targetRange, text);
      setEditorState(EditorState.push(editorState, ncs, "insert-fragment"));
      setInsertTextContent("");
    }
  }, [insertTextContent]);
  // ================================ END TESTING INSERT TEXT CONTENT SECTION ================================ //

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
    <div className={styles.editorWrapper}>
      <div className={styles.btnWrapper}>
        <BtnControls update={update} editorState={editorState} />
        <LinkControls
          editorState={editorState}
          update={update}
          showURLInput={showURLInput}
          setshowURLInput={setshowURLInput}
        />
      </div>
      <div />
      <Editor
        editorState={editorState}
        onTab={onTab}
        handleKeyCommand={handleKeyCommand}
        onChange={update}
        blockStyleFn={pluarisBlockQuoteStyle}
        spellCheck={true}
        decorators={decorators}
        keyBindingFn={myKeyBindingFn}
      />
    </div>
  );
};

export default DraftEditor;
