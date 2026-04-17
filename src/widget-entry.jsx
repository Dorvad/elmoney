import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import WidgetShell from './components/WidgetShell'

function mountWidget(el) {
  const mode = el.dataset.mode || 'float'
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <WidgetShell mode={mode} />
    </React.StrictMode>
  )
}

function init() {
  const targets = document.querySelectorAll('[data-elmoney-widget]')
  if (targets.length === 0) {
    const div = document.createElement('div')
    div.setAttribute('data-elmoney-widget', 'true')
    div.setAttribute('data-mode', 'float')
    document.body.appendChild(div)
    mountWidget(div)
    return
  }
  targets.forEach(mountWidget)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
