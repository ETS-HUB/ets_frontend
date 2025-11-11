import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// POST - Increment appreciation count
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = await createClient();

    // Check if id is a number (ID) or string (slug)
    const isNumeric = /^\d+$/.test(id);

    // First, get the current volunteer
    let query = supabase.from("volunteers").select("*");

    if (isNumeric) {
      query = query.eq("id", id);
    } else {
      query = query.eq("slug", id);
    }

    const { data: volunteer, error: fetchError } = await query.single();

    if (fetchError || !volunteer) {
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404 }
      );
    }

    // Increment appreciation count
    const newCount = (volunteer.appreciation_count || 0) + 1;

    const { data, error } = await supabase
      .from("volunteers")
      .update({
        appreciation_count: newCount,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", volunteer.id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        appreciation_count: data.appreciation_count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
