import Vue from 'vue'
import { addBackToTop } from 'vanilla-back-to-top'
addBackToTop({
  diameter: 56,
  scrollDuration : 2000,
  backgroundColor: 'rgb(62,119,170)',
  textColor: '#fff',
  zIndex: 1000
});
Vue.use(addBackToTop);
addBackToTop({
  scrollDuration : 300
});
