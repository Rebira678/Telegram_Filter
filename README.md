# Telegram Filter

A small Telegram bot that monitors group chats and notifies users when messages contain their user-defined keywords.

## Features

- Add keywords per-user with `/add <keyword>`
- Alerts sent privately to users when a group message contains a keyword
- Simple in-memory storage (no external DB by default)

## Prerequisites

- Node.js (v14+ recommended)
- npm
- A Telegram bot token (create a bot via BotFather)

## Installation

1. Clone the repo:

```bash
git clone https://your-repo-url.git
cd telegram-filter
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with your bot token:

```env
BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

## Usage

Start the bot:

```bash
node index.js
```

Invite the bot to a group chat and use the following commands:

- `/start` — shows a short welcome message
- `/add <keyword>` — add a keyword to be monitored (e.g., `/add exam`)

When the bot detects a message in a group containing a subscribed keyword, it will send a private alert to the user who added that keyword.

Notes:

- The bot ignores private chats when scanning for keywords.
- Keywords are stored in memory and will be lost if the bot restarts. For production use, persist keywords in a database.

## Configuration & Deployment

- Consider adding a `start` script to `package.json` (e.g., `"start": "node index.js"`) and running the bot with a process manager like `pm2` or as a service.
- For production, replace in-memory storage with a persistent store (Redis, SQLite, etc.) and secure the `.env` file.

## License

This project uses the ISC license (see `package.json`).

## Contributing

Feel free to open issues or PRs. Suggested improvements:

- Persist keyword storage
- Add a command to list and remove keywords
- Add tests and CI
