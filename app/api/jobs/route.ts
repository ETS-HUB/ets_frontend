import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const supabase = createServiceClient();

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const jobType = searchParams.get("jobType");
    const location = searchParams.get("location");
    const offset = (page - 1) * limit;

    let query = supabase.from("jobs").select("*", { count: "exact" });

    if (jobType && jobType !== "all") {
      query = query.eq("job_type", jobType);
    }
    if (location) {
      query = query.ilike("location", `%${location}%`);
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
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

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const requiredFields = [
      "title",
      "company",
      "location",
      "jobType",
      "description",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const { data: slugData } = await supabase.rpc("generate_job_slug", {
      job_title: body.title,
      company_name: body.company,
    });

    const insertData = {
      title: body.title,
      company: body.company,
      company_logo: body.companyLogo || null,
      location: body.location,
      job_type: body.jobType,
      duration: body.duration || null,
      description: body.description,
      program_details: body.programDetails || null,
      eligibility_criteria: body.eligibilityCriteria || null,
      responsibilities: body.responsibilities || [],
      requirements: body.requirements || [],
      benefits: body.benefits || [],
      application_deadline: body.applicationDeadline || null,
      slug: slugData,
      is_active: true,
    };

    const { data, error } = await supabase
      .from("jobs")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Job created successfully", data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
