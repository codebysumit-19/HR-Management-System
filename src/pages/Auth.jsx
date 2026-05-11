import { useState } from 'react'
import { DEMO_ACCOUNTS } from '../data/data'
import { useAuth } from '../context/AuthContext'

const ROLES_LIST = [
  { key: 'admin',   icon: '🏫', label: 'Admin'   },
  { key: 'teacher', icon: '👨‍🏫', label: 'Teacher' },
  { key: 'student', icon: '👨‍🎓', label: 'Student' },
  { key: 'parent',  icon: '👪', label: 'Parent'  },
]

export default function Auth() {
  const { login } = useAuth()
  const [tab, setTab] = useState('login')
  const [selectedRole, setSelectedRole] = useState('admin')
  const [email, setEmail] = useState('admin@school.edu')
  const [pass, setPass]   = useState('123456')
  const [error, setError] = useState('')

  // Signup state
  const [suFn, setSuFn]     = useState('')
  const [suLn, setSuLn]     = useState('')
  const [suEmail, setSuEmail] = useState('')
  const [suRole, setSuRole]   = useState('admin')
  const [suPass, setSuPass]   = useState('')
  const [suPass2, setSuPass2] = useState('')
  const [suError, setSuError] = useState('')

  const quickLogin = (role) => {
    setSelectedRole(role)
    const acc = DEMO_ACCOUNTS[role]
    setEmail(acc.email)
    setPass(acc.pass)
    setError('')
  }

  const doLogin = () => {
    const found = Object.values(DEMO_ACCOUNTS).find(a => a.email === email && a.pass === pass)
    if (!found) { setError('Invalid email or password.'); return }
    setError('')
    login(found)
  }

  const doSignup = () => {
    if (!suFn || !suLn || !suEmail || !suPass) { setSuError('Please fill all fields.'); return }
    if (suPass !== suPass2) { setSuError('Passwords do not match.'); return }
    setSuError('')
    login({ firstName: suFn, lastName: suLn, email: suEmail, role: suRole, pass: suPass })
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
          <div className="logo-icon" style={{ width:46, height:46, fontSize:20 }}>S</div>
          <div>
            <div style={{ fontWeight:800, fontSize:20, color:'var(--text)' }}>SchoolSphere</div>
            <div style={{ fontSize:12, color:'var(--text3)' }}>Management System</div>
          </div>
        </div>

        <div className="auth-tabs">
          <div className={`auth-tab ${tab === 'login'  ? 'active' : ''}`} onClick={() => setTab('login')}>Sign In</div>
          <div className={`auth-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</div>
        </div>

        {tab === 'login' ? (
          <div>
            <div className="form-group">
              <label>Email Address</label>
              <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@school.edu" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="form-control" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && doLogin()} />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--text2)', cursor:'pointer' }}>
                <input type="checkbox" defaultChecked /> Remember me
              </label>
              <span style={{ fontSize:12, color:'var(--purple)', cursor:'pointer' }}>Forgot password?</span>
            </div>
            {error && <div style={{ color:'var(--red)', fontSize:12, marginBottom:10 }}>{error}</div>}
            <button className="auth-btn" onClick={doLogin}>Sign In →</button>
            <div style={{ textAlign:'center', fontSize:12, color:'var(--text3)', margin:'16px 0 10px', position:'relative' }}>
              <span style={{ background:'#fff', padding:'0 10px', position:'relative', zIndex:1 }}>Quick Demo Login</span>
              <div style={{ position:'absolute', top:'50%', left:0, right:0, height:1, background:'var(--border)', transform:'translateY(-50%)' }} />
            </div>
            <div className="role-grid">
              {ROLES_LIST.map(r => (
                <div key={r.key} className={`role-opt ${selectedRole === r.key ? 'sel' : ''}`} onClick={() => quickLogin(r.key)}>
                  <span className="ri">{r.icon}</span>{r.label}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="form-row">
              <div className="form-group"><label>First Name</label><input className="form-control" value={suFn} onChange={e => setSuFn(e.target.value)} placeholder="John" /></div>
              <div className="form-group"><label>Last Name</label><input className="form-control" value={suLn} onChange={e => setSuLn(e.target.value)} placeholder="Smith" /></div>
            </div>
            <div className="form-group"><label>Email Address</label><input className="form-control" type="email" value={suEmail} onChange={e => setSuEmail(e.target.value)} placeholder="john@school.edu" /></div>
            <div className="form-group">
              <label>Role</label>
              <select className="form-control" value={suRole} onChange={e => setSuRole(e.target.value)}>
                <option value="admin">Administrator</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Password</label><input className="form-control" type="password" value={suPass} onChange={e => setSuPass(e.target.value)} placeholder="••••••••" /></div>
              <div className="form-group"><label>Confirm</label><input className="form-control" type="password" value={suPass2} onChange={e => setSuPass2(e.target.value)} placeholder="••••••••" /></div>
            </div>
            {suError && <div style={{ color:'var(--red)', fontSize:12, marginBottom:10 }}>{suError}</div>}
            <button className="auth-btn" onClick={doSignup}>Create Account →</button>
          </div>
        )}
      </div>
    </div>
  )
}
