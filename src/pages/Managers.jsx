import { useState } from 'react'
import { MANAGERS } from '../data/data'
import { statusBadge, AvatarCircle, ActionBtns } from '../components/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toast'

export function Managers() {
  const [managers, setManagers] = useState(MANAGERS)
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ fn:'', ln:'', dept:'Engineering', subject:'', email:'', phone:'', exp:'' })

  const filtered = managers.filter(m =>
    (!search || (m.fn+' '+m.ln).toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase()))
    && (!dept || m.dept === dept)
  )

  const add = () => {
    if (!form.fn||!form.ln) { toast('Please enter name.'); return }
    setManagers(p => [{ ...form, id:`MGR${900+p.length}`, classes:'TBD', exp:(form.exp||'0')+' yrs', status:'Active' }, ...p])
    setShowModal(false); setForm({ fn:'', ln:'', dept:'Engineering', subject:'', email:'', phone:'', exp:'' })
    toast(`Manager ${form.fn} ${form.ln} added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Managers</span></div><h1>Managers</h1><p>Leadership & department heads</p></div>
      <div className="stats-grid">
        {[
          {v:String(managers.length),l:'Total Managers',  icon:'ti-briefcase',    bg:'#ede9ff',           c:'var(--purple)'},
          {v:String(managers.filter(m=>m.status==='Active').length),l:'Active',icon:'ti-circle-check',bg:'var(--green-light)',c:'var(--green)'},
          {v:'5',l:'Departments',icon:'ti-building',bg:'var(--blue-light)',c:'var(--blue)'},
          {v:'3', l:'Senior Level',icon:'ti-award',bg:'var(--amber-light)',c:'var(--amber)'}
        ].map((s,i)=>(
          <div className="stat-card" key={i}><div className="stat-icon" style={{background:s.bg,color:s.c}}><i className={`ti ${s.icon}`} style={{fontSize:22}}/></div><div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div></div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">All Managers</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Add Manager</button></div>
        <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap'}}>
          <input className="form-control" placeholder="🔍 Search managers..." style={{maxWidth:240}} value={search} onChange={e=>setSearch(e.target.value)}/>
          <select className="form-control" style={{maxWidth:160}} value={dept} onChange={e=>setDept(e.target.value)}>
            <option value="">All Departments</option>
            {['Engineering','Product','Marketing','Operations','Design','HR'].map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="table-wrap"><table>
          <thead><tr><th>ID</th><th>Manager</th><th>Department</th><th>Specialty</th><th>Teams</th><th>Experience</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{filtered.map((m,i)=>(
            <tr key={m.id}>
              <td className="td-id">{m.id}</td>
              <td><div style={{display:'flex',alignItems:'center',gap:10}}><AvatarCircle fn={m.fn} ln={m.ln} index={i}/><div className="td-name">{m.fn} {m.ln}</div></div></td>
              <td><span className="badge badge-blue">{m.dept}</span></td><td>{m.subject}</td><td>{m.classes}</td><td>{m.exp}</td>
              <td>{statusBadge(m.status)}</td>
              <td><ActionBtns onView={()=>toast('Viewing '+m.fn)} onEdit={()=>toast('Editing '+m.fn)} onDelete={()=>{setManagers(p=>p.filter(x=>x.id!==m.id));toast('Manager removed.')}}/></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Add New Manager" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Manager</button></>}>
        <div className="form-row"><div className="form-group"><label>First Name</label><input className="form-control" value={form.fn} onChange={e=>setForm(f=>({...f,fn:e.target.value}))} placeholder="First name"/></div><div className="form-group"><label>Last Name</label><input className="form-control" value={form.ln} onChange={e=>setForm(f=>({...f,ln:e.target.value}))} placeholder="Last name"/></div></div>
        <div className="form-row"><div className="form-group"><label>Department</label><select className="form-control" value={form.dept} onChange={e=>setForm(f=>({...f,dept:e.target.value}))}>{['Engineering','Product','Marketing','Operations','Design','HR'].map(d=><option key={d}>{d}</option>)}</select></div><div className="form-group"><label>Specialty</label><input className="form-control" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="e.g. Cloud Infrastructure"/></div></div>
        <div className="form-row"><div className="form-group"><label>Email</label><input className="form-control" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="manager@worknexus.io"/></div><div className="form-group"><label>Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+1 555-0000"/></div></div>
        <div className="form-group"><label>Experience (years)</label><input className="form-control" type="number" value={form.exp} onChange={e=>setForm(f=>({...f,exp:e.target.value}))} placeholder="5"/></div>
      </Modal>}
    </div>
  )
}
