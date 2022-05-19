import React, { useState } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Button } from "@mantine/core";
import { Download } from "tabler-icons-react";

export interface IDownloadButton {
  renderSize: number;
  bgColor: string;
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

    const folderName = ["Color_Background", "Transparent_Background"];

    for (let i = 0; i < folderName.length; i++) {
      const folder = zip.folder(folderName[i]);
      for (let j = 0; j < size.length; j++) {
        mosaic.style.width = `${size[j]}px`;
        mosaic.style.height = `${size[j]}px`;
        if (folderName[i] === "Transparent_Background") {
          mosaic.style.backgroundColor = "transparent";
        }
        for (let k = 0; k < img.length; k++) {
          img[k].style.width = `${
            size[j] / Math.ceil(Math.sqrt(img.length))
          }px`;
          img[k].style.height = `${
            size[j] / Math.ceil(Math.sqrt(img.length))
          }px`;
        }

        const canvas = await html2canvas(mosaic, {
          backgroundColor: null,
        });
        const data = await canvas.toDataURL("image/png");
        const fileName =
          j !== size.length - 1
            ? `${size[j]}x${size[j]}`
            : `perso_${size[j]}x${size[j]}`;
        console.log("⏳ " + fileName);
        folder.file(
          `Mosaic_${fileName}.png`,
          data.replace(/^data:image\/(png|jpg);base64,/, ""),
          {
            base64: true,
          }
        );
      }
    }

    zip.generateAsync({ type: "blob" }).then((content: any) => {
      saveAs(content, "Mosaic.zip");
      setLoading(false);
      mosaic.style.width = `${props.renderSize}px`;
      mosaic.style.height = `${props.renderSize}px`;
      mosaic.style.backgroundColor = props.bgColor;
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
