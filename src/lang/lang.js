import {createI18n} from 'vue-i18n'
import en from './en.json'
import vn from './vn.json'

const messages = {
    en: en,
    vn: vn
}
const i18n = createI18n({
    // something vue-i18n options here ...
    locale: 'vn', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    globalInjection: true,
})
export default i18n