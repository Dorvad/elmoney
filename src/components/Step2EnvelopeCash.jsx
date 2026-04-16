import { useRef } from 'react'
import { ENVELOPE_DENOMS } from '../constants'
import { calcTotal, sanitizeQty } from '../utils'
import {
  ProgressIndicator, StepHeader, LiveSummaryStrip,
  DenominationRow, SectionTotal, NavButtons
} from './shared'

export default function Step2EnvelopeCash({
  envelopeCash, voucherCount, smallCash,
  onChange, onVoucherChange, onBack, onNext,
}) {
  const inputRefs = useRef([])
  const total = calcTotal(envelopeCash, ENVELOPE_DENOMS)

  function focusNext(i) {
    const next = inputRefs.current[i + 1]
    if (next) next.querySelector('input')?.focus()
  }

  return (
    <div className="step-screen">
      <div className="step-fixed-top">
        <ProgressIndicator step={2} />
        <StepHeader
          title="מזומן למעטפה"
          instruction="כעת ספרו רק את השטרות שנכנסים למעטפה"
        />
        <LiveSummaryStrip
          smallCash={smallCash}
          envelopeCash={envelopeCash}
          zAmount=""
        />
      </div>

      <div className="step-scrollable">
        {ENVELOPE_DENOMS.map((denom, i) => (
          <div
            key={denom.key}
            ref={el => { inputRefs.current[i] = el }}
          >
            <DenominationRow
              denom={denom}
              value={envelopeCash[denom.key]}
              onChange={v => onChange({ [denom.key]: v })}
              onNext={() => focusNext(i)}
              isLast={false}
            />
          </div>
        ))}

        <SectionTotal label='סה"כ מזומן למעטפה' amount={total} />

        <div className="section-gap" />

        <div className="extra-field">
          <label className="extra-field-label" htmlFor="voucher-input">
            מספר שוברים
          </label>
          <input
            id="voucher-input"
            className="extra-input"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min="0"
            value={voucherCount}
            onChange={e => onVoucherChange(sanitizeQty(e.target.value))}
            placeholder="0"
          />
        </div>
      </div>

      <div className="step-fixed-bottom">
        <NavButtons onBack={onBack} onNext={onNext} />
      </div>
    </div>
  )
}
