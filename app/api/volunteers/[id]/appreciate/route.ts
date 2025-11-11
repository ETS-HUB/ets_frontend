import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = await createClient();

    const isNumeric = /^\d+$/.test(id);

    let query = supabase.from("volunteers").select("*");

    if (isNumeric) {
      query = query.eq("id", id);
    } else {
      query = query.eq("slug", id);
    }

    const { data: volunteer, error: fetchError } = await query
      .limit(1)
      .maybeSingle();

    if (fetchError || !volunteer) {
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404 }
      );
    }

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
      return NextResponse.json({ error: error.message }, { status: 500 });
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
