import { Button, ColorInput, NumberInput, Select } from "@mantine/core";
import React from "react";
import ColorPicker from "./ColorPicker";
import FilePicker from "./FilePicker";

export interface ISettings {
  filePicker: React.RefObject<HTMLInputElement>;
  renderSize: number;
  bgColor: string;
  setRenderSize: (value: number) => void;
  setBgColor: (value: string) => void;
  setFiles: (value: string[]) => void;
}

const Settings = (props: ISettings) => {
  return (
    <div className="settings" style={{ width: "50%" }}>
      <FilePicker filePicker={props.filePicker} setFiles={props.setFiles} />
      <NumberInput
        defaultValue={props.renderSize}
        placeholder="Taille du rendu"
        label="🖼 Longueur / Largeur"
        description="Définir la taille du rendu"
        onChange={(value: number) => {
          props.setRenderSize(value);
        }}
      />
      <ColorPicker
        bgColor={props.bgColor}
        setBgColor={props.setBgColor}
      />
    </div>
  );
};

export default Settings;
