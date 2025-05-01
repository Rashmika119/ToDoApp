import React from 'react';
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

import Checkbox from '@react-native-community/checkbox';
import { useTodoStore } from '../store/store';


type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
}

const ToDoItem = ({ todo }: { todo: ToDoType, }) => {

  const { handleDone, deleteTodo } = useTodoStore(state => state)
  {/*Delete item alert functionality*/ }

  const confirmDelete = () => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete the task -- ${todo.title}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteTodo(todo.id)
        }
      ],
      { cancelable: true }
    );
  };
  const handleDoneConfirm = (id: number) => {
    Alert.alert(
      "Mark as Done",
      `Are you sure you want to mark the task -- ${todo.title} as done?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleDone(id)
        }
      ],
      { cancelable: true }
    )
  }

  {/*task container*/ }
  return (

    <View style={[styles.todoContainer,todo.isDone && styles.todoContainerDone]}>
      <View style={styles.todoInfoContainer}>
        {todo.isDone ? null :
          <Checkbox
            value={todo.isDone}
            onValueChange={() => handleDoneConfirm(todo.id)}
            tintColors={{ true: '#5D7EFC', false: '#A0A8BB' }}
          />}

        <Text
          style={[styles.todoText, todo.isDone && styles.todoTextDone]}
          numberOfLines={1}
          ellipsizeMode="tail"
          >
          {todo.title}

        </Text>
      </View>
      <TouchableOpacity
        onPress={() => confirmDelete()}
        style={styles.deleteButton}
      >
        <Image source={require('../Asset/trash.png')} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    marginHorizontal: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#5D7EFC',
    gap: 10,
  },
  todoContainerDone: {
    backgroundColor: '#F5F7FA',
    opacity: 0.8,
    borderLeftColor: '#A0A8BB',
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
    flex: 1,
    flexShrink: 1,
  },
  todoTextDone: {
    color: '#5f5f5f',
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FEF1F2',
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#FC5D7D',
  },
});

export default ToDoItem