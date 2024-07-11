// types/task.ts
export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
    type: string;
  }
  
  export type ColumnId = 'To Do' | 'In Progress' | 'Done' | 'On Hold';
  
  export interface Columns {
    [key: string]: Task[];
  }