import { useState } from 'react'
import { CLIENTS, TEAMS, PROJECTS } from '../data/data'
import { AvatarCircle, ActionBtns } from '../components/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toast'

export function Clients() {
  const [clients, setClients] = useState(CLIENTS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ fn:'', ln:'', phone:'', email:'', occ:'' })

  const add = () => {
    if (!form.fn||!form.ln) { toast('Please enter name.'); return }
    setClients(p=>[{ ...form, id:`CLT${900+p.length}`, children:'N/A' },...p])
    setShowModal(false); setForm({ fn:'', ln:'', phone:'', email:'', occ:'' })
    toast(`Client ${form.fn} ${form.ln} added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Clients</span></div><h1>Clients</h1><p>Client & partner contacts</p></div>
      <div className="card">
        <div className="card-header"><div className="card-title">All Clients</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Add Client</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>ID</th><th>Client</th><th>Assigned To</th><th>Phone</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>{clients.map((c,i)=>(
            <tr key={c.id}><td className="td-id">{c.id}</td>
              <td><div style={{display:'flex',alignItems:'center',gap:10}}><AvatarCircle fn={c.fn} ln={c.ln} index={i}/><div className="td-name">{c.fn} {c.ln}</div></div></td>
              <td>{c.children}</td><td>{c.phone}</td><td style={{color:'var(--blue)'}}>{c.email}</td><td>{c.occ}</td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setClients(x=>x.filter(y=>y.id!==c.id));toast('Removed.')}}/></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Add Client" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Client</button></>}>
        <div className="form-row"><div className="form-group"><label>First Name</label><input className="form-control" value={form.fn} onChange={e=>setForm(f=>({...f,fn:e.target.value}))} placeholder="First name"/></div><div className="form-group"><label>Last Name</label><input className="form-control" value={form.ln} onChange={e=>setForm(f=>({...f,ln:e.target.value}))} placeholder="Last name"/></div></div>
        <div className="form-row"><div className="form-group"><label>Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+1 555-0000"/></div><div className="form-group"><label>Email</label><input className="form-control" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="client@company.com"/></div></div>
        <div className="form-group"><label>Title / Role</label><input className="form-control" value={form.occ} onChange={e=>setForm(f=>({...f,occ:e.target.value}))} placeholder="e.g. CTO"/></div>
      </Modal>}
    </div>
  )
}

export function Teams() {
  const [teams, setTeams] = useState(TEAMS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name:'', grade:'Engineering', teacher:'', room:'', cap:15 })

  const add = () => {
    if (!form.name) { toast('Please enter team name.'); return }
    setTeams(p=>[...p,{ ...form, students:0, cap:parseInt(form.cap)||15, status:'Active' }])
    setShowModal(false); setForm({ name:'', grade:'Engineering', teacher:'', room:'', cap:15 })
    toast(`Team ${form.name} created!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Teams</span></div><h1>Teams</h1><p>Manage departments and squads</p></div>
      <div className="card">
        <div className="card-header"><div className="card-title">All Teams</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> New Team</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Team</th><th>Department</th><th>Lead Manager</th><th>Members</th><th>Capacity</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{teams.map((t,i)=>{
            const pct=Math.round(t.students/t.cap*100)
            return <tr key={i}><td className="td-name">{t.name}</td><td><span className="badge badge-blue">{t.grade}</span></td><td>{t.teacher}</td>
              <td><div>{t.students}<div className="progress-bar"><div className={`progress-fill ${pct>90?'red':pct>75?'amber':'green'}`} style={{width:`${pct}%`}}/></div></div></td>
              <td>{t.cap}</td><td>{t.room}</td><td><span className="badge badge-green">{t.status}</span></td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setTeams(p=>p.filter((_,j)=>j!==i));toast('Removed.')}}/></td>
            </tr>
          })}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Add New Team" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Team</button></>}>
        <div className="form-row"><div className="form-group"><label>Team Name</label><input className="form-control" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Zeta Squad"/></div><div className="form-group"><label>Department</label><select className="form-control" value={form.grade} onChange={e=>setForm(f=>({...f,grade:e.target.value}))}>{['Engineering','Product','Marketing','Operations','Design','HR'].map(g=><option key={g}>{g}</option>)}</select></div></div>
        <div className="form-row"><div className="form-group"><label>Lead Manager</label><input className="form-control" value={form.teacher} onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} placeholder="Manager name"/></div><div className="form-group"><label>Location</label><input className="form-control" value={form.room} onChange={e=>setForm(f=>({...f,room:e.target.value}))} placeholder="Floor 3 — Bay C"/></div></div>
        <div className="form-group"><label>Capacity</label><input className="form-control" type="number" value={form.cap} onChange={e=>setForm(f=>({...f,cap:e.target.value}))} placeholder="15"/></div>
      </Modal>}
    </div>
  )
}

export function Projects() {
  const [projects, setProjects] = useState(PROJECTS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ code:'', name:'', dept:'Engineering', credits:4, teacher:'' })

  const add = () => {
    if (!form.name||!form.code) { toast('Please fill required fields.'); return }
    setProjects(p=>[...p,{ ...form, grades:'Q1-Q4', icon:'📁', color:'#f1efe8', tc:'#5f5e5a' }])
    setShowModal(false); setForm({ code:'', name:'', dept:'Engineering', credits:4, teacher:'' })
    toast(`Project ${form.name} added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Projects</span></div><h1>Projects</h1><p>Active projects and initiatives</p></div>
      <div className="grid-3" style={{marginBottom:20}}>
        {projects.map((p,i)=>(
          <div className="sub-card" key={i}>
            <div style={{width:42,height:42,borderRadius:10,background:p.color,color:p.tc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:10}}>{p.icon}</div>
            <div style={{fontSize:14,fontWeight:700,color:'var(--text)'}}>{p.name}</div>
            <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>{p.dept} · {p.credits} sprints</div>
            <div style={{marginTop:8,fontSize:12,color:'var(--text2)'}}>👤 {p.teacher}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Project Details</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Add Project</button></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Code</th><th>Project</th><th>Department</th><th>Sprints</th><th>Lead</th><th>Quarter</th><th>Actions</th></tr></thead>
          <tbody>{projects.map((p,i)=>(
            <tr key={i}><td className="td-id">{p.code}</td><td className="td-name">{p.name}</td><td><span className="badge badge-blue">{p.dept}</span></td><td><strong>{p.credits}</strong></td><td>{p.teacher}</td><td>{p.grades}</td>
              <td><ActionBtns onView={()=>toast('View')} onEdit={()=>toast('Edit')} onDelete={()=>{setProjects(p=>p.filter((_,j)=>j!==i));toast('Removed.')}}/></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Add Project" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Project</button></>}>
        <div className="form-row"><div className="form-group"><label>Code</label><input className="form-control" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} placeholder="PRJ107"/></div><div className="form-group"><label>Name</label><input className="form-control" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Project Name"/></div></div>
        <div className="form-row"><div className="form-group"><label>Department</label><select className="form-control" value={form.dept} onChange={e=>setForm(f=>({...f,dept:e.target.value}))}>{['Engineering','Product','Marketing','Operations','Design','HR'].map(d=><option key={d}>{d}</option>)}</select></div><div className="form-group"><label>Sprints</label><input className="form-control" type="number" value={form.credits} onChange={e=>setForm(f=>({...f,credits:e.target.value}))} placeholder="4"/></div></div>
        <div className="form-group"><label>Project Lead</label><input className="form-control" value={form.teacher} onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} placeholder="Assigned lead"/></div>
      </Modal>}
    </div>
  )
}
