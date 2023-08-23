import { DndTodoHandle } from "../DragNDrops/DndTodoHandle";
import { Affix, Center, Flex, Paper } from "@mantine/core";
import { RTE } from "../TextEditors/RTE";
import { TodoHeroHeader } from "./TodoHeroHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import NewTodoCreator from "../creators/NewTodoCreator";

export function TodoRenderer({ selectedList }) {
  const [list, setList] = useState(selectedList);
  const [todos, setTodos] = useState(undefined);
  const getTodos = (listId) => {
    setTodos(undefined);
    axios.get(`http://localhost:8080/api/v1/todo/${listId}`).then((res) => {
      setTodos(res.data);
    });
  };

  useEffect(() => {
    setList(selectedList);
    getTodos(selectedList.id);
  }, [selectedList, list]);
  return (
    <>
      {list ? <TodoHeroHeader title={list.title} emoji={list.emoji} /> : null}
      <Paper shadow="xl" radius="xs" p="xs">
        {todos ? (
          <>
            <NewTodoCreator listId={selectedList.id} onChange={getTodos} />
            <DndTodoHandle data={todos} onChange={getTodos} />
          </>
        ) : (
          <NewTodoCreator listId={selectedList.id} onChange={getTodos} />
        )}
      </Paper>
    </>
  );
}
