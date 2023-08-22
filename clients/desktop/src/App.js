import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { Shell } from "./components/partials/AppShell";
import { Authentication } from "./components/pages/Authentication";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
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
        <Shell />
        {/* <Authentication /> */}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
