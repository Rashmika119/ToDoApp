import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    FlatList,
    StyleSheet,
    Text,
    View,


} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { ToDoType } from '../types/types';
import { useTodoStore } from '../store/store';
import ToDoItem from '../components/ToDoItem';
export default function RecentScreen({ navigation }: any) {

    const { oldTodos, deleteTodo, handleDone } = useTodoStore(state => state)
    const [recentCompleted, setRecentCompleted] = useState<ToDoType[]>([]);

    useEffect(() => {
        const onBackPress = () => {
            navigation.goBack()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const fetchCompleteTasks = () => {
            const completedTasks = oldTodos.filter((todo: ToDoType) => todo.isDone === true).slice(-10);
            setRecentCompleted(completedTasks);
        };
        fetchCompleteTasks();
    }, [oldTodos]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.header}>Recently completed tasks</Text>
                {recentCompleted.length > 0 ? <FlatList
                    data={[...recentCompleted].reverse()}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ToDoItem
                            todo={item}
                            deleteTodo={deleteTodo}
                            handleTodo={handleDone}
                        />
                    )}
                />:<Text style={styles.noTaskText}>--no task has completed--</Text> }


            </View>

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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    noTaskText:{
        fontSize:16,
  
        textAlign:'center',
    }

})