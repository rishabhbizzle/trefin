"use server";

import { Task } from "@/app/dashboard/tasks/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTask(task: Task) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const createdTodo = await supabase
      .from("tasks")
      .insert({
        created_by: user.id,
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        priority: task.priority,
        category: task.category,
        type: task.type,
      })
      .single();

    return createdTodo;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getUserTasks = async () => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const tasks = await supabase
      .from("tasks")
      .select("*")
      .eq("created_by", user.id);

    return tasks;
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
};

export const updateTaskTypeByDrag = async (id, destination) => {
  try {

    console.log("id", id, "destination", destination);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }


    await supabase
    .from('tasks')
    .update({ type: destination })
    .eq('id', id)
    .select()
            

      revalidatePath("/dashboard/tasks");
  } catch (error) {
    console.log(error);
    return error;
  }
};
