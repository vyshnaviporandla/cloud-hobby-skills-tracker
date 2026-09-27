# 🎯 Online Hobby & Skills Tracker with Community Sharing on Cloud

A cloud-based student-focused web application for creating and managing hobbies and skills, setting learning goals, recording practice sessions, tracking consistency, earning badges, and sharing achievements with a community.

🌐 **Live Demo:** https://cloud-hobby-skills-tracker.web.app/

📦 **GitHub Repository:** https://github.com/vyshnaviporandla/cloud-hobby-skills-tracker

---

# 1. 📌 What This Project Is

The **Online Hobby & Skills Tracker** is a cloud-based web application designed to help students organize their learning and hobby activities in one place.

Students often learn multiple skills at the same time but may not have a simple way to:

* organize their skills
* define learning goals
* record daily practice
* monitor consistency
* track practice history
* measure progress
* maintain motivation
* share achievements with others

This project addresses that problem by combining **skill management, goal tracking, practice logging, analytics, gamification, and community sharing** into a single application.

The application is built using **React.js and Firebase**, providing authentication, cloud database storage, security rules, and web deployment.

---

# 2. 🎯 Problem Statement

Students commonly learn skills such as:

* Programming
* Web Development
* Communication
* Data Structures
* SQL
* Music
* Drawing
* Sports
* Other personal hobbies

However, learning activity is often scattered across notebooks, spreadsheets, different applications, or simply forgotten.

This creates several problems:

* No centralized skill tracker
* Difficult to measure consistency
* Goals are not connected with actual practice
* Students cannot easily see their learning history
* Lack of motivation when progress is not visible
* No simple way to share achievements with a learning community

### Proposed Solution

The Online Hobby & Skills Tracker provides a centralized cloud platform where users can:

**Create Skill → Set Goal → Practice → Track Progress → Build Streak → Earn Badge → Share Achievement**

---

# 3. 💡 Project Vision

The vision of the project is to make skill development measurable and motivating.

Instead of simply asking:

> "What am I learning?"

the application helps answer:

* What skills am I currently learning?
* How much time am I practicing?
* How consistently am I practicing?
* What goals have I created?
* What progress have I made?
* What achievements have I unlocked?
* What have other members of the community achieved?

---

# 4. ✨ Key Features

## 🔐 Authentication

The application uses Firebase Authentication for user account management.

Implemented:

* User registration
* Email/password login
* Logout
* Authentication state management
* User-specific application data

Each user's application data is associated with their authenticated Firebase user ID.

---

## 👤 Profile Management

Users can create and update their personal learning profile.

Profile information includes:

* Name
* Username
* Bio
* Interests

Example interests:

* Programming
* C
* SQL
* Web Development

The profile allows users to represent their learning interests within the application.

---

# 5. 🧠 Skills Management

Users can create and manage their hobbies and skills.

Each skill can contain:

| Field         | Description                |
| ------------- | -------------------------- |
| Skill Name    | Name of the hobby or skill |
| Category      | Skill category             |
| Current Level | Current learning level     |
| Target Level  | Desired level              |
| Status        | Active/inactive status     |
| Description   | Additional information     |

### Skill Operations

The application supports:

* Create skill
* View skills
* Edit skill
* Delete skill
* Track skill status

### Example

```text
Skill: C Programming
Category: Programming
Current Level: Beginner
Target Level: Intermediate
Status: Active
```

---

# 6. 🎯 Learning Goals

Users can create goals associated with their skills.

Each goal can contain:

* Goal title
* Associated skill
* Target value
* Unit
* Deadline

### Example

```text
Goal:
Complete 20 C programming practice sessions

Skill:
C Programming

Target:
20 sessions

Deadline:
30 Days
```

Goals provide a structured target instead of allowing learning activity to remain unplanned.

---

# 7. ⏱️ Practice Tracking

Practice tracking is one of the core features of the application.

Users can record individual practice sessions.

Each practice session includes:

* Skill
* Practice duration
* Activity
* Notes
* Practice date

### Example

```text
Skill: C Programming
Duration: 30 minutes
Activity: Practiced arrays
Notes: Solved 5 array problems
Date: Current date
```

The application stores these sessions and displays them in the user's practice history.

---

# 8. 📊 Dashboard & Analytics

The dashboard provides a summary of the user's learning activity.

It currently displays:

