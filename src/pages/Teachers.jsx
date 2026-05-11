// Teachers.jsx
import { useState } from 'react'
import { TEACHERS } from '../data/data'
import { statusBadge, AvatarCircle, ActionBtns } from '../components/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toast'

export function Teachers() {
  const [teachers, setTeachers] = useState(TEACHERS)
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ fn:'', ln:'', dept:'Mathematics', subject:'', email:'', phone:'', exp:'' })

  const filtered = teachers.filter(t =>
    (!search || (t.fn+' '+t.ln).toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()))
    && (!dept || t.dept === dept)
  )

  const add = () => {
    if (!form.fn||!form.ln) { toast('Please enter name.'); return }
    setTeachers(p => [{ ...form, id:`TCH${900+p.length}`, classes:'TBD', exp:(form.exp||'0')+' yrs', status:'Active' }, ...p])
    setShowModal(false); setForm({ fn:'', ln:'', dept:'Mathematics', subject:'', email:'', phone:'', exp:'' })
    toast(`Teacher ${form.fn} ${form.ln} added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header"><div className="breadcrumb">Home / <span>Teachers</span></div><h1>Teachers</h1><p>Faculty & staff management</p></div>
      <div className="stats-grid">
        {[{v:'89',l:'Total Teachers',icon:'ti-school',bg:'#ede9ff',c:'var(--purple)'},{v:'82',l:'Active',icon:'ti-circle-check',bg:'var(--green-light)',c:'var(--green)'},{v:'67',l:'Certified',icon:'ti-certificate',bg:'var(--blue-light)',c:'var(--blue)'},{v:'12',l:'Senior Staff',icon:'ti-award',bg:'var(--amber-light)',c:'var(--amber)'}].map((s,i)=>(
          <div className="stat-card" key={i}><div className="stat-icon" style={{background:s.bg,color:s.c}}><i className={`ti ${s.icon}`} style={{fontSize:22}}/></div><div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div></div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">All Teachers</div><button className="btn btn-primary btn-sm" onClick={()=>setShowModal(true)}><i className="ti ti-plus"/> Add Teacher</button></div>
        <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap'}}>
          <input className="form-control" placeholder="🔍 Search teachers..." style={{maxWidth:240}} value={search} onChange={e=>setSearch(e.target.value)}/>
          <select className="form-control" style={{maxWidth:160}} value={dept} onChange={e=>setDept(e.target.value)}>
            <option value="">All Departments</option>
            {['Mathematics','Science','English','History','Arts','PE'].map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="table-wrap"><table>
          <thead><tr><th>ID</th><th>Teacher</th><th>Department</th><th>Subject</th><th>Classes</th><th>Experience</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{filtered.map((t,i)=>(
            <tr key={t.id}>
              <td className="td-id">{t.id}</td>
              <td><div style={{display:'flex',alignItems:'center',gap:10}}><AvatarCircle fn={t.fn} ln={t.ln} index={i}/><div className="td-name">{t.fn} {t.ln}</div></div></td>
              <td><span className="badge badge-blue">{t.dept}</span></td><td>{t.subject}</td><td>{t.classes}</td><td>{t.exp}</td>
              <td>{statusBadge(t.status)}</td>
              <td><ActionBtns onView={()=>toast('Viewing '+t.fn)} onEdit={()=>toast('Editing '+t.fn)} onDelete={()=>{setTeachers(p=>p.filter(x=>x.id!==t.id));toast('Teacher removed.')}}/></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal&&<Modal title="Add New Teacher" onClose={()=>setShowModal(false)} footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={add}>Add Teacher</button></>}>
        <div className="form-row"><div className="form-group"><label>First Name</label><input className="form-control" value={form.fn} onChange={e=>setForm(f=>({...f,fn:e.target.value}))} placeholder="First name"/></div><div className="form-group"><label>Last Name</label><input className="form-control" value={form.ln} onChange={e=>setForm(f=>({...f,ln:e.target.value}))} placeholder="Last name"/></div></div>
        <div className="form-row"><div className="form-group"><label>Department</label><select className="form-control" value={form.dept} onChange={e=>setForm(f=>({...f,dept:e.target.value}))}>{['Mathematics','Science','English','History','Arts','PE'].map(d=><option key={d}>{d}</option>)}</select></div><div className="form-group"><label>Subject</label><input className="form-control" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="e.g. Algebra"/></div></div>
        <div className="form-row"><div className="form-group"><label>Email</label><input className="form-control" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="teacher@school.edu"/></div><div className="form-group"><label>Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+1 555-0000"/></div></div>
        <div className="form-group"><label>Experience (years)</label><input className="form-control" type="number" value={form.exp} onChange={e=>setForm(f=>({...f,exp:e.target.value}))} placeholder="5"/></div>
      </Modal>}
    </div>
  )
}
