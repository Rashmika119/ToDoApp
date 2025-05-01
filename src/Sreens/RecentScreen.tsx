import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,


} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { todoStoreType, ToDoType } from '../types/types';
import { useTodoStore } from '../store/store';
import ToDoItem from '../components/ToDoItem';
export default function RecentScreen({ navigation }: any) {

    const { oldTodos, deleteTodo, handleDone } = useTodoStore(state => state) as todoStoreType
    const [recentCompleted, setRecentCompleted] = useState<ToDoType[]>([]);

    {/*back press functionality to go back to home*/ }
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

    {/*getting 10 recently completed tasks section*/ }

    useEffect(() => {
        const fetchCompleteTasks = () => {
            const completedTasks = oldTodos.filter((todo: ToDoType) => todo.isDone === true).slice(-10);
            setRecentCompleted(completedTasks);
        };
        fetchCompleteTasks();
    }, [oldTodos]);

    {/*display completed tasks*/ }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Image source={require("../Asset/back.png")} style={styles.backButton} />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Recently completed tasks</Text>
                </View>
                <View style={styles.tasks}>
                    {recentCompleted.length > 0 ? <FlatList
                        data={[...recentCompleted].reverse()}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ToDoItem
                                todo={item}
                            />
                        )}
                    /> : <Text style={styles.noTaskText}>--no task has completed--</Text>}
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginInline: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 60,
        alignItems: 'center',
        gap: 30,
        backgroundColor: '#5D7EFC',
        height: 60,
        
    },

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',
        color: '#333',
        marginHorizontal: 'auto',
    },
    tasks:{
        marginHorizontal: 20,

    },
    noTaskText: {
        marginHorizontal: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    backButton: {
        height: 25,
        width: 25,
        alignItems: 'center',
        position: 'absolute',
        marginHorizontal: 10,
        
        
    },

})