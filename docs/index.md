---
layout: home

hero:
  name: ulnae
  text: 个人网站
  tagline: 一个爱钓鱼的切图仔
  image:
    src: /image/Eug.png
    alt: 三文鱼
  actions:
    - theme: brand
      text: 开始阅读
      link: /fish/started
    - theme: alt
      text: 关于我
      link: /about

features:
  - icon: 📷
    title: Vlog
    details: See what I’ve been up to!
    link: https://ulnae.github.io/vlog/
    linkText: Learn more
    rel: external
    target: _blank
  - icon: 🎨
    title: Excalidraw
    details: Unleash your creativity!
    link: https://ulnae.github.io/micro-react/#/excalidraw
    linkText: Learn more
    rel: external
    target: _blank
  - icon: 🗺️
    title: Map
    details: Ready to go? 
    link: https://ulnae.github.io/readme/#/Map
    linkText: Learn more
    rel: external
    target: _blank
  - icon: 🐛
    title: Repl
    details: Open Debugger
    link: https://ulnae.github.io/readme/#/Repl
    linkText: Learn more
    rel: external
    target: _blank
---

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const now = ref(new Date());
let timer = null;

// 一行搞定格式化
const formattedTime = computed(() => 
  now.value.toLocaleString('zh-CN', { 
    hour12: false,           // 24小时制
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(/\//g, '-')     // 将 '/' 替换为 '-'（可选）
);

onMounted(() => {
  timer = setInterval(() => { now.value = new Date(); }, 1000);
});
onUnmounted(() => { clearInterval(timer); });

</script>


::: tip 北京时间
{{formattedTime}}
:::