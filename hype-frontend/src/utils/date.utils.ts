import { format, parseISO, isValid, startOfDay, addDays, endOfWeek, endOfMonth } from 'date-fns'
import { es } from 'date-fns/locale'

export type DateFilterOption = 'all' | 'today' | 'weekend' | 'week' | 'month'

export const isEventInDateRange = (eventDate: string | undefined, option: string): boolean => {
  if (option === 'all' || !eventDate) return true

  const parsed = parseISO(eventDate)
  if (!isValid(parsed)) return true

  const event = startOfDay(parsed)
  const today = startOfDay(new Date())
  if (event < today) return false

  switch (option as DateFilterOption) {
    case 'today':
      return event.getTime() === today.getTime()
    case 'week':
      return event <= endOfWeek(today, { weekStartsOn: 1 })
    case 'weekend': {
      const day = today.getDay()
      const diffToSaturday = (6 - day + 7) % 7
      const saturday = addDays(today, diffToSaturday)
      const sunday = addDays(saturday, 1)
      return event >= saturday && event <= sunday
    }
    case 'month':
      return event <= endOfMonth(today)
    default:
      return true
  }
}

export const formatDate = (date?: string): string => {
  if (!date) return ''
  try {
    const parsed = parseISO(date)
    return isValid(parsed) ? format(parsed, 'dd/MM/yyyy') : date
  } catch {
    return date
  }
}

export const getDay = (date?: string): string => {
  if (!date) return ''
  try {
    const parsed = parseISO(date)
    return isValid(parsed) ? format(parsed, 'd') : ''
  } catch { return '' }
}

export const getMonthAbbr = (date?: string): string => {
  if (!date) return ''
  try {
    const parsed = parseISO(date)
    return isValid(parsed) ? format(parsed, 'MMM', { locale: es }) : ''
  } catch { return '' }
}

export const formatTime = (time?: string): string => {
  if (!time) return ''
  const match = time.match(/^(\d{2}:\d{2})/)
  return match ? `${match[1]}h` : time
}
