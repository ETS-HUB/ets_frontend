import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("blog_authors")
      .select("*")
      .order("display_name", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch authors" },
        { status: 500 }
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

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { user_id, display_name, avatar_url, bio, email } = body;

    if (!display_name || !display_name.trim()) {
      return NextResponse.json(
        { error: "Display name is required" },
        { status: 400 }
      );
    }

    const authorData = {
      user_id: user_id || user.id,
      display_name: display_name.trim(),
      avatar_url: avatar_url || null,
      bio: bio || null,
      email: email || null,
    };

    const { data, error } = await supabase
      .from("blog_authors")
      .insert([authorData])
      .select();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "An author profile already exists for this user" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Failed to create author" },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
