require("dotenv").config();

const debug = require("debug");

debug.enable("app:*");

const startBot = require("./app");

startBot();

process.on("unhandledRejection", e => {
  console.log(e);
});

process.on("uncaughtException", e => {
  console.log(e);
});
