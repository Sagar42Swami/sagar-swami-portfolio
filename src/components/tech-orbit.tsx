"use client"

import React from "react"
import { motion } from "framer-motion"

interface OrbitItem {
  name: string
  color: string
  animationClass: string
}

export function TechOrbit() {
  const items: OrbitItem[] = [
    { name: "React", color: "from-cyan-400 to-blue-500", animationClass: "animate-orbit-1" },
    { name: "Java", color: "from-red-500 to-orange-600", animationClass: "animate-orbit-2" },
    { name: "Python", color: "from-blue-400 to-yellow-500", animationClass: "animate-orbit-3" },
    { name: "AI / ML", color: "from-emerald-400 to-cyan-500", animationClass: "animate-orbit-4" },
    { name: "Spring Boot", color: "from-green-500 to-emerald-600", animationClass: "animate-orbit-5" },
  ]

  return (
    <div className="relative flex items-center justify-center w-72 h-72 lg:w-96 lg:h-96 mx-auto">
      {/* Central Core Sphere */}
      <motion.div
        className="absolute w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden border border-border bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center shadow-lg shadow-brand-cyan/20 z-10"
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 20px 0px rgba(34, 211, 238, 0.2)",
            "0 0 35px 8px rgba(34, 211, 238, 0.4)",
            "0 0 20px 0px rgba(34, 211, 238, 0.2)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img 
          src="/profile.jpg" 
          alt="Sagar Swami" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Orbit Rings */}
      <div className="absolute w-[220px] h-[220px] rounded-full border border-dashed border-border pointer-events-none" />
      <div className="absolute w-[220px] h-[220px] rounded-full border border-dashed border-brand-cyan/10 pointer-events-none animate-spin" style={{ animationDuration: '40s' }} />

      {/* Orbiting Elements */}
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`absolute flex items-center justify-center ${item.animationClass}`}
        >
          <motion.div
            className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.color} shadow-md whitespace-nowrap cursor-pointer select-none`}
            whileHover={{ scale: 1.15, zIndex: 20 }}
          >
            {item.name}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
