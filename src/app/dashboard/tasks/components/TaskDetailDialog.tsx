import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task } from '../types';

interface TaskDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const TaskDetailsDialog: React.FC<TaskDetailsDialogProps> = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{task.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Due Date</h3>
            <p>{task.dueDate}</p>
          </div>
          <div>
            <h3 className="font-semibold">Priority</h3>
            <Badge>{task.priority}</Badge>
          </div>
          <div>
            <h3 className="font-semibold">Type</h3>
            <Badge variant="outline">{task.type}</Badge>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsDialog;