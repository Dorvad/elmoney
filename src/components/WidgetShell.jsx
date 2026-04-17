import { useState } from 'react'
import App from '../App'

export default function WidgetShell({ mode }) {
  const [open, setOpen] = useState(false)

  if (mode === 'inline') {
    return (
      <div className="ew-inline-wrap">
        <div className="ew-widget-mode">
          <App />
        </div>
      </div>
    )
  }

  // float mode
  return (
    <>
      <button
        className={`ew-trigger-btn${open ? ' ew-hidden' : ''}`}
        onClick={() => setOpen(true)}
        dir="rtl"
        aria-label="פתח סגירת קופה"
      >
        <span aria-hidden="true">🏧</span>
        <span>סגירת קופה</span>
      </button>

      {open && (
        <div
          className="ew-overlay"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
          role="dialog"
          aria-modal="true"
          aria-label="עוזר סגירת קופה"
        >
          <div className="ew-panel" dir="rtl">
            <button
              className="ew-close-btn"
              onClick={() => setOpen(false)}
              aria-label="סגור"
            >
              ✕
            </button>
            <div className="ew-panel-body ew-widget-mode">
              <App />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
