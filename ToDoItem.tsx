import React from 'react';

const ToDoItem=({todo}:{todo:ToDoType})=>(
           <View style={styles.todoContainer}>
           <View style={styles.todoInfoContainer}>
           <Checkbox value={item.isDone} color={item.isDone ? '#4630EB'} : undefined/>
           <Text style={[styles.todoText, item.isDone && {textDecorationLine: 'line-through'}]}>{item.title}</Text>
           </View>
           <TouchableOpacity
           onPress={()=>{
               alert("Deleted!.." + item.id);
               }}>
           <Ionicons name="trash" size={24} color='red'/>
           </TouchableOpacity>
           </View>
           )}

export default ToDoItem