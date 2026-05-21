import { useState } from 'react'
import { MEETINGS, REVIEWS, TASKS, APPRAISALS, EMPLOYEES } from '../data/data'
import { statusBadge, AvatarCircle, ActionBtns } from '../components/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toast'

export function Meetings() {
  const [meetings, setMeetings] = useState(MEETINGS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title:'', sub:'Engineering', cls:'Alpha Squad', day:'Monday', time:'09:00', room:'' })

  const add = () => {
    if (!form.title) { toast('Please enter meeting title.'); return }
    setMeetings(p=>[{ ...form, teacher:'TBD' },...p])
    setShowModal(false); setForm({ title:'', sub:'Engineering', cls:'Alpha Squad', day:'Monday', time:'09:00', room:'' })
    toast(`Meeting "${form.title}" added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Meetings</span></div><h1>Meetings</h1><p>Meeting schedules and agendas</p></div>
      <div className="card">
        <div className="card-header"><div className="card-title">Meeting Schedule</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Schedule Meeting</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Meeting</th><th>Department</th><th>Organizer</th><th>Team</th><th>Day</th><th>Time</th><th>Room</th><th>Actions</th></tr></thead>
          <tbody>{meetings.map((m,i)=>(
            <tr key={i}><td className="td-name">{m.title}</td><td>{m.sub}</td><td>{m.teacher}</td><td>{m.cls}</td>
              <td><span className="badge badge-purple">{m.day}</span></td><td>{m.time}</td><td>{m.room}</td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setMeetings(p=>p.filter((_,j)=>j!==i));toast('Removed.')}}/></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Schedule Meeting" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Schedule</button></>}>
        <div className="form-group"><label>Meeting Title</label><input className="form-control" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Meeting topic"/></div>
        <div className="form-row"><div className="form-group"><label>Department</label><select className="form-control" value={form.sub} onChange={e=>setForm(f=>({...f,sub:e.target.value}))}>{['Engineering','Product','Marketing','Operations','Design','HR'].map(s=><option key={s}>{s}</option>)}</select></div><div className="form-group"><label>Team</label><select className="form-control" value={form.cls} onChange={e=>setForm(f=>({...f,cls:e.target.value}))}>{['Alpha Squad','Beta Core','Gamma Force','Delta Unit','Epsilon Hub'].map(c=><option key={c}>{c}</option>)}</select></div></div>
        <div className="form-row"><div className="form-group"><label>Day</label><select className="form-control" value={form.day} onChange={e=>setForm(f=>({...f,day:e.target.value}))}>{['Monday','Tuesday','Wednesday','Thursday','Friday'].map(d=><option key={d}>{d}</option>)}</select></div><div className="form-group"><label>Start Time</label><input className="form-control" type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/></div></div>
        <div className="form-group"><label>Room</label><input className="form-control" value={form.room} onChange={e=>setForm(f=>({...f,room:e.target.value}))} placeholder="Room / Conference Hall"/></div>
      </Modal>}
    </div>
  )
}

const ATT_STATUSES = ['P','P','P','A','P','L','P','P','H','P','P','P','A','P','P','P','P','L','P','P','P','H','P','P','P','P','A','P','P','P']
const ATT_CLASS_MAP = { P:'att-p', A:'att-a', L:'att-l', H:'att-h' }
const ATT_DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su']

export function Attendance() {
  const [attMap, setAttMap] = useState(() => Object.fromEntries(EMPLOYEES.slice(0,6).map(e=>[e.id,'P'])))

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Attendance</span></div><h1>Attendance</h1><p>Track and manage employee attendance</p></div>
      <div className="stats-grid">
        {[
          {v:'94.2%',l:'Avg Attendance', icon:'ti-circle-check',   bg:'var(--green-light)',c:'var(--green)', chg:'↑ 1.2%', up:true},
          {v:'14',   l:'Absent Today',   icon:'ti-circle-x',       bg:'var(--red-light)',  c:'var(--red)',   chg:'↓ 3',    up:false},
          {v:'6',    l:'Late Today',     icon:'ti-clock',           bg:'var(--amber-light)',c:'var(--amber)'},
          {v:'4',    l:'On Leave',       icon:'ti-file-description',bg:'var(--blue-light)', c:'var(--blue)'},
        ].map((s,i)=>(
          <div className="stat-card" key={i}><div className="stat-icon" style={{background:s.bg,color:s.c}}><i className={`ti ${s.icon}`} style={{fontSize:22}}/></div><div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div>{s.chg&&<div className={`stat-chg ${s.up?'up':'dn'}`}>{s.chg}</div>}</div></div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Mark Attendance — Alpha Squad</div></div>
          <div className="table-wrap"><table>
            <thead><tr><th>Employee</th><th>Status</th><th>Note</th></tr></thead>
            <tbody>{EMPLOYEES.slice(0,6).map((e,i)=>(
              <tr key={e.id}>
                <td><div style={{display:'flex',alignItems:'center',gap:8}}><AvatarCircle fn={e.fn} ln={e.ln} index={i} size={28}/><span className="td-name">{e.fn} {e.ln}</span></div></td>
                <td><select className="form-control" style={{padding:'5px 8px',fontSize:12,maxWidth:120}} value={attMap[e.id]} onChange={ev=>setAttMap(m=>({...m,[e.id]:ev.target.value}))}>
                  <option value="P">✅ Present</option><option value="A">❌ Absent</option><option value="L">⏰ Late</option><option value="E">📝 Excused</option>
                </select></td>
                <td><input className="form-control" placeholder="Optional note" style={{fontSize:11,padding:'5px 8px'}}/></td>
              </tr>
            ))}</tbody>
          </table></div>
          <div style={{marginTop:14,display:'flex',gap:8,justifyContent:'flex-end'}}>
            <button className="btn btn-outline btn-sm">Reset</button>
            <button className="btn btn-primary btn-sm" onClick={()=>toast('Attendance saved!')}>Save Attendance</button>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Monthly Attendance Grid</div></div>
          <div style={{marginBottom:10,display:'flex',gap:12,fontSize:11,flexWrap:'wrap'}}>
            {[['var(--green-light)','var(--green)','Present'],['var(--red-light)','var(--red)','Absent'],['var(--amber-light)','var(--amber)','Late'],['var(--gray-light)','var(--gray)','Holiday']].map(([bg,c,l])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:14,height:14,borderRadius:3,background:bg}}/><span style={{color:c}}>{l}</span></div>
            ))}
          </div>
          <div className="att-grid">
            {ATT_DAYS.map(d=><div key={d} style={{textAlign:'center',fontSize:10,fontWeight:700,color:'var(--text3)',padding:3}}>{d}</div>)}
            {ATT_STATUSES.map((s,i)=><div key={i} className={`att-cell ${ATT_CLASS_MAP[s]}`}>{i+1}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Reviews() {
  const [reviews, setReviews] = useState(REVIEWS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title:'', sub:'Engineering', cls:'Alpha Squad', date:'', time:'09:00', dur:'', room:'' })

  const add = () => {
    if (!form.title) { toast('Please enter review title.'); return }
    setReviews(p=>[{ ...form, dur:(form.dur||'60')+' min', status:'Upcoming' },...p])
    setShowModal(false); setForm({ title:'', sub:'Engineering', cls:'Alpha Squad', date:'', time:'09:00', dur:'', room:'' })
    toast(`Review "${form.title}" scheduled!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Reviews</span></div><h1>Performance Reviews</h1><p>Review schedule and management</p></div>
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        {[
          {v:String(reviews.filter(r=>r.status==='Upcoming').length),  l:'Upcoming', icon:'ti-file-pencil',bg:'#ede9ff',           c:'var(--purple)'},
          {v:String(reviews.filter(r=>r.status==='Completed').length), l:'Completed',icon:'ti-checks',     bg:'var(--teal-light)', c:'var(--teal)'  },
          {v:'2',l:'Feedback Pending',icon:'ti-hourglass',bg:'var(--amber-light)',c:'var(--amber)'},
        ].map((s,i)=>(
          <div className="stat-card" key={i}><div className="stat-icon" style={{background:s.bg,color:s.c}}><i className={`ti ${s.icon}`} style={{fontSize:22}}/></div><div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div></div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Review Schedule</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Schedule Review</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Review</th><th>Department</th><th>Team</th><th>Date</th><th>Time</th><th>Duration</th><th>Room</th><th>Status</th></tr></thead>
          <tbody>{reviews.map((r,i)=>(
            <tr key={i}><td className="td-name">{r.title}</td><td>{r.sub}</td><td>{r.cls}</td><td>{r.date}</td><td>{r.time}</td><td>{r.dur}</td><td>{r.room}</td><td>{statusBadge(r.status)}</td></tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Schedule Review" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Schedule</button></>}>
        <div className="form-group"><label>Review Title</label><input className="form-control" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. Q3 Engineering Review"/></div>
        <div className="form-row"><div className="form-group"><label>Department</label><select className="form-control" value={form.sub} onChange={e=>setForm(f=>({...f,sub:e.target.value}))}>{['Engineering','Product','Marketing','Operations','HR'].map(s=><option key={s}>{s}</option>)}</select></div><div className="form-group"><label>Team</label><select className="form-control" value={form.cls} onChange={e=>setForm(f=>({...f,cls:e.target.value}))}>{['Alpha Squad','Beta Core','Gamma Force','Delta Unit'].map(c=><option key={c}>{c}</option>)}</select></div></div>
        <div className="form-row"><div className="form-group"><label>Date</label><input className="form-control" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div><div className="form-group"><label>Time</label><input className="form-control" type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/></div></div>
        <div className="form-row"><div className="form-group"><label>Duration (min)</label><input className="form-control" type="number" value={form.dur} onChange={e=>setForm(f=>({...f,dur:e.target.value}))} placeholder="60"/></div><div className="form-group"><label>Room</label><input className="form-control" value={form.room} onChange={e=>setForm(f=>({...f,room:e.target.value}))} placeholder="Conf Room A"/></div></div>
      </Modal>}
    </div>
  )
}

export function Tasks() {
  const [tasks, setTasks] = useState(TASKS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title:'', sub:'Engineering', cls:'Alpha Squad', due:'', desc:'' })

  const add = () => {
    if (!form.title) { toast('Please enter title.'); return }
    setTasks(p=>[{ ...form, by:'You', sub_count:'0/20', status:'Open' },...p])
    setShowModal(false); setForm({ title:'', sub:'Engineering', cls:'Alpha Squad', due:'', desc:'' })
    toast(`Task "${form.title}" created!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Tasks</span></div><h1>Tasks</h1><p>Track deliverables and assignments</p></div>
      <div className="card">
        <div className="card-header"><div className="card-title">All Tasks</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> New Task</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Title</th><th>Department</th><th>Team</th><th>Assigned By</th><th>Due Date</th><th>Progress</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{tasks.map((t,i)=>{
            const [done,total]=t.sub_count.split('/').map(Number)
            return <tr key={i}><td className="td-name">{t.title}</td><td>{t.sub}</td><td>{t.cls}</td><td>{t.by}</td><td>{t.due}</td>
              <td><div style={{fontSize:12}}>{t.sub_count}<div className="progress-bar"><div className="progress-fill" style={{width:`${Math.round(done/total*100)}%`}}/></div></div></td>
              <td>{statusBadge(t.status)}</td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setTasks(p=>p.filter((_,j)=>j!==i));toast('Removed.')}}/></td>
            </tr>
          })}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="New Task" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Create</button></>}>
        <div className="form-group"><label>Task Title</label><input className="form-control" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Task title"/></div>
        <div className="form-row"><div className="form-group"><label>Department</label><select className="form-control" value={form.sub} onChange={e=>setForm(f=>({...f,sub:e.target.value}))}>{['Engineering','Product','Marketing','Operations','HR'].map(s=><option key={s}>{s}</option>)}</select></div><div className="form-group"><label>Team</label><select className="form-control" value={form.cls} onChange={e=>setForm(f=>({...f,cls:e.target.value}))}>{['Alpha Squad','Beta Core','Gamma Force','Delta Unit'].map(c=><option key={c}>{c}</option>)}</select></div></div>
        <div className="form-group"><label>Due Date</label><input className="form-control" type="date" value={form.due} onChange={e=>setForm(f=>({...f,due:e.target.value}))}/></div>
        <div className="form-group"><label>Description</label><textarea className="form-control" rows={2} value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="Task details..."/></div>
      </Modal>}
    </div>
  )
}

export function Appraisals() {
  const gradeClass = g => g.startsWith('A')?'grade-A':g.startsWith('B')?'grade-B':g.startsWith('C')?'grade-C':'grade-F'
  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Appraisals</span></div><h1>Appraisals</h1><p>Employee performance ratings</p></div>
      <div className="stats-grid">
        {[
          {v:'82.6%',l:'Avg Score',    icon:'ti-trophy',         bg:'var(--green-light)',c:'var(--green)', chg:'↑ 3.1%', up:true},
          {v:'3',    l:'Top Ratings',  icon:'ti-medal',           bg:'#ede9ff',           c:'var(--purple)'},
          {v:'2',    l:'Needs Coaching',icon:'ti-alert-triangle', bg:'var(--amber-light)',c:'var(--amber)'},
          {v:'1',    l:'Under Review', icon:'ti-circle-x',        bg:'var(--red-light)',  c:'var(--red)'},
        ].map((s,i)=>(
          <div className="stat-card" key={i}><div className="stat-icon" style={{background:s.bg,color:s.c}}><i className={`ti ${s.icon}`} style={{fontSize:22}}/></div><div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div>{s.chg&&<div className={`stat-chg ${s.up?'up':'dn'}`}>{s.chg}</div>}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Employee Appraisals</div><button className="btn btn-outline btn-sm"><i className="ti ti-download"/> Export</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Employee</th><th>Team</th><th>Delivery</th><th>Collab</th><th>Initiative</th><th>Impact</th><th>Avg</th><th>Grade</th><th>Rank</th></tr></thead>
          <tbody>{APPRAISALS.map((r,i)=>{
            const avg=Math.round((r.math+r.sci+r.eng+r.hist)/4)
            return <tr key={i}><td className="td-name">{r.name}</td><td>{r.cls}</td><td>{r.math}</td><td>{r.sci}</td><td>{r.eng}</td><td>{r.hist}</td>
              <td><strong>{avg}%</strong></td><td><span className={gradeClass(r.grade)}>{r.grade}</span></td><td><strong>#{r.rank}</strong></td>
            </tr>
          })}</tbody>
        </table></div>
      </div>
    </div>
  )
}
