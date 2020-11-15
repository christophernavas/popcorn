import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      user: {}
    },
    mutations: {
      setUsername (state, username) {
        state.user.username = username
      },
      setScore (state, score) {
        state.user.score = score
      },
      resetState (state) {
        Object.assign(state, { user: {} })
      }
    },
    actions: {
      createUser ({ commit }, username) {
        commit('setUsername', username)
      },
      updateScore ({ commit }, score) {
        commit('setScore', score)
      },
      resetState ({ commit }) {
        commit('resetState')
      }
    },
    getters: {
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
