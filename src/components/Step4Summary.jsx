import { SMALL_CASH_DENOMS, ENVELOPE_DENOMS } from '../constants'
import { calcTotal, formatMoney } from '../utils'
import {
  ProgressIndicator, StepHeader, LiveSummaryStrip, NavButtons
} from './shared'
import EnvelopeCard from './EnvelopeCard'

function PaperBlock({ icon, title, children }) {
  return (
    <div className="paper-block">
      <div className="paper-block-header">
        <span className="paper-block-icon">{icon}</span>
        <span className="paper-block-title">{title}</span>
      </div>
      <div className="paper-rows">{children}</div>
    </div>
  )
}

function PaperRow({ label, children }) {
  return (
    <div className="paper-row">
      <span className="paper-row-label">{label}</span>
      {children}
    </div>
  )
}

function Val({ children, big }) {
  return (
    <span className={`paper-row-value ${big ? 'big' : ''}`}>{children}</span>
  )
}

export default function Step4Summary({
  date, smallCash, envelopeCash, zAmount, yesterdaySmallCash,
  onYesterdayChange, onBack, onNext,
}) {
  const smallTotal    = calcTotal(smallCash, SMALL_CASH_DENOMS)
  const envelopeTotal = calcTotal(envelopeCash, ENVELOPE_DENOMS)

  return (
    <div className="step-screen">
      <div className="step-fixed-top">
        <ProgressIndicator step={4} />
        <StepHeader
          title="סיכום לרישום"
          instruction="לפניכם כל מה שצריך לרשום על הפתק ועל המעטפה"
        />
        <LiveSummaryStrip
          smallCash={smallCash}
          envelopeCash={envelopeCash}
          zAmount={zAmount}
        />
      </div>

      <div className="step-scrollable">
        <PaperBlock icon="📋" title="לרישום על הפתק שבתוך הקופה">
          <PaperRow label="תאריך">
            <Val>{date}</Val>
          </PaperRow>
          <PaperRow label="כסף קטן">
            <Val big>{formatMoney(smallTotal)} ₪</Val>
          </PaperRow>
        </PaperBlock>

        <EnvelopeCard />

        <PaperBlock icon="✉️" title="לרישום על מעטפת המזומנים">
          <PaperRow label="כסף במעטפה">
            <Val big>{formatMoney(envelopeTotal)} ₪</Val>
          </PaperRow>
          <PaperRow label='מזומן לפי דו"ח Z'>
            <Val big>
              {zAmount !== '' ? `${formatMoney(parseFloat(zAmount) || 0)} ₪` : '—'}
            </Val>
          </PaperRow>
          <PaperRow label="כסף קטן בקופה כרגע">
            <Val>{formatMoney(smallTotal)} ₪</Val>
          </PaperRow>
          <PaperRow label="כסף קטן בקופה אתמול">
            <input
              className="paper-row-input"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={yesterdaySmallCash}
              onChange={e => onYesterdayChange(e.target.value)}
              placeholder="הזן סכום"
            />
          </PaperRow>
          <PaperRow label="תאריך">
            <Val>{date}</Val>
          </PaperRow>
          <PaperRow label="שם">
            <Val>
              <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                לרשום ידנית
              </span>
            </Val>
          </PaperRow>
        </PaperBlock>
      </div>

      <div className="step-fixed-bottom">
        <NavButtons onBack={onBack} onNext={onNext} />
      </div>
    </div>
  )
}
