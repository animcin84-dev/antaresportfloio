export const EVIDENCE_DRIVE_URL = 'https://drive.google.com/drive/folders/1F8peRnkwYX_1QZd7oxoTGL5CsWw1Fm9V'

// Final team-provided award list supplied in the project handoff on 2026-09-01.
// It is intentionally kept distinct from older scraped/public-result drafts.
export const awards = [
  { date: '2023', event: 'ALMATY TECHCUP', location: 'ALMATY', result: 'CONTROL AWARD · 2ND PLACE' },
  { date: '2023', event: 'TAMOS FIRST · REGIONAL QUALIFIER', location: 'KAZAKHSTAN', result: 'CONTROL AWARD · WINNER' },
  { date: '2024', event: 'NUSANTARA REGIONAL', location: 'INDONESIA', result: 'FINALIST ALLIANCE · CAPTAIN' },
  { date: '2024', event: 'NUSANTARA REGIONAL', location: 'INDONESIA', result: 'THINK AWARD · WINNER' },
  { date: '2024', event: 'NUSANTARA REGIONAL', location: 'INDONESIA', result: 'CONTROL AWARD · 3RD PLACE' },
  { date: '2024', event: 'CENTRAL ASIA FIRST CHAMPIONSHIP', location: 'KAZAKHSTAN', result: 'THINK AWARD · 3RD PLACE' },
  { date: '2024', event: 'CENTRAL ASIA FIRST CHAMPIONSHIP', location: 'KAZAKHSTAN', result: 'PROMOTE AWARD · 3RD PLACE' },
  { date: '2024', event: 'CENTRAL ASIA FIRST CHAMPIONSHIP', location: 'KAZAKHSTAN', result: 'DESIGN AWARD · WINNER' },
  { date: '2024', event: 'ALMATY REGIONAL FIRST', location: 'ALMATY', result: 'THINK AWARD · 2ND PLACE' },
  { date: '2025', event: 'TAMOS FIRST · OFF-SEASON', location: 'KAZAKHSTAN', result: 'INNOVATE AWARD · WINNER' },
  { date: '2025', event: 'ZHYLANDY REGIONAL FIRST', location: 'KAZAKHSTAN', result: 'DESIGN AWARD · WINNER' },
  { date: '2025', event: 'BISHKEK REGIONAL FIRST', location: 'BISHKEK', result: 'REACH AWARD · WINNER' },
  { date: '2025', event: 'FIRST GLOBAL CHALLENGE KAZAKHSTAN', location: 'KAZAKHSTAN', result: 'INNOVATOR AWARD · 3RD PLACE' },
  { date: '2025', event: 'FIRST GLOBAL CHALLENGE', location: 'FGC', result: 'WINNING ALLIANCE AWARD · WINNER' },
  { date: '2025', event: 'FIRST GLOBAL CHALLENGE', location: 'FGC', result: 'INTERNATIONAL UNITY AWARD · 2ND PLACE' },
  { date: '2025', event: 'FIRST GLOBAL CHALLENGE', location: 'FGC', result: 'SKILLS CHALLENGE · 3RD PLACE' },
  { date: '2026', event: 'DARYN QUALIFIER', location: 'KAZAKHSTAN', result: 'SUSTAIN AWARD · WINNER' },
  { date: '2026', event: 'LEPSI FEST', location: 'KAZAKHSTAN', result: 'CONNECT AWARD · 2ND PLACE' },
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
  { year: '2023—24', game: 'CENTER\nSTAGE', note: 'The international breakout: TechCup and Tamos momentum, then a finalist alliance in Indonesia with Think and Control recognition.', result: 'INDONESIA · THINK WINNER' },
  { year: '2024—25', game: 'INTO THE\nDEEP', note: 'Design and engineering recognition continued through Almaty, Central Asia, Zhylandy and Tamos off-season competition.', result: 'DESIGN / INNOVATE' },
  { year: '2025—26', game: 'DECODE', note: 'Bishkek Reach, Daryn Sustain, Lepsi Connect and FIRST Global Challenge results expanded the record beyond one event format.', result: 'REACH / SUSTAIN / FGC' },
  { year: '2026—27', game: 'ABAI BOL', note: 'The team enters the next mission under a new public identity while keeping the ANTARES engineering history visible.', result: 'NEXT BUILD / OPEN', next: true },
]
