"use client"

import React, { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CounterProps {
  target: number
  suffix?: string
  duration?: number
}

export function Counter({ target, suffix = "+", duration = 1.2 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * (target - startValue) + startValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className="font-heading font-extrabold text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-purple tracking-tight">
      {count}
      {suffix}
    </span>
  )
}
