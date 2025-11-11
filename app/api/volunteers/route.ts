import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// GET all volunteers with optional filtering and pagination
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const role = searchParams.get("role");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");

    // Pagination setup
    const pageSize = limit ? parseInt(limit) : 100;
    const currentPage = page ? parseInt(page) : 1;
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("volunteers")
      .select("*", { count: "exact" })
      .order("createdAt", { ascending: false });

    // Apply search filter
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,role.ilike.%${search}%,specialty.ilike.%${search}%`
      );
    }

    // Apply role filter
    if (role) {
      query = query.ilike("role", `%${role}%`);
    }

    // Apply pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch volunteers" },
        { status: 500 }
      );
    }

    // Return with pagination metadata if requested
    if (page || limit) {
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
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new volunteer
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// POST - Create new volunteer
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Generate slug from name
    const slug = generateSlug(body.name);

    // Check if slug already exists
    const { data: existingVolunteer } = await supabase
      .from("volunteers")
      .select("slug")
      .eq("slug", slug)
      .single();

    if (existingVolunteer) {
      return NextResponse.json(
        { error: "A volunteer with this name already exists" },
        { status: 409 }
      );
    }

    const volunteerData = {
      ...body,
      slug,
      appreciation_count: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("volunteers")
      .insert([volunteerData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create volunteer" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
