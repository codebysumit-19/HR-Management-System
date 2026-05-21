export const DEMO_ACCOUNTS = {
  admin:    { email: 'admin@worknexus.io',    pass: '123456', firstName: 'Alex',   lastName: 'Morgan',  role: 'admin' },
  manager:  { email: 'manager@worknexus.io',  pass: '123456', firstName: 'Jordan', lastName: 'Hayes',   role: 'manager' },
  employee: { email: 'employee@worknexus.io', pass: '123456', firstName: 'Casey',  lastName: 'Rivera',  role: 'employee' },
  client:   { email: 'client@worknexus.io',   pass: '123456', firstName: 'Taylor', lastName: 'Bennett', role: 'client' },
}

export const ROLES = {
  admin:    { label: 'Administrator', pages: ['dashboard','employees','managers','clients','teams','projects','meetings','attendance','reviews','tasks','appraisals','events','messages','announcements','settings'] },
  manager:  { label: 'Manager',       pages: ['dashboard','employees','teams','projects','meetings','attendance','reviews','tasks','appraisals','events','messages','announcements'] },
  employee: { label: 'Employee',      pages: ['dashboard','teams','projects','meetings','attendance','reviews','tasks','appraisals','events','messages'] },
  client:   { label: 'Client',        pages: ['dashboard','attendance','appraisals','events','messages','announcements'] },
}

export const NAV_ITEMS = [
  { id: 'dashboard',     icon: 'ti-layout-dashboard', label: 'Dashboard',     section: 'MAIN' },
  { id: 'employees',     icon: 'ti-users',            label: 'Employees',     section: 'WORKFORCE' },
  { id: 'managers',      icon: 'ti-briefcase',        label: 'Managers',      section: 'WORKFORCE' },
  { id: 'clients',       icon: 'ti-building-store',   label: 'Clients',       section: 'WORKFORCE' },
  { id: 'teams',         icon: 'ti-building',         label: 'Teams',         section: 'ORGANIZATION' },
  { id: 'projects',      icon: 'ti-folder',           label: 'Projects',      section: 'OPERATIONS' },
  { id: 'meetings',      icon: 'ti-notebook',         label: 'Meetings',      section: 'OPERATIONS' },
  { id: 'attendance',    icon: 'ti-calendar-check',   label: 'Attendance',    section: 'RECORDS' },
  { id: 'reviews',       icon: 'ti-file-pencil',      label: 'Reviews',       section: 'RECORDS' },
  { id: 'tasks',         icon: 'ti-clipboard-list',   label: 'Tasks',         section: 'RECORDS' },
  { id: 'appraisals',    icon: 'ti-chart-bar',        label: 'Appraisals',    section: 'RECORDS' },
  { id: 'events',        icon: 'ti-calendar-event',   label: 'Events',        section: 'COMMUNICATION' },
  { id: 'messages',      icon: 'ti-message-circle',   label: 'Messages',      section: 'COMMUNICATION', badge: '5' },
  { id: 'announcements', icon: 'ti-speakerphone',     label: 'Announcements', section: 'COMMUNICATION' },
  { id: 'settings',      icon: 'ti-settings',         label: 'Settings',      section: 'SYSTEM' },
]

export const AVATAR_COLORS = [
  ['#ede9ff','#6c63ff'], ['#e1f5ee','#0f9d74'], ['#faece7','#d85a30'],
  ['#e6f1fb','#185fa5'], ['#faeeda','#ba7517'], ['#eaf3de','#3b6d11'], ['#fbeaf0','#993556'],
]

