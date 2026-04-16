export function formatDate(d) {
  const day   = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year  = d.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatMoney(num) {
  const n = Math.round(num * 100) / 100
  if (n % 1 === 0) return n.toLocaleString('he-IL')
  return n.toFixed(2)
}

export function calcTotal(values, denoms) {
  return denoms.reduce((sum, d) => {
    const qty = parseFloat(values[d.key]) || 0
    return Math.round((sum + qty * d.value) * 100) / 100
  }, 0)
}

export function sanitizeQty(raw) {
  const s = raw.replace(/[^0-9]/g, '')
  return s === '' ? '' : String(parseInt(s, 10))
}
