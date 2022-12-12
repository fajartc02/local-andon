import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VuePageTransition from 'vue-page-transition'

import 'vue-select/dist/vue-select.css';
import 'apexcharts'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'

import Multiselect from 'vue-multiselect'
// import Skeleton from 'vue-loading-skeleton';

// VUE TREE VIEW IMPORT
// import 'simple-vue-tree'
// import 'simple-vue-tree/dist/lib/simple-tree.css'

import VueTreeList from 'vue-tree-list-new'

Vue.use(VueTreeList)



// register globally
Vue.component('multiselect', Multiselect)
    // Vue.use(Skeleton)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


import 'vue-search-select/dist/VueSearchSelect.css'




import Progress from 'vue-multiple-progress'
import vuetify from './plugins/vuetify';
import VueExcelViewer from '@uublue/vue-excel-viewer'
import '@uublue/vue-excel-viewer/lib/vue-excel-viewer.css'

// import VuePdfReader from 'vue-pdf-reader';
// import 'vue-pdf-reader/vue-pdf-reader.css';ss

// Vue.use(VuePdfReader);

// import VTreeview from "v-treeview"

// Vue.use(VTreeview)


Vue.use(VueExcelViewer)
    // # Vue.component('vm-progress', Progress) # 可以指定组件名称
Vue.use(Progress) //# 组件名称 `vm-progress`

Vue.use(VuePageTransition)

// Vue.use(MdButton)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')