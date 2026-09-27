import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

import {
  collection,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";

import { auth, db } from "./firebase";

import {
  addComment,
  createGoal,
  createPost,
  createPractice,
  createSkill,
  deletePost,
  deleteSkill,
  getComments,
  getLogs,
  getProfile,
  getSkills,
  listenFeed,
  listenStats,
  saveProfile,
  toggleLike,
  updateSkill
} from "./services/firebaseService";


const fmtDate = (v) => {
  if (!v) return "";

  const d = v?.toDate
    ? v.toDate()
    : new Date(v);

  return isNaN(d)
    ? ""
    : d.toLocaleDateString();
};


/* =========================
   AUTH SCREEN
   ========================= */

function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    setBusy(true);
    setError("");

    try {
      if (mode === "register") {
        const cred =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        await updateProfile(cred.user, {
          displayName: name
        });

        await saveProfile({
          name,
          username: email.split("@")[0],
          bio: "",
          interests: []
        });

      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

    } catch (err) {
      setError(
        err.message.replace("Firebase: ", "")
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="brand">
          Hobby<span>Hub</span>
        </div>

        <p className="muted">
          Online Hobby & Skills Tracker with
          Community Sharing
        </p>

        <h1>
          {mode === "login"
            ? "Welcome back"
            : "Create your account"}
        </h1>

        <form onSubmit={submit}>

          {mode === "register" && (
            <input
              required
              placeholder="Full name"
              value={name}
              onChange={e =>
                setName(e.target.value)
              }
            />
          )}

          <input
            id="email"
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={e =>
              setEmail(e.target.value)
            }
          />

          <input
            id="password"
            required
            type="password"
            minLength="6"
            placeholder="Password (6+ characters)"
            value={password}
            onChange={e =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button
            id="login"
            disabled={busy}
          >
            {busy
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>

        </form>

        <button
          className="link-btn"
          onClick={() =>
            setMode(
              mode === "login"
                ? "register"
                : "login"
            )
          }
        >
          {mode === "login"
            ? "New here? Create an account"
            : "Already have an account? Login"}
        </button>

      </div>

    </main>
  );
}


/* =========================
   MAIN APP
   ========================= */

function App() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      setUser
    );
  }, []);

  if (user === undefined) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="app">

      <aside>

        <div className="brand">
          Hobby<span>Hub</span>
        </div>

        <nav>

          {[
            ["dashboard", "Dashboard"],
            ["skills", "Skills"],
            ["practice", "Practice"],
            ["goals", "Goals"],
            ["community", "Community"],
            ["profile", "Profile"]
          ].map(([id, label]) => (

            <button
              key={id}
              className={
                tab === id
                  ? "active"
                  : ""
              }
              onClick={() =>
                setTab(id)
              }
            >
              {label}
            </button>

          ))}

        </nav>

        <button
          className="logout"
          onClick={() =>
            signOut(auth)
          }
        >
          Logout
        </button>

      </aside>


      <section className="content">

        <header>

          <div>

            <h2>
              {tab[0].toUpperCase() +
                tab.slice(1)}
            </h2>

            <p className="muted">
              Track progress. Build consistency.
              Share achievements.
            </p>

          </div>

          <div className="avatar">
            {(user.displayName ||
              user.email)[0].toUpperCase()}
          </div>

        </header>


        {tab === "dashboard" && (
          <Dashboard />
        )}

        {tab === "skills" && (
          <Skills />
        )}

        {tab === "practice" && (
          <Practice />
        )}

        {tab === "goals" && (
          <Goals />
        )}

        {tab === "community" && (
          <Community />
        )}

        {tab === "profile" && (
          <Profile />
        )}

      </section>

    </div>
  );
}
  /* =========================
   DASHBOARD
   ========================= */

  function Dashboard() {
    const [skills, setSkills] = useState([]);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
      getSkills().then(setSkills);
      getLogs().then(setLogs);
    }, []);

    const getLogDate = (log) => {
      const value = log.practiced_at || log.createdAt;
      if (!value) return null;

      const date = value?.toDate
        ? value.toDate()
        : new Date(value);

      return isNaN(date) ? null : date;
    };

    const totalMinutes = logs.reduce(
      (sum, log) => sum + Number(log.minutes || 0),
      0
    );

    const hours = Math.round((totalMinutes / 60) * 10) / 10;
    const sessionCount = logs.length;
    const averageMinutes = sessionCount
      ? Math.round(totalMinutes / sessionCount)
      : 0;

    const now = new Date();

    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const daysFromMonday = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(
      startOfWeek.getDate() - daysFromMonday
    );
    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyMinutes = logs.reduce((sum, log) => {
      const date = getLogDate(log);

      if (date && date >= startOfWeek && date <= now) {
        return sum + Number(log.minutes || 0);
      }

      return sum;
    }, 0);

    const getDayKey = (date) => {
      return `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}`;
    };

    const practiceDays = new Set();

    logs.forEach(log => {
      const date = getLogDate(log);
      if (!date) return;

      practiceDays.add(getDayKey(date));
    });

    const todayKey = getDayKey(now);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    let streak = 0;
    let checkDate;

    if (practiceDays.has(todayKey)) {
      checkDate = new Date(now);
    } else if (practiceDays.has(getDayKey(yesterday))) {
      checkDate = new Date(yesterday);
    }

    if (checkDate) {
      while (practiceDays.has(getDayKey(checkDate))) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }

    const badges = [
      {
        id: "first-step",
        title: "First Step",
        description: "Completed your first practice session.",
        earned: sessionCount >= 1
      },
      {
        id: "practice-champion",
        title: "Practice Champion",
        description: "Completed 5 practice sessions.",
        earned: sessionCount >= 5
      },
      {
        id: "consistent-learner",
        title: "Consistent Learner",
        description: "Reached a 3-day practice streak.",
        earned: streak >= 3
      },
      {
        id: "dedicated-learner",
        title: "Dedicated Learner",
        description: "Reached a 7-day practice streak.",
        earned: streak >= 7
      },
      {
        id: "ten-hours",
        title: "10 Hours",
        description: "Completed 10 total hours of practice.",
        earned: totalMinutes >= 600
      }
    ];

    const badgeCount = badges.filter(
      badge => badge.earned
    ).length;

    /* =========================
       SKILL-WISE ANALYTICS
       ========================= */

    const skillMinutes = {};

    logs.forEach(log => {
      const skillId = log.hid || log.skillId;
      if (!skillId) return;

      skillMinutes[skillId] =
        (skillMinutes[skillId] || 0) + Number(log.minutes || 0);
    });

    const skillAnalytics = skills
      .map(skill => ({
        ...skill,
        minutes: skillMinutes[skill.id] || 0
      }))
      .filter(skill => skill.minutes > 0)
      .sort((a, b) => b.minutes - a.minutes);

    const topSkill = skillAnalytics[0];

    /* =========================
       WEEKLY ANALYTICS
       ========================= */

    const weekDays = [
      { label: "Mon", offset: 0 },
      { label: "Tue", offset: 1 },
      { label: "Wed", offset: 2 },
      { label: "Thu", offset: 3 },
      { label: "Fri", offset: 4 },
      { label: "Sat", offset: 5 },
      { label: "Sun", offset: 6 }
    ];

    const dailyMinutes = weekDays.map(dayInfo => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + dayInfo.offset);

      const key = getDayKey(date);

      const minutes = logs.reduce((sum, log) => {
        const logDate = getLogDate(log);

        if (logDate && getDayKey(logDate) === key) {
          return sum + Number(log.minutes || 0);
        }

        return sum;
      }, 0);

      return {
        ...dayInfo,
        minutes
      };
    });

    const maxDailyMinutes = Math.max(
      ...dailyMinutes.map(dayInfo => dayInfo.minutes),
      30
    );

    const completedSkills = skills.filter(
      skill => skill.status === "COMPLETED"
    ).length;

    return (
      <div>

        <div className="grid stats">
          <Card
            title="Active Skills"
            value={
              skills.filter(
                skill => skill.status !== "COMPLETED"
              ).length
            }
          />

          <Card
            title="Total Practice"
            value={`${hours} h`}
          />

          <Card
            title="Current Streak"
            value={`${streak} days`}
          />

          <Card
            title="Badges"
            value={badgeCount}
          />
        </div>

        <div className="panel">
          <h3>Practice Analytics</h3>

          <div
            className="grid"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(150px, 1fr))",
              marginTop: "14px"
            }}
          >
            <div className="card">
              <p>Practice Sessions</p>
              <strong>{sessionCount}</strong>
            </div>

            <div className="card">
              <p>Average Session</p>
              <strong>{averageMinutes} min</strong>
            </div>

            <div className="card">
              <p>This Week</p>
              <strong>{weeklyMinutes} min</strong>
            </div>

            <div className="card">
              <p>Completed Skills</p>
              <strong>{completedSkills}</strong>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h4>Weekly Practice</h4>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(7, minmax(35px, 1fr))",
                gap: "10px",
                alignItems: "end",
                height: "150px",
                marginTop: "15px"
              }}
            >
              {dailyMinutes.map(dayInfo => (
                <div
                  key={dayInfo.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: "100%",
                    gap: "6px"
                  }}
                >
                  <small>{dayInfo.minutes}m</small>

                  <div
                    style={{
                      width: "100%",
                      maxWidth: "38px",
                      height: `${Math.max(
                        dayInfo.minutes
                          ? (dayInfo.minutes / maxDailyMinutes) * 100
                          : 4,
                        4
                      )}%`,
                      background: "#315efb",
                      borderRadius: "6px 6px 2px 2px"
                    }}
                  />

                  <small>{dayInfo.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h4>Practice by Skill</h4>

            {!skillAnalytics.length ? (
              <p className="muted">
                Log some practice to see skill-wise analytics.
              </p>
            ) : (
              skillAnalytics.map(skill => (
                <div
                  key={skill.id}
                  style={{ marginTop: "14px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      marginBottom: "6px"
                    }}
                  >
                    <span>{skill.skill_name}</span>
                    <b>{skill.minutes} min</b>
                  </div>

                  <div className="progress-track">
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          (skill.minutes / Math.max(totalMinutes, 1)) * 100
                        )}%`
                      }}
                    />
                  </div>
                </div>
              ))
            ) }
          </div>

          {topSkill && (
            <p style={{ marginTop: "18px" }}>
              Most practiced skill: <b>{topSkill.skill_name}</b> ({topSkill.minutes} min)
            </p>
          )}
        </div>

        <div className="panel">
          <h3>Badges & achievements</h3>

          <div className="badge-grid">
            {badges.map(badge => (
              <div
                className={`badge-item ${
                  badge.earned ? "earned" : "locked"
                }`}
                key={badge.id}
              >
                <strong>
                  {badge.earned ? "🏅" : "🔒"} {badge.title}
                </strong>
                <small>{badge.description}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Practice overview</h3>

          <div className="progress-track">
            <div
              style={{
                width: `${Math.min(
                  100,
                  (weeklyMinutes / 120) * 100
                )}%`
              }}
            />
          </div>

          <p>{weeklyMinutes} minutes this week</p>
        </div>

        <div className="panel">
          <h3>Recent activity</h3>

          {logs.slice(0, 5).map(log => (
            <div
              className="list-row"
              key={log.id}
            >
              <span>
                {log.activity || "Practice session"}
              </span>

              <b>
                {log.minutes} min
              </b>
            </div>
          ))}

          {!logs.length && (
            <p className="muted">
              No practice logged yet.
            </p>
          )}
        </div>
      </div>
    );
  }

/* =========================
   CARD
   ========================= */

function Card({ title, value }) {
  return (
    <div className="card">

      <p>{title}</p>

      <strong>
        {value}
      </strong>

    </div>
  );
}


/* =========================
   SKILLS
   ========================= */

function Skills() {
  const [skills, setSkills] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [form, setForm] = useState({
    skill_name: "",
    category: "Other",
    current_level: "BEGINNER",
    target_level: "INTERMEDIATE",
    status: "ACTIVE",
    description: ""
  });

  const load = async () => setSkills(await getSkills());
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateSkill(editing, form);
      else await createSkill(form);
      setEditing(null);
      setForm({ skill_name:"", category:"Other", current_level:"BEGINNER", target_level:"INTERMEDIATE", status:"ACTIVE", description:"" });
      await load();
    } catch (error) {
      alert(error.message || "Unable to save skill.");
    }
  };

  const categories = [...new Set(skills.map(s => s.category).filter(Boolean))];
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = `${skill.skill_name || ""} ${skill.category || ""} ${skill.description || ""}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || skill.category === categoryFilter;
    const matchesStatus = statusFilter === "ALL" || skill.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div>
      <div className="two-col">
        <form className="panel" onSubmit={save}>
          <h3>{editing ? "Edit skill" : "Add skill"}</h3>
          <input required placeholder="Skill name" value={form.skill_name} onChange={e=>setForm({...form,skill_name:e.target.value})}/>
          <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
          <select value={form.current_level} onChange={e=>setForm({...form,current_level:e.target.value})}>{["BEGINNER","INTERMEDIATE","ADVANCED"].map(x=><option key={x}>{x}</option>)}</select>
          <select value={form.target_level} onChange={e=>setForm({...form,target_level:e.target.value})}>{["BEGINNER","INTERMEDIATE","ADVANCED"].map(x=><option key={x}>{x}</option>)}</select>
          <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>{["ACTIVE","PAUSED","COMPLETED"].map(x=><option key={x}>{x}</option>)}</select>
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <button>{editing ? "Update Skill" : "Create Skill"}</button>
          {editing && <button type="button" className="small" onClick={()=>{setEditing(null);setForm({skill_name:"",category:"Other",current_level:"BEGINNER",target_level:"INTERMEDIATE",status:"ACTIVE",description:""})}}>Cancel edit</button>}
        </form>

        <div className="panel">
          <h3>My skills</h3>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10,marginBottom:15}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search skills..."/>
            <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)}><option value="ALL">All categories</option>{categories.map(c=><option key={c}>{c}</option>)}</select>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="ALL">All status</option><option>ACTIVE</option><option>PAUSED</option><option>COMPLETED</option></select>
          </div>
          {filteredSkills.map(s=><div className="skill-row" key={s.id}><div><b>{s.skill_name}</b><small>{s.category} · {s.current_level} → {s.target_level} · {s.status}</small>{s.description&&<small>{s.description}</small>}</div><div><button className="small" onClick={()=>{setEditing(s.id);setForm({...s})}}>Edit</button><button className="small danger" onClick={async()=>{if(confirm("Delete this skill?")){await deleteSkill(s.id);load()}}}>Delete</button></div></div>)}
          {!filteredSkills.length&&<p className="muted">No skills match your filters.</p>}
        </div>
      </div>
    </div>
  );
}
/* =========================
   PRACTICE
   ========================= */

