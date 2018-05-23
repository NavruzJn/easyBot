function main(msg, ctx, Extra) {
  ctx.editMessageText(
    msg,
    Extra.HTML().markup(m =>
      m.inlineKeyboard([
        [m.callbackButton("1⃣ Coin Toss Simulation", "exp1")],
        [m.callbackButton("2⃣ AVG distance simulation", "exp2")]
      ])
    )
  );
}

module.exports = { main };
