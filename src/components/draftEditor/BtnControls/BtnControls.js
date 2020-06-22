import React from "react";
import { RichUtils } from "draft-js";

const BtnControls = ({ update, editorState }) => {
  const changeStyle = (style) => {
    update(RichUtils.toggleInlineStyle(editorState, `${style}`));
  };

  const toggleBlockType = (blockType) => {
    update(RichUtils.toggleBlockType(editorState, blockType));
  };

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
