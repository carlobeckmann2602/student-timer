export const roundNumber = (number: string | number, defaultNumber = 0) =>
  Math.round(
    typeof number === "string" ? Number(number.replace(",", ".")) : number
  ) || defaultNumber;