function Practice() {

  const [skills, setSkills] =
    useState([]);

  const [logs, setLogs] =
    useState([]);

  const [form, setForm] =
    useState({
      skillId: "",
      minutes: 30,
      activity: "",
      notes: ""
    });

  const [msg, setMsg] =
    useState("");


  const loadData = async () => {

    const [skillData, logData] =
      await Promise.all([
        getSkills(),
        getLogs()
      ]);

    setSkills(skillData);
    setLogs(logData);

    if (
      skillData.length &&
      !form.skillId
    ) {
      setForm(f => ({
        ...f,
        skillId:
          skillData[0].id
      }));
    }
  };


  useEffect(() => {
    loadData();
  }, []);


  async function save(e) {

    e.preventDefault();

    await createPractice({
      ...form,
      hid: form.skillId,
      practiced_at:
        new Date().toISOString()
    });

    setMsg(
      "Practice session saved."
    );

    setForm(f => ({
      ...f,
      minutes: 30,
      activity: "",
      notes: ""
    }));

    await loadData();

    setTimeout(() => {
      setMsg("");
    }, 2500);
  }


  return (
    <div className="two-col">

      {/* LOG PRACTICE */}

      <form
        className="panel"
        onSubmit={save}
      >

        <h3>
          Log practice session
        </h3>


        <select
          required
          value={form.skillId}
          onChange={e =>
            setForm({
              ...form,
              skillId:
                e.target.value
            })
          }
        >

          <option value="">
            Select skill
          </option>

          {skills.map(skill => (

            <option
              key={skill.id}
              value={skill.id}
            >
              {skill.skill_name}
            </option>

          ))}

        </select>


        <input
          type="number"
          min="1"
          required
          value={form.minutes}
          onChange={e =>
            setForm({
              ...form,
              minutes:
                e.target.value
            })
          }
          placeholder="Duration in minutes"
        />


        <input
          id="activity"
          required
          value={form.activity}
          onChange={e =>
            setForm({
              ...form,
              activity:
                e.target.value
            })
          }
          placeholder="Activity"
        />


        <textarea
          value={form.notes}
          onChange={e =>
            setForm({
              ...form,
              notes:
                e.target.value
            })
          }
          placeholder="Notes"
        />


        <button id="saveLog">
          Save Practice
        </button>


        {msg && (
          <div className="success">
            {msg}
          </div>
        )}

      </form>


      {/* PRACTICE HISTORY */}

      <div className="panel">

        <h3>
          Practice History
        </h3>


        {logs.length === 0 ? (

          <p className="muted">
            No practice sessions yet.
          </p>

        ) : (

          <div className="practice-history">

            {logs.map(log => {

              const skill =
                skills.find(
                  s =>
                    s.id ===
                    (log.hid ||
                      log.skillId)
                );


              return (
                <div
                  className="practice-row"
                  key={log.id}
                >

                  <div className="practice-info">

                    <b>
                      {skill?.skill_name ||
                        "Practice Session"}
                    </b>

                    <small>
                      {log.activity ||
                        "Practice"}
                    </small>

                    {log.notes && (
                      <small>
                        {log.notes}
                      </small>
                    )}

                  </div>


                  <div className="practice-meta">

                    <strong>
                      {log.minutes} min
                    </strong>

                    <small>
                      {fmtDate(
                        log.practiced_at ||
                        log.createdAt
                      )}
                    </small>

                  </div>

                </div>
              );

            })}

          </div>

        )}

      </div>

    </div>
  );
}


