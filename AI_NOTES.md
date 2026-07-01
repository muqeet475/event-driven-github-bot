# AI_NOTES.md

# AI Tools Used

During the development of this project, I used ChatGPT (OpenAI GPT models) as my primary AI assistant throughout the software development lifecycle.

The AI assistant was used for:

- System design discussions
- API integration guidance
- Debugging assistance
- GitHub OAuth implementation
- GitHub Webhook implementation
- Slack integration
- Supabase integration
- Deployment troubleshooting
- Documentation generation
- Code review and optimization

The final implementation, deployment, testing, debugging, and integration decisions were performed and verified manually.

---

# Work Distribution Between Me and AI

## Tasks completed primarily by me

- GitHub repository setup
- Supabase project creation
- Slack workspace creation
- Slack application creation
- Render deployment setup
- GitHub OAuth configuration
- GitHub webhook configuration
- Environment variable management
- Manual debugging and testing
- Final deployment verification
- End-to-end testing

## Tasks assisted by AI

- Express.js route generation
- Passport.js authentication setup
- Webhook event handling logic
- GitHub API integration examples
- Slack webhook integration examples
- Documentation writing
- Error troubleshooting
- Architecture recommendations

---

# Key Technical Decisions Made

## Decision 1: Using Supabase

I selected Supabase because it provides a free PostgreSQL database, a simple JavaScript SDK, and excellent integration with Node.js applications.

## Decision 2: Using Render

I selected Render because GitHub OAuth callbacks and GitHub webhooks require a publicly accessible deployment URL. Render provides a free deployment platform suitable for webhook-based applications.

## Decision 3: Using Slack Incoming Webhooks

I selected Slack Incoming Webhooks because they provide a simple and reliable notification mechanism without requiring a complex Slack bot implementation.

---

# Hardest Bug Encountered

The most difficult problem encountered during development was implementing automatic GitHub issue labeling.

Initially, webhook events were being received correctly, but the GitHub API was not applying labels to newly created issues.

The issue was caused by incorrect authentication handling and GitHub API permissions.

The problem was identified by:

- Inspecting Render deployment logs
- Testing GitHub Personal Access Token permissions
- Verifying GitHub REST API endpoints
- Testing webhook payloads

The final solution involved:

- Creating a GitHub Personal Access Token
- Adding the token securely through Render environment variables
- Using the GitHub Issues Labels API endpoint
- Adding proper authentication headers

After implementing these changes, automatic labeling worked successfully.

---

# Improvements With More Time

If additional time were available, I would implement:

- Configurable automation rules
- AI-based issue summarization
- AI-based issue prioritization
- Multi-repository support
- Retry and failure queues
- Structured logging
- Dashboard frontend UI
- GitHub App authentication
- Event replay protection
- Duplicate event prevention

---

# AI Collaboration Reflection

This project demonstrated that AI tools are most effective when used as collaborative assistants rather than automatic code generators.

The development process required:

- Manual verification
- Debugging
- Architecture decisions
- Testing
- Integration validation
- Deployment troubleshooting

AI significantly accelerated development, but successful completion depended on understanding and validating every component of the system.