* Active Skills
* Total Practice Time
* Practice Sessions
* Average Session Duration
* Current Practice Streak
* Weekly Practice Time
* Completed Skills
* Weekly Practice Chart
* Practice by Skill
* Most Practiced Skill
* Badges & Achievements
* Recent Activity

### Example Dashboard Metrics

```text
Active Skills        1
Total Practice       50 min
Practice Sessions    2
Average Session      25 min
Current Streak       2 days
```

The dashboard converts individual practice records into meaningful learning statistics.

---

# 9. 🔥 Practice Streaks

Consistency is an important part of skill development.

The application calculates a user's current practice streak from recorded practice sessions.

For example:

```text
Day 1 → Practice
Day 2 → Practice
Day 3 → Practice
```

results in:

```text
🔥 3 Day Streak
```

The current MVP calculates these statistics from the user's stored practice logs.

---

# 10. 🏆 Gamification & Badges

The application uses badges to encourage consistent practice.

Current achievement system:

| Badge                 | Requirement                      |
| --------------------- | -------------------------------- |
| 🏅 First Step         | Complete 1 practice session      |
| 🔥 Consistent Learner | Achieve a 3-day streak           |
| 🚀 Dedicated Learner  | Achieve a 7-day streak           |
| 📚 Practice Champion  | Complete 5 practice sessions     |
| ⏱️ 10 Hours           | Complete 600 minutes of practice |

Badges can appear as:

```text
Unlocked
Locked
```

This creates a simple gamification layer around the learning process.

---

# 11. 👥 Community Sharing

The project includes a community feed where users can share achievements and learning updates.

Users can create text-based posts.

Community functionality includes:

* Create post
* View community feed
* Like posts
* Unlike posts
* Comment on posts
* Delete own posts

### Example Community Post

```text
Completed my first C programming practice goal today!

Practiced arrays and functions for 60 minutes.
```

Other users can interact with the post through likes and comments.

---

# 12. 💬 Comments & Engagement

Community posts support interaction through comments.

Users can:

1. Open a post
2. View existing comments
3. Write a comment
4. Submit the comment
5. See the updated comment list

Likes can also be toggled between:

```text
Like → Unlike
```

This creates the foundation for a learning-focused social feed.

---

# 13. ☁️ Cloud Architecture

The application uses Firebase as the cloud backend.

### Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    │     Web Browser     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     React.js UI     │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │          Firebase               │
              │                                │
              │  ┌──────────────────────────┐  │
              │  │ Firebase Authentication  │  │
              │  └──────────────────────────┘  │
              │                                │
              │  ┌──────────────────────────┐  │
              │  │      Cloud Firestore     │  │
              │  │       Database           │  │
              │  └──────────────────────────┘  │
              │                                │
              │  ┌──────────────────────────┐  │
              │  │     Security Rules       │  │
              │  └──────────────────────────┘  │
              └────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Firebase Hosting    │
                    │ Production Website  │
                    └─────────────────────┘
```

---

# 14. 🔄 Application Workflow

The primary MVP workflow is:

```text
       ┌─────────────┐
       │    Login    │
       └──────┬──────┘
              ↓
       ┌─────────────┐
       │   Profile   │
       └──────┬──────┘
              ↓
       ┌─────────────┐
       │ Create Skill│
       └──────┬──────┘
              ↓
       ┌─────────────┐
       │ Create Goal │
       └──────┬──────┘
              ↓
       ┌─────────────┐
       │ Log Practice│
       └──────┬──────┘
              ↓
       ┌─────────────┐
       │   Track     │
       │  Progress   │
       └──────┬──────┘
              ↓
       ┌─────────────┐
       │   Streaks   │
       │  & Badges   │
       └──────┬──────┘
              ↓
       ┌─────────────┐
       │   Share     │
       └──────┬──────┘
              ↓
       ┌─────────────┐
       │ Community   │
       │ Feed +      │
       │ Comments    │
       └─────────────┘
```

---

# 15. 🗄️ Data Structure

The application uses Cloud Firestore for persistent cloud data.

The main data areas are:

```text
users
 └── userId
      ├── profile
      ├── skills
      ├── goals
      └── practice logs

posts
 ├── post
 ├── likes
 └── comments
