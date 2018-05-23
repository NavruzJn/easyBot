const Telegraf = require("telegraf");
const debug = require("debug");

function botLoader(token, middlewares) {
  const bot = new Telegraf(token);

  bot.startPolling();
}

module.exports = { botLoader };
