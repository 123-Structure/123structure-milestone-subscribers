import React, { useState } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Button } from "@mantine/core";
import { Download } from "tabler-icons-react";

export interface IDownloadButton {
  renderSize: number;
}

const DownloadButton = (props: IDownloadButton) => {
  const [loading, setLoading] = useState(false);

  const imgSize = [500, 600, 700, 800, 900, 1000];

  const handleDownloadImage = async () => {
    setLoading(true);

    const zip = require("jszip")();

    const mosaic = document.querySelector(".imgContainer") as HTMLElement;
    const img = document.querySelectorAll(".img") as NodeListOf<HTMLElement>;

    const size = [...imgSize, props.renderSize];

    for (let i = 0; i < size.length; i++) {
      mosaic.style.width = `${size[i]}px`;
      mosaic.style.height = `${size[i]}px`;
      for (let j = 0; j < img.length; j++) {
        img[j].style.width = `${size[i] / Math.ceil(Math.sqrt(img.length))}px`;
        img[j].style.height = `${size[i] / Math.ceil(Math.sqrt(img.length))}px`;
      }

      const canvas = await html2canvas(mosaic);
      const data = await canvas.toDataURL("image/png");
      const fileName =
        i !== size.length - 1
          ? `${size[i]}x${size[i]}`
          : `perso_${size[i]}x${size[i]}`;
      console.log("⏳ " + fileName);
      zip.file(
        `Mosaic_${fileName}.png`,
        data.replace(/^data:image\/(png|jpg);base64,/, ""),
        {
          base64: true,
        }
      );
    }

    zip.generateAsync({ type: "blob" }).then((content: any) => {
      saveAs(content, "mosaic.zip");
      setLoading(false);
      mosaic.style.width = `${props.renderSize}px`;
      mosaic.style.height = `${props.renderSize}px`;
      for (let j = 0; j < img.length; j++) {
        img[j].style.width = `${
          props.renderSize / Math.ceil(Math.sqrt(img.length))
        }px`;
        img[j].style.height = `${
          props.renderSize / Math.ceil(Math.sqrt(img.length))
        }px`;
      }
    });
  };

  return (
    <Button
      loaderPosition="right"
      loading={loading}
      leftIcon={<Download size={20} />}
      onClick={handleDownloadImage}
    >
      Télécharger le rendu
    </Button>
  );
};

export default DownloadButton;
