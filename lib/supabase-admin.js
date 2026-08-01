// Server-only Supabase client for image uploads to Supabase Storage.
// Uses the SERVICE_ROLE key (bypasses Row Level Security), so this file
// must never be imported by a "use client" component — only by server
// actions / server components.

import { createClient } from "@supabase/supabase-js";

const BUCKET = "menu-images";

let _client = null;

function getClient() {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars. " +
        "Get both from Supabase: Project Settings -> API."
    );
  }

  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}

export async function uploadMenuImage(file) {
  const supabase = getClient();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`فشل رفع الصورة: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}
