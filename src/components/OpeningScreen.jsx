export default function OpeningScreen({ date, onDateChange, onStart, showBanner }) {
  return (
    <div className="app">
      <div className="opening-screen">
        <div className="opening-emblem">🏧</div>
        <h1 className="opening-title">סגירת קופה</h1>
        <p className="opening-subtitle">
          עוזר דיגיטלי לסגירה מדויקת<br />וללא טעויות
        </p>

        {showBanner && (
          <div className="completion-banner">
            <span className="completion-banner-icon">✅</span>
            <span className="completion-banner-text">סגירת הקופה הושלמה</span>
          </div>
        )}

        <div className="opening-form">
          <div className="field-group">
            <label className="field-label" htmlFor="date-input">תאריך</label>
            <input
              id="date-input"
              className="date-input"
              type="text"
              value={date}
              onChange={e => onDateChange(e.target.value)}
              placeholder="DD/MM/YYYY"
              inputMode="numeric"
            />
          </div>

          <button className="btn-start" onClick={onStart}>
            התחל
          </button>
        </div>

        <p className="opening-disclaimer">
          הנתונים לא נשמרים לאחר סיום התהליך
        </p>
      </div>
    </div>
  )
}
