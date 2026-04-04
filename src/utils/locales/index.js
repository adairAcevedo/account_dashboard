import { createI18n } from 'vue-i18n';

import en from '@/utils/locales/en.json'
import es from '@/utils/locales/es.json'
import {baseLanguage} from '@/stores/configStore'

const getPersistedLocale = () => {
    const saved = localStorage.getItem('selected_language')
    console.log('current locale ',saved)
    if(saved) return saved

    return baseLanguage
}
export const i18n = createI18n({ 
    locale: getPersistedLocale(),
    legacy: false,
    fallbackLocale: baseLanguage,
    messages: {
        en,
        es
    }
})
