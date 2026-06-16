import { useState } from "react";

const MUSCLE_GROUPS = {
  chest: {
    label: "Chest & Triceps",
    color: "#E84B2A",
    icon: "💪",
    exercises: [
      { name: "Barbell Bench Press", sets: "4x8-10", rest: "90s" },
      { name: "Incline Dumbbell Press", sets: "3x10-12", rest: "75s" },
      { name: "Cable Chest Fly", sets: "3x12-15", rest: "60s" },
      { name: "Dips (weighted if possible)", sets: "3x10", rest: "75s" },
      { name: "Tricep Rope Pushdown", sets: "3x12-15", rest: "60s" },
      { name: "Overhead Tricep Extension", sets: "3x12", rest: "60s" },
    ],
    altExercises: [
      { name: "Dumbbell Bench Press", sets: "4x10-12", rest: "90s" },
      { name: "Decline Press Machine", sets: "3x10-12", rest: "75s" },
      { name: "Pec Deck Fly", sets: "3x12-15", rest: "60s" },
      { name: "Close-Grip Bench Press", sets: "3x10", rest: "75s" },
      { name: "Tricep Bar Pushdown", sets: "3x12-15", rest: "60s" },
      { name: "Single-Arm Kickback", sets: "3x12", rest: "60s" },
    ],
  },
  back: {
    label: "Back & Biceps",
    color: "#2A7BE8",
    icon: "🏋️",
    exercises: [
      { name: "Deadlift", sets: "4x6-8", rest: "120s" },
      { name: "Lat Pulldown (wide grip)", sets: "4x10-12", rest: "75s" },
      { name: "Seated Cable Row", sets: "3x10-12", rest: "75s" },
      { name: "Single-Arm Dumbbell Row", sets: "3x10 each", rest: "60s" },
      { name: "Barbell Curl", sets: "3x10-12", rest: "60s" },
      { name: "Hammer Curl", sets: "3x12", rest: "60s" },
    ],
    altExercises: [
      { name: "Romanian Deadlift", sets: "4x8-10", rest: "90s" },
      { name: "Lat Pulldown (neutral grip)", sets: "4x10-12", rest: "75s" },
      { name: "T-Bar Row", sets: "3x10-12", rest: "75s" },
      { name: "Face Pull", sets: "3x15", rest: "60s" },
      { name: "Incline Dumbbell Curl", sets: "3x12", rest: "60s" },
      { name: "Concentration Curl", sets: "3x12 each", rest: "60s" },
    ],
  },
  legs: {
    label: "Legs",
    color: "#27A05A",
    icon: "🦵",
    exercises: [
      { name: "Barbell Squat", sets: "4x8-10", rest: "120s" },
      { name: "Leg Press", sets: "4x10-12", rest: "90s" },
      { name: "Romanian Deadlift", sets: "3x10-12", rest: "75s" },
      { name: "Leg Curl (seated)", sets: "3x12-15", rest: "60s" },
      { name: "Leg Extension", sets: "3x12-15", rest: "60s" },
      { name: "Standing Calf Raise", sets: "4x15-20", rest: "60s" },
    ],
    altExercises: [
      { name: "Goblet Squat", sets: "4x10-12", rest: "90s" },
      { name: "Hack Squat Machine", sets: "4x10-12", rest: "90s" },
      { name: "Walking Lunges", sets: "3x12 each", rest: "75s" },
      { name: "Lying Leg Curl", sets: "3x12-15", rest: "60s" },
      { name: "Sumo Squat", sets: "3x12", rest: "75s" },
      { name: "Seated Calf Raise", sets: "4x15-20", rest: "60s" },
    ],
  },
  shoulders: {
    label: "Shoulders",
    color: "#9B3DE8",
    icon: "🔝",
    exercises: [
      { name: "Barbell Overhead Press", sets: "4x8-10", rest: "90s" },
      { name: "Dumbbell Lateral Raise", sets: "4x12-15", rest: "60s" },
      { name: "Front Raise", sets: "3x12", rest: "60s" },
      { name: "Reverse Pec Deck (rear delt)", sets: "3x15", rest: "60s" },
      { name: "Dumbbell Shrug", sets: "3x15", rest: "60s" },
      { name: "Arnold Press", sets: "3x10-12", rest: "75s" },
    ],
    altExercises: [
      { name: "Dumbbell Shoulder Press", sets: "4x10-12", rest: "90s" },
      { name: "Cable Lateral Raise", sets: "4x12-15", rest: "60s" },
      { name: "Upright Row", sets: "3x12", rest: "60s" },
      { name: "Bent-Over Rear Delt Fly", sets: "3x15", rest: "60s" },
      { name: "Barbell Shrug", sets: "3x15", rest: "60s" },
      { name: "Machine Shoulder Press", sets: "3x10-12", rest: "75s" },
    ],
  },
  arms: {
    label: "Arms & Core",
    color: "#E8A62A",
    icon: "💥",
    exercises: [
      { name: "EZ-Bar Curl", sets: "3x10-12", rest: "60s" },
      { name: "Skull Crushers", sets: "3x10-12", rest: "60s" },
      { name: "Cable Curl", sets: "3x12-15", rest: "60s" },
      { name: "Plank", sets: "3x45-60s", rest: "45s" },
      { name: "Cable Crunch", sets: "3x15", rest: "60s" },
      { name: "Hanging Leg Raise", sets: "3x12-15", rest: "60s" },
    ],
    altExercises: [
      { name: "Preacher Curl", sets: "3x10-12", rest: "60s" },
      { name: "Overhead Tricep Extension", sets: "3x12", rest: "60s" },
      { name: "Spider Curl", sets: "3x12", rest: "60s" },
      { name: "Ab Wheel Rollout", sets: "3x10-12", rest: "60s" },
      { name: "Russian Twist", sets: "3x20", rest: "45s" },
      { name: "Decline Crunch", sets: "3x15", rest: "60s" },
    ],
  },
};

