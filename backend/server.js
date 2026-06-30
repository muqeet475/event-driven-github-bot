require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const axios = require("axios");

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
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.send(`Welcome ${req.user.username}`);
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
app.post("/webhook/github", (req, res) => {
  const event = req.headers["x-github-event"];

  console.log("=================================");
  console.log("GitHub Event Received");
  console.log("Event Type:", event);
  console.log("Payload:", req.body);
  console.log("=================================");

  res.status(200).json({
    message: "Webhook received",
    event: event,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});