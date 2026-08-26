---
layout: home

hero:
  name: 空军基地
  text: ulnae
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
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    // minHeight: 200.00,
    // minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundAlpha: 0.00,
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
