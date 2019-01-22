import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const $i18n = new VueI18n({
  locale: getLang(), // 语言标识
  fallbackLocale: 'en',
  messages: {
    'es': require('../assets/lang/es'),
    'en': require('../assets/lang/en'),
    'ru': require('../assets/lang/ru')
  }
});

export default $i18n
