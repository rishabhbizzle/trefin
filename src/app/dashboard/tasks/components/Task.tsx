// components/Task.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task as TaskType } from '../types';

interface TaskProps {
  task: TaskType;
  index: number;
}

const priorityColors: { [key: string]: string } = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

const Task: React.FC<TaskProps> = ({ task, index }) => {
    console.log(task)

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg hover:underline z-30" onClick={console.log}>{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
              <div className="flex justify-between items-center mt-2">
                <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                <span className="text-sm text-gray-500">{task.dueDate}</span>
              </div>
              <Badge variant="outline" className="mt-2">{task.type}</Badge>
            </CardHeader>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Task;