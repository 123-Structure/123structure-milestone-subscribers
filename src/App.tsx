import React, { ChangeEventHandler, useRef, useState } from "react";
import "./App.css";
import Settings from "./components/settings/Settings";

function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [renderSize, setRenderSize] = useState<number>(600);
  const filePicker = useRef<HTMLInputElement>(null);
  const [bgColor, setBgColor] = useState("#cccccc");

  const imgSize = () => {
    const s = renderSize / Math.ceil(Math.sqrt(files.length));
    return s;
  };

  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "16px",
      }}
    >
      <Settings
        filePicker={filePicker}
        renderSize={renderSize}
        bgColor={bgColor}
        setRenderSize={setRenderSize}
        setBgColor={setBgColor}
        setFiles={setFiles}
      />
      <div
        className="imgContainer"
        style={{
          width: `${renderSize}px`,
          height: `${renderSize}px`,
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          backgroundColor: bgColor,
          margin: "32px",
        }}
      >
        {files.map((file, index) => (
          <img
            key={index}
            src={file}
            alt="file"
            style={{
              width: `${imgSize()}px`,
              height: `${imgSize()}px`,
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
