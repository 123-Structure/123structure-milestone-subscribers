import React, { ChangeEventHandler, useRef, useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import "./App.css";
import Settings from "./components/settings/Settings";

function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [renderSize, setRenderSize] = useState<number>(600);
  const filePicker = useRef<HTMLInputElement>(null);
  const [bgColor, setBgColor] = useState("#cccccc");

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const imgSize = () => {
    const s = renderSize / Math.ceil(Math.sqrt(files.length));
    return s;
  };

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
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
              <div
                key={index}
                className="img"
                id={`img-${index}`}
                style={{
                  backgroundImage: `url(${file})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: `${imgSize()}px`,
                  height: `${imgSize()}px`,
                }}
              />
            ))}
          </div>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
