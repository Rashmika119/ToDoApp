
import React from 'react';
import ToDoItem from './src/components/ToDoItem'
import type { PropsWithChildren } from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Text,
    View,
    Alert,

} from 'react-native';


import { SafeAreaView } from "react-native-safe-area-context";

import Checkbox from '@react-native-community/checkbox';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todoStoreType, ToDoType } from './src/types/types';
import { useTodoStore, useTodoTextStore } from './src/store/store';

function App() {

    {/*create todo array*/ }
    const todoData = [
        {
            id: 1,
            title: "Todo 1",
            isDone: false,
        },
        {
            id: 2,
            title: "Todo 2",
            isDone: false,
        },
        {
            id: 3,
            title: "Todo 3",
            isDone: false,
        },
        {
            id: 4,
            title: "Todo 4",
            isDone: true,
        },
    ];

    // const [todos, setTodos] = useState<ToDoType[]>(todoData);
    const {todoText, setTodoText} = useTodoTextStore(state => state)
    const [searchQuery, setSearchQuery] = useState<string>('');
    // const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);

    const {todos, oldTodos, addTodo, deleteTodo, handleDone,setTodos, setOldTodos} = useTodoStore(state => state) as todoStoreType

    useEffect(() => {
        const getTodos = async () => {
            try {
                const todos = await AsyncStorage.getItem("my-todo");
                if (todos !== null) {
                    setTodos(JSON.parse(todos));
                    setOldTodos(JSON.parse(todos));
                }
            } catch (error) {
                console.log(error);
            }
        };
        getTodos();
    }, []);

    {/* add task functionality */ }
    {/*used async storage to avoid the new items get deleted when restart the app*/ }
    {/* and dismiss the keyboard and clear the input field after adding a new task */ }
    // const addToDo = async () => {
    //     try {
    //         const newTodo: ToDoType = {
    //             id: Math.random(),
    //             title: todoText,
    //             isDone: false
    //         };
    //         todos.push(newTodo);
    //         setTodos(todos);
    //         setOldTodos(todos);
    //         await AsyncStorage.setItem("my-todo", JSON.stringify(todos));
    //         setTodoText('');
    //         Keyboard.dismiss();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    {/* creted delete task funstionality with async storage*/ }
    // const deleteTodo = async (id: number) => {
    //     try {
    //         const newTodos = todos.filter((todo) => todo.id !== id);
    //         await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
    //         setTodos(newTodos);
    //         setOldTodos(newTodos);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    {/*function to indicate the task is done */ }
    // const handleDone = async (id: number) => {
    //     try {
    //         const newTodos = todos.map((todo) => {
    //             if (todo.id === id) {
    //                 todo.isDone = !todo.isDone;
    //             }
    //             return todo;
    //         });
    //         await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
    //         setTodos(newTodos);
    //         setOldTodos(newTodos);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const onSearch = (query: string) => {
        if (query == '') {
            setTodos(oldTodos);
        } else {
            const filteredTodos = todos.filter((todo:ToDoType) =>
                todo.title.toLowerCase().includes(query.toLowerCase())
            );
            setTodos(filteredTodos);
        }
    };

    useEffect(() => {
        onSearch(searchQuery);
    }, [searchQuery]);



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert("Clicked!");
                    }}
                >
                    <Image source={require("./src/Asset/menu.png")} style={styles.menuButton} />
                </TouchableOpacity>
            </View>

            {/*clearButtonMode this provide a close button in the input field.but it work in IOS not android*/}
            {/*extract the items from todo array to dispaly each task*/}
            <View style={styles.searchBar}>
                {/**/}
                <TextInput
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    style={styles.searchInput}
                    clearButtonMode="always"
                />
            </View>

            {/*extract the items from todo array to display each task.new tasks add to the top by reverse function*/}
            <FlatList
                data={[...todos].reverse()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <ToDoItem
                        todo={item}
                        deleteTodo={deleteTodo}
                        handleTodo={handleDone} />
                }
            />

            {/*the task adding section*/}
            {/*KeyboardAvoidingView to avoid covering input field from the keyboard*/}
            <KeyboardAvoidingView
                style={styles.footer}
                behavior="padding"
                keyboardVerticalOffset={10}
            > 
                <TextInput
                    style={styles.newTodoInput}
                    placeholder="add new task"
                    value={todoText}
                    onChangeText={(text) => setTodoText(text)}
                    autoCorrect={false}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                    <Image source={require("./src/Asset/add.png")} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',

    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 16 : 8,
        borderRadius: 10,
        gap: 10,

        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    newTodoInput: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        fontSize: 16,
        color: '#333',
    },

    menuButton: {
        height: 24,
        width: 24
    },
    addButton: {
        height: 34,
        width: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default App;
