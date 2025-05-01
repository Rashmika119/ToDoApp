import { create } from 'zustand'
import { editStoreType, todoStoreType, todoTextType, ToDoType } from '../types/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Keyboard } from 'react-native'

export const useTodoTextStore = create<todoTextType>((set) => ({
    todoText: {
        id: 0,
        title: "",
        isDone: false,
        des: "",
    },
    setTodoText: (text: string, key: string) => {
        set((state) => ({
            todoText: {
                ...state.todoText,
                [key]: text,

            }
        }))

    },
    clearTodoText: () => {
        set(() => ({
            todoText: {
                id: 0,
                title: "",
                isDone: false,
                des: "",
            }
        }))
    }
}))

export const useTodoStore = create<todoStoreType>((set) => ({
    todos: [],
    oldTodos: [],
    addTodo: async () => {
        const { todoText, setTodoText, clearTodoText } = useTodoTextStore.getState();
        try {

            if (!todoText || !todoText.title || todoText.title.trim() === "") {
                return;
            }

            const newTodo = {
                id: Math.random(),
                title: todoText.title,
                isDone: false,
                des: todoText.des,
            };
            set((state) => ({
                todos: [...state.todos, newTodo],
                oldTodos: [...state.todos, newTodo]

            }))

            await AsyncStorage.setItem("my-todo", JSON.stringify(useTodoStore.getState().todos));

            clearTodoText();
            Keyboard.dismiss();
        } catch (error) {
            console.log(error);
        }
    },
    deleteTodo: async (id: number | undefined) => {
        try {
            const { todos } = useTodoStore.getState(); // Access current todos
            const newTodos = todos.filter((todo) => todo.id !== id); // Filter out the deleted todo

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
            const { todos } = useTodoStore.getState(); // Get current todos

            const newTodos = todos.map((todo) => {
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
    editTodo: async (id: number | undefined, newValue) => {
        const { todos } = useTodoStore.getState();
        const newList = [...todos];
        const index = newList.findIndex((todo) => todo.id === id);
        if (index < 0) return
        newList[index] = {
            ...newList[index],
            ...newValue,
        }


        await AsyncStorage.setItem("my-todo", JSON.stringify(newList));

        set(() => (
            { todos: newList }
        ))


    },


    // Access current todos

}))

export const useEditStore = create<editStoreType>((set) => ({
    editId: null,
    setEditId: (id: number) => {
        set(() => ({
            editId: id
        }))
    },
    clearEditId: () => {
        set(() => ({
            editId: null
        }))
    }
}))

