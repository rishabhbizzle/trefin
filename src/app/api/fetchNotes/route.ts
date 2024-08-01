import { createClient } from "@/utils/supabase/server";

export async function GET(_: Request): Promise<Response> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

  if (!user?.email) {
    return new Response(JSON.stringify({
      message: "Unauthorized",
    }), {
      status: 401,
    });
  }

  const getResponse = await fetch(
    `${process.env.NEXT_WORKER_BASE_URL}?getAllFromUser=${user?.email}`,
    {
      method: "GET",
    },
  );

  if (getResponse.status !== 200) {
    return new Response("Failed to get", {
      status: 500,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await getResponse.json();

  // Convert it into a list instead of an object
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const keys = Object.keys(data);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const values = Object.values(data);

  // convert to list of [key, value] pairs
  const result = keys.map((key, index) => {
    return [key, values[index]];
  });

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}