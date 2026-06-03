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
      this.initGitHubWidget()
      this.initGalleryLightbox()
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
      // Only target outermost containers — NOT nested pre inside .highlight
      document.querySelectorAll('.pt-post__content .highlight, .pt-post__content > pre').forEach(function (block) {
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

    // ── Gallery Lightbox ──
    initGalleryLightbox() {
      const lightbox = document.getElementById('pt-lightbox')
      const img = document.getElementById('pt-lightbox-img')
      const caption = document.getElementById('pt-lightbox-caption')
      const prevBtn = lightbox && lightbox.querySelector('.pt-lightbox__prev')
      const nextBtn = lightbox && lightbox.querySelector('.pt-lightbox__next')
      const closeBtn = lightbox && lightbox.querySelector('.pt-lightbox__close')

      if (!lightbox || !img) return

      let items = []
      let currentIdx = 0

      function show(idx) {
        currentIdx = idx
        var item = items[currentIdx]
        img.src = item.href
        img.alt = item.dataset.caption || ''
        caption.textContent = item.dataset.caption || ''
        lightbox.setAttribute('aria-hidden', 'false')
        if (prevBtn) prevBtn.style.display = currentIdx > 0 ? '' : 'none'
        if (nextBtn) nextBtn.style.display = currentIdx < items.length - 1 ? '' : 'none'
      }

      // Collect gallery items
      items = Array.from(document.querySelectorAll('.pt-gallery-item'))

      items.forEach(function (item, i) {
        item.addEventListener('click', function (e) {
          e.preventDefault()
          show(i)
        })
      })

      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          lightbox.setAttribute('aria-hidden', 'true')
        })
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
          e.stopPropagation()
          if (currentIdx > 0) show(currentIdx - 1)
        })
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
          e.stopPropagation()
          if (currentIdx < items.length - 1) show(currentIdx + 1)
        })
      }

      // Close on background click
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) lightbox.setAttribute('aria-hidden', 'true')
      })

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
          lightbox.setAttribute('aria-hidden', 'true')
        }
        if (e.key === 'ArrowLeft' && lightbox.getAttribute('aria-hidden') === 'false' && currentIdx > 0) {
          show(currentIdx - 1)
        }
        if (e.key === 'ArrowRight' && lightbox.getAttribute('aria-hidden') === 'false' && currentIdx < items.length - 1) {
          show(currentIdx + 1)
        }
      })
    },

    // ── GitHub Status Widget ──
    initGitHubWidget() {
      const widget = document.querySelector('.pt-widget--github')
      if (!widget) return

      const username = widget.dataset.githubUser
      if (!username) return

      const content = widget.querySelector('.pt-widget__content')
      if (!content) return

      // Show loading
      content.innerHTML = '<p class="pt-text-sm" style="color:#9A9AB0">Loading...</p>'

      // Fetch user profile
      fetch('https://api.github.com/users/' + encodeURIComponent(username))
        .then(function (res) {
          if (!res.ok) throw new Error('GitHub API error: ' + res.status)
          return res.json()
        })
        .then(function (user) {
          var stats = [
            { label: 'Repos', value: user.public_repos },
            { label: 'Followers', value: user.followers },
            { label: 'Following', value: user.following },
            { label: 'Gists', value: user.public_gists }
          ]

          var html = ''
          // Avatar + name
          html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">'
          html += '<img src="' + user.avatar_url + '" alt="" style="width:48px;height:48px;border-radius:50%;border:2px solid rgba(0,255,200,0.2)" loading="lazy">'
          html += '<div>'
          html += '<a href="https://github.com/' + user.login + '" target="_blank" rel="noopener" style="color:#00FFC8;font-weight:600;text-decoration:none;font-size:15px">@' + user.login + '</a>'
          if (user.bio) {
            html += '<p style="font-size:12px;color:#9A9AB0;margin-top:2px">' + user.bio + '</p>'
          }
          html += '</div></div>'

          // Stats grid
          html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">'
          stats.forEach(function (s) {
            html += '<div style="background:rgba(255,255,255,0.03);border-radius:8px;padding:8px;text-align:center">'
            html += '<div style="font-size:18px;font-weight:700;color:#00FFC8">' + (s.value || 0) + '</div>'
            html += '<div style="font-size:11px;color:#5A5A6E">' + s.label + '</div>'
            html += '</div>'
          })
          html += '</div>'

          content.innerHTML = html
        })
        .catch(function (err) {
          console.error('GitHub widget error:', err)
          content.innerHTML = '<p class="pt-text-sm" style="color:#5A5A6E">Could not load GitHub data.</p>'
        })
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
