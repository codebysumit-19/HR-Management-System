export const DEMO_ACCOUNTS = {
  admin:   { email: 'admin@school.edu',   pass: '123456', firstName: 'Admin',  lastName: 'Smith',    role: 'admin' },
  teacher: { email: 'teacher@school.edu', pass: '123456', firstName: 'Sarah',  lastName: 'Richardson', role: 'teacher' },
  student: { email: 'student@school.edu', pass: '123456', firstName: 'James',  lastName: 'Wilson',   role: 'student' },
  parent:  { email: 'parent@school.edu',  pass: '123456', firstName: 'Robert', lastName: 'Johnson',  role: 'parent' },
}

export const ROLES = {
  admin:   { label: 'Administrator', pages: ['dashboard','students','teachers','parents','classes','subjects','lessons','attendance','exams','assignments','results','events','messages','announcements','settings'] },
  teacher: { label: 'Teacher',       pages: ['dashboard','students','classes','subjects','lessons','attendance','exams','assignments','results','events','messages','announcements'] },
  student: { label: 'Student',       pages: ['dashboard','classes','subjects','lessons','attendance','exams','assignments','results','events','messages'] },
  parent:  { label: 'Parent',        pages: ['dashboard','attendance','results','events','messages','announcements'] },
}

export const NAV_ITEMS = [
  { id: 'dashboard',     icon: 'ti-layout-dashboard', label: 'Dashboard',     section: 'MAIN' },
  { id: 'students',      icon: 'ti-users',            label: 'Students',      section: 'ACADEMIC' },
  { id: 'teachers',      icon: 'ti-school',           label: 'Teachers',      section: 'ACADEMIC' },
  { id: 'parents',       icon: 'ti-heart',            label: 'Parents',       section: 'ACADEMIC' },
  { id: 'classes',       icon: 'ti-building',         label: 'Classes',       section: 'ACADEMIC' },
  { id: 'subjects',      icon: 'ti-books',            label: 'Subjects',      section: 'CURRICULUM' },
  { id: 'lessons',       icon: 'ti-notebook',         label: 'Lessons',       section: 'CURRICULUM' },
  { id: 'attendance',    icon: 'ti-calendar-check',   label: 'Attendance',    section: 'RECORDS' },
  { id: 'exams',         icon: 'ti-file-pencil',      label: 'Exams',         section: 'RECORDS' },
  { id: 'assignments',   icon: 'ti-clipboard-list',   label: 'Assignments',   section: 'RECORDS' },
  { id: 'results',       icon: 'ti-chart-bar',        label: 'Results',       section: 'RECORDS' },
  { id: 'events',        icon: 'ti-calendar-event',   label: 'Events',        section: 'COMMUNICATION', badge: null },
  { id: 'messages',      icon: 'ti-message-circle',   label: 'Messages',      section: 'COMMUNICATION', badge: '5' },
  { id: 'announcements', icon: 'ti-speakerphone',     label: 'Announcements', section: 'COMMUNICATION' },
  { id: 'settings',      icon: 'ti-settings',         label: 'Settings',      section: 'SYSTEM' },
]

export const AVATAR_COLORS = [
  ['#ede9ff','#6c63ff'], ['#e1f5ee','#0f9d74'], ['#faece7','#d85a30'],
  ['#e6f1fb','#185fa5'], ['#faeeda','#ba7517'], ['#eaf3de','#3b6d11'], ['#fbeaf0','#993556'],
]

