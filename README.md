# Online Hobby & Skills Tracker with Community Sharing on Cloud

A student-focused cloud application for creating hobbies/skills, logging practice, tracking progress and streaks, and sharing achievements with a community.

## 4-day MVP scope
Implemented:
- Firebase Email/Password authentication
- User profile
- Hobby/skill CRUD
- Practice session logging
- Goals foundation
- Cloud Firestore database
- Firebase Storage image uploads
- Community posts
- Likes and comments
- Dashboard analytics foundation
- Firestore and Storage security rules
- Firebase Functions streak/stat trigger
- REST health endpoint
- Firebase Hosting deployment configuration

## Quick start
1. Create a Firebase project.
2. Enable Authentication > Email/Password.
3. Create Firestore Database.
4. Enable Storage.
5. Copy `frontend/.env.example` to `frontend/.env` and fill Firebase web-app values.
6. Run:
   `cd frontend`
   `npm install`
   `npm run dev`

For cloud deployment:
`npm run build`
`firebase login`
`firebase init`
`firebase deploy`

## Important 4-day deviations from the full specification
To finish safely in four days, the first implementation deliberately defers:
- optional following/following feed
- moderator/report/block system
- scheduled weekly recap
- AI hobby suggestions
- NFC/ESP32 integration
- advanced AWS/Azure/GCP architecture
- full automated Cypress suite
- full REST CRUD backend (the core app uses Firebase SDK; Functions includes a REST health endpoint)

These are documentation/future-scope items, not silently removed requirements.
