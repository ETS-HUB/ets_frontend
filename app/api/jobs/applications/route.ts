import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const offset = (page - 1) * limit;

    let query = supabase
      .from("job_applications")
      .select("*", { count: "exact" });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch applications" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
