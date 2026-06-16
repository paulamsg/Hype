import { format, parseISO, isValid } from 'date-fns'
import { es } from 'date-fns/locale'

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
