import { AVATAR_COLORS } from '../data/data'

export const initials = (f, l) => ((f || '?')[0] + (l || '?')[0]).toUpperCase()

export const acBg = (i) => AVATAR_COLORS[i % AVATAR_COLORS.length]

export const statusBadge = (s) => {
  const map = {
    Active: 'badge-green', Inactive: 'badge-red', 'On Leave': 'badge-amber',
    Open: 'badge-blue', Closed: 'badge-gray', Upcoming: 'badge-purple',
    Completed: 'badge-green', Pending: 'badge-amber',
  }
  return <span className={`badge ${map[s] || 'badge-gray'}`}>{s}</span>
}

export const ActionBtns = ({ onView, onEdit, onDelete }) => (
  <div style={{ display: 'flex', gap: 4 }}>
    <button className="btn btn-outline btn-sm btn-icon" title="View" onClick={onView}>
      <i className="ti ti-eye" style={{ fontSize: 13 }} />
    </button>
    <button className="btn btn-outline btn-sm btn-icon" title="Edit" onClick={onEdit}>
      <i className="ti ti-edit" style={{ fontSize: 13 }} />
    </button>
    <button className="btn btn-outline btn-sm btn-icon" title="Delete" style={{ color: 'var(--red)' }} onClick={onDelete}>
      <i className="ti ti-trash" style={{ fontSize: 13 }} />
    </button>
  </div>
)

export const AvatarCircle = ({ fn, ln, index, size = 34 }) => {
  const [bg, tc] = acBg(index)
  return (
    <div className="av" style={{ background: bg, color: tc, width: size, height: size, fontSize: size * 0.36 }}>
      {initials(fn, ln)}
    </div>
  )
}

export const ProgressBar = ({ value, className = '' }) => (
  <div className="progress-bar">
    <div className={`progress-fill ${className}`} style={{ width: `${value}%` }} />
  </div>
)
