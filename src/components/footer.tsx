"use client"

import React from "react"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 py-8 bg-muted/20 text-center text-muted-foreground">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Sagar Swami | Software Engineer &amp; ML Engineer
        </p>
        <p className="text-xs text-muted-foreground/80">
          Designed &amp; Developed by Sagar Swami &bull; Built with Next.js 15 &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
