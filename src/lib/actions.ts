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

export const updateTaskTypeByDrag = async (id: string, destination: string) => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    await supabase
      .from("tasks")
      .update({ type: destination })
      .eq("id", id)
      .select();

    revalidatePath("/dashboard/tasks");
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function createFinanceEntry(
  data: any,
  type: "expense" | "income"
) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    let result;
    let payload = {
      created_by: user.id,
      title: data.title,
      amount: data.amount,
      category: data.category,
      comment: data.comment,
      date: data.date,
    }
    if (type === "expense") {
      result = await supabase
        .from("expenses")
        .insert(payload)
        .single();
    } else {
      result = await supabase
        .from("incomes")
        .insert(payload)
        .single();
    }


    return { data: result, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export const getUserExpenses = async (date: string) => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const data = await supabase
      .from("expenses")
      .select("*")
      .eq("created_by", user.id)

    return { data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
};
