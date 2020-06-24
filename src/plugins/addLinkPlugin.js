import React from "react";
import { RichUtils, KeyBindingUtil, EditorState } from "draft-js";

import styles from "./linkPlugin.module.scss";

export function keyBindingFn(event) {
  if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75) {
    return "add-link";
  }
}
