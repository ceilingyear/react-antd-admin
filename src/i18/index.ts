import i18n, { Resource } from "i18next"
import { initReactI18next } from "react-i18next"
import cn from "./cn.json"
import en from "./en.json"

const browserLanguage = navigator.language

let lang = "en"
if (browserLanguage === "zh-CN") {
  lang = "cn"
} else {
  lang = "en"
}
const resources: Resource = {
  en: {
    translation: en,
  },
  cn: {
    translation: cn,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: lang,
  fallbackLng: lang,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
