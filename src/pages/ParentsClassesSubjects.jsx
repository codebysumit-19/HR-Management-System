import { useState } from 'react'
import { PARENTS, CLASSES, SUBJECTS } from '../data/data'
import { AvatarCircle, ActionBtns } from '../components/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toast'

export function Parents() {
  const [parents, setParents] = useState(PARENTS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ fn:'', ln:'', phone:'', email:'', occ:'' })

  const add = () => {
    if (!form.fn||!form.ln) { toast('Please enter name.'); return }
    setParents(p=>[{ ...form, id:`PAR${900+p.length}`, children:'N/A' },...p])
    setShowModal(false); setForm({ fn:'', ln:'', phone:'', email:'', occ:'' })
    toast(`Parent ${form.fn} ${form.ln} added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Parents</span></div><h1>Parents</h1><p>Parent & guardian information</p></div>
      <div className="card">
        <div className="card-header"><div className="card-title">All Parents</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Add Parent</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>ID</th><th>Parent</th><th>Children</th><th>Phone</th><th>Email</th><th>Occupation</th><th>Actions</th></tr></thead>
          <tbody>{parents.map((p,i)=>(
            <tr key={p.id}><td className="td-id">{p.id}</td>
              <td><div style={{display:'flex',alignItems:'center',gap:10}}><AvatarCircle fn={p.fn} ln={p.ln} index={i}/><div className="td-name">{p.fn} {p.ln}</div></div></td>
              <td>{p.children}</td><td>{p.phone}</td><td style={{color:'var(--blue)'}}>{p.email}</td><td>{p.occ}</td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setParents(x=>x.filter(y=>y.id!==p.id));toast('Removed.')}}/></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Add Parent" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Parent</button></>}>
        <div className="form-row"><div className="form-group"><label>First Name</label><input className="form-control" value={form.fn} onChange={e=>setForm(f=>({...f,fn:e.target.value}))} placeholder="First name"/></div><div className="form-group"><label>Last Name</label><input className="form-control" value={form.ln} onChange={e=>setForm(f=>({...f,ln:e.target.value}))} placeholder="Last name"/></div></div>
        <div className="form-row"><div className="form-group"><label>Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+1 555-0000"/></div><div className="form-group"><label>Email</label><input className="form-control" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="parent@email.com"/></div></div>
        <div className="form-group"><label>Occupation</label><input className="form-control" value={form.occ} onChange={e=>setForm(f=>({...f,occ:e.target.value}))} placeholder="Occupation"/></div>
      </Modal>}
    </div>
  )
}

export function Classes() {
  const [classes, setClasses] = useState(CLASSES)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name:'', grade:'Grade 6', teacher:'', room:'', cap:35 })

  const add = () => {
    if (!form.name) { toast('Please enter class name.'); return }
    setClasses(p=>[...p,{ ...form, students:0, cap:parseInt(form.cap)||35, status:'Active' }])
    setShowModal(false); setForm({ name:'', grade:'Grade 6', teacher:'', room:'', cap:35 })
    toast(`Class ${form.name} created!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Classes</span></div><h1>Classes</h1><p>Manage school classes and sections</p></div>
      <div className="card">
        <div className="card-header"><div className="card-title">All Classes</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> New Class</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Class</th><th>Grade</th><th>Class Teacher</th><th>Students</th><th>Capacity</th><th>Room</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{classes.map((c,i)=>{
            const pct=Math.round(c.students/c.cap*100)
            return <tr key={i}><td className="td-name">{c.name}</td><td><span className="badge badge-blue">{c.grade}</span></td><td>{c.teacher}</td>
              <td><div>{c.students}<div className="progress-bar"><div className={`progress-fill ${pct>90?'red':pct>75?'amber':'green'}`} style={{width:`${pct}%`}}/></div></div></td>
              <td>{c.cap}</td><td>{c.room}</td><td><span className="badge badge-green">{c.status}</span></td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setClasses(p=>p.filter((_,j)=>j!==i));toast('Removed.')}}/></td>
            </tr>
          })}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Add New Class" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Class</button></>}>
        <div className="form-row"><div className="form-group"><label>Class Name</label><input className="form-control" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Class 11A"/></div><div className="form-group"><label>Grade Level</label><select className="form-control" value={form.grade} onChange={e=>setForm(f=>({...f,grade:e.target.value}))}>{['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11'].map(g=><option key={g}>{g}</option>)}</select></div></div>
        <div className="form-row"><div className="form-group"><label>Class Teacher</label><input className="form-control" value={form.teacher} onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} placeholder="Teacher name"/></div><div className="form-group"><label>Room</label><input className="form-control" value={form.room} onChange={e=>setForm(f=>({...f,room:e.target.value}))} placeholder="Room 201"/></div></div>
        <div className="form-group"><label>Capacity</label><input className="form-control" type="number" value={form.cap} onChange={e=>setForm(f=>({...f,cap:e.target.value}))} placeholder="35"/></div>
      </Modal>}
    </div>
  )
}

export function Subjects() {
  const [subjects, setSubjects] = useState(SUBJECTS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ code:'', name:'', dept:'Mathematics', credits:4, teacher:'' })

  const add = () => {
    if (!form.name||!form.code) { toast('Please fill required fields.'); return }
    setSubjects(p=>[...p,{ ...form, grades:'6-10', icon:'📚', color:'#f1efe8', tc:'#5f5e5a' }])
    setShowModal(false); setForm({ code:'', name:'', dept:'Mathematics', credits:4, teacher:'' })
    toast(`Subject ${form.name} added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Subjects</span></div><h1>Subjects</h1><p>Curriculum and subject management</p></div>
      <div className="grid-3" style={{marginBottom:20}}>
        {subjects.map((s,i)=>(
          <div className="sub-card" key={i}>
            <div style={{width:42,height:42,borderRadius:10,background:s.color,color:s.tc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:10}}>{s.icon}</div>
            <div style={{fontSize:14,fontWeight:700,color:'var(--text)'}}>{s.name}</div>
            <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>{s.dept} · {s.credits} credits</div>
            <div style={{marginTop:8,fontSize:12,color:'var(--text2)'}}>👤 {s.teacher}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Subject Details</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Add Subject</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Code</th><th>Subject</th><th>Department</th><th>Credits</th><th>Teacher</th><th>Grades</th><th>Actions</th></tr></thead>
          <tbody>{subjects.map((s,i)=>(
            <tr key={i}><td className="td-id">{s.code}</td><td className="td-name">{s.name}</td><td><span className="badge badge-blue">{s.dept}</span></td><td><strong>{s.credits}</strong></td><td>{s.teacher}</td><td>Grades {s.grades}</td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setSubjects(p=>p.filter((_,j)=>j!==i));toast('Removed.')}}/></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Add Subject" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Subject</button></>}>
        <div className="form-row"><div className="form-group"><label>Code</label><input className="form-control" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} placeholder="MTH101"/></div><div className="form-group"><label>Name</label><input className="form-control" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Mathematics"/></div></div>
        <div className="form-row"><div className="form-group"><label>Department</label><select className="form-control" value={form.dept} onChange={e=>setForm(f=>({...f,dept:e.target.value}))}>{['Mathematics','Science','English','History','Arts'].map(d=><option key={d}>{d}</option>)}</select></div><div className="form-group"><label>Credits</label><input className="form-control" type="number" value={form.credits} onChange={e=>setForm(f=>({...f,credits:e.target.value}))} placeholder="4"/></div></div>
        <div className="form-group"><label>Teacher</label><input className="form-control" value={form.teacher} onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} placeholder="Assigned teacher"/></div>
      </Modal>}
    </div>
  )
}
