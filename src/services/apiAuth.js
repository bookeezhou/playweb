import { supabase } from "../utils/superbase";

export async function signup(email, password, metadata = {}) {
  console.log(metadata);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: `${email}-${Date.now()}`,
        avatar:
          "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
        ...metadata,
      },
    },
  });
  if (error) {
    console.log(error.message);
    return;
  }

  return data;
}

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error.message);
    return;
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error.message);
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function updateUser(newUserMetaData = {}) {
  const { data, error } = await supabase.auth.updateUser({
    data: newUserMetaData,
  });

  if (error) {
    console.log(error.message);
    return;
  }

  return data;
}
