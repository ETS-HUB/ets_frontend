import { NextRequest, NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase-service";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = createServiceClient();

  try {
    const body = await request.json();

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "location",
      "status",
      "institution",
      "fieldOfStudy",
      "experienceLevel",
      "interests",
      "goals",
      "bio",
      "referralSource",
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

    const { data: existingMember } = await supabase
      .from("community_members")
      .select("id")
      .eq("email", body.email)
      .maybeSingle();

    if (existingMember) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const insertData = {
      full_name: body.fullName,
      email: body.email,
      phone: body.phone,
      location: body.location,
      profile_photo_url: body.profilePhotoUrl || null,
      status: body.status,
      institution: body.institution,
      field_of_study: body.fieldOfStudy,
      experience_level: body.experienceLevel,
      interests: body.interests,
      goals: body.goals,
      bio: body.bio,
      linkedin: body.linkedin || null,
      github: body.github || null,
      twitter: body.twitter || null,
      portfolio: body.portfolio || null,
      referral_source: body.referralSource,
    };

    const { data, error } = await supabase
      .from("community_members")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message || "Failed to register member",
          details: error.details,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Welcome to the community! Check your email for next steps.",
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
      .from("community_members")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch community members" },
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
