import { Button } from "@mantine/core";
import React, { Fragment } from "react";

export interface IFilePicker {
  filePicker: React.RefObject<HTMLInputElement>;
  setFiles: (value: string[]) => void;
}

const FilePicker = (props: IFilePicker) => {
  const handleFiles = (fileList: FileList) => {
    props.setFiles(
      [...Array.from(fileList)].map((file) =>
        window.URL.createObjectURL(new Blob([file]))
      )
    );
  };

  return (
    <Fragment>
      <Button
        onClick={() =>
          props.filePicker.current !== null
            ? props.filePicker.current.click()
            : ""
        }
      >
        📄 Sélectionner des images
      </Button>
      <input
        ref={props.filePicker}
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          e.currentTarget.files !== null
            ? handleFiles(e.currentTarget.files)
            : "";
        }}
      />
    </Fragment>
  );
};

export default FilePicker;
