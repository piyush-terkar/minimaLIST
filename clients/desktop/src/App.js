import logo from "./logo.svg";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Shell } from "./components/partials/AppShell";
import { Authentication } from "./components/pages/Authentication";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Shell />
      {/* <Authentication /> */}
    </MantineProvider>
  );
}

export default App;
