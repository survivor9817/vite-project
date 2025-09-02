export function toFaNums(englishNumber) {
  const persianNumberFormat = new Intl.NumberFormat("fa-IR");
  return persianNumberFormat.format(englishNumber);
}
