import { useState, useRef, useEffect } from 'react'
import { EVENTS, MESSAGES_DATA, CHAT_MSGS_SEED, ANNOUNCES_SEED } from '../data/data'
import { initials, acBg } from '../components/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toast'
import { useAuth } from '../context/AuthContext'

const CAT_COLORS = {
  Corporate:  ['#ede9ff','#6c63ff'], Social:     ['var(--green-light)','var(--green)'],
  Innovation: ['var(--coral-light)','var(--coral)'], Holiday: ['var(--amber-light)','var(--amber)'],
  Meeting:    ['var(--blue-light)','var(--blue)'],
}

export function Events() {
  const [events, setEvents] = useState(EVENTS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title:'', date:'', time:'09:00', cat:'Corporate', loc:'', desc:'' })

  const add = () => {
    if (!form.title) { toast('Please enter event title.'); return }
    const d = form.date ? new Date(form.date) : new Date()
    setEvents(p=>[...p,{ ...form, date:d.getDate().toString(), month:d.toLocaleString('default',{month:'short'}) }])
    setShowModal(false); setForm({ title:'', date:'', time:'09:00', cat:'Corporate', loc:'', desc:'' })
    toast(`Event "${form.title}" added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Events</span></div><h1>Company Events</h1><p>Corporate events and activities</p></div>
      <div className="card">
        <div className="card-header"><div className="card-title">Events Calendar</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Add Event</button></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
          {events.map((e,i)=>{
            const [bg,tc]=CAT_COLORS[e.cat]||['var(--gray-light)','var(--gray)']
            return (
              <div key={i} className="card" style={{margin:0,transition:'all 0.22s',cursor:'default'}}
                onMouseOver={el=>el.currentTarget.style.transform='translateY(-3px)'}
                onMouseOut={el=>el.currentTarget.style.transform=''}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                  <div style={{width:48,height:48,background:bg,borderRadius:10,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <div style={{fontSize:18,fontWeight:800,color:tc,lineHeight:1}}>{e.date}</div>
                    <div style={{fontSize:10,fontWeight:700,color:tc}}>{e.month}</div>
                  </div>
                  <span className="badge" style={{background:bg,color:tc}}>{e.cat}</span>
                </div>
                <div style={{fontSize:14,fontWeight:700,color:'var(--text)',marginBottom:5}}>{e.title}</div>
                <div style={{fontSize:12,color:'var(--text3)',marginBottom:8}}>{e.time} · {e.loc}</div>
                <div style={{fontSize:12,color:'var(--text2)',lineHeight:1.5}}>{e.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
      {showModal&&<Modal title="Add Company Event" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Event</button></>}>
        <div className="form-group"><label>Event Title</label><input className="form-control" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Event name"/></div>
        <div className="form-row"><div className="form-group"><label>Date</label><input className="form-control" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div><div className="form-group"><label>Time</label><input className="form-control" type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/></div></div>
        <div className="form-row"><div className="form-group"><label>Category</label><select className="form-control" value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))}>{['Corporate','Social','Innovation','Holiday','Meeting'].map(c=><option key={c}>{c}</option>)}</select></div><div className="form-group"><label>Location</label><input className="form-control" value={form.loc} onChange={e=>setForm(f=>({...f,loc:e.target.value}))} placeholder="Venue / Room"/></div></div>
        <div className="form-group"><label>Description</label><textarea className="form-control" rows={2} value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="Event details..."/></div>
      </Modal>}
    </div>
  )
}

export function Messages() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [msgs, setMsgs] = useState(CHAT_MSGS_SEED)
  const [input, setInput] = useState('')
  const chatRef = useRef(null)
  const contact = MESSAGES_DATA[activeIdx]

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [msgs])

  const sendMsg = () => {
    if (!input.trim()) return
    const now = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
    setMsgs(m => [...m, { sent:true, text:input, time:now }])
    setInput('')
    setTimeout(() => {
      setMsgs(m => [...m, { sent:false, text:"Got it, I'll follow up on that shortly.", time:now }])
    }, 1200)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Messages</span></div><h1>Messages</h1><p>Internal communication system</p></div>
      <div style={{display:'grid',gridTemplateColumns:'290px 1fr',gap:16,height:530}}>
        <div className="card" style={{padding:0,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          <div style={{padding:'12px 14px',borderBottom:'1px solid var(--border)'}}>
            <input className="form-control" placeholder="🔍 Search messages..." style={{fontSize:12}}/>
          </div>
          <div style={{overflow:'auto',flex:1,padding:8}}>
            {MESSAGES_DATA.map((m,i)=>{
              const [bg,tc]=acBg(i)
              return (
                <div key={m.id} onClick={()=>{setActiveIdx(i);setMsgs(CHAT_MSGS_SEED)}}
                  style={{display:'flex',gap:10,padding:10,borderRadius:9,cursor:'pointer',alignItems:'flex-start',background:activeIdx===i?'var(--purple-light)':'',marginBottom:2,transition:'background 0.15s'}}>
                  <div className="av" style={{background:bg,color:tc,width:36,height:36,fontSize:13,flexShrink:0}}>{initials(m.fn,m.ln)}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{fontSize:13,fontWeight:700,color:'var(--text)'}}>{m.fn} {m.ln}</div>
                      <div style={{fontSize:11,color:'var(--text3)',whiteSpace:'nowrap'}}>{m.time}</div>
                    </div>
                    <div style={{fontSize:12,color:'var(--text3)',marginTop:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{m.preview}</div>
                  </div>
                  {m.unread&&<div style={{width:8,height:8,background:'var(--purple)',borderRadius:'50%',flexShrink:0,marginTop:4}}/>}
                </div>
              )
            })}
          </div>
        </div>
        <div className="card" style={{padding:0,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:10}}>
            <div className="av" style={{background:acBg(activeIdx)[0],color:acBg(activeIdx)[1],width:36,height:36,fontSize:13}}>{initials(contact.fn,contact.ln)}</div>
            <div><div style={{fontSize:14,fontWeight:700,color:'var(--text)'}}>{contact.fn} {contact.ln}</div><div style={{fontSize:11,color:'var(--teal)'}}>● Online</div></div>
            <div style={{marginLeft:'auto',display:'flex',gap:8}}>
              <button className="icon-btn"><i className="ti ti-phone"/></button>
              <button className="icon-btn"><i className="ti ti-video"/></button>
            </div>
          </div>
          <div ref={chatRef} style={{flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column'}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:'flex',flexDirection:m.sent?'row-reverse':'row',marginBottom:10}}>
                <div className={`bubble ${m.sent?'sent':'recv'}`}>
                  {m.text}
                  <div style={{fontSize:10,marginTop:4,opacity:0.65,textAlign:'right'}}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{padding:'10px 14px',borderTop:'1px solid var(--border)',display:'flex',gap:8}}>
            <input className="form-control" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message..." style={{flex:1}} onKeyDown={e=>e.key==='Enter'&&sendMsg()}/>
            <button className="btn btn-primary btn-sm" onClick={sendMsg}><i className="ti ti-send"/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Announcements() {
  const { user } = useAuth()
  const [announces, setAnnounces] = useState(ANNOUNCES_SEED)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [priority, setPriority] = useState('Normal')

  const pColors = { Normal:['var(--blue-light)','var(--blue)'], High:['var(--amber-light)','var(--amber)'], Urgent:['var(--red-light)','var(--red)'] }

  const post = () => {
    if (!title||!body) { toast('Please fill title and message.'); return }
    const name = user ? `${user.firstName} ${user.lastName}` : 'Admin'
    setAnnounces(p=>[{ title, body, meta:`Posted by ${name} • Just now`, priority }, ...p])
    setTitle(''); setBody('')
    toast('Announcement posted!')
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Announcements</span></div><h1>Announcements</h1><p>Company-wide notices and updates</p></div>
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><div className="card-title">Post Announcement</div></div>
        <div className="form-group"><label>Title</label><input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Announcement title"/></div>
        <div className="form-group"><label>Message</label><textarea className="form-control" rows={3} value={body} onChange={e=>setBody(e.target.value)} placeholder="Type your announcement..."/></div>
        <div className="form-row">
          <div className="form-group"><label>Target Audience</label><select className="form-control"><option>Everyone</option><option>Employees Only</option><option>Managers Only</option><option>Clients Only</option></select></div>
          <div className="form-group"><label>Priority</label><select className="form-control" value={priority} onChange={e=>setPriority(e.target.value)}><option>Normal</option><option>High</option><option>Urgent</option></select></div>
        </div>
        <button className="btn btn-primary" onClick={post}><i className="ti ti-speakerphone"/> Post Announcement</button>
      </div>
      {announces.map((a,i)=>{
        const [bg,tc]=pColors[a.priority]||pColors.Normal
        return <div key={i} className="ann-item" style={{borderLeft:`3px solid ${tc}`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontSize:14,fontWeight:700,color:'var(--text)'}}>{a.title}</div>
            <span className="badge" style={{background:bg,color:tc}}>{a.priority}</span>
          </div>
          <div style={{fontSize:13,color:'var(--text2)',marginTop:4,lineHeight:1.5}}>{a.body}</div>
          <div style={{fontSize:11,color:'var(--text3)',marginTop:6}}>{a.meta}</div>
        </div>
      })}
    </div>
  )
}

export function Settings({ onProfileUpdate }) {
  const { user, login } = useAuth()
  const [fn, setFn]       = useState(user?.firstName || '')
  const [ln, setLn]       = useState(user?.lastName || '')
  const [email, setEmail] = useState(user?.email || '')

  const save = () => {
    if (!fn||!ln) { toast('Please enter your name.'); return }
    const updated = { ...user, firstName:fn, lastName:ln, email }
    login(updated)
    if (onProfileUpdate) onProfileUpdate(updated)
    toast('Profile updated successfully!')
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Settings</span></div><h1>Settings</h1><p>System configuration</p></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">🏢 Company Information</div></div>
          <div className="form-group"><label>Company Name</label><input className="form-control" defaultValue="WorkNexus Technologies"/></div>
          <div className="form-group"><label>CEO / Director</label><input className="form-control" defaultValue="Dr. Alex Morgan"/></div>
          <div className="form-row"><div className="form-group"><label>Phone</label><input className="form-control" defaultValue="+1 555-0100"/></div><div className="form-group"><label>Email</label><input className="form-control" defaultValue="admin@worknexus.io"/></div></div>
          <div className="form-group"><label>Address</label><textarea className="form-control" rows={2} defaultValue="42 Innovation Drive, Tech Park, Bengaluru 560001"/></div>
          <button className="btn btn-primary" onClick={()=>toast('Company info saved!')}>Save Changes</button>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">👤 Profile Settings</div></div>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20}}>
            <div className="avatar" style={{width:58,height:58,fontSize:22}}>{user ? (user.firstName[0]+user.lastName[0]).toUpperCase() : '?'}</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:'var(--text)'}}>{user?.firstName} {user?.lastName}</div>
              <div style={{fontSize:12,color:'var(--text3)'}}>{user?.role}</div>
              <button className="btn btn-outline btn-sm" style={{marginTop:6}}>Change Photo</button>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>First Name</label><input className="form-control" value={fn} onChange={e=>setFn(e.target.value)}/></div>
            <div className="form-group"><label>Last Name</label><input className="form-control" value={ln} onChange={e=>setLn(e.target.value)}/></div>
          </div>
          <div className="form-group"><label>Email</label><input className="form-control" type="email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div className="form-group"><label>New Password</label><input className="form-control" type="password" placeholder="Leave blank to keep current"/></div>
          <button className="btn btn-primary" onClick={save}>Update Profile</button>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">🔔 Notifications</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {[['Email Notifications','Receive email alerts',true],['SMS Alerts','Urgent notifications only',false],['Attendance Alerts','When employees are absent',true]].map(([t,s,on],i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div><div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{t}</div><div style={{fontSize:11,color:'var(--text3)'}}>{s}</div></div>
                <div className="toggle" style={{background:on?'var(--purple)':'var(--gray-light)'}}>
                  <div className="toggle-thumb" style={{left:on?'calc(100% - 19px)':'3px'}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">📅 Fiscal Year</div></div>
          <div className="form-row"><div className="form-group"><label>Start Date</label><input className="form-control" type="date" defaultValue="2025-01-01"/></div><div className="form-group"><label>End Date</label><input className="form-control" type="date" defaultValue="2025-12-31"/></div></div>
          <div className="form-group"><label>Current Quarter</label><select className="form-control"><option>Q2 (Apr–Jun)</option><option>Q1 (Jan–Mar)</option><option>Q3 (Jul–Sep)</option><option>Q4 (Oct–Dec)</option></select></div>
          <div className="form-group"><label>Appraisal Cycle</label><select className="form-control"><option>Quarterly</option><option>Half-Yearly</option><option>Annual</option></select></div>
          <button className="btn btn-primary" onClick={()=>toast('Settings saved!')}>Save Settings</button>
        </div>
      </div>
    </div>
  )
}
