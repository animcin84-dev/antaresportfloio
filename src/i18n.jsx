import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const translations = {
  en: {
    langLabel: 'EN',
    heroKicker: 'THE MACHINE REMEMBERS.',
    heroTitleA: 'ABAI',
    heroTitleB: 'BOL',
    heroSub: 'SAME TEAM · NEW NAME · FORMERLY ANTARES',
    heroMemoryTitle: 'EVERY MATCH\nLEAVES DATA.',
    heroMemoryBody: 'Robots change. The engineering method survives every revision.',
    heroContinuityTitle: 'ANTARES\n→ ABAI BOL',
    heroContinuityBody: 'The identity evolves without deleting the work that came before it.',
    identityTitle: 'THE NAME CHANGES.\nTHE MEMORY DOESN’T.',
    identityBody: 'ABAI BOL carries forward the same team story. Historical team numbers remain visible as archive evidence.',
    peopleTitle: 'PEOPLE BUILD\nTHE MACHINE.',
    peopleBody: 'Engineering is collective work: mechanical, software, design and impact move together.',
    finale: 'THE MACHINE\nREMEMBERS.',
    index: 'INDEX',
    close: 'CLOSE',
    prev: 'PREVIOUS',
    next: 'NEXT',
    evidence: 'VIEW EVIDENCE',
  },
  kz: {
    langLabel: 'KZ',
    heroKicker: 'МАШИНА БӘРІН ЕСТЕ САҚТАЙДЫ.',
    heroTitleA: 'ABAI',
    heroTitleB: 'BOL',
    heroSub: 'БІР КОМАНДА · ЖАҢА АТАУ · БҰРЫН ANTARES',
    heroMemoryTitle: 'ӘР МАТЧ\nДЕРЕК ҚАЛДЫРАДЫ.',
    heroMemoryBody: 'Роботтар өзгереді. Инженерлік әдіс әр итерациядан кейін де сақталады.',
    heroContinuityTitle: 'ANTARES\n→ ABAI BOL',
    heroContinuityBody: 'Жаңа айдентика бұрынғы еңбекті өшірмейді.',
    identityTitle: 'АТАУ ӨЗГЕРЕДІ.\nЖАД САҚТАЛАДЫ.',
    identityBody: 'ABAI BOL сол команданың тарихын жалғастырады. Архивтегі тарихи команда нөмірлері дәлел ретінде сақталады.',
    peopleTitle: 'МАШИНАНЫ\nАДАМДАР ЖАСАЙДЫ.',
    peopleBody: 'Инженерия — ортақ жұмыс: механика, бағдарламалау, дизайн және әлеуметтік әсер бірге қозғалады.',
    finale: 'МАШИНА\nЕСТЕ САҚТАЙДЫ.',
    index: 'БӨЛІМДЕР',
    close: 'ЖАБУ',
    prev: 'АЛДЫҢҒЫ',
    next: 'КЕЛЕСІ',
    evidence: 'ДӘЛЕЛДІ КӨРУ',
  }
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    document.documentElement.lang = language === 'kz' ? 'kk' : 'en'
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: key => translations[language]?.[key] ?? translations.en[key] ?? key,
  }), [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside I18nProvider')
  return value
}
