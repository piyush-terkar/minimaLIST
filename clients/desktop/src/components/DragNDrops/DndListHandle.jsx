import {
  createStyles,
  rem,
  Skeleton,
  Text,
  TextInput,
  Paper,
  ActionIcon,
  Flex,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Form } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    margin: theme.spacing.sm,
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

export function DndListHandle({ data }) {
  const { classes, cx } = useStyles();
  const [edit, setEdit] = useState("");
  const [state, handlers] = useListState(data);

  if (data) {
    const items = state.map((item, index) => (
      <Draggable index={index} draggableId={index.toString()} key={index}>
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
            <Text className={classes.symbol}>{item.emoji}</Text>
            <div>
              <Text
                display={edit == item.id ? "none" : ""}
                onDoubleClick={() => {
                  console.log("Hit");
                  setEdit(item.id);
                }}
              >
                {item.label}
              </Text>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e.target.value);
                  setEdit("");
                }}
              >
                <Flex>
                  <TextInput
                    name={item.id}
                    value={item.label}
                    display={edit == item.id ? "" : "none"}
                    m={"sm"}
                    variant={"unstyled"}
                  />
                  <ActionIcon
                    m={"sm"}
                    color="red"
                    display={edit == item.id ? "" : "none"}
                  >
                    <IconTrash size="1.125rem" />
                  </ActionIcon>
                </Flex>
              </form>
            </div>
          </div>
        )}
      </Draggable>
    ));

    return (
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
        }
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
  } else {
    return (
      <>
        <Skeleton height={50} circle mb="xl" />
        <Paper m={"sm"}>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Paper>
        <Skeleton height={50} circle mb="xl" />
        <Paper m={"sm"}>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Paper>
        <Skeleton height={50} circle mb="xl" />
        <Paper m={"sm"}>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Paper>
      </>
    );
  }
}
