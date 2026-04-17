import { useState, useRef } from 'react'
import envFront from '../../Env_front.png'
import envBack from '../../Env_back.png'
import envVideo from '../../Env_animation.mp4'

export default function EnvelopeCard() {
  const [phase, setPhase] = useState('front') // 'front' | 'playing' | 'back'
  const videoRef = useRef(null)

  function handleTap() {
    if (phase === 'playing') return
    if (phase === 'front') {
      setPhase('playing')
    } else {
      // back → front: instant (video is one-directional)
      setPhase('front')
    }
  }

  function handleVideoEnd() {
    setPhase('back')
  }

  const isFront = phase === 'front'
  const isBack  = phase === 'back'

  return (
    <div
      className={`env-card ${isBack ? 'env-card--back' : ''}`}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label={isFront ? 'לחץ להצגת צד אחורי' : 'לחץ לחזרה לצד קדמי'}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleTap()}
    >
      <div className="env-media-wrap">
        {phase === 'playing' ? (
          <video
            ref={videoRef}
            src={envVideo}
            className="env-media"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
          />
        ) : (
          <img
            src={isFront ? envFront : envBack}
            className="env-media"
            alt={isFront ? 'צד קדמי של המעטפה' : 'צד אחורי של המעטפה'}
          />
        )}

        {phase === 'playing' && (
          <div className="env-playing-hint">מסתובב…</div>
        )}
      </div>

      <div className="env-card-footer">
        <span className="env-side-badge">
          {isBack ? 'צד אחורי' : 'צד קדמי'}
        </span>
        {phase !== 'playing' && (
          <span className="env-flip-hint">
            {isBack
              ? <><span className="env-arrow">→</span> הצג צד קדמי</>
              : <>הצג צד אחורי <span className="env-arrow">←</span></>
            }
          </span>
        )}
      </div>
    </div>
  )
}
