import { DndTodoHandle } from "../DragNDrops/DndTodoHandle";
import { Affix, Center, Flex, Paper } from "@mantine/core";
import { RTE } from "../TextEditors/RTE";
import { TodoHeroHeader } from "./TodoHeroHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import NewTodoCreator from "../creators/NewTodoCreator";
const data = [
  { isChecked: "👍", content: "Sales", id: "a" },
  { isChecked: "🚚", content: "Deliveries", id: "b" },
  { isChecked: "💸", content: "Discounts", id: "c" },
  { isChecked: "💰", content: "Profits", id: "d" },
  { isChecked: "✨", content: "Reports", id: "e" },
  { isChecked: "🛒", content: "Orders", id: "f" },
  { isChecked: "📅", content: "Events", id: "g" },
  { isChecked: "🙈", content: "Debts", id: "h" },
  { isChecked: "💁‍♀️", content: "Customers", id: "i" },
  { isChecked: "📅", content: "Events", id: "j" },
  { isChecked: "🙈", content: "Debts", id: "k" },
  { isChecked: "💁‍♀️", content: "Customers", id: "i" },
];

export function TodoRenderer({ selectedList }) {
  const [list, setList] = useState(selectedList);
  const [todos, setTodos] = useState(undefined);
  const getTodos = (listId) => {
    axios.get(`http://localhost:8080/api/v1/todo/${listId}`).then((res) => {
      setTodos(res.data);
    });
  };

  useEffect(() => {
    setList(selectedList);
    getTodos(selectedList.id);
  }, [selectedList]);
  return (
    <>
      {list ? <TodoHeroHeader title={list.title} emoji={list.emoji} /> : null}
      <Paper shadow="xl" radius="xs" p="xs">
        {todos ? (
          <>
            <NewTodoCreator />
            <DndTodoHandle data={todos} />
          </>
        ) : (
          <NewTodoCreator />
        )}
      </Paper>
    </>
  );
}
