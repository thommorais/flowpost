import { type ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'

const padWithZeros = (n: number | string, width: number) => {
  const s = typeof n === 'number' ? String(n) : n
  const trimmed = s.trim()
  const isNegative = trimmed.startsWith('-')
  const sign = isNegative ? '-' : ''
  const absStr = isNegative ? trimmed.slice(1) : trimmed
  const padded = absStr.padStart(width, '0')

  return sign + padded
}

type AnimatedCountProps = ComponentPropsWithoutRef<'div'> & {
  number: number
  duration?: number
}

export const AnimatedCount = ({ number, duration = 1800, ...props }: AnimatedCountProps) => {
  const [displayValue, setDisplayValue] = useState(number)
  const previousValueRef = useRef(number)
  const rafRef = useRef<number>(null)
  const startTimeRef = useRef<number>(null)

  useEffect(() => {
    if (number === previousValueRef.current) {
      return
    }

    const startValue = Number.isNaN(previousValueRef.current) ? 0 : previousValueRef.current
    const endValue = number
    const difference = endValue - startValue

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuad = 1 - (1 - progress) ** 2
      const currentValue = startValue + difference * easeOutQuad

      setDisplayValue(Math.round(currentValue))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        previousValueRef.current = endValue
        startTimeRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [number, duration])

  return <div {...props}>{padWithZeros(displayValue, String(number).length)}</div>
}
