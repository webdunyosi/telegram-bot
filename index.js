const TelegramBot = require("node-telegram-bot-api");

const token = "8929002883:AAESMiQu6nLHNqQCtLrAhsF8TG_yxMrEPbE";

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: "start", description: "Botni ishga tushurish" },
  { command: "info", description: "Bot haqida ma'lumot" },
  { command: "game", description: "O'yin" },
]);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start") {
    return bot.sendMessage(
      chatId,
      `Salom ${msg.from?.first_name} botimizga xush kelibsiz`,
    );
  } else if (text === "/info") {
    await bot.sendSticker(
      chatId,
      "https://cdn.combot.online/foge_na_by_demybot/webp/3xe296abefb88f.webp",
    );
    await bot.sendPhoto(
      chatId,
      "https://cdn.combot.online/foge_na_by_demybot/webp/3xe296abefb88f.webp",
    );
    return bot.sendMessage(
      chatId,
      `Sizning ID ${msg.from?.id}, sizning ismingiz ${msg.from?.first_name}, sizning user nomingiz ${msg.from?.username}`,
    );
  } else {
    return bot.sendMessage(chatId, "Nomalum buyruq");
  }
});
