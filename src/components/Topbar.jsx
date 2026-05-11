import { initials } from './helpers'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../data/data'

const PAGE_LABELS = {
  dashboard:'Dashboard', students:'Students', teachers:'Teachers', parents:'Parents',
  classes:'Classes', subjects:'Subjects', lessons:'Lessons', attendance:'Attendance',
  exams:'Exams', assignments:'Assignments', results:'Results', events:'Events',
  messages:'Messages', announcements:'Announcements', settings:'Settings',
}

export default function Topbar({ activePage, navigate, onMenuToggle, onNotif, onLogoutClick }) {
  const { user } = useAuth()

  return (
    <div className="topbar">
      <button className="icon-btn" onClick={onMenuToggle} style={{ display: 'none' }} id="menu-toggle-btn">
        <i className="ti ti-menu-2" />
      </button>
      <div className="topbar-title">{PAGE_LABELS[activePage] || 'Dashboard'}</div>

      <div className="search-box">
        <i className="ti ti-search si" />
        <input placeholder="Search students, classes..." />
      </div>

      <button className="icon-btn" onClick={onNotif} title="Notifications">
        <i className="ti ti-bell" />
        <div className="notif-dot" />
      </button>
      <button className="icon-btn" onClick={() => navigate('messages')} title="Messages">
        <i className="ti ti-message-circle" />
      </button>

      <div className="user-chip" onClick={() => navigate('settings')}>
        <div className="avatar">{user ? initials(user.firstName, user.lastName) : '?'}</div>
        <div>
          <div className="user-name">{user ? `${user.firstName} ${user.lastName}` : ''}</div>
          <div className="user-role">{user ? ROLES[user.role]?.label : ''}</div>
        </div>
        <i className="ti ti-chevron-down" style={{ fontSize: 13, color: 'var(--text3)' }} />
      </div>
    </div>
  )
}
