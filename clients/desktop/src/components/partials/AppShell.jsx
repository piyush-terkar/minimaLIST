import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { NavbarSearch } from "./NavbarSearch";
import { HeaderMenu } from "./HeaderMenu";
import { DndTodoHandle } from "../DragNDrops/DndTodoHandle";
import { TodoRenderer } from "./TodoRender";
import { FooterPlain } from "./FooterPlain";

export function Shell() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarSearch opened={opened} />}
      footer={<FooterPlain />}
      header={<HeaderMenu theme={theme} setOpened={setOpened} />}
    >
      <TodoRenderer />
    </AppShell>
  );
}
