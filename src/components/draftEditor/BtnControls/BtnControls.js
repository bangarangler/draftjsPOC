import React, { useState } from "react";
import { RichUtils } from "draft-js";

import styles from "./BtnControls.module.scss";
import { IoMdQuote } from "react-icons/io";
import { FaCode, FaListUl, FaListOl } from "react-icons/fa";

const BtnControls = ({ update, editorState }) => {
  const changeStyle = (style) => {
    update(RichUtils.toggleInlineStyle(editorState, `${style}`));
  };

  const toggleBlockType = (blockType) => {
    update(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleLink = (something) => {
    update(RichUtils.toggleLink(editorState, something));
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
      label: <IoMdQuote className={styles.btnControls__icon} />,
      style: "blockquote",
    },
    {
      id: "5",
      label: <FaListUl className={styles.btnControls__icon} />,
      style: "unordered-list-item",
    },
    {
      id: "6",
      label: <FaListOl className={styles.btnControls__icon} />,
      style: "ordered-list-item",
    },
    {
      id: "7",
      label: <FaCode className={styles.btnControls__icon} />,
      style: "code-block",
    },
  ];

  return (
    <>
      {blockTypeOptions.map((option) => {
        return (
          <button
            type="button"
            key={option.id}
            className={styles.btnControls__btn}
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
            className={styles.btnControls__btn}
            onClick={() => changeStyle(option.style)}
          >
            {option.label}
          </button>
        );
      })}
    </>
  );
};

export default BtnControls;
