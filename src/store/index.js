import Vue from 'vue'
import Vuex from 'vuex'

// Custom modules 
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    task
  }
})
