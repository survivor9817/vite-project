export function getShamsiDateTime(date = new Date()) {
  const day = new Intl.DateTimeFormat("fa-IR", { weekday: "long" }).format(
    date
  );
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(
    date
  );
  const month = new Intl.DateTimeFormat("fa-IR", { month: "numeric" }).format(
    date
  );
  const dayNum = new Intl.DateTimeFormat("fa-IR", { day: "numeric" }).format(
    date
  );

  // ساعت و دقیقه
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const fullDate = `${day} ${year}/${month}/${dayNum} - ${hours}:${minutes}`;

  return {
    fullDate, // مثال: "پنج‌شنبه ۱۴۰۴/۵/۳۰ - 14:55"
    day, // نام روز هفته فارسی
    year, // سال شمسی
    month, // ماه شمسی
    dayNum, // روز شمسی
    hours, // ساعت (دو رقم)
    minutes, // دقیقه (دو رقم)
  };
}

// console.log(getShamsiDateTime());
