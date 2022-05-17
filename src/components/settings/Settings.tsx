import { Button, ColorInput, NumberInput } from "@mantine/core";
import React from "react";
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
      <ColorInput
        value={props.bgColor}
        placeholder="Selectionner une couleur 🎨"
        label="🎨 Couleur d'arrière plan"
        description="Définir la couleur d'arrière plan"
        onChange={props.setBgColor}
      />
    </div>
  );
};

export default Settings;
