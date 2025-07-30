import { isToday, isYesterday, subDays, parseISO, isAfter } from "date-fns"

export const isHoje = (data: string) => isToday(parseISO(data))
export const isOntem = (data: string) => isYesterday(parseISO(data))
export const isNosUltimos7Dias = (data: string) =>
  isAfter(parseISO(data), subDays(new Date(), 7))
