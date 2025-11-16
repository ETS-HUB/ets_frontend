import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { createClient } from "@/lib/supabase-server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const supabase = createServiceClient();

  try {
    const { slug } = await params;
    const body = await request.json();

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("id")
      .eq("slug", slug)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "location",
      "whyInterested",
      "resumeUrl",
      "coverLetter",
      "linkedin",
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

    const { data: existingApp } = await supabase
      .from("job_applications")
      .select("id")
      .eq("job_id", job.id)
      .eq("email", body.email)
      .maybeSingle();

    if (existingApp) {
      return NextResponse.json(
        { error: "You have already applied for this position" },
        { status: 409 }
      );
    }

    const insertData = {
      job_id: job.id,
      full_name: body.fullName,
      email: body.email,
      phone: body.phone,
      location: body.location,
      university: body.university || null,
      major: body.major || null,
      year_of_study: body.yearOfStudy || null,
      graduation_date: body.graduationDate || null,
      resume_url: body.resumeUrl || null,
      cover_letter: body.coverLetter || null,
      linkedin: body.linkedin || null,
      github: body.github || null,
      portfolio: body.portfolio || null,
      why_interested: body.whyInterested,
      relevant_experience: body.relevantExperience || null,
      status: "pending",
    };

    const { data, error } = await supabase
      .from("job_applications")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Application submitted successfully", data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("id")
      .eq("slug", slug)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const offset = (page - 1) * limit;

    let query = supabase
      .from("job_applications")
      .select("*", { count: "exact" })
      .eq("job_id", job.id);

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = createServiceClient();

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("id")
      .eq("slug", slug)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const { data: existingApp, error: checkError } = await supabase
      .from("job_applications")
      .select("id, job_id")
      .eq("id", id)
      .single();

    if (checkError || !existingApp) {
      return NextResponse.json(
        { error: "Application not found in database" },
        { status: 404 }
      );
    }

    if (existingApp.job_id !== job.id) {
      return NextResponse.json(
        { error: "Application does not belong to this job" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("job_applications")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Application not found after delete" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Application deleted successfully",
      data: data[0],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("jobs")
      .update({ is_active: body.is_active })
      .eq("slug", slug)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job status updated", data: data[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
