import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(
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

    const { data, error } = await query.single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch volunteer" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (body.name) {
      body.slug = generateSlug(body.name);
    }

    const volunteerData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("volunteers")
      .update(volunteerData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to update volunteer" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("volunteers")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete volunteer" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Volunteer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