export const STUDENTS = [
  { id:'STU001', fn:'Emma',    ln:'Johnson',  cls:'Class 8A',  gender:'Female', parent:'William Johnson', phone:'+1 555-0101', status:'Active',   grade:'A'  },
  { id:'STU002', fn:'Liam',    ln:'Brown',    cls:'Class 9C',  gender:'Male',   parent:'Patricia Brown',  phone:'+1 555-0102', status:'Active',   grade:'B+' },
  { id:'STU003', fn:'Olivia',  ln:'Davis',    cls:'Class 7B',  gender:'Female', parent:'Michael Davis',   phone:'+1 555-0103', status:'Active',   grade:'A-' },
  { id:'STU004', fn:'Noah',    ln:'Wilson',   cls:'Class 10A', gender:'Male',   parent:'Linda Wilson',    phone:'+1 555-0104', status:'On Leave', grade:'B'  },
  { id:'STU005', fn:'Ava',     ln:'Martinez', cls:'Class 8A',  gender:'Female', parent:'Carlos Martinez', phone:'+1 555-0105', status:'Active',   grade:'A+' },
  { id:'STU006', fn:'Elijah',  ln:'Taylor',   cls:'Class 6A',  gender:'Male',   parent:'Jennifer Taylor', phone:'+1 555-0106', status:'Active',   grade:'B-' },
  { id:'STU007', fn:'Sophia',  ln:'Anderson', cls:'Class 9C',  gender:'Female', parent:'Thomas Anderson', phone:'+1 555-0107', status:'Inactive', grade:'C+' },
  { id:'STU008', fn:'Mason',   ln:'Thomas',   cls:'Class 7B',  gender:'Male',   parent:'Barbara Thomas',  phone:'+1 555-0108', status:'Active',   grade:'A'  },
]

export const TEACHERS = [
  { id:'TCH001', fn:'Sarah',  ln:'Richardson', dept:'Mathematics', subject:'Algebra & Calculus',    classes:'8A, 9C',     exp:'8 yrs',  status:'Active' },
  { id:'TCH002', fn:'David',  ln:'Chen',       dept:'Science',     subject:'Biology & Chemistry',   classes:'7B, 8A',     exp:'12 yrs', status:'Active' },
  { id:'TCH003', fn:'Emily',  ln:'Watson',     dept:'English',     subject:'Literature & Grammar',  classes:'6A, 7B',     exp:'5 yrs',  status:'Active' },
  { id:'TCH004', fn:'James',  ln:'Miller',     dept:'History',     subject:'World History',         classes:'9C, 10A',    exp:'15 yrs', status:'Active' },
  { id:'TCH005', fn:'Grace',  ln:'Kim',        dept:'Arts',        subject:'Fine Arts',             classes:'6A, 7B',     exp:'7 yrs',  status:'On Leave' },
  { id:'TCH006', fn:'Robert', ln:'Adams',      dept:'PE',          subject:'Physical Education',    classes:'All classes', exp:'10 yrs', status:'Active' },
]

export const CLASSES = [
  { name:'Class 6A',  grade:'Grade 6',  teacher:'Emily Watson',    students:32, cap:35, room:'Room 101', status:'Active' },
  { name:'Class 7B',  grade:'Grade 7',  teacher:'David Chen',      students:30, cap:35, room:'Room 102', status:'Active' },
  { name:'Class 8A',  grade:'Grade 8',  teacher:'Sarah Richardson',students:34, cap:35, room:'Room 201', status:'Active' },
  { name:'Class 9C',  grade:'Grade 9',  teacher:'James Miller',    students:28, cap:35, room:'Room 202', status:'Active' },
  { name:'Class 10A', grade:'Grade 10', teacher:'Robert Adams',    students:33, cap:35, room:'Room 301', status:'Active' },
]

export const SUBJECTS = [
  { code:'MTH101', name:'Mathematics',  dept:'Mathematics', credits:4, teacher:'Sarah Richardson', grades:'6-10', icon:'➕', color:'#ede9ff', tc:'#6c63ff' },
  { code:'SCI102', name:'Science',      dept:'Science',     credits:4, teacher:'David Chen',       grades:'6-10', icon:'🔬', color:'#e1f5ee', tc:'#0f9d74' },
  { code:'ENG103', name:'English',      dept:'English',     credits:3, teacher:'Emily Watson',     grades:'6-10', icon:'📖', color:'#e6f1fb', tc:'#185fa5' },
  { code:'HIS104', name:'History',      dept:'History',     credits:3, teacher:'James Miller',     grades:'7-10', icon:'🏛',  color:'#faeeda', tc:'#ba7517' },
  { code:'ART105', name:'Arts',         dept:'Arts',        credits:2, teacher:'Grace Kim',        grades:'6-9',  icon:'🎨', color:'#fbeaf0', tc:'#993556' },
  { code:'PHE106', name:'Physical Ed.', dept:'PE',          credits:2, teacher:'Robert Adams',     grades:'6-10', icon:'⚽', color:'#eaf3de', tc:'#3b6d11' },
]

