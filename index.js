const TelegramBot = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./option");
const token = "8929002883:AAESMiQu6nLHNqQCtLrAhsF8TG_yxMrEPbE";

const bot = new TelegramBot(token, { polling: true });

const obj = {}

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, "Kompyuter 0-9 gacha son o'yladi siz toping");
  const randomNumber = Math.floor(Math.random() * 10)
  obj[chatId] = randomNumber
  await bot.sendMessage(chatId, "0-9 gacha sonlardan birini yozing", gameOptions)
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
      return startGame(chatId);
    } else {
      return bot.sendMessage(chatId, "Nomalum buyruq");
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data == obj[chatId]) {
      await bot.sendSticker(
        chatId,
        "https://cdn.combot.online/foggypepe/webp/3xf09f90b8.webp",
      );
      return bot.sendMessage(chatId, "Tabriklaymiz siz topdingiz", againOptions);
    } else if (data === "/again") {
      return startGame(chatId);
    } else {
      await bot.sendSticker(
        chatId,
        "https://cdn.combot.online/foggypepe/webp/15xf09f90b8.webp",
      );
      await bot.sendMessage(chatId, `Noto'g'ri javob kompyuter o'ylagan son : ${obj[chatId]}`);
      return bot.sendMessage(chatId, "O'yin tugadi", againOptions);
    }
  })
}

bootstrap()