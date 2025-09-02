import { book } from "../book-section-js/bookApp.js";

export const options = {
  Where: book.fehrestArr.map((item) => {
    return {
      value: item.refTitle,
      text: item.refTitle,
    };
  }),
  Level: [
    { value: "0", text: "همه سطح‌ها" },
    { value: "1", text: "ساده" },
    { value: "2", text: "متوسط" },
    { value: "3", text: "سخت" },
  ],
  Source: [
    { value: "0", text: "همه منابع" },
    { value: "امتحان نهایی", text: "امتحان نهایی" },
    { value: "شبه نهایی", text: "شبه نهایی" },
    { value: "کنکور سراسری", text: "کنکور سراسری" },
    { value: "تیزهوشان", text: "تیزهوشان" },
    { value: "نمونه دولتی", text: "نمونه دولتی" },
    { value: "تألیفی", text: "تألیفی" },
  ],
};
