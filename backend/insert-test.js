require("dotenv").config();

const supabase = require("./supabase");

async function test() {
  const { data, error } = await supabase
    .from("users")
    .insert({
      github_id: "174495564",
      username: "muqeet475",
      access_token: "test-token",
    })
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);
}

test();