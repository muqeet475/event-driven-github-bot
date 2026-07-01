require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const axios = require("axios");
const supabase = require("./supabase");


require("./config/passport");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Home Route
app.get("/", (req, res) => {
  res.send("GitHub Automation Bot Backend Running");
});

// GitHub Login Route
app.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);
// GitHub Callback Route
// GitHub Callback Route
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  async (req, res) => {
    try {
      // Debug logs
      console.log("=================================");
      console.log("GITHUB USER:");
      console.log("ID:", req.user.id);
      console.log("USERNAME:", req.user.username);
      console.log(
        "TOKEN:",
        req.user.accessToken
          ? req.user.accessToken.substring(0, 20) + "..."
          : "NO TOKEN"
      );
      console.log("=================================");

      const { data, error } = await supabase
        .from("users")
        .upsert(
          {
            github_id: String(req.user.id),
            username: req.user.username,
            access_token: req.user.accessToken,
          },
          {
            onConflict: "github_id",
          }
        )
        .select();

      console.log("SUPABASE DATA:", data);
      console.log("SUPABASE ERROR:", error);

      if (error) {
        return res.status(500).json(error);
      }

      res.send(`Welcome ${req.user.username}`);
    } catch (err) {
      console.log("SERVER ERROR:", err);
      res.status(500).send("Database error");
    }
  }
);

// Logged In User Profile Route
app.get("/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not logged in",
    });
  }

  res.json({
    id: req.user.id,
    username: req.user.username,
    displayName: req.user.displayName,
    profileUrl: req.user.profileUrl,
  });
});

// Get User Repositories
app.get("/repos", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const response = await axios.get(
      "https://api.github.com/user/repos",
      {
        headers: {
          Authorization: `token ${req.user.accessToken}`,
        },
      }
    );

    const repos = response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
    }));

    res.json(repos);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to fetch repositories",
    });
  }
});

// GitHub Webhook Endpoint
// GitHub Webhook Endpoint
app.post("/webhook/github", async (req, res) => {
  try {
    const event = req.headers["x-github-event"];

    console.log("=================================");
    console.log("GitHub Event Received");
   console.log("Event Type:", event);

if (event === "issues" && req.body.action === "opened") {
  console.log("BOT ACTION: New bug issue detected");

  if (req.body.issue.title.toLowerCase().includes("bug")) {
    console.log("BOT ACTION: Bug issue found");
  }
}

console.log("=================================");
    console.log("=================================");

    const { error } = await supabase
      .from("events")
      .insert({
        event_type: event,
        repository_name: req.body.repository?.full_name || "unknown",
        action: req.body.action || null,
        payload: req.body,
      });

    if (error) {
      console.log("Supabase Event Error:", error);
    }

    res.status(200).json({
      success: true,
      event: event,
    });
  } catch (err) {
    console.log("Webhook Error:", err);

    res.status(500).json({
      success: false,
    });
  }
}); 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});