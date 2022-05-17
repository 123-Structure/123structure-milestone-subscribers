import React, { Fragment } from "react";
import {
  useMantineColorScheme,
  SegmentedControl,
  Center,
  Box,
} from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";

const DarkModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SegmentedControl
        value={colorScheme}
        onChange={(value: string) =>
          toggleColorScheme(value as "light" | "dark")
        }
        data={[
          {
            value: "light",
            label: (
              <Center>
                <Sun size={16} />
                <Box ml={10}>Clair</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <Moon size={16} />
                <Box ml={10}>Sombre</Box>
              </Center>
            ),
          },
        ]}
      />
      
    </div>
  );
};

export default DarkModeToggle;
