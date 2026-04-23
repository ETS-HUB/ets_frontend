import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const category = searchParams.get("category");
    const published = searchParams.get("published");

    const pageSize = limit ? parseInt(limit) : 10;
    const currentPage = page ? parseInt(page) : 1;
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (published === "true") {
      query = query.eq("published", true);
    }

    if (category) {
      query = query.eq("category", category);
    }

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch blogs" },
        { status: 500 },
      );
    }

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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
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
    const { title, content, excerpt, cover_image, category, tags, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const slug = generateSlug(title);

    const blogData = {
      title,
      slug,
      content,
      excerpt,
      cover_image,
      category,
      tags,
      published: published || false,
      published_at: published ? new Date().toISOString() : null,
      author_id: user.id,
    };

    const { data, error } = await supabase
      .from("blogs")
      .insert([blogData])
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create blog post" },
        { status: 500 },
      );
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}