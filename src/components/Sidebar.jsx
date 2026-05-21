import { NAV_ITEMS, ROLES } from '../data/data'
import { useAuth } from '../context/AuthContext'

export default function Sidebar({ activePage, navigate, sidebarOpen, onLogout }) {
  const { user } = useAuth()
  const pages = ROLES[user?.role]?.pages || []
  let lastSection = ''

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">W</div>
        <div>
          <div className="logo-text">WorkNexus</div>
          <div className="logo-sub">HR Management</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.filter(item => pages.includes(item.id)).map(item => {
          const showSection = item.section !== lastSection
          if (showSection) lastSection = item.section
          return (
            <div key={item.id}>
              {showSection && <div className="nav-section">{item.section}</div>}
              <div
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => navigate(item.id)}
              >
                <i className={`ti ${item.icon} ni`} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            </div>
          )
        })}
      </nav>

      <div style={{ padding: 12, borderTop: '1px solid var(--border)' }}>
        <button
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center', color: 'var(--red)', borderColor: 'var(--red-light)' }}
          onClick={onLogout}
        >
          <i className="ti ti-logout" /> Sign Out
        </button>
      </div>
    </div>
  )
}
