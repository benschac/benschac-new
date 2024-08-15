import { H1, Navigation, Spacer, Theme, YStack } from '.'
import React, { useState, useEffect, useRef } from 'react'
const isomorphicWindow: Window = typeof window === 'undefined' ? {} : window
function debounce(func: Function, wait: number) {
  let timeout: number
  return function (this: any, ...args: any[]) {
    const context = this
    clearTimeout(timeout)
    timeout = window.setTimeout(() => func.apply(context, args), wait)
  }
}

function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: isomorphicWindow.innerWidth,
    height: isomorphicWindow.innerHeight,
  })

  const debouncedHandleResize = debounce(() => {
    setDimensions({
      width: isomorphicWindow.innerWidth,
      height: isomorphicWindow.innerHeight,
    })
  }, 100)

  useEffect(() => {
    isomorphicWindow.addEventListener('resize', debouncedHandleResize)
    return () => isomorphicWindow.removeEventListener('resize', debouncedHandleResize)
  }, [])

  return dimensions
}

interface Line {
  x: number
  y: number
  rotation: number
  targetRotation: number
  color: string
}

export const ColorfulSVGPattern = (): JSX.Element => {
  const [lines, setLines] = useState<Line[]>([])
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1, y: -1 })
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number | null>(null)
  const { width, height } = useWindowDimensions()
  const lineLength = 2

  const generateColor = (): string => {
    const hue = Math.floor(Math.random() * 360)
    const saturation = Math.floor(Math.random() * 30) + 70 // 70-100%
    const lightness = Math.floor(Math.random() * 30) + 35 // 35-65%
    const alpha = 0.6 // Increase this value for more opacity (0.0 to 1.0)
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
  }

  useEffect(() => {
    const generateGrid = () => {
      const aspectRatio = width / (height * 0.7) // 70vh
      const gridSizeX = Math.ceil(60 * aspectRatio)
      const gridSizeY = 60
      const newLines: Line[] = []

      for (let x = 0; x < gridSizeX; x++) {
        for (let y = 0; y < gridSizeY; y++) {
          const centerX = (x + 0.5) * (100 / gridSizeX)
          const centerY = (y + 0.5) * (100 / gridSizeY)
          const isHorizontal = (x + y) % 2 === 0
          newLines.push({
            x: centerX,
            y: centerY,
            rotation: isHorizontal ? 0 : 90,
            targetRotation: isHorizontal ? 0 : 90,
            color: generateColor(),
          })
        }
      }
      setLines(newLines)
    }
    generateGrid()
  }, [width, height])

  useEffect(() => {
    const animate = () => {
      setLines((prevLines) =>
        prevLines.map((line) => {
          const dx = mousePos.x - line.x
          const dy = mousePos.y - line.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 10 // Max distance of effect

          let newTargetRotation = line.targetRotation

          if (distance < maxDistance && mousePos.x !== -1 && mousePos.y !== -1) {
            const angle = Math.atan2(dy, dx) * (180 / Math.PI)
            newTargetRotation = angle
          }

          // Smooth rotation towards target
          const rotationDiff = newTargetRotation - line.rotation
          const newRotation = line.rotation + rotationDiff * 0.1

          return {
            ...line,
            rotation: newRotation,
            targetRotation: newTargetRotation,
          }
        })
      )

      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos])

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: -1, y: -1 })
  }

  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '70vh' }}
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <defs>
        <radialGradient id="fade-out" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fade-mask">
          <rect width="100%" height="100%" fill="url(#fade-out)" />
        </mask>
      </defs>
      <g mask="url(#fade-mask)">
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x - (Math.cos((line.rotation * Math.PI) / 180) * lineLength) / 2}
            y1={line.y - (Math.sin((line.rotation * Math.PI) / 180) * lineLength) / 2}
            x2={line.x + (Math.cos((line.rotation * Math.PI) / 180) * lineLength) / 2}
            y2={line.y + (Math.sin((line.rotation * Math.PI) / 180) * lineLength) / 2}
            stroke={line.color}
            strokeWidth="0.2"
          />
        ))}
      </g>
    </svg>
  )
}

export function PostLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <YStack f={1}>
      <ColorfulSVGPattern />
      <Navigation />
      {children}
    </YStack>
  )
}
