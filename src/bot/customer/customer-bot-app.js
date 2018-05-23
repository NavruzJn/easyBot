const Telegraf = require("telegraf");
const { init } = require("./main");

function startCustomer() {
  const bot = new Telegraf(CUSTOMER_BOT_TOKEN);

  bot.use(session.middleware());

  init(bot);

  bot.startPolling();
}

module.exports = { startCustomer };
