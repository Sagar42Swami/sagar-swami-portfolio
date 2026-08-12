"use client"

import React, { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = Math.floor(window.innerWidth * ratio)
      canvas.height = Math.floor(window.innerHeight * ratio)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const createParticles = () => {
      const count = Math.min(60, Math.max(20, Math.floor(window.innerWidth / 30)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      }))
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Theme-based colors
      const isDark = resolvedTheme === "dark"
      ctx.fillStyle = isDark ? "rgba(34, 211, 238, 0.5)" : "rgba(59, 130, 246, 0.4)"
      ctx.strokeStyle = isDark ? "rgba(167, 139, 250, 0.08)" : "rgba(167, 139, 250, 0.12)"

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        ctx.fill()

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance < 120) {
            ctx.globalAlpha = 1 - distance / 120
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      resizeCanvas()
      createParticles()
      drawParticles()
    }

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId)
      resizeCanvas()
      createParticles()
      drawParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-300"
      aria-hidden="true"
    />
  )
}
