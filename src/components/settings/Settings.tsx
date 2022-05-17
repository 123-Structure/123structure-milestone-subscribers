import { NumberInput } from "@mantine/core";
import React, { Fragment } from "react";
import ColorPicker from "./ColorPicker";
import DarkModeToggle from "./DarkModeToggle";
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
    <div
      className="settings"
      style={{ display: "flex", flexDirection: "column", width: "450px", gap: "8px" }}
    >
      <div style={{ display: "flex", gap: "1rem" }}>
        <FilePicker filePicker={props.filePicker} setFiles={props.setFiles} />
        <DarkModeToggle />
      </div>
      <NumberInput
        defaultValue={props.renderSize}
        placeholder="Taille du rendu"
        label="🖼 Longueur / Largeur"
        description="Définir la taille du rendu"
        onChange={(value: number) => {
          props.setRenderSize(value);
        }}
      />
      <ColorPicker bgColor={props.bgColor} setBgColor={props.setBgColor} />
    </div>
  );
};

export default Settings;
