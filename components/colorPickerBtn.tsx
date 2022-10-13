"use strict";

import React, { useState, useEffect } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import hexToRgba from "hex-to-rgba";

interface Props {
  onChangeColor: (c: string) => void;
  notebookColor?: string;
}
// const MoveNoteForm: React.FC<Props> = ({ note }) => {

const hexToRgbaObj = (hexColor: string) => {
  const rgba = hexToRgba(hexColor);
  return rgba.match(/\d+/g);
  //.match(/[.?\d]+/g);
};

const ColorPickerBtn: React.FC<Props> = ({ onChangeColor, notebookColor }) => {
  useEffect(() => {
    if (notebookColor) {
      const rgba = hexToRgbaObj(notebookColor);
      if (rgba) setColor({ r: rgba[0], g: rgba[1], b: rgba[2], a: rgba[3] });
    }
  }, []);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  // const rgbaObj = notebookColor? hexToRgbaObj(notebookColor)
  const [color, setColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  }); //useState("#32194D");

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (c: any) => {
    setColor(c.rgb);
    onChangeColor(c.hex);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "30px",
        height: "30px",
        borderRadius: "50px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        margin: "5px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        // padding: '5px',
        background: "#fff",
        borderRadius: "50px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPickerBtn;
