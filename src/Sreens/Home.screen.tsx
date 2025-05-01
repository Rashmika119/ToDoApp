
import React from 'react';
import ToDoItem from '../components/ToDoItem'
import type { PropsWithChildren } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Text,
    View,
    BackHandler,
    ScrollView,

} from 'react-native';


import { SafeAreaView } from "react-native-safe-area-context";

import Checkbox from '@react-native-community/checkbox';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todoStoreType, ToDoType } from '../types/types';
import { useTodoStore, useTodoTextStore } from '../store/store';
import { useEditStore } from '../store/store';

function HomeScreen({ navigation }: any) {

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
    const { todoText, setTodoText } = useTodoTextStore(state => state)
    const [searchQuery, setSearchQuery] = useState<string>('');
    // const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);

    const { todos, oldTodos, addTodo, deleteTodo, handleDone, setTodos, setOldTodos } = useTodoStore(state => state)
    const { setEditId } = useEditStore();

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
            const filteredTodos = todos.filter((todo: ToDoType) =>
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
                <TouchableOpacity style={styles.recentButtonContainer}
                    onPress={() => {
                        navigation.navigate("Recent")
                    }}
                >
                    <Image source={require("../Asset/recent.png")} style={styles.recentIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Tasks</Text>
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
            {/*the task adding section*/}
            {/*KeyboardAvoidingView to avoid covering input field from the keyboard*/}
            {/*add tasks bar*/}
            <KeyboardAvoidingView style={styles.addSection}

            >
                <View style={styles.addTextSection}>
                    <TextInput
                        style={styles.text}
                        placeholder="add new task"
                        value={todoText.title}
                        onChangeText={(text) => setTodoText(text, "title")}
                        multiline={true}
                        textAlignVertical='top'
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.textDescription}
                        placeholder="add task description"
                        value={todoText.des}
                        onChangeText={(text) => setTodoText(text, "des")}
                        multiline={true}
                        textAlignVertical='top'
                        autoCorrect={false}
                    />
                </View>

                <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                    <Image source={require("../Asset/add.png")} />
                </TouchableOpacity>
            </KeyboardAvoidingView>

            {/*extract the items from todo array to display each task.new tasks add to the top by reverse function*/}
            <ScrollView style={styles.tasksSection}>
                <FlatList
                    data={[...todos].reverse()}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        item.isDone ? null :
                            <TouchableOpacity onPress={() => {
                                setEditId(item.id);
                                navigation.navigate("Description")
                            }}>
                                {
                                    <ToDoItem
                                        todo={item} />
                                }
                            </TouchableOpacity>
                    }
                />
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: '#F5F7FA',
        marginBottom: 20,

    },
    header: {
        flexDirection: 'row',
        marginBottom: 28,
        alignItems: 'center',
        backgroundColor: '#5D7EFC',
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#5D7EFC',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
        paddingHorizontal: 20,


    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        alignItems: 'center',
        color: '#2D3748',
        marginHorizontal: 'auto',
        letterSpacing: 1.5,
    },
    recentButtonContainer: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    recentIcon: {
        height: 22,
        width: 22,
        tintColor: '#5D7EFC',
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: Platform.OS === 'ios' ? 16 : 10,
        borderRadius: 12,
        gap: 10,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    searchIcon: {
        height: 22,
        width: 22,
        tintColor: '#A0A8BB',
        marginHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#2D3748',
        fontWeight: '400',
    },
    addSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    addTextSection: {
        flex: 1,
    },
    text: {
        padding: 15,

        maxHeight: 60,
        backgroundColor: '#FFFFFF',
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '500',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#ffff',
        includeFontPadding: false,
        flexWrap: 'wrap',
    },
    textDescription: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        minHeight: 80,
        maxHeight: 100,
        fontSize: 16,
        fontWeight: '400',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#ffff',
        textAlignVertical: 'top',
        includeFontPadding: false,
        flexWrap: 'wrap',
    },
    addButton: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5D7EFC',
        borderRadius: 12,
        shadowColor: '#5D7EFC',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 4,
    },
    tasksSection: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#F5F7FA',
    }


});
export default HomeScreen;

