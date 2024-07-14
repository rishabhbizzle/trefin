import { UUID } from "crypto";

// types/task.ts
export interface Task {
  id?: UUID;
  title: string;
  description?: string;
  due_date?: Date;
  priority?: string;
  category?: string;
  type: ColumnId;
}

export type ColumnId = "To Do" | "In Progress" | "Done" | "On Hold";

export interface Columns {
  [key: string]: Task[];
}