```

### User Profile

```text
users/{uid}
```

Contains user-specific profile information.

### Skills

```text
users/{uid}/skills
```

Stores the user's hobbies and skills.

### Goals

```text
users/{uid}/goals
```

Stores learning goals associated with skills.

### Practice Logs

```text
users/{uid}/logs
```

Stores individual practice sessions.

### Community Posts

```text
posts
```

Stores community content intended to be visible through the feed.

---

# 16. 🔐 Security

Security is implemented using Firebase Authentication and Firestore Security Rules.

The application separates user-specific data using the authenticated user's UID.

The security model is designed around the principle:

```text
Authenticated User
        ↓
Firebase UID
        ↓
User-specific Firestore Data
```

Users should only be able to modify their own private profile, skills, goals, and practice records.

Community data uses separate access rules so that posts can participate in the public feed while private user data remains isolated.

---

# 17. 🛠️ Technology Stack

## Frontend

| Technology | Purpose                           |
| ---------- | --------------------------------- |
| React.js   | User interface                    |
| JavaScript | Application logic                 |
| Vite       | Development server and build tool |
| CSS        | Styling                           |

## Backend / Cloud

| Technology              | Purpose             |
| ----------------------- | ------------------- |
| Firebase Authentication | User authentication |
| Cloud Firestore         | Cloud database      |
| Firebase Security Rules | Data protection     |
| Firebase Hosting        | Web deployment      |

## Development Tools

| Tool         | Purpose             |
| ------------ | ------------------- |
| VS Code      | Development         |
| Git          | Version control     |
| GitHub       | Source code hosting |
| Firebase CLI | Firebase deployment |

---

# 18. 📁 Project Structure

```text
Cloud-Hobby-Skills-Tracker/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── services/
│   │   │   └── firebaseService.js
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
├── functions/
│   ├── index.js
│   └── package.json
│
├── docs/
│   ├── API.md
│   └── 4-day-plan.md
│
├── firestore.rules
├── storage.rules
├── firebase.json
├── .gitignore
└── README.md
```

> `.env` contains private Firebase configuration values and should never be committed to GitHub.

---

# 19. 🚀 How to Run Locally

## Prerequisites

Install:

* Node.js
* npm
* Git
* Firebase account

Node.js and npm are required for installing and running the React application.

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/vyshnaviporandla/cloud-hobby-skills-tracker.git
```

Move into the project:

```bash
cd cloud-hobby-skills-tracker
```

---

## Step 2 — Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Step 3 — Configure Firebase

Create:

```text
frontend/.env
```

using:

```text
frontend/.env.example
```

Add the Firebase Web App configuration values.

Example structure:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Do not commit the real `.env` file.

---

# 20. ▶️ Start the Development Server

Run:

```bash
npm run dev
```

Vite will provide a local development URL, normally:

```text
http://localhost:5173/
```

Open the URL in a browser.

---

# 21. 🏗️ Production Build

Create a production build:

```bash
npm run build
```

The production files are generated inside:

```text
frontend/dist/
```

The build can then be deployed through Firebase Hosting.

---

# 22. ☁️ Firebase Deployment

The project is deployed using Firebase Hosting.

The live application is available at:

**https://cloud-hobby-skills-tracker.web.app/**

Deployment workflow:

```text
React Source Code
       ↓
npm run build
       ↓
Production Build
       ↓
Firebase Hosting
       ↓
Live Web Application
```

---

# 23. 🧪 Testing Performed

The MVP was manually tested across the major application modules.

| Module          | Test                          |
| --------------- | ----------------------------- |
| Authentication  | Registration and login        |
| Profile         | Create/update profile         |
| Skills          | Create, edit and delete       |
| Goals           | Create and display goals      |
| Practice        | Log and display sessions      |
| Dashboard       | Verify calculated statistics  |
| Streaks         | Verify practice consistency   |
| Badges          | Verify achievement conditions |
| Community       | Create posts                  |
| Likes           | Like/unlike posts             |
| Comments        | Add and display comments      |
| Post Management | Delete own post               |
| Hosting         | Verify deployed application   |

---

# 24. 📊 Dashboard Metrics

The dashboard transforms practice logs into learning analytics.

### Total Practice

The total amount of recorded practice time.

### Practice Sessions

The total number of recorded practice activities.

### Average Session

Calculated from recorded practice duration and session count.

### Weekly Practice

Shows practice activity across the current week.

Example:

