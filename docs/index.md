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
import { onMounted } from 'vue'
import { useData } from 'vitepress';
import confetti from 'canvas-confetti';

// https://www.vantajs.com/
const { isDark } = useData()
onMounted(() => {
  // https://www.kirilv.com/canvas-confetti/
  var duration = 6 * 1000;
  var animationEnd = Date.now() + duration;
  var skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: (Math.random() * skew) - 0.2
      },
      colors: [ isDark.value ? '#ffffff' : '#000000'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4)
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  }());
 
})

</script>

<!-- https://count.getloli.com/ -->
![getloli](https://count.getloli.com/@ulnae?name=ulnae&padding=7&offset=0&align=center&scale=0.8&pixelated=1&darkmode=auto)