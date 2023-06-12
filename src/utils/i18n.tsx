import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from 'i18next'
import enUsTrans from '@/locales/en-us'
import zhTwTrans from '@/locales/zh-tw'
import { initReactI18next } from 'react-i18next'

const resources = {
  'en-US': {
    translation: enUsTrans,
  },
  'zh-TW': {
    translation: zhTwTrans,
  },
}

const lang = navigator.language

const isZh = lang === 'zh-CN' || lang === 'zh-TW' || lang === 'zh-HK' || lang === 'zh-SG'

type Types = {
  locale: 'en-US' | 'zh-TW'
  value: string
}

export const languageList: Types[] = [
  { locale: 'en-US', value: 'English' },
  { locale: 'zh-TW', value: '中文(繁體)' },
]

export const localeList: Types[] = [
  { locale: 'en-US', value: 'enUs' },
  { locale: 'zh-TW', value: 'zhTW' },
]

export const getUserLanguage = () => {
  const list: { locale: string }[] = [{ locale: 'zh-TW' }, { locale: 'en-US' }]
  const local = list.find((item) => item.locale === localStorage.getItem('i18nextLng'))?.locale
  const value = list.find((item) => item.locale === navigator.language)?.locale
  return local ? local : value ? value : isZh ? 'zh-TW' : 'en-US'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getUserLanguage(),
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
