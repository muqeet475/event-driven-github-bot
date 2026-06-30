require("dotenv").config();

const supabase = require("./supabase");

async function test() {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    console.log("ERROR:", error);
  } else {
    console.log("SUCCESS:", data);
  }
}

test();