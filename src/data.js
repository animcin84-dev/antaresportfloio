export const awards = [
  { date: 'DEC 2023', event: 'TECH CUP', location: 'ALMATY', result: 'CONTROL AWARD · II' },
  { date: 'JAN 2024', event: 'NUSANTARA REGIONAL', location: 'DEPOK', result: 'THINK AWARD · WINNER' },
  { date: 'JAN 2024', event: 'NUSANTARA REGIONAL', location: 'DEPOK', result: 'FINALIST ALLIANCE · CAPTAIN' },
  { date: 'JAN 2024', event: 'NUSANTARA REGIONAL', location: 'DEPOK', result: 'CONTROL AWARD · III' },
  { date: 'JAN 2024', event: 'TAMOS FIRST', location: 'ALMATY', result: 'CONTROL AWARD · WINNER' },
  { date: 'FEB 2024', event: 'CENTRAL ASIA', location: 'KAZAKHSTAN', result: 'THINK AWARD · III' },
  { date: 'FEB 2024', event: 'CENTRAL ASIA', location: 'KAZAKHSTAN', result: 'PROMOTE AWARD · III' },
  { date: 'NOV 2024', event: 'ALMATY REGIONAL', location: 'ALMATY', result: 'THINK AWARD · II' },
  { date: 'DEC 2025', event: 'BISHKEK REGIONAL', location: 'BISHKEK', result: 'REACH AWARD · WINNER' },
  { date: 'JAN 2026', event: 'DARYN QUALIFIER', location: 'KAZAKHSTAN', result: 'SUSTAIN AWARD · III' },
  { date: 'JUN 2026', event: 'LEPSI FEST', location: 'KAZAKHSTAN', result: "JUDGES' CHOICE" },
]

export const layers = {
  mechanical: {
    index: '01',
    title: 'MECHANICAL',
    copy: 'Structure converts intent into repeatable movement. Chassis, mechanisms, gearing and geometry are judged by one standard: can the robot execute the same action under match pressure?',
    tags: ['LOAD PATHS', 'MOTION ENVELOPES', 'SERVICEABILITY'],
  },
  control: {
    index: '02',
    title: 'CONTROL',
    copy: 'Every actuator becomes useful only when the driver and software can command it predictably. Control design connects sensors, motors, feedback and human input into one responsive system.',
    tags: ['SENSORS', 'ACTUATORS', 'FEEDBACK'],
  },
  software: {
    index: '03',
    title: 'SOFTWARE',
    copy: 'Autonomous routines, vision, telemetry and state logic turn mechanical possibility into repeatable decisions. Software is treated as an engineering subsystem, not a last-minute layer.',
    tags: ['AUTONOMY', 'VISION', 'STATE'],
  },
  iteration: {
    index: '04',
    title: 'ITERATION',
    copy: 'The first version is evidence, not the answer. We prototype, fail, measure, rebuild and document the delta so every revision has a reason to exist.',
    tags: ['FAIL', 'MEASURE', 'REBUILD'],
  },
}

export const seasons = [
  { year: '2023—24', game: 'CENTER\nSTAGE', note: 'International breakout. Indonesia finalist run and the densest award season in team history.', result: '19—14—0' },
  { year: '2024—25', game: 'INTO THE\nDEEP', note: 'A harder season that kept the engineering process visible beyond match rankings.', result: 'THINK AWARD · II' },
  { year: '2025—26', game: 'DECODE', note: 'Reach, Sustain and Judges’ Choice distinctions extended the competitive record.', result: '12—13—0' },
  { year: '2026—27', game: 'NEXT\nMISSION', note: 'ABAI BOL enters its next chapter under a new name and a sharper visual identity.', result: 'OPEN / BUILDING', next: true },
]
