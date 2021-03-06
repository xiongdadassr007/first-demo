import Vue from 'vue'
import App from './App.vue'
import { Table, Button, Popconfirm, Input, Icon, Switch, Radio } from 'ant-design-vue';
Vue.use(Table)
Vue.use(Button)
Vue.use(Popconfirm)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Switch)
Vue.use(Radio)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
