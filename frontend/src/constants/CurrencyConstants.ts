import currency from "currency.js";

export const RUB = (value: string) => currency(value, { symbol: '₽'});