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


type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
}

const ToDoItem = ({
  todo,
  deleteTodo,
  handleTodo
}: {
  todo: ToDoType,
  deleteTodo: (id: number) => void;
  handleTodo: (id: number) => void;

}) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoInfoContainer}>
        <Checkbox
          value={todo.isDone}
          onValueChange={() => handleTodo(todo.id)}
          tintColors={{ true: '#4630EB', false: undefined }}
        />
        <Text
          style={[styles.todoText,
          todo.isDone && { textDecorationLine: 'line-through' }
          ]}
        >
          {todo.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          deleteTodo(todo.id);
          Alert.alert("Deleted!.." + todo.title);
        }}
      >
        <Image source={require('../Asset/trash.png')} style={styles.deleteIcon}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
});

export default ToDoItem