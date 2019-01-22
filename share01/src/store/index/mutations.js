import * as types from './mutation-types'

// getters 类似计算属性
const mutations = {
  [types.SET_TEST_DATA](state, data) {
    state.testData = data;
  }
};
export default mutations
