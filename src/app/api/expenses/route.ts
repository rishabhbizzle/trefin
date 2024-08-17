import { getUserExpenses } from "@/lib/actions";
import { createClient } from "@/utils/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')

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

  if (!date) {
    return new Response(JSON.stringify({
      message: "Date is required",
    }), {
      status: 400,
    });
  }


  const results = await getUserExpenses(date);

  return NextResponse.json({
    success: true,
    data: results,
    message: "Expenses fetched successfully",
}, { status: 200 })
}