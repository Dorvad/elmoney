import envBack from '../../Env_back.png'
import { CHECKLIST_ITEMS } from '../constants'
import { ProgressIndicator, StepHeader, NavButtons } from './shared'

export default function Step5Checklist({ checklist, onToggle, onBack, onFinish }) {
  const doneCount = checklist.filter(Boolean).length
  const allDone   = doneCount === CHECKLIST_ITEMS.length

  return (
    <div className="step-screen">
      <div className="step-fixed-top">
        <ProgressIndicator step={5} />
        <StepHeader
          title="לפני סיום"
          instruction="ודאו שכל שלבי הסגירה בוצעו לפני הכנסת המעטפה לכספת"
        />
      </div>

      <div className="step-scrollable">
        <div className="checklist-list">
          {CHECKLIST_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`checklist-item ${checklist[i] ? 'checked' : ''}`}
              onClick={() => onToggle(i)}
              role="checkbox"
              aria-checked={checklist[i]}
              tabIndex={0}
              onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && onToggle(i)}
            >
              <div className={`checkbox ${checklist[i] ? 'checked' : ''}`}>
                {checklist[i] && '✓'}
              </div>
              <span className="checklist-text">{item}</span>
            </div>
          ))}
        </div>

        <div className="checklist-progress-text">
          <span className="count">{doneCount}</span>
          {' / '}
          {CHECKLIST_ITEMS.length}
          {' סעיפים הושלמו'}
        </div>

        {/* Sealed envelope — appears when all items are checked */}
        {allDone && (
          <div className="env-sealed-card">
            <img
              src={envBack}
              className="env-sealed-img"
              alt="מעטפה מוכנה"
            />
            <div className="env-sealed-overlay">
              <span className="env-sealed-check">✓</span>
              <span className="env-sealed-text">מוכן לכספת</span>
            </div>
          </div>
        )}
      </div>

      <div className="step-fixed-bottom">
        <div className="nav-buttons">
          <button className="btn-back" onClick={onBack}>חזור</button>
          <button
            className="btn-finish"
            style={{
              flex: 1,
              padding: '15px',
              background: allDone
                ? 'linear-gradient(135deg, var(--success), #4aaa86)'
                : 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
              border: 'none',
              borderRadius: 'var(--radius)',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              boxShadow: allDone
                ? '0 3px 16px rgba(90,184,150,0.35)'
                : '0 3px 14px var(--accent-glow)',
              transition: 'background 0.4s, box-shadow 0.4s',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
            onClick={onFinish}
          >
            סיים ונקה נתונים
          </button>
        </div>
      </div>
    </div>
  )
}
