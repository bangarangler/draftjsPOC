import React, { useState } from "react";
import { RichUtils, KeyBindingUtil, EditorState, Modifier } from "draft-js";
import styles from "./linkDecorator.module.scss";

// Components
import { FaLink, FaUnlink } from "react-icons/fa";

export const LinkControls = ({
  editorState,
  update,
  showURLInput,
  setshowURLInput,
}) => {
  const [urlValue, seturlValue] = useState("");

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

  // function myKeyBindingFn(e) {
  //   if (
  //     e.keyCode === 76 /* l key and  */ &&
  //     KeyBindingUtil.hasCommandModifier(e) // command (ctrl or command key) are both being pressed
  //   ) {
  //     e.preventDefault();
  //     setshowURLInput(true);
  //   }
  //   return getDefaultKeyBinding(e);
  // }

  return (
    <>
      <button className={styles.btnControls__btn} onMouseDown={promptForLink}>
        <FaLink className={styles.btnControls__icon} />
      </button>
      <button className={styles.btnControls__btn} onMouseDown={promptForLink}>
        <FaUnlink className={styles.btnControls__icon} />
      </button>
      {showURLInput && (
        <div className={styles.linkInput__div}>
          <input
            className={styles.linkInput__input}
            onChange={(e) => seturlValue(e.target.value)}
            type="text"
            value={urlValue}
            onKeyDown={onLinkInputKeyDown}
          />
          <button onMouseDown={(e) => confirmLink(e)}>Confirm</button>
        </div>
      )}
    </>
  );
};

// =============== Link related functions =============== //
export function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

export const DraftLink = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow noreferrer"
      styles={{ color: "blue" }}
      onClick={() => window.open(url, "_blank")}
    >
      {props.children}
    </a>
  );
};