export const LESSONS = [
  { title:'Quadratic Equations',  sub:'Mathematics', teacher:'S. Richardson', cls:'Class 8A',  day:'Monday',    time:'08:00-09:00', room:'Room 201'   },
  { title:'Cell Biology',         sub:'Science',     teacher:'D. Chen',       cls:'Class 7B',  day:'Monday',    time:'09:00-10:00', room:'Lab 1'       },
  { title:'Shakespeare Sonnets',  sub:'English',     teacher:'E. Watson',     cls:'Class 6A',  day:'Tuesday',   time:'08:00-09:00', room:'Room 101'   },
  { title:'World War II',         sub:'History',     teacher:'J. Miller',     cls:'Class 9C',  day:'Tuesday',   time:'10:00-11:00', room:'Room 202'   },
  { title:'Watercolor Basics',    sub:'Arts',        teacher:'G. Kim',        cls:'Class 7B',  day:'Wednesday', time:'11:00-12:00', room:'Art Studio' },
  { title:'Track & Field',        sub:'Physical Ed.',teacher:'R. Adams',      cls:'Class 10A', day:'Thursday',  time:'13:00-14:00', room:'Sports Ground' },
]

export const EXAMS = [
  { title:'Mid-Term Mathematics', sub:'Mathematics',  cls:'Class 8A', date:'May 12, 2025', time:'09:00', dur:'90 min',  room:'Hall A',       status:'Upcoming'  },
  { title:'Science Unit Test',    sub:'Science',      cls:'Class 7B', date:'May 14, 2025', time:'10:00', dur:'60 min',  room:'Lab 1',        status:'Upcoming'  },
  { title:'English Essay',        sub:'English',      cls:'Class 6A', date:'May 8, 2025',  time:'09:00', dur:'120 min', room:'Room 101',     status:'Completed' },
  { title:'History Final',        sub:'History',      cls:'Class 9C', date:'Apr 25, 2025', time:'11:00', dur:'90 min',  room:'Room 202',     status:'Completed' },
  { title:'Annual PE Assessment', sub:'Physical Ed.', cls:'All',      date:'May 20, 2025', time:'08:00', dur:'120 min', room:'Sports Ground', status:'Upcoming' },
]

export const ASSIGNMENTS = [
  { title:'Algebra Problem Set', sub:'Mathematics', cls:'Class 8A', by:'S. Richardson', due:'May 13, 2025', sub_count:'28/34', status:'Open'   },
  { title:'Cell Diagram',        sub:'Science',     cls:'Class 7B', by:'D. Chen',       due:'May 10, 2025', sub_count:'25/30', status:'Open'   },
  { title:'Book Report',         sub:'English',     cls:'Class 6A', by:'E. Watson',     due:'May 7, 2025',  sub_count:'32/32', status:'Closed' },
  { title:'Timeline of Events',  sub:'History',     cls:'Class 9C', by:'J. Miller',     due:'May 15, 2025', sub_count:'20/28', status:'Open'   },
  { title:'Sketch Portfolio',    sub:'Arts',        cls:'Class 7B', by:'G. Kim',        due:'May 17, 2025', sub_count:'15/30', status:'Open'   },
]

export const RESULTS = [
  { id:'STU001', name:'Emma Johnson',   cls:'8A',  math:92, sci:88, eng:95, hist:84, grade:'A',  rank:2  },
  { id:'STU002', name:'Liam Brown',     cls:'9C',  math:78, sci:82, eng:75, hist:80, grade:'B+', rank:8  },
  { id:'STU003', name:'Olivia Davis',   cls:'7B',  math:95, sci:91, eng:90, hist:87, grade:'A',  rank:1  },
  { id:'STU004', name:'Noah Wilson',    cls:'10A', math:72, sci:68, eng:74, hist:70, grade:'B',  rank:12 },
  { id:'STU005', name:'Ava Martinez',   cls:'8A',  math:98, sci:95, eng:97, hist:93, grade:'A+', rank:1  },
  { id:'STU006', name:'Elijah Taylor',  cls:'6A',  math:65, sci:70, eng:68, hist:62, grade:'B-', rank:18 },
]

