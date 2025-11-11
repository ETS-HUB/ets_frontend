import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const search = searchParams.get("search");
    const tag = searchParams.get("tag");

    // Pagination setup
    const pageSize = limit ? parseInt(limit) : 10;
    const currentPage = page ? parseInt(page) : 1;
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    // Start building query
    let query = supabase
      .from("events")
      .select("*", { count: "exact" })
      .order("event_date", { ascending: true });

    // Filter by month if provided
    if (month) {
      const year = new Date().getFullYear();
      const monthIndex = new Date(Date.parse(month + " 1, " + year)).getMonth();
      const startDate = new Date(year, monthIndex, 1)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(year, monthIndex + 1, 0)
        .toISOString()
        .split("T")[0];

      query = query.gte("event_date", startDate).lte("event_date", endDate);
    }

    // Search functionality
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`
      );
    }

    // Filter by tag if provided
    if (tag) {
      query = query.contains("tags", [tag]);
    }

    // Apply pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch events" },
        { status: 500 }
      );
    }

    // Calculate pagination metadata
    const totalPages = count ? Math.ceil(count / pageSize) : 0;

    return NextResponse.json({
      data,
      pagination: {
        currentPage,
        pageSize,
        totalItems: count || 0,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Optional: Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { data, error } = await supabase
      .from("events")
      .insert([body])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create event" },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
