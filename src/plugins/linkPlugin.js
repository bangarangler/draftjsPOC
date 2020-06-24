import React from "react";
import { RichUtils, KeyBindingUtil, EditorState, Modifier } from "draft-js";

import styles from "./linkPlugin.module.scss";

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

export function handleLink({ editorState, update }) {
  console.log("ADD LINK TRUE");
  let link = window.prompt("Paste the link -");
  const selection = editorState.getSelection();
  console.log("link :>> ", link);

  if (!link) {
    console.log("NO LINK");
    // update(RichUtils.toggleLink(editorState, selection, null));
    return "handled";
  }

  console.log("Link present");
  const contentState = editorState.getCurrentContent();

  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
    url: link,
  });

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const contentStateWithLink = Modifier.applyEntity(
    contentStateWithEntity,
    selection,
    entityKey
  );
  const newEditorState = EditorState.push(editorState, {
    currentContent: contentStateWithLink,
  });

  update(newEditorState);
  return "handled";
}

export function keyBindingFn(event) {
  if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75) {
    return "add-link";
  }
}
