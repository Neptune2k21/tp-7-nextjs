import { useCallback } from 'react'

export function useFormattedDuration(durationInMinutes: number): string {
  const formatDuration = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours.toString().padStart(2, '0')}h${remainingMinutes.toString().padStart(2, '0')}`
  }, [])

  return formatDuration(durationInMinutes)
}

