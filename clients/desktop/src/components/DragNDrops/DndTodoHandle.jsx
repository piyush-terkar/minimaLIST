import { Checkbox, createStyles, rem, ActionIcon, Paper } from "@mantine/core";
import { useDebouncedValue, useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  IconCheck,
  IconGripVertical,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { RTE } from "../TextEditors/RTE";
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(0)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

export function DndTodoHandle({ data, onChange }) {
  data.map((item, index) => {
    if (!item.index) {
      item.index = index;
    }
    return item;
  });
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);
  const [currEdit, setCurrEdit] = useState("");
  const [debounced] = useDebouncedValue(currEdit, 200);
  const [currTodo, setCurrTodo] = useState({
    listId: "",
    content: "",
    isChecked: null,
    index: "",
  });

  const deleteTodo = (todo) => {
    axios.delete(`http://localhost:8080/api/v1/todo/${todo.id}`).then((res) => {
      onChange(todo.listId);
    });
  };

  const updateTodo = (todo) => {
    console.log(todo);
    axios
      .put(`http://localhost:8080/api/v1/todo/${todo.id}`, todo)
      .then((res) => console.log(res));
  };

  useEffect(() => {
    console.log(debounced);
  }, [currTodo, debounced]);

  const items = state.map((item, index) => (
    <Draggable index={item.index} draggableId={item.id} key={item.id}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size="1.05rem" stroke={1.5} />
          </div>

          <Checkbox
            m={"sm"}
            name={index}
            defaultChecked={item.isChecked}
            onChange={(e) =>
              setCurrTodo({ ...item, isChecked: e.currentTarget.checked })
            }
          />
          <Paper onClick={(e) => setCurrTodo({ ...item })}>
            <RTE content={item.content} onChange={setCurrEdit} />
          </Paper>

          <ActionIcon m={"sm"} color="red" onClick={() => deleteTodo(item)}>
            <IconTrash size="1.125rem" />
          </ActionIcon>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
        handlers.apply((item, index) => {
          updateTodo({ ...item, index: index });
          return { ...item, index: index };
        });
      }}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
