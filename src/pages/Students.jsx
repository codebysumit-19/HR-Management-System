import { useState } from 'react'
import { STUDENTS } from '../data/data'
import { statusBadge, AvatarCircle, ActionBtns } from '../components/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toast'

export default function Students() {
  const [students, setStudents] = useState(STUDENTS)
  const [search, setSearch] = useState('')
  const [clsFilter, setClsFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ fn:'', ln:'', cls:'Class 8A', gender:'Male', parent:'', phone:'', status:'Active' })

  const filtered = students.filter(s => {
    const name = (s.fn+' '+s.ln).toLowerCase()
    return (!search || name.includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))
      && (!clsFilter || s.cls === clsFilter)
      && (!statusFilter || s.status === statusFilter)
  })

  const addStudent = () => {
    if (!form.fn || !form.ln) { toast('Please enter first and last name.'); return }
    setStudents(prev => [{ ...form, id: `STU${900+prev.length}`, grade:'N/A' }, ...prev])
    setShowModal(false)
    setForm({ fn:'', ln:'', cls:'Class 8A', gender:'Male', parent:'', phone:'', status:'Active' })
    toast(`Student ${form.fn} ${form.ln} added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="breadcrumb">Home / <span>Students</span></div>
        <h1>Students</h1>
        <p>Manage all enrolled students</p>
      </div>

      <div className="stats-grid">
        {[
          { v:'1,247', l:'Total Students', icon:'ti-users',           bg:'#ede9ff',          c:'var(--purple)', chg:'↑ 3.2%', up:true },
          { v:'1,189', l:'Active',         icon:'ti-user-check',      bg:'var(--green-light)',c:'var(--green)',  chg:'↑ 1.8%', up:true },
          { v:'38',    l:'On Leave',        icon:'ti-user-exclamation',bg:'var(--amber-light)',c:'var(--amber)' },
          { v:'20',    l:'New This Month',  icon:'ti-user-plus',       bg:'var(--blue-light)', c:'var(--blue)',  chg:'↑ 5 from last', up:true },
        ].map((s,i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background:s.bg, color:s.c }}><i className={`ti ${s.icon}`} style={{fontSize:22}} /></div>
            <div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div>{s.chg&&<div className={`stat-chg ${s.up?'up':'dn'}`}>{s.chg}</div>}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Students</div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}><i className="ti ti-plus" /> Add Student</button>
        </div>
        <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
          <input className="form-control" placeholder="🔍 Search students..." style={{ maxWidth:240 }} value={search} onChange={e=>setSearch(e.target.value)} />
          <select className="form-control" style={{ maxWidth:140 }} value={clsFilter} onChange={e=>setClsFilter(e.target.value)}>
            <option value="">All Classes</option>
            {['Class 6A','Class 7B','Class 8A','Class 9C','Class 10A'].map(c=><option key={c}>{c}</option>)}
          </select>
          <select className="form-control" style={{ maxWidth:130 }} value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            {['Active','Inactive','On Leave'].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Student</th><th>Class</th><th>Gender</th><th>Parent</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length ? filtered.map((s,i) => (
                <tr key={s.id}>
                  <td className="td-id">{s.id}</td>
                  <td><div style={{display:'flex',alignItems:'center',gap:10}}><AvatarCircle fn={s.fn} ln={s.ln} index={i}/><div><div className="td-name">{s.fn} {s.ln}</div><div style={{fontSize:11,color:'var(--text3)'}}>{s.gender}</div></div></div></td>
                  <td>{s.cls}</td><td>{s.gender}</td><td>{s.parent}</td><td>{s.phone}</td>
                  <td>{statusBadge(s.status)}</td>
                  <td><ActionBtns onView={()=>toast('Viewing '+s.fn)} onEdit={()=>toast('Editing '+s.fn)} onDelete={()=>{setStudents(p=>p.filter(x=>x.id!==s.id));toast('Student removed.')}}/></td>
                </tr>
              )) : <tr><td colSpan={8} style={{textAlign:'center',padding:30,color:'var(--text3)'}}>No students found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal title="Add New Student" onClose={() => setShowModal(false)}
          footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={addStudent}>Add Student</button></>}>
          <div className="form-row">
            <div className="form-group"><label>First Name</label><input className="form-control" value={form.fn} onChange={e=>setForm(f=>({...f,fn:e.target.value}))} placeholder="First name"/></div>
            <div className="form-group"><label>Last Name</label><input className="form-control" value={form.ln} onChange={e=>setForm(f=>({...f,ln:e.target.value}))} placeholder="Last name"/></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Gender</label><select className="form-control" value={form.gender} onChange={e=>setForm(f=>({...f,gender:e.target.value}))}><option>Male</option><option>Female</option></select></div>
            <div className="form-group"><label>Class</label><select className="form-control" value={form.cls} onChange={e=>setForm(f=>({...f,cls:e.target.value}))}>{['Class 6A','Class 7B','Class 8A','Class 9C','Class 10A'].map(c=><option key={c}>{c}</option>)}</select></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Parent Name</label><input className="form-control" value={form.parent} onChange={e=>setForm(f=>({...f,parent:e.target.value}))} placeholder="Parent full name"/></div>
            <div className="form-group"><label>Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+1 555-0000"/></div>
          </div>
        </Modal>
      )}
    </div>
  )
}
