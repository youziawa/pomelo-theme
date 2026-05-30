/**
 * Pomelo Theme — Hexo Helpers
 */

hexo.extend.helper.register('wordcount', function (content) {
  if (!content) return 0
  // Strip HTML and count CJK characters + words
  const text = content.replace(/<[^>]*>/g, '')
  const cjk = (text.match(/[一-鿿㐀-䶿]/g) || []).length
  const words = (text.match(/[a-zA-Z0-9]+/g) || []).length
  return cjk + words
})
