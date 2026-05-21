import { useAuth } from '../context/AuthContext'
import { EMPLOYEES, EVENTS, ROLES, MANAGERS, TEAMS, TASKS } from '../data/data'
import { statusBadge, AvatarCircle } from '../components/helpers'

const PERF = [['Engineering',88],['Product',76],['Marketing',82],['Operations',70],['Design',91]]

const SCHEDULE = [
  { t:'09:00', title:'Sprint Planning — Alpha Squad', dot:'var(--purple)' },
  { t:'10:30', title:'Product Roadmap Review',         dot:'var(--teal)'   },
  { t:'12:00', title:'Lunch & Team Sync',              dot:'var(--amber)'  },
  { t:'14:00', title:'Client Strategy Call',           dot:'var(--coral)'  },
  { t:'16:00', title:'HR All Hands Meeting',           dot:'var(--blue)'   },
]

const ATT_MONTHS = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May']
const ATT_DATA   = [91,88,85,93,87,90,94,89,92,95]

export default function Dashboard({ navigate }) {
  const { user } = useAuth()
  const role = user?.role || 'admin'

  // Dynamic stats computed from real data
  const totalEmp   = EMPLOYEES.length
  const activeEmp  = EMPLOYEES.filter(e => e.status === 'Active').length
  const onLeave    = EMPLOYEES.filter(e => e.status === 'On Leave').length
  const openTasks  = TASKS.filter(t => t.status === 'Open').length

  const ROLE_STATS = {
    admin:    [
      { v: String(totalEmp),   l:'Total Employees', icon:'ti-users',          bg:'#ede9ff',           c:'var(--purple)', chg:'↑ 4 this month', up:true },
      { v: String(MANAGERS.length), l:'Managers',   icon:'ti-briefcase',      bg:'var(--teal-light)', c:'var(--teal)',   chg:'↑ 1 new',        up:true },
      { v: String(TEAMS.length),    l:'Active Teams',icon:'ti-building',      bg:'var(--blue-light)', c:'var(--blue)'   },
      { v: String(openTasks),  l:'Open Tasks',      icon:'ti-clipboard-list', bg:'var(--amber-light)',c:'var(--amber)'  },
    ],
    manager:  [
      { v: String(activeEmp),  l:'My Team Members', icon:'ti-users',         bg:'#ede9ff',           c:'var(--purple)' },
      { v: String(TEAMS.length),l:'Teams',          icon:'ti-building',      bg:'var(--blue-light)', c:'var(--blue)'   },
      { v: String(openTasks),  l:'Open Tasks',      icon:'ti-clipboard-list',bg:'var(--amber-light)',c:'var(--amber)'  },
      { v:'94%',               l:'Attendance Rate', icon:'ti-calendar-check',bg:'var(--green-light)',c:'var(--green)'  },
    ],
    employee: [
      { v:'3',  l:'My Projects',   icon:'ti-folder',        bg:'#ede9ff',           c:'var(--purple)' },
      { v:'2',  l:'Pending Tasks', icon:'ti-clipboard-list',bg:'var(--amber-light)',c:'var(--amber)'  },
      { v:'97%',l:'My Attendance', icon:'ti-calendar-check',bg:'var(--green-light)',c:'var(--green)'  },
      { v:'A-', l:'Appraisal',     icon:'ti-trophy',        bg:'var(--teal-light)', c:'var(--teal)'   },
    ],
    client:   [
      { v:'2',  l:'My Contacts',   icon:'ti-users',         bg:'#ede9ff',           c:'var(--purple)' },
      { v:'95%',l:'SLA Met',       icon:'ti-calendar-check',bg:'var(--green-light)',c:'var(--green)'  },
      { v:'B+', l:'Project Rating',icon:'ti-trophy',        bg:'var(--teal-light)', c:'var(--teal)'   },
      { v:'1',  l:'Pending Reviews',icon:'ti-file-pencil',  bg:'var(--amber-light)',c:'var(--amber)'  },
    ],
  }

  const stats = ROLE_STATS[role] || ROLE_STATS.admin

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="breadcrumb">Home / <span>Dashboard</span></div>
        <h1>Welcome back, {user?.firstName} 👋</h1>
        <p>Here's what's happening at WorkNexus today.</p>
      </div>

      {/* Dynamic Stats */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: s.bg, color: s.c }}>
              <i className={`ti ${s.icon}`} style={{ fontSize: 22 }} />
            </div>
            <div>
              <div className="stat-val">{s.v}</div>
              <div className="stat-lbl">{s.l}</div>
              {s.chg && <div className={`stat-chg ${s.up ? 'up' : 'dn'}`}>{s.chg}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="dash-layout">
        <div className="dash-left">

          {/* Attendance Chart */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Monthly Attendance Overview</div>
              <select className="form-control" style={{ maxWidth:130, padding:'5px 8px', fontSize:12 }}>
                <option>This Month</option><option>Last Month</option><option>Last Quarter</option>
              </select>
            </div>
            <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:130, padding:'8px 0' }}>
              {ATT_MONTHS.map((m, i) => (
                <div key={m} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, flex:1 }}>
                  <div style={{ fontSize:10, fontWeight:600, color:'var(--text2)' }}>{ATT_DATA[i]}%</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:2, width:'100%', flex:1, justifyContent:'flex-end' }}>
                    <div style={{ height: ATT_DATA[i] * 0.85, background:'var(--purple)', borderRadius:'4px 4px 0 0', opacity:0.85 }} />
                    <div style={{ height: (100-ATT_DATA[i]) * 0.4, background:'var(--coral)', borderRadius:'4px 4px 0 0', opacity:0.7 }} />
                  </div>
                  <div style={{ fontSize:10, color:'var(--text3)' }}>{m}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:16, marginTop:12, fontSize:12 }}>
              {[['var(--purple)','Present'],['var(--coral)','Absent']].map(([c,l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:c }} />{l}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Employees */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Employees</div>
              <span className="card-link" onClick={() => navigate('employees')}>View All →</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Employee</th><th>Team</th><th>Rating</th><th>Status</th></tr></thead>
                <tbody>
                  {EMPLOYEES.slice(0, 5).map((s, i) => (
                    <tr key={s.id}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <AvatarCircle fn={s.fn} ln={s.ln} index={i} />
                          <div>
                            <div className="td-name">{s.fn} {s.ln}</div>
                            <div className="td-id">{s.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{s.team}</td>
                      <td><span style={{ fontWeight:700, color:'var(--teal)' }}>{s.grade}</span></td>
                      <td>{statusBadge(s.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid-2">
            {/* Events */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Upcoming Events</div>
                <span className="card-link" onClick={() => navigate('events')}>All →</span>
              </div>
              {EVENTS.slice(0, 3).map((e, i) => (
                <div key={i} className="ev-item">
                  <div className="ev-date" style={{ background:'var(--purple-light)' }}>
                    <div style={{ fontSize:18, fontWeight:800, color:'var(--purple)', lineHeight:1 }}>{e.date}</div>
                    <div style={{ fontSize:10, color:'var(--purple)', fontWeight:700 }}>{e.month}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{e.title}</div>
                    <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{e.time} · {e.loc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Department Performance */}
            <div className="card">
              <div className="card-header"><div className="card-title">Dept. Performance</div></div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {PERF.map(([dept, score]) => (
                  <div key={dept}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:3 }}>
                      <span style={{ color:'var(--text2)' }}>{dept}</span>
                      <span style={{ fontWeight:700, color:'var(--text)' }}>{score}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className={`progress-fill ${score>=85?'green':score>=70?'':'amber'}`} style={{ width:`${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dash-right">
          {/* Mini Calendar */}
          <div className="card">
            <div className="card-header"><div className="card-title">📅 May 2025</div></div>
            <MiniCalendar />
          </div>

          {/* Today's Schedule */}
          <div className="card">
            <div className="card-header"><div className="card-title">Today's Schedule</div></div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {SCHEDULE.map((s, i) => (
                <div key={i} className="tl-item">
                  <div className="tl-dot" style={{ background: s.dot }} />
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:'var(--text)' }}>{s.title}</div>
                    <div style={{ fontSize:11, color:'var(--text3)' }}>{s.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniCalendar() {
  const days = ['Su','Mo','Tu','We','Th','Fr','Sa']
  const today = 15
  const eventDays = [5,12,15,20,25,30]
  return (
    <div className="cal-grid">
      {days.map(d => <div key={d} style={{ textAlign:'center', fontSize:10, fontWeight:700, color:'var(--text3)', padding:4 }}>{d}</div>)}
      {[28,29,30].map(d => <div key={`p${d}`} className="cal-day cal-other">{d}</div>)}
      {Array.from({length:31},(_,i)=>i+1).map(d => (
        <div key={d} className={`cal-day ${d===today?'cal-today':''}`} style={{ position:'relative' }}>
          {d}
          {eventDays.includes(d) && d!==today && <div style={{ position:'absolute', bottom:2, left:'50%', transform:'translateX(-50%)', width:4, height:4, background:'var(--purple)', borderRadius:'50%' }} />}
        </div>
      ))}
    </div>
  )
}
