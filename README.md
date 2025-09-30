# JavaScript Learning Repository

A comprehensive collection of JavaScript projects, exercises, and learning materials covering various topics from basic concepts to advanced backend development.

## 📚 Table of Contents

- [Quick Start](#quick-start)
- [Project Categories](#project-categories)
  - [Backend & API Projects](#backend--api-projects)
  - [Frontend Projects](#frontend-projects)
  - [Learning Exercises](#learning-exercises)
  - [Practice Problems](#practice-problems)
  - [Utility Scripts](#utility-scripts)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## 🚀 Quick Start

Each project folder contains its own README or comments explaining the specific functionality. Most Node.js projects can be run with:

```bash
cd [project-folder]
npm install
npm start
# or
npm run dev
```

## 📂 Project Categories

### Backend & API Projects

| Project                                              | Description                               | Tech Stack                    |
| ---------------------------------------------------- | ----------------------------------------- | ----------------------------- |
| [`album/`](./album/)                                 | Album management API with SQLite database | Express.js, Sequelize, SQLite |
| [`cars_api/`](./cars_api/)                           | Cars API service                          | Express.js, ES Modules        |
| [`login_stuff_w_backend/`](./login_stuff_w_backend/) | Authentication system with backend        | Express.js, SQLite            |
| [`hashing/`](./hashing/)                             | Password hashing implementation           | Node.js                       |
| [`node_suffer/`](./node_suffer/)                     | Various Node.js experiments and learning  | Express.js, APIs              |
| [`random_jokes_api/`](./random_jokes_api/)           | Jokes API service                         | API Integration               |

### Frontend Projects

| Project                                      | Description                                | Technologies          |
| -------------------------------------------- | ------------------------------------------ | --------------------- |
| [`ME_stuff/`](./ME_stuff/)                   | Personal frontend experiments and examples | HTML, CSS, JavaScript |
| [`localstorage_save/`](./localstorage_save/) | LocalStorage implementation example        | HTML, CSS, JavaScript |
| [`tic tac toe/`](./tic%20tac%20toe/)         | Classic Tic Tac Toe game                   | HTML, CSS, JavaScript |
| [`timetable/`](./timetable/)                 | Schedule/timetable application             | Frontend              |
| [`űrlap/`](./űrlap/)                         | Form handling examples                     | HTML, JavaScript      |

### Learning Exercises

| Project                                                        | Description                               | Focus Area                 |
| -------------------------------------------------------------- | ----------------------------------------- | -------------------------- |
| [`aranyfeladatok/`](./aranyfeladatok/)                         | Golden exercises - fundamental algorithms | Functions, Logic           |
| [`megtobbgyakorlas/`](./megtobbgyakorlas/)                     | Additional practice exercises             | Functions, Problem Solving |
| [`decemberi doga feladatok/`](./decemberi%20doga%20feladatok/) | December exam problems                    | Various JS Concepts        |
| [`codewars apis feladat/`](./codewars%20apis%20feladat/)       | CodeWars API challenges                   | API Integration            |

### Practice Problems

| Project                            | Description                              | Skills            |
| ---------------------------------- | ---------------------------------------- | ----------------- |
| [`befozes/`](./befozes/)           | Canning/preservation calculation         | File I/O, Math    |
| [`fetch/`](./fetch/)               | Fetch API practice with various examples | Async/Await, APIs |
| [`fetchfeladat/`](./fetchfeladat/) | Fetch exercise implementation            | API Calls         |
| [`filekezeles/`](./filekezeles/)   | File handling operations                 | File System, JSON |

### Utility Scripts

| File/Project                     | Description                              |
| -------------------------------- | ---------------------------------------- |
| [`string.js`](./string.js)       | String manipulation examples and methods |
| [`auto_git.bat`](./auto_git.bat) | Git automation batch script              |
| [`wizardry/`](./wizardry/)       | Advanced JavaScript techniques           |

## 🛠 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Basic knowledge of JavaScript

### Installation

1. Clone or download this repository
2. Navigate to any project folder
3. Install dependencies (if package.json exists):
   ```bash
   npm install
   ```

### Running Projects

#### Node.js/Express Projects:

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

#### Frontend Projects:

Open the `index.html` or main HTML file in your browser, or use a live server.

## 📁 Project Structure

```
js/
├── 🌐 Backend APIs/
│   ├── album/          # Album management with SQLite
│   ├── cars_api/       # Cars API service
│   ├── login_stuff_w_backend/ # Authentication system
│   └── hashing/        # Password hashing
├── 🎨 Frontend/
│   ├── ME_stuff/       # Personal frontend experiments
│   ├── localstorage_save/ # LocalStorage examples
│   └── tic tac toe/    # Game implementation
├── 📚 Learning/
│   ├── aranyfeladatok/ # Golden exercises
│   ├── megtobbgyakorlas/ # Practice problems
│   └── decemberi doga feladatok/ # Exam problems
├── 🔧 Utilities/
│   ├── string.js       # String methods
│   ├── filekezeles/    # File operations
│   └── fetch/          # API examples
└── 🎯 Challenges/
    ├── codewars apis feladat/ # CodeWars challenges
    └── fetchfeladat/   # Fetch exercises
```

---

## 📝 Notes

- Each project may contain its own documentation
- Some projects use ES Modules (`"type": "module"` in package.json)
- Database files (`.sqlite`, `.db`) contain sample data
- Hungarian comments and folder names reflect the learning environment

## 🤝 Contributing

Feel free to add new exercises, improve existing code, or fix any issues you find!
