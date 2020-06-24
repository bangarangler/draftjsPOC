import React, { useState } from "react";
import { RichUtils, EditorState, ContentState, Modifier } from "draft-js";

const BtnControls = ({ update, editorState }) => {
  const [showLinkInput, setshowLinkInput] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const changeStyle = (style) => {
    update(RichUtils.toggleInlineStyle(editorState, `${style}`));
  };

  const toggleBlockType = (blockType) => {
    update(RichUtils.toggleBlockType(editorState, blockType));
  };

  // ---------- LINKS SECTION ---------- //
  // const getEntityAtSelection = (editorState) => {
  //   const selectionState = editorState.getSelection();
  //   const selectionKey = selectionState.getStartKey();

  //   // The block in which the selection starts
  //   const block = ContentState.getBlockForKey(selectionKey);

  //   // Entity key at the start selection
  //   const entityKey = block.getENtityAt(selectionState.getStartOffset());
  //   if (entityKey) {
  //     // The actual entity instance
  //     const entityInstance = ContentState.getEntity(entityKey);
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
  // ---------- END LINKS SECTION ---------- //

  const styleOptions = [
    {
      id: "1",
      label: "B",
      style: "BOLD",
    },
    {
      id: "2",
      label: "I",
      style: "ITALIC",
    },
    {
      id: "3",
      label: "U",
      style: "UNDERLINE",
    },
    {
      id: "4",
      label: "S",
      style: "STRIKETHROUGH",
    },
  ];

  const blockTypeOptions = [
    {
      id: "1",
      label: "H1",
      style: "header-one",
    },
    {
      id: "2",
      label: "H2",
      style: "header-two",
    },
    {
      id: "3",
      label: "H3",
      style: "header-three",
    },
    {
      id: "4",
      label: "Blockquote",
      style: "blockquote",
    },
    {
      id: "5",
      label: "UL",
      style: "unordered-list-item",
    },
    {
      id: "6",
      label: "OL",
      style: "ordered-list-item",
    },
    {
      id: "7",
      label: "Code Block",
      style: "code-block",
    },
  ];

  return (
    <div>
      {blockTypeOptions.map((option) => {
        return (
          <button
            type="button"
            key={option.id}
            onClick={() => toggleBlockType(option.style)}
          >
            {option.label}
          </button>
        );
      })}
      {styleOptions.map((option) => {
        return (
          <button
            type="button"
            key={option.label}
            onClick={() => changeStyle(option.style)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default BtnControls;
