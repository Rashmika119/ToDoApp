export type ToDoType = {
    id: number;
    title: string;
    isDone: boolean;
    des: string;
}


export type todoTextType = {
    todoText: ToDoType;
    setTodoText : (text:string,key:string) => void;
    clearTodoText: () => void;
}


export type todoStoreType = {
    todos: ToDoType[];
    oldTodos: ToDoType[];
    addTodo: () => void;
    deleteTodo: (id: number | undefined) => void;
    handleDone: (id: number ) => void;
    editTodo: (id: number | undefined, newValue: Partial<ToDoType>) => void;
    setTodos:(todos:ToDoType[]) => void;
    setOldTodos:(todos:ToDoType[]) => void;
}

export type editStoreType={
    editId:number |null;
    setEditId:(id:number)=>void;
    clearEditId:()=>void;
}