/* =========================
   GOALS
   ========================= */

function Goals() {
  const [skills,setSkills] = useState([]);
  const [goals,setGoals] = useState([]);
  const [logs,setLogs] = useState([]);
  const [form,setForm] = useState({skillId:"",title:"",target_value:20,unit:"hours",deadline:""});

  const loadData = async () => {
    try {
      const [skillData, goalData, logData] = await Promise.all([
        getSkills(),
        (async()=>{
          const ref=collection(db,"users",auth.currentUser.uid,"goals");
          const q=query(ref,orderBy("createdAt","desc"));
          const snap=await getDocs(q);
          return snap.docs.map(d=>({id:d.id,...d.data()}));
        })(),
        getLogs()
      ]);
      setSkills(skillData); setGoals(goalData); setLogs(logData);
      if(skillData.length && !form.skillId) setForm(f=>({...f,skillId:skillData[0].id}));
    } catch(error) { console.error(error); }
  };
  useEffect(()=>{loadData();},[]);

  const save = async e => {
    e.preventDefault();
    try {
      await createGoal({...form,target_value:Number(form.target_value)});
      setForm(f=>({...f,title:"",target_value:20,unit:"hours",deadline:""}));
      await loadData();
      alert("Goal created.");
    } catch(error) { alert(error.message || "Failed to create goal."); }
  };

  const getLogDate = log => {
    const value=log.practiced_at || log.createdAt;
    if(!value) return null;
    const d=value?.toDate ? value.toDate() : new Date(value);
    return isNaN(d) ? null : d;
  };

  return (
    <div className="two-col">
      <form className="panel" onSubmit={save}>
        <h3>Create goal</h3>
        <select required value={form.skillId} onChange={e=>setForm({...form,skillId:e.target.value})}><option value="">Select skill</option>{skills.map(s=><option key={s.id} value={s.id}>{s.skill_name}</option>)}</select>
        <input required placeholder="Goal title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <input required type="number" min="1" value={form.target_value} onChange={e=>setForm({...form,target_value:e.target.value})}/>
        <input placeholder="Unit: hours, minutes or sessions" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}/>
        <input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}/>
        <button>Create Goal</button>
      </form>

      <div className="panel">
        <h3>My Goals</h3>
        {!goals.length ? <p className="muted">No goals created yet.</p> : <div className="goal-list">
          {goals.map(goal=>{
            const skill=skills.find(s=>s.id===(goal.skillId||goal.hid));
            const related=logs.filter(log=>(log.hid||log.skillId)===(goal.skillId||goal.hid));
            const unit=String(goal.unit||"hours").toLowerCase();
            let current=Number(goal.current_value||0);
            if(related.length){
              const minutes=related.reduce((sum,l)=>sum+Number(l.minutes||0),0);
              if(unit.includes("hour")) current=Math.round((minutes/60)*10)/10;
              else if(unit.includes("minute")) current=minutes;
              else if(unit.includes("session")) current=related.length;
            }
            const target=Number(goal.target_value||1);
            const progress=Math.min(100,Math.round((current/target)*100));
            const milestones=[25,50,75,100];
            return <div className="goal-item" key={goal.id}>
              <div className="goal-header"><div><b>{goal.title}</b><small>{skill?.skill_name||"Skill"}</small></div><strong>{progress}%</strong></div>
              <div className="progress-track"><div style={{width:`${progress}%`}}/></div>
              <div className="goal-details"><span>{current} / {target} {goal.unit}</span>{goal.deadline&&<span>Deadline: {goal.deadline}</span>}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>{milestones.map(m=><span key={m} style={{padding:"5px 9px",borderRadius:20,fontSize:12,background:progress>=m?"#dcfce7":"#f1f5f9",color:progress>=m?"#166534":"#64748b"}}>{progress>=m?"✓":"○"} {m}% milestone</span>)}</div>
            </div>;
          })}
        </div>}
      </div>
    </div>
  );
}
/* =========================
   COMMUNITY
   ========================= */

