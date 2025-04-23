import { create } from 'zustand'
import { todoStoreType, todoTextType, ToDoType } from '../types/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Keyboard } from 'react-native'

export const useTodoTextStore = create<todoTextType>((set) => ({
    todoText: "",
    setTodoText: (text) => {
        set(() => ({
            todoText: text
        }))
    },
}))

export const useTodoStore = create((set) => ({
    todos: [],
    oldTodos: [],
    addTodo: async () => {
        const { todoText, setTodoText } = useTodoTextStore.getState();
        try {

            if (!todoText) {
                return; 
            }

            const newTodo = {
                id: Math.random(),
                title: todoText,
                isDone: false
            };
            set((state: { todos: any }) => ({
                todos: [...state.todos, newTodo],
                oldTodos: [...state.todos, newTodo]
            }))
            set(async (state: { todos: any }) => {
                await AsyncStorage.setItem("my-todo", JSON.stringify(state.todos));
                return state
            })

            setTodoText('');
            Keyboard.dismiss();
        } catch (error) {
            console.log(error);
        }
    },
    deleteTodo: async (id: number) => {
        try {
            const { todos } = useTodoStore.getState() as todoStoreType; // Access current todos
            const newTodos = todos.filter((todo: ToDoType) => todo.id !== id); // Filter out the deleted todo

            // Save to AsyncStorage
            await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));

            // Update the Zustand store
            set({
                todos: newTodos,
                oldTodos: newTodos
            });
        } catch (error) {
            console.log("Delete error:", error);
        }
    },
    handleDone: async (id: number) => {
        try {
            const { todos } = useTodoStore.getState() as todoStoreType; // Get current todos

            const newTodos = todos.map((todo: ToDoType) => {
                if (todo.id === id) {
                    return { ...todo, isDone: !todo.isDone }; // Return a new object
                }
                return todo;
            });

            // Persist the updated list
            await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));

            // Update state
            set({
                todos: newTodos,
                oldTodos: newTodos
            });
        } catch (error) {
            console.log("Error in handleDone:", error);
        }
    },
    setTodos: (todos: ToDoType[]) => {
        set(() => ({
            todos: todos
        }))
    },
    setOldTodos: (todos: ToDoType[]) => {
        set(() => ({
            oldTodos: todos
        }))
    },

}

))

