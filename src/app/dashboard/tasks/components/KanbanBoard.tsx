"use client";

import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task, ColumnId, Columns } from "../types";
import AddTaskDialog from "./AddTaskDialog";
import TaskDetailsDialog from "./TaskDetailDialog";
import { updateTaskTypeByDrag } from "@/lib/actions";


interface KanbanBoardProps {
  columns: Columns
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns }) => {
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId as ColumnId];
    const destColumn = columns[destination.droppableId as ColumnId];
    const [movedTask] = sourceColumn.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      // The task has changed columns
      try {
        // Update the task in the database
        await updateTaskTypeByDrag(movedTask.id, destination.droppableId);
        
        // If the update was successful, update the local state
        // destColumn.splice(destination.index, 0, {
        //   ...movedTask,
        //   column: destination.droppableId as ColumnId
        // });

        // setColumns({
        //   ...columns,
        //   [source.droppableId]: sourceColumn,
        //   [destination.droppableId]: destColumn,
        // });

        // toast.success(`Task "${movedTask.title}" moved to ${destination.droppableId}`);
      } catch (error) {
        console.error('Failed to update task:', error);
        // toast.error('Failed to update task. Please try again.');
        
        // Revert the change in the UI
        sourceColumn.splice(source.index, 0, movedTask);
        setColumns({...columns});
      }
    } else {
      // The task has only changed position within the same column
      destColumn.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [source.droppableId]: destColumn,
      });
    }
  };

  const addTask = (task: Task) => {
    setColumns((prev) => ({
      ...prev,
      "To Do": [...prev["To Do"], task],
    }));
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div className="p-4 max-w-[90%] ">
      <Button onClick={() => setIsAddTaskDialogOpen(true)} className="mb-4">
        Add Task
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col gap-1 md:flex-row">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <div key={columnId} className="bg-secondary p-4 rounded-lg w-60">
              <h2 className="font-bold mb-4">{columnId}</h2>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px]"
                  >
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2"
                            onClick={() => handleTaskClick(task)}
                          >
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  {task.title}
                                </CardTitle>
                                <CardDescription>
                                  {task.description}
                                </CardDescription>
                                <div className="flex justify-between items-center mt-2">
                                  <Badge>{task.priority}</Badge>
                                  <span className="text-sm text-gray-500">
                                    {task.due_date ? new Date(task.due_date).toDateString() : "No Due Date"}
                                  </span>
                                </div>
                                <Badge variant="outline" className="mt-2">
                                  {task.category}
                                </Badge>
                              </CardHeader>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      <AddTaskDialog
        isOpen={isAddTaskDialogOpen}
        onClose={() => setIsAddTaskDialogOpen(false)}
        onAddTask={addTask}
      />
      <TaskDetailsDialog
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
      />
    </div>
  );
};

export default KanbanBoard;
