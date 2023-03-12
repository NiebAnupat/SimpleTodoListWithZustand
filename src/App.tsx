import { useState, useRef, useEffect } from "react";
import { IconLayoutList, IconMinus } from "@tabler/icons-react";
import {
  Button,
  Container,
  Text,
  Input,
  Divider,
  Grid,
  Checkbox,
  Box,
} from "@mantine/core";
import { debounce } from "lodash";
import Todo from "./model/Todo";
import useTodoStore from "./TodoStore";

export default function App() {
  const [title, setTitle] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    addTodo,
    toggleTodo,
    removeTodo,
    removeAll,
    getCountAll,
    getCountCompleted,
    getCountIncompleted,
  } = useTodoStore();

  const todos: Todo[] = useTodoStore.getState().todos;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [todos]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value);
  };
  const handleTitleChange = debounce(handleTitle, 250);

  const renderIncompleteTodos = () => {
    return todos
      .filter((todo: Todo) => !todo.completed)
      .map((todo: Todo) => (
        <Box
          key={todo.id}
          id={`todo-${todo.id}`}
          display={"flex"}
          sx={{ alignItems: "center" }}
          my={"md"}
        >
          <Checkbox
            label={todo.title}
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <Button
            onClick={() => removeTodo(todo.id)}
            leftIcon={<IconMinus size={15} />}
            compact
            color="red.7"
            size="xs"
            ml={"auto"}
          >
            ลบ
          </Button>
        </Box>
      ));
  };

  const renderCompleteTodos = () => {
    return todos
      .filter((todo: Todo) => todo.completed)
      .map((todo: Todo) => (
        <Box
          key={todo.id}
          display={"flex"}
          sx={{ alignItems: "center" }}
          my={"md"}
        >
          <Checkbox
            label={todo.title}
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <Button
            onClick={() => removeTodo(todo.id)}
            leftIcon={<IconMinus size={15} />}
            compact
            color="red.7"
            size="xs"
            ml={"auto"}
          >
            ลบ
          </Button>
        </Box>
      ));
  };

  return (
    <>
      <Container my={"xl"}>
        <Text
          fz={40}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          fw={600}
        >
          รายการงาน
        </Text>
        <Input
          placeholder="ชื่อรายการ"
          variant="filled"
          size="md"
          aria-label="title"
          icon={<IconLayoutList />}
          onChange={handleTitleChange}
          ref={inputRef}
        ></Input>
        <Button
          mt={"md"}
          fullWidth
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
          onClick={() => addTodo(title)}
        >
          เพิ่มรายการ
        </Button>
        <Divider my={"lg"} />
        <Grid gutter={"sm"} columns={13}>
          <Grid.Col span={6}>
            <Box display={"flex"} sx={{ alignItems: "center" }}>
              <Text
                fz={30}
                variant="gradient"
                gradient={{ from: "orange", to: "pink.6", deg: 45 }}
                fw={600}
              >
                รายการที่ยังไม่เสร็จ
              </Text>
              <Text
                fz={20}
                variant="gradient"
                gradient={{ from: "pink.6", to: "orange", deg: 45 }}
                fw={600}
                ml={"auto"}
              >
                {getCountIncompleted()} รายการ
              </Text>
            </Box>
            {renderIncompleteTodos()}
          </Grid.Col>
          <Grid.Col span={1} display={"flex"}>
            <Divider orientation="vertical" mx={"auto"} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Box display={"flex"} sx={{ alignItems: "center" }}>
              <Text
                fz={30}
                variant="gradient"
                gradient={{ from: "cyan", to: "indigo", deg: 45 }}
                fw={600}
              >
                รายการที่เสร็จแล้ว
              </Text>
              <Text
                fz={20}
                variant="gradient"
                gradient={{ from: "cyan", to: "indigo", deg: 45 }}
                fw={600}
                ml={"auto"}
              >
                {getCountCompleted()} รายการ
              </Text>
            </Box>
            {renderCompleteTodos()}
          </Grid.Col>
        </Grid>
        {getCountAll() > 0 && (
          <>
            <Divider my={"lg"} />
            <Box
              display={"flex"}
              my={"xl"}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text
                fz={18}
                variant="gradient"
                gradient={{ from: "teal.8", to: "lime.5", deg: 45 }}
                fw={600}
              >
                ทั้งหมด {getCountAll()} รายการ
              </Text>
              <Button color="red.9" size="sm" ml={"md"} onClick={removeAll}>
                ลบทั้งหมด
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
