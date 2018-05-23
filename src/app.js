const Telegraf = require("telegraf");
const session = require("telegraf/session");
const { CUSTOMER_BOT_TOKEN } = require("./bot/BotConfig");

const { customerInit } = require("./bot/customer/main");

function startBot() {
  const customer = new Telegraf(CUSTOMER_BOT_TOKEN);
  customer.use(session());
  customerInit(customer);
  customer.startPolling();
}

module.exports = startBot;
