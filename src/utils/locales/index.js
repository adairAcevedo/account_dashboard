import { createI18n } from 'vue-i18n';

import en from '@/utils/locales/en.json'
import es from '@/utils/locales/es.json'
export const i18n = createI18n({ locale: 'es',
    legacy: false,
    messages: {
        en,
        es
    }
})
