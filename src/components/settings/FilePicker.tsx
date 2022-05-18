import { Button } from "@mantine/core";
import React, { Fragment, useState } from "react";
import { FileUpload } from "tabler-icons-react";

export interface IFilePicker {
  filePicker: React.RefObject<HTMLInputElement>;
  setFiles: (value: string[]) => void;
}

const FilePicker = (props: IFilePicker) => {
  const [loading, setLoading] = useState(false);

  const handleFilePickerButtonClick = () => {
    if (props.filePicker.current !== null) {
      props.filePicker.current.click();
      setLoading(true);
    }
  };

  const handleFiles = (fileList: FileList) => {
    props.setFiles(
      [...Array.from(fileList)].map((file) =>
        window.URL.createObjectURL(new Blob([file]))
      )
    );
    setLoading(false);
  };

  return (
    <Fragment>
      <Button
        loaderPosition="right"
        loading={loading}
        leftIcon={<FileUpload size={20} />}
        onClick={handleFilePickerButtonClick}
      >
        Sélectionner des images
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