export const EVENTS = [
  { title:'Annual Science Fair',    date:'20', month:'May', cat:'Academic', time:'9:00 AM',  loc:'Main Hall',     desc:'Students showcase innovative science projects.' },
  { title:'Sports Day',             date:'25', month:'May', cat:'Sports',   time:'8:00 AM',  loc:'Sports Ground', desc:'Inter-class sports competition.' },
  { title:'Cultural Night',         date:'30', month:'May', cat:'Cultural', time:'6:00 PM',  loc:'Auditorium',    desc:'Celebrate diversity with performances.' },
  { title:'Parent-Teacher Meeting', date:'3',  month:'Jun', cat:'Meeting',  time:'10:00 AM', loc:'Classrooms',    desc:'Discuss student progress with parents.' },
  { title:'Summer Holiday',         date:'20', month:'Jun', cat:'Holiday',  time:'All Day',  loc:'N/A',           desc:'Summer vacation begins.' },
  { title:'Mathematics Olympiad',   date:'15', month:'May', cat:'Academic', time:'2:00 PM',  loc:'Room 201',      desc:'Annual inter-school maths competition.' },
]

export const PARENTS = [
  { id:'PAR001', fn:'William',  ln:'Johnson',  children:'Emma Johnson (8A)',   phone:'+1 555-0201', email:'william.j@email.com',  occ:'Engineer'     },
  { id:'PAR002', fn:'Patricia', ln:'Brown',    children:'Liam Brown (9C)',     phone:'+1 555-0202', email:'patricia.b@email.com',  occ:'Doctor'       },
  { id:'PAR003', fn:'Michael',  ln:'Davis',    children:'Olivia Davis (7B)',   phone:'+1 555-0203', email:'michael.d@email.com',   occ:'Teacher'      },
  { id:'PAR004', fn:'Linda',    ln:'Wilson',   children:'Noah Wilson (10A)',   phone:'+1 555-0204', email:'linda.w@email.com',     occ:'Accountant'   },
  { id:'PAR005', fn:'Carlos',   ln:'Martinez', children:'Ava Martinez (8A)',   phone:'+1 555-0205', email:'carlos.m@email.com',    occ:'Business Owner'},
]

export const MESSAGES_DATA = [
  { id:1, fn:'Sarah',  ln:'Richardson', preview:'The exam schedule has been updated for next week.',    time:'10:32 AM', unread:true  },
  { id:2, fn:'David',  ln:'Chen',       preview:'Lab materials needed for tomorrows science class.',   time:'9:15 AM',  unread:true  },
  { id:3, fn:'William',ln:'Johnson',    preview:'My daughter Emma missed class yesterday, is she ok?', time:'Yesterday',unread:false },
  { id:4, fn:'James',  ln:'Miller',     preview:'History field trip has been approved for June.',      time:'Yesterday',unread:false },
  { id:5, fn:'Robert', ln:'Adams',      preview:'Sports day preparations are on track.',               time:'Mon',      unread:false },
]

export const CHAT_MSGS_SEED = [
  { sent:false, text:"Good morning! I wanted to check about the mid-term exam schedule.", time:"9:00 AM" },
  { sent:true,  text:"Hi Sarah! Yes, the exam schedule has been updated. Math is on May 12th.", time:"9:05 AM" },
  { sent:false, text:"Perfect, I'll inform the students. Do they need any specific materials?", time:"9:06 AM" },
  { sent:true,  text:"Just their regular stationery. We'll provide the question sheets.", time:"9:10 AM" },
]

export const ANNOUNCES_SEED = [
  { title:'School Closed — Public Holiday',  body:'School will be closed on Monday, May 19 for the public holiday. Regular classes resume Tuesday.', meta:'Posted by Admin Smith • 2 hours ago',   priority:'High'   },
  { title:'Science Fair Registration Open',  body:'Students must register by May 15. Forms available from the science department.', meta:'Posted by Admin Smith • 1 day ago',    priority:'Normal' },
  { title:'Library System Updated',          body:'The school library has a new digital catalog. Students can now reserve books online.', meta:'Posted by Admin Smith • 3 days ago', priority:'Normal' },
]