```text
Monday      0 min
Tuesday     0 min
Wednesday   0 min
Thursday   30 min
Friday     20 min
Saturday    0 min
Sunday      0 min
```

### Practice by Skill

Groups practice time according to the associated skill.

### Most Practiced Skill

Identifies the skill with the highest recorded practice duration.

---

# 25. 🏆 Achievement System

The badge system provides milestones for users.

```text
Practice Session
       ↓
Achievement Condition
       ↓
Condition Satisfied?
       ↓
   ┌───┴───┐
   │       │
  YES      NO
   │       │
   ↓       ↓
Unlock    Locked
 Badge     Badge
```

Current achievements:

```text
🏅 First Step
Complete 1 practice session

📚 Practice Champion
Complete 5 practice sessions

🔥 Consistent Learner
Achieve a 3-day streak

🚀 Dedicated Learner
Achieve a 7-day streak

⏱️ 10 Hours
Complete 600 minutes of practice
```

---

# 26. 👥 Community Architecture

The community module follows a simple social-learning model.

```text
User
 │
 ├── Create Post
 │
 ▼
Community Feed
 │
 ├── Like
 │
 ├── Unlike
 │
 ├── Comment
 │
 └── Delete Own Post
```

The purpose is not to create a general social-media platform, but to provide a space for students to share learning progress and achievements.

---

# 27. 📸 Suggested Screenshots

For the GitHub project page and portfolio presentation, screenshots can be added under:

```text
docs/screenshots/
```

Recommended screenshots:

### 1. Login / Registration

Show the authentication interface.

### 2. Dashboard

Show:

* Analytics cards
* Practice chart
* Streak
* Badges
* Recent activity

### 3. Skills

Show created skills and skill-management controls.

### 4. Goals

Show learning goals and their progress.

### 5. Practice

Show:

* Log Practice form
* Practice History

### 6. Community

Show:

* Community posts
* Likes
* Comments

### 7. Profile

Show the user's learning profile.

---

# 28. ⚠️ 4-Day MVP Scope & Deviations

The complete project specification contains additional advanced requirements.

Because this project was developed under a **4-day MVP constraint**, the implementation prioritized the core student learning workflow.

### Implemented

* Firebase Authentication
* User profiles
* Skills/hobbies CRUD
* Goals foundation
* Practice session logging
* Practice history
* Dashboard analytics
* Streak calculation
* Achievement badges
* Community posts
* Likes
* Comments
* Post deletion
* Firestore database
* Firestore security rules
* Firebase Hosting deployment

### Deferred

The following features remain future scope:

* Following/follower system
* Advanced moderator/report/block system
* Scheduled weekly recap
* AI-powered hobby recommendations
* ESP32/NFC integration
* Advanced multi-cloud architecture
* Full automated Cypress test suite
* Full REST CRUD backend
* Production Cloud Functions deployment
* Image/media upload through Firebase Storage

These items were **deferred intentionally rather than silently removed** from the project scope.

---

# 29. 🔮 Future Scope

## 🤖 AI Hobby Recommendations

An AI recommendation system could analyze:

* Existing skills
* Interests
* Practice history
* Goals

and suggest related hobbies or skills.

Example:

```text
Interested in:
C Programming
SQL
Web Development

Suggested:
JavaScript
React
Backend Development
Data Structures
```

---

## 👥 Following System

Users could follow other learners and view posts from people they follow.

Future feed:

```text
Following Feed
      ↓
Posts from followed users
      ↓
Likes + Comments
```

---

## 🚨 Moderation & Reporting

Future versions can introduce:

* Report post
* Report comment
* Block user
* Moderator dashboard
* Content moderation

---

## 📅 Weekly Learning Recap

A scheduled system could generate weekly summaries such as:

```text
Your Weekly Learning Recap

Practice Time: 4h 30m
Sessions: 8
Top Skill: C Programming
Current Streak: 5 days
Badges Earned: 2
```

---

## 🤖 AI Learning Suggestions

The system could analyze weak areas and suggest:

* practice topics
* learning resources
* next milestones
* realistic goals

---

## 📱 Mobile Application

The React web application could later be extended into a mobile application using technologies such as React Native.

---

## 📡 ESP32 / NFC Integration

An optional hardware integration could allow physical learning stations or NFC tags to trigger practice sessions.

Example:

