
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

import createLogger from "vuex/dist/logger" // 修改

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  plugins: [createPersistedState()]
})
