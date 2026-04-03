import { createClient } from "@supabase/supabase-js";
import { getConfig } from "./configHelper";

const supabaseUrl = "https://oerxbsdydbpafjyhpyqu.supabase.co";
// const supabaseKey = "sb_publishable_hbYP7-FWqSzCon8imQUqFg_E2Khma4w";
const supabaseKey = getConfig("SUPABASE_KEY");
// console.log(supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
