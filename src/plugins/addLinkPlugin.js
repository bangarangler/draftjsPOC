import React from "react";
import { RichUtils, KeyBindingUtil, EditorState } from "draft-js";

import styles from "./linkPlugin.module.scss";

export const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

export const DraftLink = (props) => {
  const { contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      className={styles.draftLink}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={url}
    >
      {props.children}
    </a>
  );
};

export const addLinkPlugin = {
  keyBindingFn(event, { getEditorState }) {
    console.log("ADD LINK PLUGIN RUNNING");
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    console.log(
      "KeyBindingUtil.hasCommandModifier(event) :>> ",
      KeyBindingUtil.hasCommandModifier(event)
    );
    console.log("event.which :>> ", event.which);
    if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75) {
      return "add-link";
    }
  },
};
export function keyBindingFn(event) {
  if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75) {
    return "add-link";
  }
}

// function handleKeyCommand(
//   command,
//   editorState,
//   { getEditorState, setEditorState }
// ) {
//   if (command !== "add-link") {
//     return "not-handled";
//   }
//   let link = window.prompt("Paste the link -");
//   const selection = editorState.getSelection();
//   if (!link) {
//     setEditorState(RichUtils.toggleLink(editorState, selection, null));
//     return "handled";
//   }
//   const content = editorState.getCurrentContent();
//   const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
//     url: link,
//   });
//   const newEditorState = EditorState.push(
//     editorState,
//     contentWithEntity,
//     "create-entity"
//   );
//   const entityKey = contentWithEntity.getLastCreatedEntityKey();
//   setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
//   return "handled";
// }

const decorators = [
  {
    strategy: linkStrategy,
    component: DraftLink,
  },
];
