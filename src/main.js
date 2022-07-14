import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// VueAnt
import {
  Button,
  Badge,
  Menu,
  Modal,
  Input,
  Icon,
  Table,
  Dropdown,
  Select,
  Tooltip,
} from 'ant-design-vue'


Vue.use(Button)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Table)
Vue.use(Dropdown)
Vue.use(Select)
Vue.use(Tooltip)
Vue.use(Badge)


import moment from "moment"
moment.locale('ru');


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
