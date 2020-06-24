import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from "draft-js";
import "draft-js/dist/Draft.css";

import { handleLink, keyBindingFn } from "../../plugins/linkPlugin";

import styles from "./draftEditor.module.scss";

// Components
import BtnControls from "./BtnControls/BtnControls";

const DraftEditor = () => {
  // =============== FOR LINKS =============== //

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);
  const [showURLInput, setshowURLInput] = useState(false);
  const [urlValue, seturlValue] = useState("");

  // =============== END FOR LINKS =============== //

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(decorator) // decorator is for links as well
  );

  // Pull data from storage to pre fill in the editor.
  // useEffect(() => {
  //   if (localStorage.getItem("content")) {
  //     console.log(JSON.parse(localStorage.getItem("content")));
  //     setEditorState(
  //       EditorState.createWithContent(
  //         convertFromRaw(JSON.parse(localStorage.getItem("content")))
  //       )
  //     );
  //   }
  // }, []);

  // ADD DATA TO STORAGE
  // useEffect(() => {
  //   const contentState = editorState.getCurrentContent();
  //   const rawContentState = convertToRaw(contentState);
  //   localStorage.setItem("content", JSON.stringify(rawContentState));
  // }, [editorState]);

  const handleKeyCommand = (command, editorState) => {
    console.log("command :>> ", command);

    // =============== FOR LINKS =============== //
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === "add-link") {
      return handleLink({ editorState: editorState, update: update });
    }

    // =============== END FOR LINKS =============== //

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
  // =============== FOR LINKS =============== //
  function promptForLink(e) {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setshowURLInput(true);
      seturlValue(url);
      // setTimeout(() => this.refs.url.focus(), 0);
    }
  }

  function confirmLink(e) {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    update(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
    setshowURLInput(false);
    seturlValue("");
    // setTimeout(() => this.refs.editor.focus(), 0);
  }

  function removeLink(e) {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      update(RichUtils.toggleLink(editorState, selection, null));
    }
  }

  function onLinkInputKeyDown(e) {
    if (e.keyCode === 13) {
      confirmLink(e);
    }
  }

  // =============== END FOR LINKS =============== //

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
      <BtnControls
        update={update}
        editorState={editorState}
        showURLInput={showURLInput}
        urlValue={urlValue}
      />

      {/* =============== FOR LINKS =============== */}
      <button onMouseDown={promptForLink} style={{ marginRight: 10 }}>
        Add Link
      </button>
      <button onMouseDown={removeLink}>Remove Link</button>
      {showURLInput && (
        <>
          <input
            onChange={(e) => seturlValue(e.target.value)}
            type="text"
            value={urlValue}
            onKeyDown={onLinkInputKeyDown}
          />
          <button onMouseDown={(e) => confirmLink(e)}>Confirm</button>
        </>
      )}
      {/* =============== END FOR LINKS =============== */}

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

// =============== Link related functions =============== //
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow noreferrer"
      styles={{ color: "blue" }}
    >
      {props.children}
    </a>
  );
};