function Community() {
  const [posts,setPosts]=useState([]);
  const [text,setText]=useState("");
  const [file,setFile]=useState(null);
  const [busy,setBusy]=useState(false);
  const [search,setSearch]=useState("");

  useEffect(()=>listenFeed(snapshot=>setPosts(snapshot.docs.map(doc=>({id:doc.id,...doc.data()})))),[]);

  async function post(e){
    e.preventDefault();
    if(!text.trim()&&!file)return;
    setBusy(true);
    try{await createPost({text,file});setText("");setFile(null);}
    catch(error){alert(error.message||"Unable to create post.");}
    finally{setBusy(false);}
  }

  const filteredPosts=posts.filter(p=>`${p.text||""} ${p.uid||""}`.toLowerCase().includes(search.toLowerCase()));

  return <div>
    <form className="panel" onSubmit={post}>
      <h3>Share an achievement</h3>
      <textarea id="postText" value={text} onChange={e=>setText(e.target.value)} placeholder="What did you practice today?"/>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])}/>
      <button id="submitPost" disabled={busy}>{busy?"Posting...":"Share Update"}</button>
    </form>
    <div className="panel"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search community posts..."/></div>
    {filteredPosts.map(p=><Post key={p.id} post={p}/>)}
    {!filteredPosts.length&&<div className="panel muted">{posts.length?"No posts match your search.":"No community posts yet."}</div>}
  </div>;
}
/* =========================
   POST
   ========================= */

