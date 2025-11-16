import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { createClient } from "@/lib/supabase-server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const supabase = createServiceClient();

  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let query = supabase.from("jobs").select("*").eq("is_active", true);

    if (id) {
      query = query.eq("id", id);
    } else {
      query = query.eq("slug", slug);
    }

    const { data, error } = await query.single();

    if (error) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ data });
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

    const updateData = {
      title: body.title,
      company: body.company,
      company_logo: body.companyLogo || null,
      location: body.location,
      job_type: body.jobType,
      duration: body.duration || null,
      description: body.description,
      responsibilities: body.responsibilities || [],
      requirements: body.requirements || [],
      benefits: body.benefits || [],
      application_deadline: body.applicationDeadline || null,
    };

    const { data, error } = await supabase
      .from("jobs")
      .update(updateData)
      .eq("slug", slug)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Job updated successfully",
      data: data[0],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

export async function DELETE(
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

    const { error, count } = await supabase
      .from("jobs")
      .delete()
      .eq("slug", slug)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (count === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