export const EMPLOYEES = [
  { id:'EMP001', fn:'Priya',  ln:'Sharma',  team:'Alpha Squad',  gender:'Female', manager:'Jordan Hayes', phone:'+91 98100-10001', status:'Active',   grade:'A'  },
  { id:'EMP002', fn:'Rohan',  ln:'Verma',   team:'Beta Core',    gender:'Male',   manager:'Jordan Hayes', phone:'+91 98100-10002', status:'Active',   grade:'B+' },
  { id:'EMP003', fn:'Ananya', ln:'Nair',    team:'Gamma Force',  gender:'Female', manager:'Sam Patel',    phone:'+91 98100-10003', status:'Active',   grade:'A-' },
  { id:'EMP004', fn:'Vikram', ln:'Singh',   team:'Delta Unit',   gender:'Male',   manager:'Nina Kapoor',  phone:'+91 98100-10004', status:'On Leave', grade:'B'  },
  { id:'EMP005', fn:'Meera',  ln:'Iyer',    team:'Alpha Squad',  gender:'Female', manager:'Jordan Hayes', phone:'+91 98100-10005', status:'Active',   grade:'A+' },
  { id:'EMP006', fn:'Arjun',  ln:'Mehta',   team:'Epsilon Hub',  gender:'Male',   manager:'Sam Patel',    phone:'+91 98100-10006', status:'Active',   grade:'B-' },
  { id:'EMP007', fn:'Divya',  ln:'Reddy',   team:'Beta Core',    gender:'Female', manager:'Nina Kapoor',  phone:'+91 98100-10007', status:'Inactive', grade:'C+' },
  { id:'EMP008', fn:'Karan',  ln:'Joshi',   team:'Gamma Force',  gender:'Male',   manager:'Jordan Hayes', phone:'+91 98100-10008', status:'Active',   grade:'A'  },
]

export const MANAGERS = [
  { id:'MGR001', fn:'Jordan', ln:'Hayes',  dept:'Engineering', subject:'Full-Stack Development',  classes:'Alpha, Beta',    exp:'8 yrs',  status:'Active' },
  { id:'MGR002', fn:'Sam',    ln:'Patel',  dept:'Product',     subject:'Product Strategy & UX',   classes:'Gamma, Epsilon', exp:'12 yrs', status:'Active' },
  { id:'MGR003', fn:'Nina',   ln:'Kapoor', dept:'Operations',  subject:'Process & Compliance',    classes:'Delta, Zeta',    exp:'5 yrs',  status:'Active' },
  { id:'MGR004', fn:'Ethan',  ln:'Clarke', dept:'Marketing',   subject:'Brand & Growth Strategy', classes:'Iota, Kappa',    exp:'15 yrs', status:'Active' },
  { id:'MGR005', fn:'Shreya', ln:'Gupta',  dept:'Design',      subject:'UI/UX & Creative',        classes:'Lambda, Mu',     exp:'7 yrs',  status:'On Leave' },
  { id:'MGR006', fn:'Omar',   ln:'Farooq', dept:'HR',          subject:'Talent & Culture',        classes:'All teams',      exp:'10 yrs', status:'Active' },
]

export const TEAMS = [
  { name:'Alpha Squad', grade:'Engineering', teacher:'Jordan Hayes', students:12, cap:15, room:'Floor 3 — Bay A',  status:'Active' },
  { name:'Beta Core',   grade:'Engineering', teacher:'Jordan Hayes', students:10, cap:15, room:'Floor 3 — Bay B',  status:'Active' },
  { name:'Gamma Force', grade:'Product',     teacher:'Sam Patel',    students:14, cap:15, room:'Floor 2 — Hub 1',  status:'Active' },
  { name:'Delta Unit',  grade:'Operations',  teacher:'Nina Kapoor',  students:8,  cap:15, room:'Floor 4 — Wing A', status:'Active' },
  { name:'Epsilon Hub', grade:'Marketing',   teacher:'Ethan Clarke', students:11, cap:15, room:'Floor 2 — Hub 2',  status:'Active' },
]

export const PROJECTS = [
  { code:'PRJ101', name:'Nexus Platform', dept:'Engineering', credits:4, teacher:'Jordan Hayes', grades:'Q1-Q4', icon:'🖥️', color:'#ede9ff', tc:'#6c63ff' },
  { code:'PRJ102', name:'DataSync API',   dept:'Product',     credits:4, teacher:'Sam Patel',    grades:'Q2-Q3', icon:'🔗', color:'#e1f5ee', tc:'#0f9d74' },
  { code:'PRJ103', name:'Brand Revamp',   dept:'Marketing',   credits:3, teacher:'Ethan Clarke', grades:'Q1-Q2', icon:'🎨', color:'#e6f1fb', tc:'#185fa5' },
  { code:'PRJ104', name:'HR Portal',      dept:'HR',          credits:3, teacher:'Omar Farooq',  grades:'Q3-Q4', icon:'📋', color:'#faeeda', tc:'#ba7517' },
  { code:'PRJ105', name:'UX Overhaul',    dept:'Design',      credits:2, teacher:'Shreya Gupta', grades:'Q2-Q4', icon:'✏️', color:'#fbeaf0', tc:'#993556' },
  { code:'PRJ106', name:'Client Portal',  dept:'Operations',  credits:2, teacher:'Nina Kapoor',  grades:'Q1-Q4', icon:'🏢', color:'#eaf3de', tc:'#3b6d11' },
]

