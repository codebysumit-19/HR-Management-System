import { useState } from 'react'
import { EMPLOYEES } from '../data/data'
import { statusBadge, AvatarCircle, ActionBtns } from '../components/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toast'

export default function Employees() {
  const [employees, setEmployees] = useState(EMPLOYEES)
  const [search, setSearch] = useState('')
  const [teamFilter, setTeamFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ fn:'', ln:'', team:'Alpha Squad', gender:'Male', manager:'', phone:'', status:'Active' })

  const filtered = employees.filter(e => {
    const name = (e.fn+' '+e.ln).toLowerCase()
    return (!search || name.includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()))
      && (!teamFilter || e.team === teamFilter)
      && (!statusFilter || e.status === statusFilter)
  })

  const total   = employees.length
  const active  = employees.filter(e => e.status === 'Active').length
  const onLeave = employees.filter(e => e.status === 'On Leave').length
  const newThis = 4

  const addEmployee = () => {
    if (!form.fn || !form.ln) { toast('Please enter first and last name.'); return }
    setEmployees(prev => [{ ...form, id:`EMP${900+prev.length}`, grade:'N/A' }, ...prev])
    setShowModal(false)
    setForm({ fn:'', ln:'', team:'Alpha Squad', gender:'Male', manager:'', phone:'', status:'Active' })
    toast(`Employee ${form.fn} ${form.ln} added!`)
  }

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="breadcrumb">Home / <span>Employees</span></div>
        <h1>Employees</h1>
        <p>Manage all workforce members</p>
      </div>

      <div className="stats-grid">
        {[
          { v:String(total),   l:'Total Employees',  icon:'ti-users',           bg:'#ede9ff',           c:'var(--purple)', chg:'↑ 3.2%', up:true },
          { v:String(active),  l:'Active',           icon:'ti-user-check',      bg:'var(--green-light)',c:'var(--green)',  chg:'↑ 1.8%', up:true },
          { v:String(onLeave), l:'On Leave',         icon:'ti-user-exclamation',bg:'var(--amber-light)',c:'var(--amber)'  },
          { v:String(newThis), l:'New This Month',   icon:'ti-user-plus',       bg:'var(--blue-light)', c:'var(--blue)',  chg:'↑ 2 from last', up:true },
        ].map((s,i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background:s.bg, color:s.c }}><i className={`ti ${s.icon}`} style={{fontSize:22}} /></div>
            <div><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div>{s.chg&&<div className={`stat-chg ${s.up?'up':'dn'}`}>{s.chg}</div>}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Employees</div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}><i className="ti ti-plus" /> Add Employee</button>
        </div>
        <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
          <input className="form-control" placeholder="🔍 Search employees..." style={{ maxWidth:240 }} value={search} onChange={e=>setSearch(e.target.value)} />
          <select className="form-control" style={{ maxWidth:150 }} value={teamFilter} onChange={e=>setTeamFilter(e.target.value)}>
            <option value="">All Teams</option>
            {['Alpha Squad','Beta Core','Gamma Force','Delta Unit','Epsilon Hub'].map(t=><option key={t}>{t}</option>)}
          </select>
          <select className="form-control" style={{ maxWidth:130 }} value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            {['Active','Inactive','On Leave'].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Employee</th><th>Team</th><th>Gender</th><th>Manager</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length ? filtered.map((e,i) => (
                <tr key={e.id}>
                  <td className="td-id">{e.id}</td>
                  <td><div style={{display:'flex',alignItems:'center',gap:10}}><AvatarCircle fn={e.fn} ln={e.ln} index={i}/><div><div className="td-name">{e.fn} {e.ln}</div><div style={{fontSize:11,color:'var(--text3)'}}>{e.gender}</div></div></div></td>
                  <td>{e.team}</td><td>{e.gender}</td><td>{e.manager}</td><td>{e.phone}</td>
                  <td>{statusBadge(e.status)}</td>
                  <td><ActionBtns onView={()=>toast('Viewing '+e.fn)} onEdit={()=>toast('Editing '+e.fn)} onDelete={()=>{setEmployees(p=>p.filter(x=>x.id!==e.id));toast('Employee removed.')}}/></td>
                </tr>
              )) : <tr><td colSpan={8} style={{textAlign:'center',padding:30,color:'var(--text3)'}}>No employees found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal title="Add New Employee" onClose={() => setShowModal(false)}
          footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={addEmployee}>Add Employee</button></>}>
          <div className="form-row">
            <div className="form-group"><label>First Name</label><input className="form-control" value={form.fn} onChange={e=>setForm(f=>({...f,fn:e.target.value}))} placeholder="First name"/></div>
            <div className="form-group"><label>Last Name</label><input className="form-control" value={form.ln} onChange={e=>setForm(f=>({...f,ln:e.target.value}))} placeholder="Last name"/></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Gender</label><select className="form-control" value={form.gender} onChange={e=>setForm(f=>({...f,gender:e.target.value}))}><option>Male</option><option>Female</option></select></div>
            <div className="form-group"><label>Team</label><select className="form-control" value={form.team} onChange={e=>setForm(f=>({...f,team:e.target.value}))}>{['Alpha Squad','Beta Core','Gamma Force','Delta Unit','Epsilon Hub'].map(t=><option key={t}>{t}</option>)}</select></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Manager</label><input className="form-control" value={form.manager} onChange={e=>setForm(f=>({...f,manager:e.target.value}))} placeholder="Manager name"/></div>
            <div className="form-group"><label>Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+91 98100-00000"/></div>
          </div>
        </Modal>
      )}
    </div>
  )
}
