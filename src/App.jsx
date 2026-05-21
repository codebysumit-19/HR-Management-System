import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Auth from './pages/Auth'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Toast from './components/Toast'
import Modal from './components/Modal'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import { Managers } from './pages/Managers'
import { Clients, Teams, Projects } from './pages/ClientsTeamsProjects'
import { Meetings, Attendance, Reviews, Tasks, Appraisals } from './pages/OperationsPages'
import { Events, Messages, Announcements, Settings } from './pages/CommunicationPages'

function AppShell() {
  const { user } = useAuth()
  const [page, setPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const { logout } = useAuth()

  if (!user) return <Auth />

  const navigate = (p) => { setPage(p); setSidebarOpen(false) }
  const doLogout = () => { setShowLogout(false); logout() }

  const NOTIFS = [
    { icon:'ti-user-plus',      color:'var(--purple)', text:'New employee Priya Sharma onboarded to Alpha Squad',    time:'2 min ago'  },
    { icon:'ti-calendar-event', color:'var(--teal)',   text:'Quarterly Town Hall scheduled for May 20, 2025',         time:'1 hr ago'   },
    { icon:'ti-alert-triangle', color:'var(--amber)',  text:'3 employees marked absent from Delta Unit today',        time:'2 hr ago'   },
    { icon:'ti-file-pencil',    color:'var(--blue)',   text:'Q1 appraisal results have been published',               time:'Yesterday'  },
    { icon:'ti-message-circle', color:'var(--coral)',  text:'New message from client William Foster',                 time:'Yesterday'  },
  ]

  const pages = {
    dashboard:     <Dashboard navigate={navigate} />,
    employees:     <Employees />,
    managers:      <Managers />,
    clients:       <Clients />,
    teams:         <Teams />,
    projects:      <Projects />,
    meetings:      <Meetings />,
    attendance:    <Attendance />,
    reviews:       <Reviews />,
    tasks:         <Tasks />,
    appraisals:    <Appraisals />,
    events:        <Events />,
    messages:      <Messages />,
    announcements: <Announcements />,
    settings:      <Settings />,
  }

  return (
    <div>
      <Sidebar activePage={page} navigate={navigate} sidebarOpen={sidebarOpen} onLogout={() => setShowLogout(true)} />
      <Topbar activePage={page} navigate={navigate} onMenuToggle={() => setSidebarOpen(o => !o)} onNotif={() => setShowNotif(true)} onLogoutClick={() => setShowLogout(true)} />

      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:99 }} />
      )}

      <div className="main">
        {pages[page] || <Dashboard navigate={navigate} />}
      </div>

      {showLogout && (
        <Modal onClose={() => setShowLogout(false)}>
          <div style={{ textAlign:'center', padding:'8px 0' }}>
            <div className="logout-icon"><i className="ti ti-logout" /></div>
            <h2 style={{ fontSize:18, fontWeight:800, marginBottom:8, color:'var(--text)' }}>Sign Out?</h2>
            <p style={{ fontSize:13, color:'var(--text2)', marginBottom:24 }}>
              You'll be returned to the login screen.<br/>Any unsaved changes will be lost.
            </p>
            <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
              <button className="btn btn-outline" style={{ minWidth:110 }} onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="btn btn-danger" style={{ minWidth:110 }} onClick={doLogout}><i className="ti ti-logout" /> Sign Out</button>
            </div>
          </div>
        </Modal>
      )}

      {showNotif && (
        <Modal title="🔔 Notifications" onClose={() => setShowNotif(false)}>
          {NOTIFS.map((n, i) => (
            <div key={i} style={{ display:'flex', gap:12, padding:'11px 0', borderBottom: i < NOTIFS.length-1 ? '1px solid var(--border)':'none', alignItems:'flex-start' }}>
              <div style={{ width:36, height:36, borderRadius:9, background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <i className={`ti ${n.icon}`} style={{ color:n.color, fontSize:17 }} />
              </div>
              <div>
                <div style={{ fontSize:13, color:'var(--text)', lineHeight:1.4 }}>{n.text}</div>
                <div style={{ fontSize:11, color:'var(--text3)', marginTop:3 }}>{n.time}</div>
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
    <AuthProvider><AppShell /></AuthProvider>
  )
}
