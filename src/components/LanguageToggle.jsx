import React from 'react'
import { useI18n } from '../i18n'

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n()
  return (
    <div className="language-toggle" aria-label="Language">
      <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
      <span>/</span>
      <button type="button" aria-pressed={language === 'kz'} onClick={() => setLanguage('kz')}>KZ</button>
    </div>
  )
}
