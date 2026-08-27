---
layout: home

hero:
  name: 空军基地
  # text: ulnae
  tagline: 一个爱钓鱼的切图仔
  image:
    src: /image/fish.svg
    alt: 三文鱼
  actions:
    - theme: brand
      text: 开始学习
      link: /fish/started
    - theme: alt
      text: 关于我
      link: /about/started
---

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useScriptTag } from '@vueuse/core';

// https://www.vantajs.com/
let effect = null
const scriptTags = [
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js',
  'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.rings.min.js',
].map(url => useScriptTag(url).load())

function initVantaRings() {
  effect = window.VANTA.RINGS({
    el: ".is-home",
    mouseControls: true, // 是否允许通过鼠标移动来控制相机视角
    touchControls: true, // 是否允许通过触摸屏上的手势来控制相机视角
    gyroControls: true, // 是否允许通过设备的陀螺仪来控制相机视角
    // minHeight: 200.00, // 最小高度
    // minWidth: 200.00, // 最小宽度
    scale: 1.00, // 桌面端动画的缩放比例
    scaleMobile: 1.00, // 移动端动画的缩放比例
    backgroundAlpha: 0.00, // 背景透明度
    speed: 6, // 动画速度
    THREE: window.THREE
  })
}

onMounted(() => {
  Promise.all(scriptTags).then(initVantaRings);
})

onUnmounted(() => {
  effect?.destroy()
  effect = null
})
</script>



<div class="vercount-container">
  <span id="vercount_value_page_pv">Loading</span>|
  <span id="vercount_value_site_pv">Loading</span>|
  <span id="vercount_value_site_uv">Loading</span>
</div>
