
import React from 'react';
import ToDoItem from '../components/ToDoItem'
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
    BackHandler,

} from 'react-native';


import { SafeAreaView } from "react-native-safe-area-context";

import Checkbox from '@react-native-community/checkbox';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todoStoreType, ToDoType } from '../types/types';
import { useTodoStore, useTodoTextStore } from '../store/store';

function HomeScreen({navigation}:any) {

    useEffect(() => {
        const onBackPress = () => {
            BackHandler.exitApp()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => backHandler.remove();
    }, []);

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
                        navigation.navigate("Recent")
                    }}
                >
                    <Image source={require("../Asset/recent.png")} style={styles.recentButton} />
                </TouchableOpacity>
            </View>

            {/*clearButtonMode this provide a close button in the input field.but it work in IOS not android*/}
            {/*extract the items from todo array to dispaly each task*/}
            <View style={styles.searchBar}>
                <Image source={require("../Asset/search.png")} style={styles.searchIcon} />
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
                    <Image source={require("../Asset/add.png")} />
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
    searchIcon:{
        height: 24,
        width: 24,
        color: '#333',
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

        borderRadius: 10,
        fontSize: 16,
        color: '#333',
    },

    recentButton: {
        height: 50,
        width: 50
    },
    addButton: {
        height: 34,
        width: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default HomeScreen;

