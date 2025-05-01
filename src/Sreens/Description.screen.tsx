import React, { useEffect, useState } from 'react';
import {
    Alert,
    BackHandler,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,


} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { editStoreType, todoStoreType, ToDoType } from '../types/types';
import { useTodoStore } from '../store/store';
import ToDoItem from '../components/ToDoItem';
import { useEditStore } from '../store/store';

export default function DescriptionScreen({ navigation }: any) {

    const { editId, clearEditId } = useEditStore();
    const { todos, deleteTodo, editTodo } = useTodoStore();

    const selectedTask = todos.find((todo) => todo.id == editId)

    const [editedText, setEditedText] = useState({
        title: selectedTask?.title || "",
        des: selectedTask?.des || "",
    })

    useEffect(() => {
        const onBackPress = () => {
            clearEditId()
            navigation.goBack()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => backHandler.remove();
    }, []);

    const confirmDelete = () => {
        Alert.alert(
            "Delete Task",
            `Are you sure you want to delete the task -- ${selectedTask?.title}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        deleteTodo(selectedTask?.id)
                        navigation.goBack()
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const editConfirm = () => {
        Alert.alert(
            "Edit Confirmstion",
            `Are you sure you want to save the changes you have done?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        editTodo(selectedTask?.id, editedText)
                        navigation.navigate("Home")
                    }
                }
            ],
            { cancelable: true }
        )
    }


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Image source={require("../Asset/back.png")} style={styles.backButton} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Task Description</Text>
                </View>
                <View style={styles.taskDetails}>
                    <TextInput style={styles.taskTitle}
                        value={editedText.title}
                        onChangeText={(text) => setEditedText({ ...editedText, title: text })}
                        multiline={true}
                        textAlignVertical='top'
                    />
                    <TextInput
                        style={styles.taskDescription}
                        value={editedText.des}
                        onChangeText={(text) => setEditedText({ ...editedText, des: text })}
                        multiline={true}
                        textAlignVertical='top'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={editConfirm}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => { confirmDelete() }}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingBottom: 20,
        

    },
    header: {
        backgroundColor:'#5D7EFC',
        height:60,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
         

    },
    backButton: {
        height: 25,
        width: 25,
        alignItems: 'center',
        marginLeft: 20,


    },
    headerTitle: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        position: 'absolute',
        left: 100,
    },
    taskDetails: {
        marginVertical: 60,
        marginHorizontal: 20,
        minHeight:180,
        maxHeight: 200,

    },
    taskTitle: {
        fontSize: 18,
        padding: 10,
        minHeight: 40,
        maxHeight: 60,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 5,
        textAlignVertical: 'top',
        width: '100%',
        includeFontPadding: false,
        flexWrap: 'wrap'

    },
    taskDescription: {
        marginBottom: 20,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#666',
        textAlignVertical: 'top',
        width: '100%',
        height: 150,
        includeFontPadding: false,
        flexWrap: 'wrap',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
        marginHorizontal: 20,
        height: 40,


    },
    editButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 7,
        paddingVertical: 7,
        borderRadius: 5,
        width: 120,
    },
    deleteButton: {
        backgroundColor: '#F44336',
        paddingHorizontal: 7,
        paddingVertical: 7,
        borderRadius: 5,
        width: 70,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

})