const CARDIO_OPTIONS = [
  "Treadmill – moderate pace (3.5–4.0 mph incline walk)",
  "Stationary Bike – moderate resistance",
  "Elliptical – steady pace",
  "Stairmaster – low-medium intensity",
  "Rowing Machine – steady pace",
];

// Build 4-week schedule: Mon=chest, Tue=back, Wed=legs, Thu=shoulders, Fri=arms, Sat/Sun=rest
const DAY_MAP = [null, "chest", "back", "legs", "shoulders", "arms", null]; // 0=Sun

function getWeekSchedule(weekNum) {
  const useAlt = weekNum % 2 === 1; // alternate weeks
  return [1, 2, 3, 4, 5].map((dayOfWeek) => {
    const key = DAY_MAP[dayOfWeek];
    const group = MUSCLE_GROUPS[key];
    const cardioIndex = (weekNum * 5 + dayOfWeek) % CARDIO_OPTIONS.length;
    return {
      dayOfWeek,
      dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek],
      key,
      group,
      useAlt,
      cardio: CARDIO_OPTIONS[cardioIndex],
      exercises: useAlt ? group.altExercises : group.exercises,
    };
  });
}

const WEEKS = [0, 1, 2, 3];
const WEEK_LABELS = ["Week 1", "Week 2", "Week 3", "Week 4"];

