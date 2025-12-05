export type TodoStatus = 'pending' | 'in-progress' | 'completed';

export interface Todo {
  id: string;
  title: String;
  description: String;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}
