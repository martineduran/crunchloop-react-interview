export interface TodoList {
  id: number;
  name: string;
  todoItems: TodoItem[];
}

export interface TodoItem {
  id: number;
  description: string;
  completed: boolean;
  todoListId?: number;
}

export interface CreateTodoListPayload {
  name: string;
}

export interface UpdateTodoListPayload {
  name: string;
}

export interface CreateTodoItemPayload {
  description: string;
  completed: boolean;
}

export interface UpdateTodoItemPayload {
  description: string;
  completed: boolean;
}
