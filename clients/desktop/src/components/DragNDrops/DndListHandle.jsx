import {
  createStyles,
  rem,
  Skeleton,
  Text,
  TextInput,
  Paper,
  ActionIcon,
  Flex,
  Button,
  Container,
  Kbd,
} from "@mantine/core";
import { useListState, useDebouncedValue } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  IconGripVertical,
  IconTrash,
  IconPlus,
  IconMoodSmile,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Form } from "@mantine/form";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import axios from "axios";
import { hover } from "@testing-library/user-event/dist/hover";

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

export function DndListHandle({ data, onChange }) {
  const { classes, cx } = useStyles();
  const [edit, setEdit] = useState("");
  const [state, handlers] = useListState(data);

  const [showForm, setShowForm] = useState(false);
  const [formEmoji, setFormEmoji] = useState("");
  const [emoji, setEmoji] = useState("");
  const [newList, setNewList] = useState({ title: "", emoji: emoji });

  const [currEdit, setCurrEdit] = useState();
  const [debounced] = useDebouncedValue(currEdit, 300);

  useEffect(() => {
    if (debounced) {
      listUpdate(debounced.id, debounced);
    }
  }, [debounced]);

  const listReOrder = (id, body) => {};

  const listUpdate = (id, body) => {
    let data = { ...body };
    if (emoji != "") {
      data = { ...body, emoji: emoji };
    }
    axios
      .put(`http://localhost:8080/api/v1/list/${id}`, data)
      .then((response) => {
        onChange();
      });
  };

  const listDelete = (id) => {
    axios.delete(`http://localhost:8080/api/v1/list/${id}`).then((response) => {
      onChange();
    });
  };

  const createList = () => {
    axios
      .post("http://localhost:8080/api/v1/list", { ...newList, emoji: emoji })
      .then((response) => {
        onChange();
      });
  };

  const items = state.map((item, index) => (
    <Draggable index={index} draggableId={index.toString()} key={index}>
      {(provided, snapshot) => (
        <>
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
            <ActionIcon m={"sm"} onDoubleClick={() => setFormEmoji(item.id)}>
              <Emoji
                unified={item.emoji}
                emojiStyle={EmojiStyle.APPLE}
                size={40}
              />
            </ActionIcon>

            <div>
              <Text
                m={"sm"}
                display={edit == item.id ? "none" : ""}
                onDoubleClick={() => {
                  setEdit(item.id);
                }}
              >
                {item.title}
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
                    defaultValue={item.title}
                    display={edit == item.id ? "" : "none"}
                    m={"sm"}
                    variant={"unstyled"}
                    onChange={(e) =>
                      setCurrEdit({
                        id: item.id,
                        emoji: item.emoji,
                        index: item.index,
                        title: e.target.value,
                        createdDate: item.createdDate,
                        lastModifiedDate: item.lastModifiedDate,
                      })
                    }
                  />
                  <ActionIcon
                    m={"sm"}
                    color="red"
                    display={edit == item.id ? "" : "none"}
                    onClick={() => {
                      listDelete(item.id);
                    }}
                  >
                    <IconTrash size="1.125rem" />
                  </ActionIcon>
                </Flex>
              </form>
            </div>
          </div>
          <Paper display={formEmoji == item.id ? "" : "none"}>
            <EmojiPicker
              onEmojiClick={(emojiData, event) => {
                setEmoji(emojiData.unified);
                setCurrEdit({
                  id: item.id,
                  emoji: emoji,
                  index: item.index,
                  title: item.title,
                  createdDate: item.createdDate,
                  lastModifiedDate: item.lastModifiedDate,
                });
                setFormEmoji("");
              }}
            />
          </Paper>
        </>
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
            <Paper
              className={classes.item}
              onClick={() => setShowForm(true)}
              display={!showForm ? "" : "none"}
            >
              <ActionIcon>
                <IconPlus stroke={1.5} />
              </ActionIcon>
              <Text m={"sm"} color={"gray"}>
                Click To Add New List
              </Text>
            </Paper>
            <Container display={showForm ? "" : "none"}>
              <Paper className={classes.item}>
                <ActionIcon
                  onClick={() => {
                    setFormEmoji(false);
                    setShowForm(false);
                    setEmoji("");
                  }}
                >
                  <IconX />
                </ActionIcon>
                {emoji ? (
                  <Emoji
                    unified={emoji}
                    emojiStyle={EmojiStyle.APPLE}
                    size={40}
                  />
                ) : null}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createList();
                  }}
                >
                  <Text color={"gray"}>
                    Press <Kbd>Enter</Kbd> to create
                  </Text>
                  <Flex>
                    <TextInput
                      m={"sm"}
                      placeholder="List Title"
                      name="title"
                      value={newList.title}
                      onChange={(e) =>
                        setNewList({ ...newList, title: e.target.value })
                      }
                    />
                    <Button
                      onClick={() =>
                        setFormEmoji(formEmoji === "new" ? "" : "new")
                      }
                      m={"sm"}
                      pr={0}
                      variant={"outline"}
                      color={"gray"}
                      leftIcon={<IconMoodSmile m={0} />}
                    />
                  </Flex>
                </form>
              </Paper>
              <Paper display={formEmoji === "new" ? "" : "none"}>
                <EmojiPicker
                  onEmojiClick={(emojiData, event) => {
                    setEmoji(emojiData.unified);
                  }}
                />
              </Paper>
            </Container>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
