import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// VueAnt
import {
  Button,
  Menu,
  Input,
  Icon,
  Table,
  Dropdown,
  Select,
} from 'ant-design-vue'

import VTooltip from 'v-tooltip'

Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Table)
Vue.use(Dropdown)
Vue.use(Select)

Vue.use(VTooltip)


new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  created() {
    store.subscribe((mutation, state) => {
      localStorage.setItem('store', JSON.stringify(state));
    });
  },

  render: h => h(App)
}).$mount('#app')
