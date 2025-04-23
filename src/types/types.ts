export type ToDoType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type todoTextType = {
    todoText: string;
    setTodoText : (text:string) => void;
}

export type todoStoreType = {
    todos: ToDoType[];
    oldTodos: ToDoType[];
    addTodo: () => void;
    deleteTodo: (id: number) => void;
    handleDone: (id: number) => void;
    setTodos:(todos:ToDoType[]) => void;
    setOldTodos:(todos:ToDoType[]) => void;
}