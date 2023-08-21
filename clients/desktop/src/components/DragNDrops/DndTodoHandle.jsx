import {
  Checkbox,
  createStyles,
  rem,
  Text,
  Flex,
  Paper,
  Skeleton,
  Space,
  Loader,
  Center,
  Container,
  ActionIcon,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import { RTE } from "../TextEditors/RTE";
import { useEffect, useState } from "react";

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

export function DndTodoHandle({ data }) {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);
  const [selection, setSelection] = useState();

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

            <Flex justify={"space-between"}>
              <Checkbox m={"sm"} name={index} />
              <Text
                m={"sm"}
                onClick={() => {
                  setSelection(item.id);
                }}
                display={selection == item.id ? "none" : ""}
              >
                {item.label}
              </Text>
              <Container display={selection != item.id ? "none" : ""}>
                <RTE content={item.label} />
              </Container>
            </Flex>
            <ActionIcon
              m={"sm"}
              color="red"
              display={selection == item.id ? "" : "none"}
            >
              <IconTrash size="1.125rem" />
            </ActionIcon>
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
  }
  return (
    <>
      <Center>
        <Loader size={"xl"} color={"gray"} />
      </Center>
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
