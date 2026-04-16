import { useRef } from 'react'
import { SMALL_CASH_DENOMS } from '../constants'
import { calcTotal } from '../utils'
import {
  ProgressIndicator, StepHeader, LiveSummaryStrip,
  DenominationRow, SectionTotal, NavButtons
} from './shared'

export default function Step1SmallCash({ smallCash, onChange, onBack, onNext }) {
  const inputRefs = useRef([])
  const total = calcTotal(smallCash, SMALL_CASH_DENOMS)

  function focusNext(i) {
    if (inputRefs.current[i + 1]) {
      inputRefs.current[i + 1].querySelector('input')?.focus()
    }
  }

  return (
    <div className="step-screen">
      <div className="step-fixed-top">
        <ProgressIndicator step={1} />
        <StepHeader
          title="כסף קטן בקופה"
          instruction="ספרו עכשיו רק את הכסף הקטן שנשאר בקופה"
        />
        <LiveSummaryStrip
          smallCash={smallCash}
          envelopeCash={{}}
          zAmount=""
        />
      </div>

      <div className="step-scrollable">
        {SMALL_CASH_DENOMS.map((denom, i) => (
          <div
            key={denom.key}
            ref={el => { inputRefs.current[i] = el }}
          >
            <DenominationRow
              denom={denom}
              value={smallCash[denom.key]}
              onChange={v => onChange({ [denom.key]: v })}
              onNext={() => focusNext(i)}
              isLast={i === SMALL_CASH_DENOMS.length - 1}
            />
          </div>
        ))}

        <SectionTotal label='סה"כ כסף קטן' amount={total} />
      </div>

      <div className="step-fixed-bottom">
        <NavButtons onBack={onBack} onNext={onNext} />
      </div>
    </div>
  )
}
