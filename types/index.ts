export type TaskStatus = 'todo' | 'in-progress' | 'complete';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  order: number;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface AppState {
  tasks: Task[];
  todos: TodoItem[];
  notes: string;
}

export const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'complete', title: 'Complete' },
];
