import { DndTodoHandle } from "../DragNDrops/DndTodoHandle";
import { Affix, Center, Flex, Paper } from "@mantine/core";
import { RTE } from "../TextEditors/RTE";
const data = [
  { emoji: "👍", label: "Sales", id: "a" },
  { emoji: "🚚", label: "Deliveries", id: "b" },
  { emoji: "💸", label: "Discounts", id: "c" },
  { emoji: "💰", label: "Profits", id: "d" },
  { emoji: "✨", label: "Reports", id: "e" },
  { emoji: "🛒", label: "Orders", id: "f" },
  { emoji: "📅", label: "Events", id: "g" },
  { emoji: "🙈", label: "Debts", id: "h" },
  { emoji: "💁‍♀️", label: "Customers", id: "i" },
  { emoji: "📅", label: "Events", id: "j" },
  { emoji: "🙈", label: "Debts", id: "k" },
  { emoji: "💁‍♀️", label: "Customers", id: "i" },
];

export function TodoRenderer() {
  return (
    <>
      <Paper shadow="xl" radius="xs" p="xs">
        <DndTodoHandle data={data} />
      </Paper>
    </>
  );
}
