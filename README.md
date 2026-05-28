# HR Management System

A complete, modern HR management platform built with React + Vite + TailwindCSS.

## ✨ Features

- **Authentication** — Login / Signup with role-based access (Admin, Manager, Employee, Client)
- **Dashboard** — Role-aware dynamic stats, charts, calendar, today's schedule
- **Employees** — Full CRUD, search & filter by team/status
- **Managers** — Department filter, add/remove
- **Clients** — Partner & client contact management
- **Teams** — Capacity tracking with progress bars
- **Projects** — Card + table view with department grouping
- **Meetings** — Weekly schedule management
- **Attendance** — Mark attendance + monthly grid view
- **Reviews** — Performance review schedule & status tracking
- **Tasks** — Deliverable tracking with submission progress
- **Appraisals** — Employee ratings with grade color coding (A/B/C)
- **Events** — Event cards with category color labels
- **Messages** — Real-time internal chat simulation
- **Announcements** — Post notices with priority levels (Normal / High / Urgent)
- **Settings** — Profile editor, company info, notifications, fiscal year config

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
| Administrator | admin@worknexus.io      | 123456   |
| Manager       | manager@worknexus.io    | 123456   |
| Employee      | employee@worknexus.io   | 123456   |
| Client        | client@worknexus.io     | 123456   |

> Or use the **Quick Demo Login** buttons on the login page!

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **TailwindCSS 3** — Utility-first CSS
- **Tabler Icons** — Extended icon set (CDN)
- **Plus Jakarta Sans** — Primary font
- **DM Mono** — Monospace font

## 📁 Project Structure

```
src/
├── App.jsx                        # Root app + page routing
├── main.jsx                       # Entry point
├── index.css                      # Global styles + CSS variables
├── context/
│   └── AuthContext.jsx            # Auth state management
├── components/
│   ├── Sidebar.jsx                # Navigation sidebar
│   ├── Topbar.jsx                 # Top bar with user chip
│   ├── Modal.jsx                  # Reusable modal dialog
│   ├── Toast.jsx                  # Toast notifications
│   └── helpers.jsx                # Shared UI helpers (avatars, badges)
├── data/
│   └── data.js                    # All mock data & constants
└── pages/
    ├── Auth.jsx                   # Login + Signup
    ├── Dashboard.jsx              # Main dashboard
    ├── Employees.jsx              # Employee management
    ├── Managers.jsx               # Manager management
    ├── ClientsTeamsProjects.jsx   # Clients, Teams, Projects
    ├── OperationsPages.jsx        # Meetings, Attendance, Reviews, Tasks, Appraisals
    └── CommunicationPages.jsx     # Events, Messages, Announcements, Settings
```

## 🎨 Role-Based Access

| Page          | Admin | Manager | Employee | Client |
|---------------|:-----:|:-------:|:--------:|:------:|
| Dashboard     | ✅    | ✅      | ✅       | ✅     |
| Employees     | ✅    | ✅      | —        | —      |
| Managers      | ✅    | —       | —        | —      |
| Clients       | ✅    | —       | —        | —      |
| Teams         | ✅    | ✅      | ✅       | —      |
| Projects      | ✅    | ✅      | ✅       | —      |
| Meetings      | ✅    | ✅      | ✅       | —      |
| Attendance    | ✅    | ✅      | ✅       | ✅     |
| Reviews       | ✅    | ✅      | ✅       | —      |
| Tasks         | ✅    | ✅      | ✅       | —      |
| Appraisals    | ✅    | ✅      | ✅       | ✅     |
| Events        | ✅    | ✅      | ✅       | ✅     |
| Messages      | ✅    | ✅      | ✅       | ✅     |
| Announcements | ✅    | ✅      | —        | ✅     |
| Settings      | ✅    | —       | —        | —      |
