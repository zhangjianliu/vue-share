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

export function getLang() {
  var host = window.location.host;
  if ("m.jd.ru" == host) {
    return "ru";
  } else if ("m.joybuy.es" == host) {
    return "es";
  }
  return "en";
}

export function getMessages(){
  let local = getLang();
  let messages;
  if(local === 'es'){
    messages = $i18n.messages.es;
  }else if(local === 'ru'){
    messages = $i18n.messages.ru;
  }else{
    messages = $i18n.messages.en;
  }
  return messages.i18n;
}