export const MEETINGS = [
  { title:'Sprint Planning',         sub:'Engineering', teacher:'Jordan Hayes', cls:'Alpha Squad', day:'Monday',    time:'09:00-10:00', room:'Room 301'     },
  { title:'Product Roadmap Review',  sub:'Product',     teacher:'Sam Patel',    cls:'Gamma Force', day:'Monday',    time:'10:00-11:00', room:'Conf Room A'  },
  { title:'Brand Campaign Kickoff',  sub:'Marketing',   teacher:'Ethan Clarke', cls:'Epsilon Hub', day:'Tuesday',   time:'09:00-10:00', room:'Boardroom'    },
  { title:'Q2 Ops Review',           sub:'Operations',  teacher:'Nina Kapoor',  cls:'Delta Unit',  day:'Tuesday',   time:'11:00-12:00', room:'Room 202'     },
  { title:'UX Workshop',             sub:'Design',      teacher:'Shreya Gupta', cls:'Beta Core',   day:'Wednesday', time:'14:00-15:00', room:'Design Lab'   },
  { title:'All Hands Meeting',       sub:'HR',          teacher:'Omar Farooq',  cls:'All Teams',   day:'Thursday',  time:'16:00-17:00', room:'Main Hall'    },
]

export const REVIEWS = [
  { title:'Q2 Engineering Review',  sub:'Engineering', cls:'Alpha Squad', date:'May 12, 2025', time:'09:00', dur:'90 min',  room:'Hall A',      status:'Upcoming'  },
  { title:'Product KPI Audit',      sub:'Product',     cls:'Gamma Force', date:'May 14, 2025', time:'10:00', dur:'60 min',  room:'Conf Room A', status:'Upcoming'  },
  { title:'Ops Compliance Check',   sub:'Operations',  cls:'Delta Unit',  date:'May 8, 2025',  time:'09:00', dur:'120 min', room:'Room 202',    status:'Completed' },
  { title:'Marketing ROI Review',   sub:'Marketing',   cls:'Epsilon Hub', date:'Apr 25, 2025', time:'11:00', dur:'90 min',  room:'Boardroom',   status:'Completed' },
  { title:'Annual HR Assessment',   sub:'HR',          cls:'All Teams',   date:'May 20, 2025', time:'08:00', dur:'120 min', room:'Main Hall',   status:'Upcoming'  },
]

export const TASKS = [
  { title:'API Integration Sprint', sub:'Engineering', cls:'Alpha Squad', by:'Jordan Hayes', due:'May 13, 2025', sub_count:'28/34', status:'Open'   },
  { title:'Wireframe Delivery',     sub:'Design',      cls:'Beta Core',   by:'Shreya Gupta', due:'May 10, 2025', sub_count:'25/30', status:'Open'   },
  { title:'Campaign Brief',         sub:'Marketing',   cls:'Epsilon Hub', by:'Ethan Clarke', due:'May 7, 2025',  sub_count:'32/32', status:'Closed' },
  { title:'Process Documentation',  sub:'Operations',  cls:'Delta Unit',  by:'Nina Kapoor',  due:'May 15, 2025', sub_count:'20/28', status:'Open'   },
  { title:'Talent Pipeline Report', sub:'HR',          cls:'All Teams',   by:'Omar Farooq',  due:'May 17, 2025', sub_count:'15/30', status:'Open'   },
]

export const APPRAISALS = [
  { id:'EMP001', name:'Priya Sharma',  cls:'Alpha',   math:92, sci:88, eng:95, hist:84, grade:'A',  rank:2  },
  { id:'EMP002', name:'Rohan Verma',   cls:'Beta',    math:78, sci:82, eng:75, hist:80, grade:'B+', rank:8  },
  { id:'EMP003', name:'Ananya Nair',   cls:'Gamma',   math:95, sci:91, eng:90, hist:87, grade:'A',  rank:1  },
  { id:'EMP004', name:'Vikram Singh',  cls:'Delta',   math:72, sci:68, eng:74, hist:70, grade:'B',  rank:12 },
  { id:'EMP005', name:'Meera Iyer',    cls:'Alpha',   math:98, sci:95, eng:97, hist:93, grade:'A+', rank:1  },
  { id:'EMP006', name:'Arjun Mehta',   cls:'Epsilon', math:65, sci:70, eng:68, hist:62, grade:'B-', rank:18 },
]

