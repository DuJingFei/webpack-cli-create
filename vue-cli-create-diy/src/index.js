import './style/index.css'
//import novanber from './images/6_novanber.jpg'

// var img1 = new Image();
// img1.src = novanber;
// img1.classList.add('jay-chou');
// var root = document.getElementById('root')
// root.append(img1)

// handleEvent();

// console.log(11212)

// function handleEvent() {
//   console.log('This is a great job');
// }

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('getSuccess')
//   }, 1000)
// }).then(res => {
//   console.log('this promise has successed and callback：',res)
// })

import Vue from 'vue';
import App from './components/app.vue'
const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  render: (h) => h(App)
}).$mount(root)
