import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { filename, bucket } = await req.json();

  const supabase = createServiceClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(filename);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const publicUrl = supabase.storage.from(bucket).getPublicUrl(filename).data.publicUrl;

  return NextResponse.json({ signedUrl: data.signedUrl, publicUrl });
}
