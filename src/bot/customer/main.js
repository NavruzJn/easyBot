const { Extra, Markup } = require("telegraf");

const { main } = require("./widgets/menu");
const { experiment1, experiment2 } = require("./helpers/utils");
const df = require("date-fns");

function customerInit(bot) {
  bot.start(async ctx => {
    await ctx.reply(
      `Hi ${ctx.from.username}!\nI am a bot to help you with PaS term project!`,
      Extra.HTML().markup()
    );
    return ctx.reply(
      "Main menu:",
      Extra.HTML().markup(m =>
        m.inlineKeyboard([
          [m.callbackButton("1⃣ Coin Toss Simulation", "exp1")],
          [m.callbackButton("2⃣ AVG distance simulation", "exp2")]
        ])
      )
    );
  });

  bot.action("exp1", async ctx => {
    ctx.session.text = "experiment1";
    return (ctx.session.message = ctx.editMessageText(
      "Constants: p = 0.2, q = 0.8\n" + "Enter N (number of trials): ",
      Extra.HTML().markup(m =>
        m.inlineKeyboard([[m.callbackButton("◀ Main menu", "menu")]])
      )
    ));
  });

  bot.action("exp2", async ctx => {
    ctx.session.text = "experiment2";
    return (ctx.session.message = ctx.editMessageText(
      "Constants: L = 60\n" + "Enter N (number of trials): ",
      Extra.HTML().markup(m =>
        m.inlineKeyboard([[m.callbackButton("◀ Main menu", "menu")]])
      )
    ));
  });

  bot.on("text", async ctx => {
    const text = ctx.session.text;
    const n = ctx.message.text;
    switch (text) {
      case "experiment1":
          await ctx
          .reply("Calculating...", Extra.HTML().markup())
          .catch(err => {
            console.log(err);
          });
        const result1 = experiment1(n);
        return ctx.reply(
          `N: ${n}\n` +
            `Experiment Result: ${result1.success}\n` +
            `Theoretical: ${result1.theoretical}\n` +
            `Error: ${result1.error}`,
          Extra.HTML().markup(m =>
            m.inlineKeyboard([
              [m.callbackButton("🔃 Repeat experiment", "exp1")],
              [m.callbackButton("◀ Main menu", "menu")]
            ])
          )
        );
        break;
      case "experiment2":
          await ctx
              .reply("Calculating...", Extra.HTML().markup())
              .catch(err => {
                  console.log(err);
              });
          const result2 = experiment2(n);
          return ctx.reply(
              `N: ${n}\n` +
              `Experiment Result: ${result2.experimental}\n` +
              `Theoretical: ${result2.theoretical}\n` +
              `Error: ${result2.error}`,
              Extra.HTML().markup(m =>
                  m.inlineKeyboard([
                      [m.callbackButton("🔃 Repeat experiment", "exp2")],
                      [m.callbackButton("◀ Main menu", "menu")]
                  ])
              )
          );
          break;
        break;
      default:
        break;
    }
  });

  bot.action("menu", ctx => {
    ctx.session = {};
    main("Main menu:", ctx, Extra);
  });
}

module.exports = { customerInit };
