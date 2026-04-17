import { useRef } from 'react'
import { formatMoney, sanitizeQty, calcTotal } from '../utils'
import { SMALL_CASH_DENOMS, ENVELOPE_DENOMS } from '../constants'

/* ── Progress Indicator ──────────────────────────────── */
export function ProgressIndicator({ step }) {
  const total = 5
  return (
    <div className="progress-bar">
      {Array.from({ length: total }).map((_, i) => {
        const num = i + 1
        const done   = num < step
        const active = num === step
        return (
          <div className="prog-seg" key={i}>
            <div className={`prog-dot ${done ? 'done' : active ? 'active' : ''}`} />
            {i < total - 1 && (
              <div className={`prog-line ${done ? 'done' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Step Header ─────────────────────────────────────── */
export function StepHeader({ title, instruction }) {
  return (
    <div className="step-header">
      <div className="step-title">{title}</div>
      <div className="step-instruction">{instruction}</div>
    </div>
  )
}

/* ── Live Summary Strip ──────────────────────────────── */
export function LiveSummaryStrip({ smallCash, envelopeCash, zAmount }) {
  const smallTotal    = calcTotal(smallCash, SMALL_CASH_DENOMS)
  const envelopeTotal = calcTotal(envelopeCash, ENVELOPE_DENOMS)
  const zNum          = parseFloat(zAmount) || 0
  const hasZ          = zAmount !== '' && zAmount !== null
  const diff          = hasZ ? Math.round(Math.abs(envelopeTotal - zNum) * 100) / 100 : null

  let diffClass = ''
  if (diff !== null) diffClass = diff === 0 ? 'success' : 'warn'

  return (
    <div className="summary-strip">
      <div className="strip-item">
        <span className="strip-label">כסף קטן</span>
        <span className="strip-value">
          {smallTotal > 0 ? `${formatMoney(smallTotal)} ₪` : '–'}
        </span>
      </div>
      <div className="strip-sep" />
      <div className="strip-item">
        <span className="strip-label">מעטפה</span>
        <span className="strip-value">
          {envelopeTotal > 0 ? `${formatMoney(envelopeTotal)} ₪` : '–'}
        </span>
      </div>
      <div className="strip-sep" />
      <div className="strip-item">
        <span className="strip-label">פער Z</span>
        <span className={`strip-value ${diffClass}`}>
          {diff === null ? '–' : diff === 0 ? '✓' : `${formatMoney(diff)} ₪`}
        </span>
      </div>
    </div>
  )
}

/* ── Denomination Row ────────────────────────────────── */
export function DenominationRow({ denom, value, onChange, onNext, isLast }) {
  const inputRef = useRef(null)
  const qty      = parseFloat(value) || 0
  const subtotal = Math.round(qty * denom.value * 100) / 100

  function handleChange(e) {
    onChange(sanitizeQty(e.target.value))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Next') {
      e.preventDefault()
      if (!isLast && onNext) onNext()
    }
  }

  return (
    <div className="denom-row">
      <div className="denom-img-wrap">
        <img src={denom.img} alt={denom.label} className="denom-img" />
      </div>
      <div className="denom-info">
        <span className="denom-label">{denom.label}</span>
        <span className={`denom-subtotal ${qty === 0 ? 'zero' : ''}`}>
          {qty === 0 ? '–' : `${formatMoney(subtotal)} ₪`}
        </span>
      </div>
      <div className="denom-input-wrap">
        <span className="denom-qty-label">כמות</span>
        <input
          ref={inputRef}
          className="denom-input"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="0"
          enterKeyHint={isLast ? 'done' : 'next'}
        />
      </div>
    </div>
  )
}

/* ── Section Total ───────────────────────────────────── */
export function SectionTotal({ label, amount }) {
  return (
    <div className="section-total">
      <span className="section-total-label">{label}</span>
      <span className="section-total-value">
        <span className="currency">₪</span>
        {formatMoney(amount)}
      </span>
    </div>
  )
}

/* ── Nav Buttons ─────────────────────────────────────── */
export function NavButtons({ onBack, onNext, nextLabel = 'המשך', nextClass = 'btn-next' }) {
  return (
    <div className="nav-buttons">
      <button className="btn-back" onClick={onBack}>חזור</button>
      <button className={nextClass} onClick={onNext}>{nextLabel}</button>
    </div>
  )
}
