const TelegramBot = require("node-telegram-bot-api");

const token = "8929002883:AAESMiQu6nLHNqQCtLrAhsF8TG_yxMrEPbE";

const bot = new TelegramBot(token, { polling: true });

const obj = {}

const gameOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "1", callback_data: "1" },
      { text: "2", callback_data: "2" },
      { text: "3", callback_data: "3" }],
      [{ text: "4", callback_data: "4" },
      { text: "5", callback_data: "5" },
      { text: "6", callback_data: "6" }],
      [{ text: "7", callback_data: "7" },
      { text: "8", callback_data: "8" },
      { text: "9", callback_data: "9" }]
    ]
  }
}

const bootstrap = () => {
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
    } else if (text === "/game") {
      await bot.sendMessage(chatId, "Kompyuter 1 xonali son o'yladi siz toping");
      const randomNumber = Math.floor(Math.random() * 10)
      obj[chatId] = randomNumber
      return bot.sendMessage(chatId, "1-9 gacha sonlardan birini yozing", gameOptions)
    } else {
      return bot.sendMessage(chatId, "Nomalum buyruq");
    }
  });
}

bootstrap()

