require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// In-memory keyword storage
const userKeywords = {};

// Start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "👋 Welcome!\n\nUse:\n/add exam\n/add deadline\n\nI’ll alert you when important messages appear."
  );
});

// Add keyword command
bot.onText(/\/add (.+)/, (msg, match) => {
  const userId = msg.from.id;
  const keyword = match[1].toLowerCase();

  if (!userKeywords[userId]) {
    userKeywords[userId] = [];
  }

  userKeywords[userId].push(keyword);

  bot.sendMessage(msg.chat.id, `✅ Added keyword: *${keyword}*`, {
    parse_mode: "Markdown",
  });
});

// Listen to all messages (only one listener)
bot.on("message", (msg) => {
  // Debug: show incoming messages
  console.log(
    "MESSAGE RECEIVED:",
    msg.text,
    "| chat type:",
    msg.chat.type
  );

  // Ignore private messages
  if (!msg.text || msg.chat.type === "private") return;

  const text = msg.text.toLowerCase();

  for (const userId in userKeywords) {
    const keywords = userKeywords[userId];

    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        bot.sendMessage(
          userId,
          `🔔 *Important message detected*\n\n📍 Group: ${msg.chat.title}\n📝 Message:\n${msg.text}`,
          { parse_mode: "Markdown" }
        );
        return; // prevent duplicate alerts
      }
    }
  }
});

console.log("🤖 Telegram Filter Bot is running...");
