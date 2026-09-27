# REST API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /health | Cloud Function health check |
| POST | /api/register | Planned REST boundary; current MVP uses Firebase Auth SDK |
| POST | /api/login | Planned REST boundary; current MVP uses Firebase Auth SDK |
| GET | /api/profile | Planned REST boundary; current MVP uses Firestore SDK |
| POST | /api/skills | Planned REST boundary; current MVP uses Firestore SDK |
| POST | /api/practice | Planned REST boundary; current MVP uses Firestore SDK |
| POST | /api/posts | Planned REST boundary; current MVP uses Firestore SDK |
| POST | /api/posts/{id}/like | Planned REST boundary; current MVP uses Firestore SDK |
| GET | /api/analytics/dashboard | Planned REST boundary; current MVP reads Firebase stats |

The full specification asks for a REST API layer. The four-day MVP keeps the core application on the Firebase client SDK to reduce implementation risk, while a Firebase Function REST boundary is included as the next implementation step.
