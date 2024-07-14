import React from "react";
import dynamic from "next/dynamic";
import { getUserTasks } from "@/lib/actions";
const KanbanBoard = dynamic(() => import("./components/KanbanBoard"), {
  ssr: false,
});

const Page = async () => {
  const { data: tasks, error } = await getUserTasks();
  if (error) {
    console.log(error);
  }

  if (!tasks) {
    return <div>Loading...</div>;
  }

  // restructure the data to match the format expected by the KanbanBoard component
  const columns = {
    "To Do": [],
    "In Progress": [],
    Done: [],
    "On Hold": [],
  };

  tasks.forEach((task) => {
    //@ts-ignore
    columns[task.type].push(task);
  });

  return (
    <div className="">
      <KanbanBoard columns={columns} />
    </div>
  );
};

export default Page;
