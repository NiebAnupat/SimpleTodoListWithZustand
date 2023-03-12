import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Todo from "./model/Todo";
import { v4 } from "uuid";

export type TodoStore = {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  removeAll: () => void;
  getCountAll: () => number;
  getCountCompleted: () => number;
  getCountIncompleted: () => number;
};

const useTodoStore: any = create<TodoStore>(
  persist(
    devtools((set) => ({
      todos: [],
      addTodo: (title: string) =>
        set((state) => ({
          todos: [...state.todos, { id: v4(), title, completed: false }],
        })),
      removeTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      removeAll: () => set({ todos: [] }),
      getCountAll: () => useTodoStore.getState().todos.length,
      getCountCompleted: () =>
        useTodoStore
          .getState()
          .todos.filter((todo: Todo) => todo.completed === true).length,
      getCountIncompleted: () =>
        useTodoStore
          .getState()
          .todos.filter((todo: Todo) => todo.completed === false).length,
    })),
    {
      name: "todo-list",
    }
  )
);

export default useTodoStore;
