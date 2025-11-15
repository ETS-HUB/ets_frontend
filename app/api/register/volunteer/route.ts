import { NextRequest, NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase-service";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = createServiceClient();

  try {
    const body = await request.json();
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "university",
      "major",
      "year",
      "graduationDate",
      "department",
      "experienceLevel",
      "availability",
      "skills",
      "motivation",
      "terms",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const { data: existingApplication, error: checkError } = await supabase
      .from("volunteer_applications")
      .select("id")
      .eq("email", body.email)
      .maybeSingle();

    if (checkError) {
      console.error(checkError);
    }

    if (existingApplication) {
      return NextResponse.json(
        { error: "An application with this email already exists" },
        { status: 409 }
      );
    }

    const insertData = {
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      university: body.university,
      major: body.major,
      year: body.year,
      graduation_date: body.graduationDate,
      department: body.department,
      experience_level: body.experienceLevel,
      availability: body.availability,
      skills: body.skills,
      motivation: body.motivation,
      previous_experience: body.previousExperience || null,
      terms_accepted: body.terms,
    };

    const { data, error } = await supabase
      .from("volunteer_applications")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message || "Failed to submit application",
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

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
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from("volunteer_applications")
      .select("*", { count: "exact" })
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
