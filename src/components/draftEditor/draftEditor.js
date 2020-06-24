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

import { keyBindingFn } from "../../plugins/addLinkPlugin";

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
    if (command === "add-link") {
      let link = window.prompt("Paste the link -");
      const selection = editorState.getSelection();
      console.log("selection :>> ", selection);
      if (!link) {
        console.log("NO LINK");
        update(RichUtils.toggleLink(editorState, selection, null));
        return "handled";
      }
      return "handled";
    }

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

  // // LINKS
  // const getEntityAtSelection = (editorState) => {
  //   const selectionState = editorState.getSelection();
  //   const selectionKey = selectionState.getStartKey();

  //   // The block in which the selection starts
  //   const block = contentstate.getBlockForKey(selectionKey);

  //   // Entity key at the start selection
  //   const entityKey = block.getENtityAt(selectionState.getStartOffset());
  //   if (entityKey) {
  //     // The actual entity instance
  //     const entityInstance = contentstate.getEntity(entityKey);
  //     const entityInfo = {
  //       type: entityInstance.getType(),
  //       mutability: entityInstance.getMutability(),
  //       data: entityInstance.getData(),
  //     };
  //     console.log(JSON.stringify(entityInfo, null, 4));
  //   } else {
  //     console.log("No entity present at current selection");
  //   }
  // };

  // const setEntityAtSelection = ({ type, mutability, data }) => {
  //   const contentstate = editorState.getCurrentContent();
  //   // Returns contentState record updated to include the newly created DraftEntity record in it's entitymap
  //   let newContentState = contentstate.createEntity(type, mutability, {
  //     url: data,
  //   });

  //   // call getLastCreatedEntityKey to get the key of the newly created DraftEntity record.
  //   const entityKey = contentstate.getLastCreatedEntityKey();
  //   const selectionState = editorState.getSelection();

  //   // add the created entity to the current selection, for a new contentState
  //   newContentState = Modifier.applyEntity(
  //     newContentState,
  //     selectionState,
  //     entityKey
  //   );

  //   // Add newContentState to the existing editor state for a new editor state
  //   const newEditorState = EditorState.push(
  //     editorState,
  //     newContentState,
  //     "apply-entity"
  //   );

  //   update(newEditorState);
  // };

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
        keyBindingFn={keyBindingFn}
      />
    </>
  );
};

export default DraftEditor;
