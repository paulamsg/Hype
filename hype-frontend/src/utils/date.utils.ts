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
