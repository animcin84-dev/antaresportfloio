import React from 'react'
import { useI18n } from '../i18n'
import ResponsiveImage from './ResponsiveImage'

const disciplines = [
  ['ENGINEERING', 'MECHANICAL / BUILD / ITERATION'],
  ['SOFTWARE', 'CONTROL / AUTONOMY / TELEMETRY'],
  ['DESIGN', 'IDENTITY / DOCUMENTATION / MEDIA'],
  ['IMPACT', 'OUTREACH / PARTNERSHIPS / COMMUNITY'],
]

export default function PeopleChapter() {
  const { t } = useI18n()
  return (
    <section className="people-chapter people-chapter--v7" id="team" data-spine-mode="people">
      <div className="people-photo">
        <ResponsiveImage src="/assets/v7/team-outdoors.avif" alt="ABAI BOL / ANTARES robotics team" sizes="(max-width: 900px) 100vw, 62vw" />
        <span>06 / PEOPLE · TEAM ARCHIVE</span>
      </div>
      <div className="people-copy">
        <h2>{t('peopleTitle').split('\n').map(line => <React.Fragment key={line}>{line}<br/></React.Fragment>)}</h2>
        <p>{t('peopleBody')}</p>
        <div className="people-disciplines people-roster">
          {disciplines.map(([role, detail], index) => <span key={role}><i>{String(index + 1).padStart(2,'0')}</i><b>{role}</b><small>{detail}</small></span>)}
        </div>
      </div>
    </section>
  )
}