function Post({ post }) {

  const [liked, setLiked] =
    useState(false);

  const [comments, setComments] =
    useState([]);

  const [comment, setComment] =
    useState("");


  useEffect(() => {

    getComments(
      post.id
    ).then(setComments);

  }, [post.id]);


  async function like() {

    await toggleLike(
      post.id,
      liked
    );

    setLiked(!liked);

  }


  async function add() {

    if (!comment.trim()) {
      return;
    }

    await addComment(
      post.id,
      comment
    );

    setComment("");

    setComments(
      await getComments(
        post.id
      )
    );
  }


  return (
    <article className="panel post">

      <div className="post-head">

        <div className="avatar">
          {(post.uid || "U")[0]
            .toUpperCase()}
        </div>

        <div>

          <b>
            Community User
          </b>

          <small>
            {fmtDate(
              post.createdAt
            )}
          </small>

        </div>

      </div>


      <p>
        {post.text}
      </p>


      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          alt="Post attachment"
        />
      )}


      <div className="actions">

        <button
          className="small"
          onClick={like}
        >
          {liked
            ? "Unlike"
            : "Like"}
          {" · "}
          {post.likes || 0}
        </button>


        <button
          className="small"
          onClick={async () => {

            if (
              confirm(
                "Delete this post?"
              )
            ) {

              try {

                await deletePost(
                  post.id
                );

              } catch (e) {

                alert(e.message);

              }

            }

          }}
        >
          Delete own post
        </button>

      </div>


      <div className="comments">

        {comments.map(c => (

          <p key={c.id}>

            <b>
              User:
            </b>{" "}

            {c.text}

          </p>

        ))}


        <div className="comment-box">

          <input
            value={comment}
            onChange={e =>
              setComment(
                e.target.value
              )
            }
            placeholder="Write a comment..."
          />


          <button
            className="small"
            onClick={add}
          >
            Comment
          </button>

        </div>

      </div>

    </article>
  );
}


