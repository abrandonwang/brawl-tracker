"use client"
import { useEffect, useRef } from "react"

const BLOBS = [
  { hue: 275, bx: 0.22, by: 0.34, ax: 0.13, ay: 0.11, fx: 0.28, fy: 0.22 },
  { hue: 205, bx: 0.76, by: 0.58, ax: 0.15, ay: 0.12, fx: 0.33, fy: 0.27 },
  { hue: 165, bx: 0.50, by: 0.18, ax: 0.12, ay: 0.10, fx: 0.37, fy: 0.31 },
  { hue: 335, bx: 0.14, by: 0.72, ax: 0.11, ay: 0.13, fx: 0.25, fy: 0.20 },
  { hue:  38, bx: 0.82, by: 0.24, ax: 0.14, ay: 0.10, fx: 0.41, fy: 0.34 },
]

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W >> 1
    canvas.height = H >> 1

    const hues = BLOBS.map(b => b.hue)
    let t = 0
    let animId: number

    function animate() {
      animId = requestAnimationFrame(animate)
      t += 0.005

      const cw = canvas.width
      const ch = canvas.height

      ctx.fillStyle = "hsl(230, 20%, 97%)"
      ctx.fillRect(0, 0, cw, ch)

      BLOBS.forEach((b, i) => {
        const px = b.bx + Math.sin(t * b.fx) * b.ax + Math.sin(t * b.fx * 2.3 + 1.2) * b.ax * 0.35
        const py = b.by + Math.cos(t * b.fy) * b.ay + Math.cos(t * b.fy * 1.7 + 0.8) * b.ay * 0.40

        const x = px * cw
        const y = py * ch
        const r = Math.min(cw, ch) * 0.55

        hues[i] = (hues[i] + 0.08) % 360
        const h = hues[i]

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
        grad.addColorStop(0,    `hsla(${h}, 70%, 68%, 0.70)`)
        grad.addColorStop(0.45, `hsla(${(h + 45) % 360}, 62%, 66%, 0.35)`)
        grad.addColorStop(1,    `hsla(${(h + 90) % 360}, 54%, 64%, 0)`)

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, cw, ch)
      })
    }

    animate()

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W >> 1
      canvas.height = H >> 1
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        filter: "blur(28px) saturate(160%) brightness(1.02)",
      }}
    />
  )
}
