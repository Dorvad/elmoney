import { useState, useCallback } from 'react'
import { formatDate } from './utils'
import { SMALL_CASH_DENOMS, ENVELOPE_DENOMS, CHECKLIST_ITEMS } from './constants'
import OpeningScreen from './components/OpeningScreen'
import Step1SmallCash from './components/Step1SmallCash'
import Step2EnvelopeCash from './components/Step2EnvelopeCash'
import Step3ZReport from './components/Step3ZReport'
import Step4Summary from './components/Step4Summary'
import Step5Checklist from './components/Step5Checklist'
import CompletionOverlay from './components/CompletionOverlay'

function makeEmptyQtys(denoms) {
  return Object.fromEntries(denoms.map(d => [d.key, '']))
}

function initialState() {
  return {
    step: 0,
    date: formatDate(new Date()),
    smallCash: makeEmptyQtys(SMALL_CASH_DENOMS),
    envelopeCash: makeEmptyQtys(ENVELOPE_DENOMS),
    voucherCount: '',
    zAmount: '',
    yesterdaySmallCash: '',
    checklist: Array(CHECKLIST_ITEMS.length).fill(false),
  }
}

export default function App() {
  const [state, setState] = useState(initialState)
  const [showCompletion, setShowCompletion] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  const update = useCallback((patch) => {
    setState(prev => ({ ...prev, ...patch }))
  }, [])

  const goStep = useCallback((n) => {
    setState(prev => ({ ...prev, step: n }))
    window.scrollTo(0, 0)
  }, [])

  function handleFinish() {
    setShowCompletion(true)
    setTimeout(() => {
      setState(initialState)
      setShowCompletion(false)
      setShowBanner(true)
      setTimeout(() => setShowBanner(false), 4000)
    }, 2200)
  }

  if (showCompletion) return <CompletionOverlay />

  const { step, date, smallCash, envelopeCash, voucherCount, zAmount, yesterdaySmallCash, checklist } = state

  if (step === 0) return (
    <OpeningScreen
      date={date}
      onDateChange={v => update({ date: v })}
      onStart={() => goStep(1)}
      showBanner={showBanner}
    />
  )

  if (step === 1) return (
    <Step1SmallCash
      smallCash={smallCash}
      onChange={patch => update({ smallCash: { ...smallCash, ...patch } })}
      onBack={() => goStep(0)}
      onNext={() => goStep(2)}
    />
  )

  if (step === 2) return (
    <Step2EnvelopeCash
      envelopeCash={envelopeCash}
      voucherCount={voucherCount}
      smallCash={smallCash}
      onChange={patch => update({ envelopeCash: { ...envelopeCash, ...patch } })}
      onVoucherChange={v => update({ voucherCount: v })}
      onBack={() => goStep(1)}
      onNext={() => goStep(3)}
    />
  )

  if (step === 3) return (
    <Step3ZReport
      smallCash={smallCash}
      envelopeCash={envelopeCash}
      voucherCount={voucherCount}
      zAmount={zAmount}
      onZChange={v => update({ zAmount: v })}
      onBack={() => goStep(2)}
      onNext={() => goStep(4)}
    />
  )

  if (step === 4) return (
    <Step4Summary
      date={date}
      smallCash={smallCash}
      envelopeCash={envelopeCash}
      zAmount={zAmount}
      yesterdaySmallCash={yesterdaySmallCash}
      onYesterdayChange={v => update({ yesterdaySmallCash: v })}
      onBack={() => goStep(3)}
      onNext={() => goStep(5)}
    />
  )

  if (step === 5) return (
    <Step5Checklist
      checklist={checklist}
      onToggle={i => {
        const next = [...checklist]
        next[i] = !next[i]
        update({ checklist: next })
      }}
      onBack={() => goStep(4)}
      onFinish={handleFinish}
    />
  )

  return null
}