export const EVENTS = [
  { title:'Quarterly Town Hall',     date:'20', month:'May', cat:'Corporate',  time:'10:00 AM', loc:'Main Auditorium', desc:'Company-wide Q2 results and roadmap.' },
  { title:'Team Sports Day',         date:'25', month:'May', cat:'Social',     time:'9:00 AM',  loc:'Rooftop Arena',   desc:'Inter-team sports and bonding day.' },
  { title:'Innovation Demo Day',     date:'30', month:'May', cat:'Innovation', time:'2:00 PM',  loc:'Innovation Lab',  desc:'Teams demo new ideas and prototypes.' },
  { title:'Client Strategy Meeting', date:'3',  month:'Jun', cat:'Meeting',    time:'11:00 AM', loc:'Boardroom',       desc:'Strategic review with key clients.' },
  { title:'Summer Recess',           date:'20', month:'Jun', cat:'Holiday',    time:'All Day',  loc:'N/A',             desc:'Company summer break begins.' },
  { title:'Hackathon 2025',          date:'15', month:'May', cat:'Innovation', time:'9:00 AM',  loc:'Dev Floor',       desc:'Annual 24-hour internal hackathon.' },
]

export const CLIENTS = [
  { id:'CLT001', fn:'William', ln:'Foster',  children:'Priya Sharma (Alpha)', phone:'+1 555-0201', email:'william.f@techcorp.com', occ:'CTO'          },
  { id:'CLT002', fn:'Rachel',  ln:'Greene',  children:'Rohan Verma (Beta)',   phone:'+1 555-0202', email:'rachel.g@innolab.com',   occ:'Product Lead'  },
  { id:'CLT003', fn:'Carlos',  ln:'Mendez',  children:'Ananya Nair (Gamma)',  phone:'+1 555-0203', email:'carlos.m@venture.io',    occ:'Founder'       },
  { id:'CLT004', fn:'Priya',   ln:'Agarwal', children:'Vikram Singh (Delta)', phone:'+1 555-0204', email:'priya.a@globalfin.com',  occ:'VP Operations' },
  { id:'CLT005', fn:'Lena',    ln:'Schmidt', children:'Meera Iyer (Alpha)',   phone:'+1 555-0205', email:'lena.s@eurobiz.de',      occ:'Director'      },
]

export const MESSAGES_DATA = [
  { id:1, fn:'Jordan', ln:'Hayes',  preview:'Sprint planning confirmed for Monday morning at 9.',   time:'10:32 AM', unread:true  },
  { id:2, fn:'Sam',    ln:'Patel',  preview:'Product roadmap deck needs review before Thursday.',   time:'9:15 AM',  unread:true  },
  { id:3, fn:'William',ln:'Foster', preview:'Requested the Q2 delivery timeline for our records.',  time:'Yesterday',unread:false },
  { id:4, fn:'Nina',   ln:'Kapoor', preview:'Compliance audit report has been submitted.',           time:'Yesterday',unread:false },
  { id:5, fn:'Omar',   ln:'Farooq', preview:'New hire onboarding scheduled for next Monday.',        time:'Mon',      unread:false },
]

export const CHAT_MSGS_SEED = [
  { sent:false, text:"Good morning! Wanted to confirm the sprint planning schedule for next week.", time:"9:00 AM" },
  { sent:true,  text:"Hi Jordan! Yes, confirmed for Monday 9 AM. Conference Room B is booked.",    time:"9:05 AM" },
  { sent:false, text:"Perfect. Should I send out invites to the full Alpha team?",                  time:"9:06 AM" },
  { sent:true,  text:"Please do! Also include Shreya since Design has dependencies this sprint.",   time:"9:10 AM" },
]

export const ANNOUNCES_SEED = [
  { title:'Office Closed — Public Holiday', body:'The office will be closed on Monday, May 19. Remote work is optional. Regular hours resume Tuesday.',                               meta:'Posted by Alex Morgan • 2 hours ago', priority:'High'   },
  { title:'Hackathon 2025 Registration',    body:'All employees can register by May 15. Sign up via the HR Portal. Prizes awarded for top 3 teams.',                                 meta:'Posted by Alex Morgan • 1 day ago',    priority:'Normal' },
  { title:'New Leave Policy Update',        body:'The revised leave policy is now live. Key changes include flexible carry-forward and enhanced parental leave provisions.',          meta:'Posted by Alex Morgan • 3 days ago',  priority:'Normal' },
]
