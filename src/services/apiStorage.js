import { getConfig } from "../utils/configHelper";
import { supabase } from "../utils/superbase";
import { updateUser } from "./apiAuth";

export async function uploadAvatar(avatarFile) {
  const token = getConfig("SUPABASE_TOKEN");
  const supabaseUrl = getConfig("SUPABASE_URL");
  const userToken = JSON.parse(localStorage.getItem(token));

  const avatarFileName = `${userToken.user.email}-${Date.now()}.png`;
  console.log(avatarFileName);

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(`uploads/${avatarFileName}`, avatarFile, {
      upsert: true,
    });

  if (error) {
    console.log(error.message);
    return;
  }

  const newAvatarUrl = `${supabaseUrl}/storage/v1/object/public/avatar/uploads/${avatarFileName}`;
  const newUserMetaData = await updateUser({ avatar: newAvatarUrl });

  return newUserMetaData;
}
