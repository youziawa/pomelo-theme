/**
 * Pomelo Theme — Particle Background
 * Canvas-based particle network effect
 */
;(function () {
  'use strict'

  const canvas = document.createElement('canvas')
  canvas.id = 'pt-particles'
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;'
  document.body.prepend(canvas)

  const ctx = canvas.getContext('2d')
  let particles = []
  let animId

  const config = {
    count: 60,
    color: '0, 255, 200',
    opacity: 0.3,
    lineWidth: 0.5,
    maxDist: 150,
    speed: 0.3,
    dotSize: 1.5
  }

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function create() {
    particles = []
    for (let i = 0; i < config.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed
      })
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // Move
      p.x += p.vx
      p.y += p.vy

      // Wrap edges
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      // Draw dot
      ctx.beginPath()
      ctx.arc(p.x, p.y, config.dotSize, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(' + config.color + ', ' + config.opacity + ')'
      ctx.fill()

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < config.maxDist) {
          const alpha = (1 - dist / config.maxDist) * config.opacity * 0.4
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = 'rgba(' + config.color + ', ' + alpha + ')'
          ctx.lineWidth = config.lineWidth
          ctx.stroke()
        }
      }
    }

    animId = requestAnimationFrame(draw)
  }

  resize()
  create()
  draw()

  window.addEventListener('resize', function () {
    resize()
    create()
  })
})()