export default function WorkoutPlan() {
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(null);

  const schedule = getWeekSchedule(activeWeek);
  const selected =
    activeDay !== null ? schedule.find((d) => d.dayOfWeek === activeDay) : null;

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        background: "#0f0f13",
        minHeight: "100vh",
        color: "#f0f0f0",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a24 0%, #0f0f13 100%)",
          borderBottom: "1px solid #222",
          padding: "24px 20px 16px",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "#888",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            30-Day Program
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            Body Recomp Plan
          </h1>
          <p style={{ margin: "6px 0 0", color: "#888", fontSize: 13 }}>
            5 days/week · 1 hour · 30 min lifting · 20 min cardio · 10 min sauna
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>
        {/* Session Breakdown Bar */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 24,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {[
            { label: "Lifting", pct: 50, color: "#E84B2A" },
            { label: "Cardio", pct: 33, color: "#2A7BE8" },
            { label: "Sauna", pct: 17, color: "#E8A62A" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: s.pct,
                background: s.color + "22",
                borderTop: `3px solid ${s.color}`,
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: s.color,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>
                {s.pct === 50 ? "30" : s.pct === 33 ? "20" : "10"}
                <span style={{ fontSize: 11, color: "#888", marginLeft: 3 }}>
                  min
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Week Selector */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 11,
              color: "#666",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Select Week
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {WEEKS.map((w) => (
              <button
                key={w}
                onClick={() => {
                  setActiveWeek(w);
                  setActiveDay(null);
                }}
                style={{
                  flex: 1,
                  padding: "10px 4px",
                  borderRadius: 8,
                  border: "1px solid",
                  borderColor: activeWeek === w ? "#E84B2A" : "#2a2a35",
                  background: activeWeek === w ? "#E84B2A18" : "#1a1a24",
                  color: activeWeek === w ? "#E84B2A" : "#888",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {WEEK_LABELS[w]}
                {w % 2 === 1 && (
                  <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>
                    Alt Routine
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Day Cards */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 11,
              color: "#666",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Select Day
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {schedule.map((day) => (
              <button
                key={day.dayOfWeek}
                onClick={() =>
                  setActiveDay(
                    activeDay === day.dayOfWeek ? null : day.dayOfWeek,
                  )
                }
                style={{
                  flex: 1,
                  padding: "12px 4px",
                  borderRadius: 10,
                  border: "1px solid",
                  borderColor:
                    activeDay === day.dayOfWeek ? day.group.color : "#2a2a35",
                  background:
                    activeDay === day.dayOfWeek
                      ? day.group.color + "18"
                      : "#1a1a24",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18 }}>{day.group.icon}</div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color:
                      activeDay === day.dayOfWeek ? day.group.color : "#888",
                    marginTop: 4,
                  }}
                >
                  {day.dayName}
                </div>
              </button>
            ))}
          </div>
          {/* Rest days note */}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {["Sat", "Sun"].map((d) => (
              <div
                key={d}
                style={{
                  flex: 1,
                  padding: "10px 4px",
                  borderRadius: 10,
                  border: "1px solid #1e1e28",
                  background: "#141418",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18 }}>😴</div>
                <div style={{ fontSize: 11, color: "#444", marginTop: 4 }}>
                  {d} – Rest
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Detail */}
        {selected && (
          <div
            style={{
              background: "#1a1a24",
              borderRadius: 14,
              border: `1px solid ${selected.group.color}33`,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: selected.group.color + "18",
                borderBottom: `1px solid ${selected.group.color}33`,
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: selected.group.color,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {WEEK_LABELS[activeWeek]} ·{" "}
                    {
                      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                        selected.dayOfWeek
                      ]
                    }
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>
                    {selected.group.icon} {selected.group.label}
                  </div>
                </div>
                {activeWeek % 2 === 1 && (
                  <div
                    style={{
                      fontSize: 10,
                      background: selected.group.color + "22",
                      color: selected.group.color,
                      borderRadius: 6,
                      padding: "4px 8px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    ALT ROUTINE
                  </div>
                )}
              </div>
            </div>

            {/* Session Timeline */}
            <div
              style={{ padding: "16px 20px", borderBottom: "1px solid #222" }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#555",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 12,
                }}
              >
                Session Timeline
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  {
                    time: "0:00 – 0:30",
                    label: "Strength Training",
                    sub: "6 exercises below",
                    color: selected.group.color,
                  },
                  {
                    time: "0:30 – 0:50",
                    label: "Cardio",
                    sub: selected.cardio,
                    color: "#2A7BE8",
                  },
                  {
                    time: "0:50 – 1:00",
                    label: "Sauna",
                    sub: "Heat exposure — stretch or breathe",
                    color: "#E8A62A",
                  },
                ].map((t) => (
                  <div
                    key={t.time}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        minWidth: 110,
                        fontSize: 11,
                        color: "#555",
                        paddingTop: 2,
                      }}
                    >
                      {t.time}
                    </div>
                    <div
                      style={{
                        width: 3,
                        minWidth: 3,
                        borderRadius: 2,
                        background: t.color,
                        alignSelf: "stretch",
                        marginTop: 4,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: t.color,
                        }}
                      >
                        {t.label}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#666", marginTop: 1 }}
                      >
                        {t.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercises */}
            <div style={{ padding: "16px 20px" }}>
              <div
                style={{
                  fontSize: 11,
                  color: "#555",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 12,
                }}
              >
                Exercises
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {selected.exercises.map((ex, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      background: "#0f0f13",
                      borderRadius: 10,
                      border: "1px solid #222",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: selected.group.color + "22",
                        color: selected.group.color,
                        fontWeight: 800,
                        fontSize: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>
                        {ex.name}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#555", marginTop: 2 }}
                      >
                        {ex.sets} · Rest {ex.rest}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div
              style={{
                margin: "0 20px 20px",
                padding: "12px 14px",
                background: "#0f0f13",
                borderRadius: 10,
                border: "1px solid #222",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#555",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 8,
                }}
              >
                💡 Tips for Today
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  fontSize: 12,
                  color: "#777",
                  lineHeight: 1.8,
                }}
              >
                <li>
                  Start each session with 2–3 min light warm-up (arm circles,
                  leg swings)
                </li>
                <li>
                  Focus on{" "}
                  <strong style={{ color: "#aaa" }}>form over weight</strong> —
                  add weight gradually each week
                </li>
                <li>
                  Hit your protein goal today:{" "}
                  <strong style={{ color: "#aaa" }}>185–230g</strong>
                </li>
                <li>
                  Sauna tip: hydrate before and after; 10 min at 170–190°F ideal
                </li>
              </ul>
            </div>
          </div>
        )}

        {!selected && (
          <div
            style={{
              background: "#1a1a24",
              borderRadius: 14,
              border: "1px solid #222",
              padding: "32px 20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>👆</div>
            <div style={{ color: "#555", fontSize: 14 }}>
              Tap a day above to see your full workout
            </div>
          </div>
        )}

        {/* Weekly Overview */}
        <div
          style={{
            marginTop: 24,
            background: "#1a1a24",
            borderRadius: 14,
            border: "1px solid #222",
            padding: "16px 20px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#555",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 14,
            }}
          >
            Weekly Muscle Map
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {schedule.map((day) => (
              <div
                key={day.dayOfWeek}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 36,
                    fontSize: 12,
                    color: "#555",
                    fontWeight: 600,
                  }}
                >
                  {day.dayName}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    background: day.group.color + "33",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: day.group.color + "88",
                      borderRadius: 4,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: day.group.color,
                    fontWeight: 600,
                    minWidth: 130,
                  }}
                >
                  {day.group.icon} {day.group.label}
                </div>
              </div>
            ))}
            {["Sat", "Sun"].map((d) => (
              <div
                key={d}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 36,
                    fontSize: 12,
                    color: "#333",
                    fontWeight: 600,
                  }}
                >
                  {d}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    background: "#1e1e28",
                  }}
                />
                <div style={{ fontSize: 12, color: "#333", minWidth: 130 }}>
                  😴 Rest Day
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            padding: "12px 16px",
            background: "#0f0f13",
            borderRadius: 10,
            border: "1px solid #1e1e28",
            fontSize: 12,
            color: "#444",
            textAlign: "center",
          }}
        >
          Weeks 1 & 3 = Primary routine · Weeks 2 & 4 = Alternate routine (keeps
          muscles guessing)
        </div>
      </div>
    </div>
  );
}
