# HR Management System

A complete, modern school management system built with React + Vite + TailwindCSS.

## ✨ Features

- **Authentication** — Login / Signup with role-based access (Admin, Teacher, Student, Parent)
- **Dashboard** — Role-aware stats, charts, calendar, schedule
- **Students** — Full CRUD, search & filter
- **Teachers** — Department filter, add/remove
- **Parents** — Guardian management
- **Classes** — Capacity tracking with progress bars
- **Subjects** — Card + table view
- **Lessons** — Weekly schedule management
- **Attendance** — Mark attendance + monthly grid
- **Exams** — Schedule & status tracking
- **Assignments** — Submission progress tracking
- **Results** — Grade table with A/B/C/F color coding
- **Events** — Event cards with category colors
- **Messages** — Real-time chat simulation
- **Announcements** — Post with priority levels
- **Settings** — Profile editor (updates initials live), school info, notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🔑 Demo Login Credentials

| Role          | Email                   | Password |
|---------------|-------------------------|----------|
| Administrator | admin@school.edu        | 123456   |
| Teacher       | teacher@school.edu      | 123456   |
| Student       | student@school.edu      | 123456   |
| Parent        | parent@school.edu       | 123456   |

> Or use the Quick Demo Login buttons on the login page!

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **TailwindCSS 3** — Utility-first CSS
- **Recharts** — Chart components
- **Lucide React** — Icon set
- **Tabler Icons** — Extended icon set
- **Plus Jakarta Sans** — Primary font
- **DM Mono** — Monospace font

## 📁 Project Structure

```
src/
├── App.jsx                    # Root app + routing
├── main.jsx                   # Entry point
├── index.css                  # Global styles + CSS variables
├── context/
│   └── AuthContext.jsx        # Auth state management
├── components/
│   ├── Sidebar.jsx            # Navigation sidebar
│   ├── Topbar.jsx             # Top bar with user chip
│   ├── Modal.jsx              # Reusable modal
│   ├── Toast.jsx              # Toast notifications
│   └── helpers.jsx            # Shared UI helpers
├── data/
│   └── data.js                # All mock data + constants
└── pages/
    ├── Auth.jsx               # Login + Signup
    ├── Dashboard.jsx          # Main dashboard
    ├── Students.jsx           # Students management
    ├── Teachers.jsx           # Teachers management
    ├── ParentsClassesSubjects.jsx
    ├── AcademicPages.jsx      # Lessons, Attendance, Exams, Assignments, Results
    └── OtherPages.jsx         # Events, Messages, Announcements, Settings
```
