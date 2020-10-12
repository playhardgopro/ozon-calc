import Vue from 'vue';
import Vuex from 'vuex';

import { createVuexStore } from 'vuex-simple';

import MyStore from '@/store/root';

Vue.use(Vuex);

// create our module class instance
const instance = new MyStore();

// create and export our store
export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: []
});
