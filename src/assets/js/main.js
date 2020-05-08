import Vue from 'vue';
import {BootstrapVue} from 'bootstrap-vue';

import app from './app.vue';

// dev
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('../../../node_modules/front-end-debug/src/js/front-end-debug');
}

////
///
//

// console.log('main')

Vue.use(BootstrapVue);

if ($('#stock-calc').length) {
  new Vue({
    el: '#stock-calc',
    render: (h) => h(app),
  });
}