/* =========================
   PROFILE
   ========================= */

function Profile() {

  const [form, setForm] =
    useState({
      name: "",
      username: "",
      bio: "",
      interests: ""
    });

  const [saved, setSaved] =
    useState(false);


  useEffect(() => {

    getProfile().then(p => {

      if (p) {

        setForm({
          ...p,
          interests:
            (p.interests || [])
              .join(", ")
        });

      }

    });

  }, []);


  async function save(e) {

    e.preventDefault();

    await saveProfile({
      ...form,
      interests:
        form.interests
          .split(",")
          .map(x => x.trim())
          .filter(Boolean)
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }


  return (
    <form
      className="panel narrow"
      onSubmit={save}
    >

      <h3>
        My profile
      </h3>


      <input
        value={form.name}
        onChange={e =>
          setForm({
            ...form,
            name: e.target.value
          })
        }
        placeholder="Name"
      />


      <input
        value={form.username}
        onChange={e =>
          setForm({
            ...form,
            username:
              e.target.value
          })
        }
        placeholder="Username"
      />


      <textarea
        value={form.bio}
        onChange={e =>
          setForm({
            ...form,
            bio: e.target.value
          })
        }
        placeholder="Bio"
      />


      <input
        value={form.interests}
        onChange={e =>
          setForm({
            ...form,
            interests:
              e.target.value
          })
        }
        placeholder="Interests separated by commas"
      />


      <button>
        Save Profile
      </button>


      {saved && (
        <div className="success">
          Profile saved.
        </div>
      )}

    </form>
  );
}


export default App;