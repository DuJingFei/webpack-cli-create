import css from './style/index.css'
import bigImage from './images/big_image.jpeg'
import logo from './images/logo.jpg'

import result1 from './assets/child1'
import result2 from './assets/child2'

import { hideMobile4 } from './assets/common'

var img1 = new Image();
img1.src = bigImage;
img1.classList.add('big-image');
var root = document.getElementById('root')
root.append(img1)

console.log('result1 is：', result1)
console.log('result1 is：', result2)

console.log(hideMobile4(13674813961))

// var img2 = new Image();
// img2.src = logo;
// img2.classList.add('vue');
// root.append(img2)

// handleEvent(); // 函数提升

// console.log('哦？是吗？好可惜~') 

// function handleEvent() {
//   console.log('梅西要离开巴萨了');
// }

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('不走了')
//   }, 1000)
// }).then(res => {
//   console.log('哦不对，最新的消息是他决定',res)
// })

// import Vue from 'vue';
// import App from './components/app.vue'
// const root = document.createElement('div');
// document.body.appendChild(root);

// new Vue({
//   render: (h) => h(App)
// }).$mount(root)