```text
NFC Tag
   ↓
ESP32 / Mobile Device
   ↓
Practice Session
   ↓
Firebase
   ↓
Dashboard
```

This was part of the broader specification but is outside the current MVP.

---

# 30. 🔒 Security Considerations

Security is an important part of the cloud architecture.

The project uses:

* Firebase Authentication
* Firestore Security Rules
* User-specific data paths
* Environment variables for Firebase configuration
* Git `.gitignore` protection for `.env`
* Restricted modification of private user data

The application follows the principle:

```text
Authenticate
     ↓
Identify User
     ↓
Authorize Access
     ↓
Read / Write Allowed Data
```

---

# 31. 📈 Scalability

The application is designed around Firebase services that can support cloud-based applications without requiring the developer to manage traditional servers.

Current architecture:

```text
React
  ↓
Firebase Authentication
  ↓
Cloud Firestore
  ↓
Firebase Hosting
```

Future scaling possibilities include:

* Cloud Functions
* AI services
* scheduled tasks
* more advanced backend APIs
* analytics pipelines
* notification systems
* mobile clients

---

# 32. 🧠 Key Learning Outcomes

This project provided practical experience with:

### Frontend Development

* React components
* React state
* React hooks
* Forms
* Conditional rendering
* Component-based UI development

### Firebase

* Firebase Authentication
* Firestore
* Security Rules
* Firebase Hosting
* Firebase CLI

### Cloud Application Development

* Cloud database design
* User-specific data
* Authentication-based access
* Production deployment

### Software Engineering

* Git
* GitHub
* Environment variables
* Project structure
* Debugging
* Build and deployment

### Product Thinking

* User workflow design
* Learning progress tracking
* Gamification
* Community interaction
* MVP prioritization

---

# 33. 🔁 End-to-End System Flow

The complete application flow can be summarized as:

```text
USER
  │
  ▼
AUTHENTICATION
  │
  ▼
PROFILE
  │
  ▼
SKILLS
  │
  ▼
GOALS
  │
  ▼
PRACTICE LOGS
  │
  ▼
ANALYTICS
  │
  ├───────────────┐
  ▼               ▼
STREAKS         BADGES
  │               │
  └───────┬───────┘
          ▼
      ACHIEVEMENTS
          │
          ▼
     COMMUNITY
          │
     ┌────┴────┐
     ▼         ▼
   LIKES     COMMENTS
```

---

# 34. 🧩 Core MVP in One View

```text
┌───────────────────────────────────────────┐
│         ONLINE HOBBY & SKILLS TRACKER     │
├───────────────────────────────────────────┤
│                                           │
│  🔐 Authentication                         │
│  👤 Profile                                │
│  🧠 Skills                                 │
│  🎯 Goals                                  │
│  ⏱️ Practice                               │
│  📊 Analytics                              │
│  🔥 Streaks                               │
│  🏆 Badges                                │
│  👥 Community                              │
│  ❤️ Likes                                 │
│  💬 Comments                              │
│                                           │
└───────────────────────────────────────────┘
```

---

# 35. 💼 Resume-Ready Project Description

### One-Line Version

> Built a cloud-based Online Hobby & Skills Tracker using React and Firebase for managing skills, goals, practice sessions, streaks, achievements, analytics, and community sharing.

### Two-Line Version

> Developed a cloud-based student learning tracker using React.js and Firebase with authentication, skill and goal management, practice logging, dashboard analytics, streaks, achievement badges, and community interaction through posts, likes, and comments.

### ATS-Friendly Version

> Online Hobby & Skills Tracker — Developed a React.js and Firebase cloud application for student skill management and learning progress tracking. Implemented Firebase Authentication, Cloud Firestore, user profiles, skill CRUD, learning goals, practice session logging, dashboard analytics, streak calculation, gamification badges, community posts, likes, comments, security rules, GitHub version control, and Firebase Hosting deployment.

### Technologies

```text
React.js
JavaScript
Vite
Firebase Authentication
Cloud Firestore
Firebase Security Rules
Firebase Hosting
Git
GitHub
CSS
```

---

# 36. 🎤 Interview Questions & Answers

## Q1. What is your project?

The Online Hobby & Skills Tracker is a cloud-based application that helps students manage their skills and hobbies, set goals, record practice sessions, monitor consistency, earn achievement badges, and share learning updates with a community.

---

