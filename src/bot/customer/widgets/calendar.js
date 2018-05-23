const calend = require("node-calendar");

const monthName = [
  null,
  "ЯНВАРЬ",
  "ФЕВРАЛЬ",
  "МАРТ",
  "АПРЕЛЬ",
  "МАЙ",
  "ИЮНЬ",
  "ИЮЛЬ",
  "АВГУСТ",
  "СЕНТЯБРЬ",
  "ОКТЯБРЬ",
  "НОЯБРЬ",
  "ДЕКАБРЬ"
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function calendar(m, year, month, day) {
  const cl = new calend.Calendar(calendar.MONDAY);
  const yearCalendar = cl.monthdayscalendar(year, month);

  const keyboard = [];

  const nextMonth = parseInt(month, 10) + 1;
  const prevMonth = parseInt(month, 10) - 1;

  keyboard.push([
    m.callbackButton("◀️", `prevMonth.${prevMonth}`),
    m.callbackButton(monthName[month], "2"),
    m.callbackButton("▶️", `nextMonth.${nextMonth}`)
  ]);

  keyboard.push(weekDays.map(a => m.callbackButton(a, "1")));

  yearCalendar.map(a => {
    const z = [];
    a.filter(val => {
      if (val < day) {
        return z.push(m.callbackButton("·", "null"));
      }

      return z.push(
        m.callbackButton(
          val.toString(),
          `scheduled.${val}.${monthName[month]}.${month}.${year}`
        )
      );
    });
    return keyboard.push(z);
  });

  keyboard.push([m.callbackButton("⬅️ Назад", "back")]);

  return keyboard;
}

module.exports = { calendar };
