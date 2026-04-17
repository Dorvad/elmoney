import { ALL_DENOMS, SMALL_CASH_DENOMS, ENVELOPE_DENOMS } from '../constants'
import { calcTotal, formatMoney, sanitizeQty } from '../utils'
import {
  ProgressIndicator, StepHeader, LiveSummaryStrip, NavButtons
} from './shared'

function allQtys(smallCash, envelopeCash) {
  const merged = {}
  ALL_DENOMS.forEach(d => {
    merged[d.key] = smallCash[d.key] ?? envelopeCash[d.key] ?? ''
  })
  return merged
}

export default function Step3ZReport({
  smallCash, envelopeCash, voucherCount,
  zAmount, onZChange, onBack, onNext,
}) {
  const envelopeTotal = calcTotal(envelopeCash, ENVELOPE_DENOMS)
  const zNum          = parseFloat(zAmount) || 0
  const hasZ          = zAmount !== '' && zAmount !== null
  const diff          = hasZ ? Math.round(Math.abs(envelopeTotal - zNum) * 100) / 100 : null
  const isMatch       = diff === 0

  const qtys = allQtys(smallCash, envelopeCash)

  return (
    <div className="step-screen">
      <div className="step-fixed-top">
        <ProgressIndicator step={3} />
        <StepHeader
          title='בדיקה מול דו"ח Z'
          instruction='הזינו את הנתונים למערכת ובדקו התאמה מול הדו"ח המודפס'
        />
        <LiveSummaryStrip
          smallCash={smallCash}
          envelopeCash={envelopeCash}
          zAmount={zAmount}
        />
      </div>

      <div className="step-scrollable">
        <div className="z-section-title">כל הספירות — להזנה למערכת</div>

        <div className="denom-summary-list">
          {ALL_DENOMS.map(d => {
            const qty     = parseFloat(qtys[d.key]) || 0
            const sub     = Math.round(qty * d.value * 100) / 100
            return (
              <div key={d.key} className={`denom-summary-row ${qty === 0 ? 'zero' : ''}`}>
                <img src={d.img} alt={d.label} className="denom-thumb" />
                <span className="denom-summary-label">{d.label}</span>
                <span className="denom-summary-qty">{qty > 0 ? qty : '–'}</span>
                <span className="denom-summary-sub">
                  {qty > 0 ? `${formatMoney(sub)} ₪` : ''}
                </span>
              </div>
            )
          })}
        </div>

        <div className="section-gap" />
        <div className="z-section-title">הזנת דו"ח Z</div>

        <div className="extra-field">
          <label className="extra-field-label" htmlFor="z-input">
            מזומן לפי דו"ח Z
          </label>
          <input
            id="z-input"
            className="extra-input"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={zAmount}
            onChange={e => onZChange(e.target.value)}
            placeholder="0.00"
          />
        </div>

        {hasZ && (
          <div className={`z-comparison ${isMatch ? 'match' : 'mismatch'}`}>
            <div className="z-comparison-icon">
              {isMatch ? '✅' : '⚠️'}
            </div>
            <div className="z-comparison-title">
              {isMatch
                ? 'יש התאמה בין הספירה לדו"ח Z'
                : 'אין התאמה בין הספירה לדו"ח Z'}
            </div>
            {!isMatch && (
              <>
                <div className="z-diff-amount">{formatMoney(diff)} ₪</div>
                <div className="z-comparison-hint">
                  מומלץ לבדוק שוב את הספירה או את ההזנה
                </div>
              </>
            )}
          </div>
        )}

        {voucherCount !== '' && parseInt(voucherCount) > 0 && (
          <div className="info-note">
            שוברים: <strong>{voucherCount}</strong> — לא נכללים בסכום המזומן
          </div>
        )}
      </div>

      <div className="step-fixed-bottom">
        <NavButtons onBack={onBack} onNext={onNext} />
      </div>
    </div>
  )
}
