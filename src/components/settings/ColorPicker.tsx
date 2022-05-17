import { ColorInput, Select } from "@mantine/core";
import React, { useState } from "react";

export interface IColorPicker {
  bgColor: string;
  setBgColor: (value: string) => void;
}

export type TColor = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | undefined;

const ColorPicker = (props: IColorPicker) => {
  const [colorFormat, setColorFormat] = useState<TColor>("hex");

  const colorFormatList = [
    { value: "hex", label: "HEX" },
    { value: "rgb", label: "RGB" },
    { value: "rgba", label: "RGBA" },
    { value: "hsl", label: "HSL" },
    { value: "hsla", label: "HSLA" },
  ];

  return (
    <div
      className="colorPicker"
      style={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <ColorInput
        style={{
          width: "100%",
        }}
        value={props.bgColor}
        placeholder="Selectionner une couleur 🎨"
        label="🎨 Couleur d'arrière plan"
        description="Définir la couleur d'arrière plan"
        onChange={props.setBgColor}
        format={colorFormat}
      />
      <Select
        style={{
          width: "100%",
        }}
        label="Format"
        placeholder="Sélectionner un format de couleur"
        description="Définir le format de couleur"
        data={colorFormatList}
        value={colorFormat}
        onChange={(value: string) => {
          setColorFormat(value as TColor);
        }}
      />
    </div>
  );
};

export default ColorPicker;
