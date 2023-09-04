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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./Authentication/ProtectedRoute";
import { Notifications } from "@mantine/notifications";
import { User } from "./components/pages/User";
import { ModalsProvider } from "@mantine/modals";

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
        <ModalsProvider>
          <Notifications />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Authentication />} />

              <Route
                path="/todolist"
                element={
                  <ProtectedRoute>
                    <Shell />
                  </ProtectedRoute>
                }
              />
              <Route path="/user" element={<User />} />
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
