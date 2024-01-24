export const roundNumber = (number: string | number, defaultNumber = 0) =>
  Math.round(
    typeof number === "string" ? Number(number.replace(",", ".")) : number
  ) || defaultNumber;

export const validateNumber = (number: string | number, defaultNumber = 0) =>
  Math.abs(roundNumber(number, defaultNumber));

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delayMs: number
) => {
  let timeoutId: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delayMs);
  };
};
