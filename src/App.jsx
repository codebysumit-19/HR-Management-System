import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Auth from './pages/Auth'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Toast from './components/Toast'
import Modal from './components/Modal'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import { Teachers } from './pages/Teachers'
import { Parents, Classes, Subjects } from './pages/ParentsClassesSubjects'
import { Lessons, Attendance, Exams, Assignments, Results } from './pages/AcademicPages'
import { Events, Messages, Announcements, Settings } from './pages/OtherPages'

function AppShell() {
  const { user } = useAuth()
  const [page, setPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const { logout } = useAuth()

  if (!user) return <Auth />

  const navigate = (p) => {
    setPage(p)
    setSidebarOpen(false)
  }

  const doLogout = () => {
    setShowLogout(false)
    logout()
  }

  const NOTIFS = [
    { icon: 'ti-user-plus',      color: 'var(--purple)', text: 'New student Alex Turner enrolled in Class 8A', time: '2 min ago' },
    { icon: 'ti-calendar-event', color: 'var(--teal)',   text: 'Science Fair scheduled for May 20, 2025',      time: '1 hr ago'  },
    { icon: 'ti-alert-triangle', color: 'var(--amber)',  text: '3 students absent from Class 9C today',        time: '2 hr ago'  },
    { icon: 'ti-file-pencil',    color: 'var(--blue)',   text: 'Mid-term exam results published',              time: 'Yesterday' },
    { icon: 'ti-message-circle', color: 'var(--coral)',  text: 'New message from parent Robert Johnson',       time: 'Yesterday' },
  ]

  const pages = {
    dashboard:     <Dashboard navigate={navigate} />,
    students:      <Students />,
    teachers:      <Teachers />,
    parents:       <Parents />,
    classes:       <Classes />,
    subjects:      <Subjects />,
    lessons:       <Lessons />,
    attendance:    <Attendance />,
    exams:         <Exams />,
    assignments:   <Assignments />,
    results:       <Results />,
    events:        <Events />,
    messages:      <Messages />,
    announcements: <Announcements />,
    settings:      <Settings />,
  }

  return (
    <div>
      <Sidebar
        activePage={page}
        navigate={navigate}
        sidebarOpen={sidebarOpen}
        onLogout={() => setShowLogout(true)}
      />

      <Topbar
        activePage={page}
        navigate={navigate}
        onMenuToggle={() => setSidebarOpen(o => !o)}
        onNotif={() => setShowNotif(true)}
        onLogoutClick={() => setShowLogout(true)}
      />

      {/* Sidebar backdrop on mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 99 }}
        />
      )}

      <div className="main">
        {pages[page] || <Dashboard navigate={navigate} />}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogout && (
        <Modal onClose={() => setShowLogout(false)}>
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div className="logout-icon">
              <i className="ti ti-logout" />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>
              Sign Out?
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 24 }}>
              You'll be returned to the login screen.<br />Any unsaved changes will be lost.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn btn-outline" style={{ minWidth: 110 }} onClick={() => setShowLogout(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" style={{ minWidth: 110 }} onClick={doLogout}>
                <i className="ti ti-logout" /> Sign Out
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Notifications Modal */}
      {showNotif && (
        <Modal title="🔔 Notifications" onClose={() => setShowNotif(false)}>
          {NOTIFS.map((n, i) => (
            <div
              key={i}
              style={{
                display: 'flex', gap: 12, padding: '11px 0',
                borderBottom: i < NOTIFS.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'flex-start',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 9, background: 'var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <i className={`ti ${n.icon}`} style={{ color: n.color, fontSize: 17 }} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.4 }}>{n.text}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{n.time}</div>
              </div>
            </div>
          ))}
        </Modal>
      )}

      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}
