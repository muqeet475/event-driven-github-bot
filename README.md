# 🚀 Event-Driven GitHub Automation Bot

## 📌 Project Overview

The Event-Driven GitHub Automation Bot is a full-stack automation platform that integrates GitHub OAuth authentication, GitHub Webhooks, GitHub API automation, Slack notifications, and Supabase database logging.

This application allows users to authenticate with their GitHub account, connect repositories, receive real-time GitHub events through webhooks, process those events automatically, perform actions on GitHub, notify Slack channels, and maintain a complete event history dashboard.

The project demonstrates real-world event-driven architecture, third-party API integrations, webhook processing, authentication flows, cloud deployment, and automation systems.

---

# 🎯 Problem Statement

Build and deploy a web application plus an automation bot that:

- Authenticates users using GitHub OAuth.
- Connects user-owned GitHub repositories.
- Receives GitHub webhook events.
- Processes repository events automatically.
- Writes back to GitHub using GitHub API.
- Sends notifications to Slack.
- Stores event history in a database.
- Displays event logs through a dashboard.

---

# ✅ Features Implemented

### 🔐 Authentication
- GitHub OAuth Login
- User session management
- Repository access authorization

### 🔔 GitHub Webhooks
The application receives and processes:

- Issues events
- Label events
- Issue opened events
- Bot-generated events

### 🤖 Automated GitHub Actions
When a new issue contains the keyword:

```
bug
```

the bot automatically:

- Detects the issue
- Adds a GitHub "bug" label
- Stores the event in Supabase
- Sends a Slack notification

### 💬 Slack Integration
Real-time Slack notifications are sent whenever:

- A bug issue is detected
- The automation bot performs an action

Example notification:

```
🚨 Bug detected in owner/repository:
bug: slack notification test
```

### 🗄 Database Logging
All events are stored in Supabase including:

- GitHub events
- Bot actions
- Repository information
- Event payloads
- Event timestamps

### 📊 Dashboard API
Event history can be retrieved through:

```
/events
```

which returns:

- Received GitHub events
- Bot actions
- Event payloads
- Repository information

---

# 🏗 System Architecture

```
GitHub Repository
        |
        V
GitHub Webhooks
        |
        V
Render Hosted Backend
        |
        +----------------+
        |                |
        V                V
GitHub API         Slack API
        |                |
        V                V
Add Label      Send Notification
        |
        V
Supabase Database
        |
        V
Dashboard Events API
```

---

# ⚙ Tech Stack

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Node.js
- Express.js

## Authentication
- GitHub OAuth
- Passport.js

## Database
- Supabase PostgreSQL

## APIs
- GitHub REST API
- GitHub Webhooks
- Slack Incoming Webhooks

## Deployment
- Render

---

# 📂 Project Structure

```
backend/
│
├── config/
│   └── passport.js
│
├── server.js
├── supabase.js
├── package.json
├── .env.example
└── README.md
```

---

# 🔑 Environment Variables

Create a `.env` file:

```env
PORT=5000

GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback

SESSION_SECRET=your_session_secret

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

GITHUB_PAT=your_github_personal_access_token

SLACK_WEBHOOK_URL=your_slack_webhook_url
```

---

# 🚀 Running Locally

Clone repository:

```bash
git clone <repository_url>
```

Move to project:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run server:

```bash
npm start
```

Server:

```
http://localhost:5000
```

---

# ☁ Deployment

The application is deployed using:

- Render
- Supabase
- GitHub OAuth
- Slack Incoming Webhooks

Deployment steps:

1. Push code to GitHub.
2. Create Render Web Service.
3. Add environment variables.
4. Configure GitHub OAuth.
5. Configure GitHub Webhooks.
6. Configure Slack Webhooks.
7. Deploy application.

---

# 📈 Implemented Workflow

1. User logs in using GitHub OAuth.
2. User connects repository.
3. GitHub sends webhook event.
4. Server receives event.
5. Bot checks issue title.
6. If issue contains "bug":
   - Add bug label.
   - Send Slack notification.
   - Store event in Supabase.
7. Dashboard logs event.

---

# 🔒 Security Considerations

- Secrets stored in environment variables.
- GitHub OAuth authentication.
- Session-based authentication.
- Database credentials protected.
- Public secrets never committed.
- API tokens secured through environment variables.

---

# 🌐 Live Deployment

Backend URL:

```
https://event-driven-github-bot.onrender.com
```

Events API:

```
https://event-driven-github-bot.onrender.com/events
```

---

# 👨‍💻 Author

**Abdul Muqeet Ansari**

B.Tech Computer Science and Engineering  
Galgotias University

---
# 📸 Project Screenshots

## GitHub OAuth Login

![GitHub Login](https://raw.githubusercontent.com/muqeet475/event-driven-github-bot/main/github-login.png)

---

## GitHub Issue With Automatic Bug Label

![Bug Label](https://raw.githubusercontent.com/muqeet475/event-driven-github-bot/main/github-bug-label.png)

---

## Slack Notification

![Slack Notification](https://raw.githubusercontent.com/muqeet475/event-driven-github-bot/main/slack-notification.png.png)

---

## Event Dashboard

![Events Dashboard](https://raw.githubusercontent.com/muqeet475/event-driven-github-bot/main/events-dashboard.png)
# 🎉 Project Status

✅ Completed  
✅ Fully Deployed  
✅ GitHub Automation Working  
✅ Slack Integration Working  
✅ Database Logging Working  
✅ Event Dashboard Working