## Q2. Why did you choose this project?

Students often learn multiple skills but do not have a centralized system for tracking their learning activity.

The project combines skill management, practice tracking, analytics, gamification, and community sharing into one platform.

---

## Q3. Why did you use Firebase?

Firebase provides several cloud services that are useful for this application:

* Authentication
* Cloud Firestore
* Security Rules
* Hosting

It allowed the application to be developed and deployed quickly without building a traditional backend server from scratch.

---

## Q4. How does authentication work?

Firebase Authentication manages user registration and login.

After authentication, Firebase provides a unique user ID.

The application uses that UID to associate private user data with the correct account.

---

## Q5. How are skills stored?

Skills are stored in Cloud Firestore and associated with the authenticated user's UID.

This allows each user to maintain their own set of hobbies and skills.

---

## Q6. How do you calculate practice analytics?

Practice sessions are stored as individual records containing information such as:

* skill
* duration
* activity
* notes
* date

The dashboard processes these records to calculate statistics such as:

* total practice
* average session
* weekly practice
* practice by skill
* current streak

---

## Q7. How does the streak system work?

The application examines the dates of recorded practice sessions and determines consecutive practice days.

For example:

```text
Day 1 → Practice
Day 2 → Practice
Day 3 → Practice
```

produces a three-day streak.

---

## Q8. Why did you add badges?

Badges provide a simple gamification mechanism.

They give users visible milestones for reaching practice and consistency targets.

---

## Q9. How does the community feature work?

Users can create posts in the community feed.

Other users can interact through:

* likes
* comments

Users can also delete their own posts.

---

## Q10. What security measures did you implement?

The application uses Firebase Authentication and Firestore Security Rules.

Private user data is associated with authenticated user IDs, and rules restrict users from modifying other users' private records.

---

## Q11. What did you prioritize during the 4-day development period?

The core MVP workflow was prioritized:

```text
Profile
→ Skills
→ Goals
→ Practice
→ Analytics
→ Streaks
→ Badges
→ Community
```

Advanced features were deliberately deferred so that the primary workflow could be completed and tested.

---

## Q12. What would you build next?

The next development phase could include:

* Following system
* AI hobby recommendations
* Weekly automated recap
* Moderation/reporting
* Mobile application
* Advanced REST APIs
* Automated Cypress testing
* Optional NFC/ESP32 integration

---

# 37. 🚀 Project Status

### Current MVP Status

```text
Authentication        ✅
Profile               ✅
Skills CRUD           ✅
Goals                 ✅
Practice Tracking     ✅
Practice History      ✅
Dashboard Analytics   ✅
Streaks               ✅
Badges                ✅
Community Posts       ✅
Likes                 ✅
Comments              ✅
Post Deletion         ✅
Firestore             ✅
Security Rules        ✅
GitHub                 ✅
Firebase Hosting      ✅
```

### Future / Deferred

```text
Following System       ⏳
Advanced Moderation    ⏳
AI Recommendations     ⏳
Weekly Recap           ⏳
NFC / ESP32            ⏳
Advanced REST API      ⏳
Automated Cypress      ⏳
Media Uploads          ⏳
```

---

# 38. 🌐 Live Project

### Live Application

https://cloud-hobby-skills-tracker.web.app/

### GitHub Repository

https://github.com/vyshnaviporandla/cloud-hobby-skills-tracker

---

# 39. 📜 License

This project is created for educational, learning, and portfolio purposes.

---

# ⭐ Final Summary

The **Online Hobby & Skills Tracker** demonstrates how a student-focused learning platform can be built using modern frontend and cloud technologies.

The project connects:

```text
SKILLS
   +
GOALS
   +
PRACTICE
   +
ANALYTICS
   +
STREAKS
   +
BADGES
   +
COMMUNITY
```

into a single cloud-based application.

The project also demonstrates the complete development lifecycle:

```text
IDEA
 ↓
REQUIREMENTS
 ↓
UI DEVELOPMENT
 ↓
FIREBASE INTEGRATION
 ↓
DATABASE
 ↓
SECURITY
 ↓
TESTING
 ↓
GITHUB
 ↓
PRODUCTION BUILD
 ↓
FIREBASE HOSTING
```

This makes the project not only a frontend application, but a practical demonstration of **cloud application development, authentication, database management, security, analytics, gamification, community features, version control, and deployment**.
