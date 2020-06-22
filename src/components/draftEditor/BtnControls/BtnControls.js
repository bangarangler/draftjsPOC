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
    <div>
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
    </div>
  );
};

export default BtnControls;
