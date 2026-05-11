import { useState } from 'react'
import { LESSONS, EXAMS, ASSIGNMENTS, RESULTS, STUDENTS } from '../data/data'
import { statusBadge, AvatarCircle, ActionBtns, initials, acBg } from '../components/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toast'

export function Lessons() {
  const [lessons, setLessons] = useState(LESSONS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title:'', sub:'Mathematics', cls:'Class 8A', day:'Monday', time:'08:00', room:'' })

  const add = () => {
    if (!form.title) { toast('Please enter lesson title.'); return }
    setLessons(p=>[{ ...form, teacher:'TBD' },...p])
    setShowModal(false); setForm({ title:'', sub:'Mathematics', cls:'Class 8A', day:'Monday', time:'08:00', room:'' })
    toast(`Lesson "${form.title}" added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Lessons</span></div><h1>Lessons</h1><p>Lesson plans and schedules</p></div>
      <div className="card">
        <div className="card-header"><div className="card-title">Lesson Schedule</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Add Lesson</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Lesson</th><th>Subject</th><th>Teacher</th><th>Class</th><th>Day</th><th>Time</th><th>Room</th><th>Actions</th></tr></thead>
          <tbody>{lessons.map((l,i)=>(
            <tr key={i}><td className="td-name">{l.title}</td><td>{l.sub}</td><td>{l.teacher}</td><td>{l.cls}</td>
              <td><span className="badge badge-purple">{l.day}</span></td><td>{l.time}</td><td>{l.room}</td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setLessons(p=>p.filter((_,j)=>j!==i));toast('Removed.')}}/></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Add Lesson" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Lesson</button></>}>
        <div className="form-group"><label>Lesson Title</label><input className="form-control" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Lesson topic"/></div>
        <div className="form-row"><div className="form-group"><label>Subject</label><select className="form-control" value={form.sub} onChange={e=>setForm(f=>({...f,sub:e.target.value}))}>{['Mathematics','Science','English','History','Arts','Physical Ed.'].map(s=><option key={s}>{s}</option>)}</select></div><div className="form-group"><label>Class</label><select className="form-control" value={form.cls} onChange={e=>setForm(f=>({...f,cls:e.target.value}))}>{['Class 6A','Class 7B','Class 8A','Class 9C','Class 10A'].map(c=><option key={c}>{c}</option>)}</select></div></div>
        <div className="form-row"><div className="form-group"><label>Day</label><select className="form-control" value={form.day} onChange={e=>setForm(f=>({...f,day:e.target.value}))}>{['Monday','Tuesday','Wednesday','Thursday','Friday'].map(d=><option key={d}>{d}</option>)}</select></div><div className="form-group"><label>Start Time</label><input className="form-control" type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/></div></div>
        <div className="form-group"><label>Room</label><input className="form-control" value={form.room} onChange={e=>setForm(f=>({...f,room:e.target.value}))} placeholder="Room number"/></div>
      </Modal>}
    </div>
  )
}

const ATT_STATUSES = ['P','P','P','A','P','L','P','P','H','P','P','P','A','P','P','P','P','L','P','P','P','H','P','P','P','P','A','P','P','P']
const ATT_CLASS_MAP = { P:'att-p', A:'att-a', L:'att-l', H:'att-h' }
const ATT_DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su']

export function Attendance() {
  const [attMap, setAttMap] = useState(() => Object.fromEntries(STUDENTS.slice(0,6).map(s=>[s.id,'P'])))

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Attendance</span></div><h1>Attendance</h1><p>Track and manage student attendance</p></div>
      <div className="stats-grid">
        {[{v:'92.4%',l:'Avg Attendance',icon:'ti-circle-check',bg:'var(--green-light)',c:'var(--green)',chg:'↑ 1.2%',up:true},{v:'58',l:'Absent Today',icon:'ti-circle-x',bg:'var(--red-light)',c:'var(--red)',chg:'↓ 3',up:false},{v:'23',l:'Late Today',icon:'ti-clock',bg:'var(--amber-light)',c:'var(--amber)'},{v:'12',l:'Excused',icon:'ti-file-description',bg:'var(--blue-light)',c:'var(--blue)'}].map((s,i)=>(
          <div className="stat-card" key={i}><div className="stat-icon" style={{background:s.bg,color:s.c}}><i className={`ti ${s.icon}`} style={{fontSize:22}}/></div><div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div>{s.chg&&<div className={`stat-chg ${s.up?'up':'dn'}`}>{s.chg}</div>}</div></div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Mark Attendance — Class 8A</div></div>
          <div className="table-wrap"><table>
            <thead><tr><th>Student</th><th>Status</th><th>Note</th></tr></thead>
            <tbody>{STUDENTS.slice(0,6).map((s,i)=>(
              <tr key={s.id}>
                <td><div style={{display:'flex',alignItems:'center',gap:8}}><AvatarCircle fn={s.fn} ln={s.ln} index={i} size={28}/><span className="td-name">{s.fn} {s.ln}</span></div></td>
                <td><select className="form-control" style={{padding:'5px 8px',fontSize:12,maxWidth:120}} value={attMap[s.id]} onChange={e=>setAttMap(m=>({...m,[s.id]:e.target.value}))}>
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

export function Exams() {
  const [exams, setExams] = useState(EXAMS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title:'', sub:'Mathematics', cls:'Class 8A', date:'', time:'09:00', dur:'', room:'' })

  const add = () => {
    if (!form.title) { toast('Please enter exam title.'); return }
    setExams(p=>[{ ...form, dur:(form.dur||'60')+' min', status:'Upcoming' },...p])
    setShowModal(false); setForm({ title:'', sub:'Mathematics', cls:'Class 8A', date:'', time:'09:00', dur:'', room:'' })
    toast(`Exam "${form.title}" scheduled!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Exams</span></div><h1>Examinations</h1><p>Exam schedule and management</p></div>
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        {[{v:'8',l:'Upcoming',icon:'ti-file-pencil',bg:'#ede9ff',c:'var(--purple)'},{v:'24',l:'Completed',icon:'ti-checks',bg:'var(--teal-light)',c:'var(--teal)'},{v:'3',l:'Results Pending',icon:'ti-hourglass',bg:'var(--amber-light)',c:'var(--amber)'}].map((s,i)=>(
          <div className="stat-card" key={i}><div className="stat-icon" style={{background:s.bg,color:s.c}}><i className={`ti ${s.icon}`} style={{fontSize:22}}/></div><div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div></div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Exam Schedule</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Schedule Exam</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Exam</th><th>Subject</th><th>Class</th><th>Date</th><th>Time</th><th>Duration</th><th>Room</th><th>Status</th></tr></thead>
          <tbody>{exams.map((e,i)=>(
            <tr key={i}><td className="td-name">{e.title}</td><td>{e.sub}</td><td>{e.cls}</td><td>{e.date}</td><td>{e.time}</td><td>{e.dur}</td><td>{e.room}</td><td>{statusBadge(e.status)}</td></tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Schedule Exam" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Schedule</button></>}>
        <div className="form-group"><label>Exam Title</label><input className="form-control" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. Mid-Term Maths"/></div>
        <div className="form-row"><div className="form-group"><label>Subject</label><select className="form-control" value={form.sub} onChange={e=>setForm(f=>({...f,sub:e.target.value}))}>{['Mathematics','Science','English','History'].map(s=><option key={s}>{s}</option>)}</select></div><div className="form-group"><label>Class</label><select className="form-control" value={form.cls} onChange={e=>setForm(f=>({...f,cls:e.target.value}))}>{['Class 8A','Class 7B','Class 9C'].map(c=><option key={c}>{c}</option>)}</select></div></div>
        <div className="form-row"><div className="form-group"><label>Date</label><input className="form-control" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div><div className="form-group"><label>Time</label><input className="form-control" type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/></div></div>
        <div className="form-row"><div className="form-group"><label>Duration (min)</label><input className="form-control" type="number" value={form.dur} onChange={e=>setForm(f=>({...f,dur:e.target.value}))} placeholder="90"/></div><div className="form-group"><label>Room</label><input className="form-control" value={form.room} onChange={e=>setForm(f=>({...f,room:e.target.value}))} placeholder="Hall A"/></div></div>
      </Modal>}
    </div>
  )
}

export function Assignments() {
  const [assignments, setAssignments] = useState(ASSIGNMENTS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title:'', sub:'Mathematics', cls:'Class 8A', due:'', desc:'' })

  const add = () => {
    if (!form.title) { toast('Please enter title.'); return }
    setAssignments(p=>[{ ...form, by:'You', sub_count:'0/30', status:'Open' },...p])
    setShowModal(false); setForm({ title:'', sub:'Mathematics', cls:'Class 8A', due:'', desc:'' })
    toast(`Assignment "${form.title}" created!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Assignments</span></div><h1>Assignments</h1><p>Track homework and assignments</p></div>
      <div className="card">
        <div className="card-header"><div className="card-title">All Assignments</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> New Assignment</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Title</th><th>Subject</th><th>Class</th><th>Assigned By</th><th>Due Date</th><th>Submissions</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{assignments.map((a,i)=>{
            const [done,total]=a.sub_count.split('/').map(Number)
            return <tr key={i}><td className="td-name">{a.title}</td><td>{a.sub}</td><td>{a.cls}</td><td>{a.by}</td><td>{a.due}</td>
              <td><div style={{fontSize:12}}>{a.sub_count}<div className="progress-bar"><div className="progress-fill" style={{width:`${Math.round(done/total*100)}%`}}/></div></div></td>
              <td>{statusBadge(a.status)}</td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setAssignments(p=>p.filter((_,j)=>j!==i));toast('Removed.')}}/></td>
            </tr>
          })}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="New Assignment" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Create</button></>}>
        <div className="form-group"><label>Assignment Title</label><input className="form-control" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Assignment title"/></div>
        <div className="form-row"><div className="form-group"><label>Subject</label><select className="form-control" value={form.sub} onChange={e=>setForm(f=>({...f,sub:e.target.value}))}>{['Mathematics','Science','English','History'].map(s=><option key={s}>{s}</option>)}</select></div><div className="form-group"><label>Class</label><select className="form-control" value={form.cls} onChange={e=>setForm(f=>({...f,cls:e.target.value}))}>{['Class 8A','Class 7B','Class 9C'].map(c=><option key={c}>{c}</option>)}</select></div></div>
        <div className="form-group"><label>Due Date</label><input className="form-control" type="date" value={form.due} onChange={e=>setForm(f=>({...f,due:e.target.value}))}/></div>
        <div className="form-group"><label>Description</label><textarea className="form-control" rows={2} value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="Assignment details..."/></div>
      </Modal>}
    </div>
  )
}

export function Results() {
  const gradeClass = g => g.startsWith('A')?'grade-A':g.startsWith('B')?'grade-B':g.startsWith('C')?'grade-C':'grade-F'
  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Results</span></div><h1>Exam Results</h1><p>Academic performance and grades</p></div>
      <div className="stats-grid">
        {[{v:'78.4%',l:'Average Score',icon:'ti-trophy',bg:'var(--green-light)',c:'var(--green)',chg:'↑ 3.1%',up:true},{v:'142',l:'Distinctions (A)',icon:'ti-medal',bg:'#ede9ff',c:'var(--purple)'},{v:'28',l:'Need Support',icon:'ti-alert-triangle',bg:'var(--amber-light)',c:'var(--amber)'},{v:'9',l:'Failed',icon:'ti-circle-x',bg:'var(--red-light)',c:'var(--red)'}].map((s,i)=>(
          <div className="stat-card" key={i}><div className="stat-icon" style={{background:s.bg,color:s.c}}><i className={`ti ${s.icon}`} style={{fontSize:22}}/></div><div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div>{s.chg&&<div className={`stat-chg ${s.up?'up':'dn'}`}>{s.chg}</div>}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Student Results</div><button className="btn btn-outline btn-sm"><i className="ti ti-download"/> Export</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Student</th><th>Class</th><th>Math</th><th>Science</th><th>English</th><th>History</th><th>Total</th><th>Grade</th><th>Rank</th></tr></thead>
          <tbody>{RESULTS.map((r,i)=>{
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
