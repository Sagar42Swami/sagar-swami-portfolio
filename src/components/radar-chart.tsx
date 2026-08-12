"use client"

import React, { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const labels = ["ML", "NLP", "APIs", "Data", "Testing", "Cloud"]
    const values = [82, 86, 88, 80, 84, 74]
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2 + 8
    const radius = 105

    const drawRadarChart = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = "700 12px var(--font-sans), sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const isDark = resolvedTheme === "dark"

      // Draw background ring shapes
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath()
        labels.forEach((_, index) => {
          const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2
          const ringRadius = (radius * ring) / 4
          const x = centerX + Math.cos(angle) * ringRadius
          const y = centerY + Math.sin(angle) * ringRadius
          if (index === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.closePath()
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"
        ctx.stroke()
      }

      // Draw web axis lines and label descriptions
      labels.forEach((label, index) => {
        const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
        ctx.strokeStyle = isDark ? "rgba(34, 211, 238, 0.12)" : "rgba(59, 130, 246, 0.1)"
        ctx.stroke()
        
        ctx.fillStyle = isDark ? "#94a3b8" : "#475569"
        ctx.fillText(
          label,
          centerX + Math.cos(angle) * (radius + 24),
          centerY + Math.sin(angle) * (radius + 24)
        )
      })

      // Create glowing gradient overlay for confidence poly-area
      const gradient = ctx.createLinearGradient(90, 70, 270, 230)
      if (isDark) {
        gradient.addColorStop(0, "rgba(34, 211, 238, 0.45)")
        gradient.addColorStop(1, "rgba(167, 139, 250, 0.45)")
      } else {
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.45)")
        gradient.addColorStop(1, "rgba(139, 92, 246, 0.45)")
      }

      ctx.beginPath()
      values.forEach((value, index) => {
        const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2
        const pointRadius = radius * (value / 100)
        const x = centerX + Math.cos(angle) * pointRadius
        const y = centerY + Math.sin(angle) * pointRadius
        if (index === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.strokeStyle = isDark ? "#22d3ee" : "#3b82f6"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    drawRadarChart()
  }, [resolvedTheme])

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <canvas
        ref={canvasRef}
        width={360}
        height={300}
        className="max-w-full h-auto aspect-[6/5]"
        aria-label="Radar chart displaying software and ML capabilities"
      />
    </div>
  )
}
