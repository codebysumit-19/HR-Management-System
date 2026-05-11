import { useState, useEffect, useCallback, useRef } from 'react'

let _show = null
export const toast = (msg) => _show && _show(msg)

export default function Toast() {
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)
  const timer = useRef(null)

  _show = useCallback((m) => {
    setMsg(m)
    setVisible(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(false), 3000)
  }, [])

  return (
    <div className={`toast ${visible ? 'show' : ''}`}>
      <i className="ti ti-circle-check" style={{ color: '#5dcaa5', fontSize: 18 }} />
      {msg}
    </div>
  )
}
