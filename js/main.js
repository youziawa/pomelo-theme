/**
 * Pomelo Theme — Main Script
 * Namespace: window.PT
 */
;(function () {
  'use strict'

  const PT = {
    // ── Init ──
    init() {
      this.initMobileMenu()
      this.initCodeCopy()
      this.initBackToTop()
      this.initReadingProgress()
      this.initFooterRuntime()
    },

    // ── Mobile Menu Toggle ──
    initMobileMenu() {
      const btn = document.querySelector('.pt-header__menu-btn')
      const nav = document.querySelector('.pt-mobile-nav')
      if (!btn || !nav) return

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true'
        btn.setAttribute('aria-expanded', !expanded)
        nav.setAttribute('aria-hidden', expanded)
      })
    },

    // ── Code Copy Button ──
    initCodeCopy() {
      document.querySelectorAll('.highlight, pre').forEach(function (block) {
        const btn = document.createElement('button')
        btn.className = 'code-copy-btn'
        btn.textContent = 'Copy'
        btn.addEventListener('click', function () {
          let code = ''
          // Try to get text from code lines
          const codeEl = block.querySelector('.code') || block.querySelector('code')
          if (codeEl) {
            code = codeEl.innerText
          } else {
            // Try table-style highlight
            const lines = block.querySelectorAll('.line, .code-line')
            code = Array.from(lines).map(l => l.textContent).join('\n')
          }
          if (!code) code = block.innerText

          navigator.clipboard.writeText(code).then(function () {
            btn.textContent = 'Copied!'
            btn.classList.add('copied')
            setTimeout(function () {
              btn.textContent = 'Copy'
              btn.classList.remove('copied')
            }, 2000)
          })
        })
        block.appendChild(btn)
      })
    },

    // ── Back to Top ──
    initBackToTop() {
      const btn = document.createElement('button')
      btn.className = 'pt-back-to-top pt-glass pt-glass--card'
      btn.setAttribute('aria-label', 'Back to top')
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>'

      btn.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:50;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;pointer-events:none;transition:opacity 250ms ease;'

      window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
          btn.style.opacity = '1'
          btn.style.pointerEvents = 'auto'
        } else {
          btn.style.opacity = '0'
          btn.style.pointerEvents = 'none'
        }
      })

      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })

      document.body.appendChild(btn)
    },

    // ── Reading Progress Bar ──
    initReadingProgress() {
      const bar = document.createElement('div')
      bar.className = 'pt-progress-bar'
      bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#00FFC8,#FF0088);z-index:30;transition:width 100ms linear;border-radius:0 1px 1px 0;'

      window.addEventListener('scroll', function () {
        const h = document.documentElement
        const scrollTop = h.scrollTop || document.body.scrollTop
        const scrollHeight = h.scrollHeight || document.body.scrollHeight
        const clientHeight = h.clientHeight
        const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100
        bar.style.width = Math.min(scrolled, 100) + '%'
      })

      document.body.appendChild(bar)
    },

    // ── Footer Runtime Counter ──
    initFooterRuntime() {
      const el = document.getElementById('pt-runtime')
      if (!el) return

      const sinceStr = el.dataset.since
      if (!sinceStr) return

      const since = new Date(sinceStr)
      function update() {
        const now = new Date()
        const diff = Math.floor((now - since) / 1000)
        const days = Math.floor(diff / 86400)
        const hours = Math.floor((diff % 86400) / 3600)
        const minutes = Math.floor((diff % 3600) / 60)
        const seconds = diff % 60
        el.textContent = 'Running: ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's'
      }

      update()
      setInterval(update, 1000)
    }
  }

  // ── Boot ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { PT.init() })
  } else {
    PT.init()
  }

  window.PT = PT
})()
