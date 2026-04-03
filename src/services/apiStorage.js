import { supabase } from "../utils/superbase";

export async function uploadAvatar(avatarFile) {
  const { data, error } = await supabase.storage
    .from("avatar")
    .upload("uploads/avater.png", avatarFile, {
      upsert: true,
    });

  if (error) {
    console.log(error.message);
    return;
  }
  return data;
}
