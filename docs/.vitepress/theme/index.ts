// https://vitepress.dev/guide/custom-theme
import { h, nextTick, watch } from 'vue'
import { useRoute, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Giscus from './components/Giscus.vue';
import mediumZoom from 'medium-zoom';
import './style.css'
import './medium-zoom.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-after': () => h(Giscus),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
  setup() {
    const route = useRoute();
    watch(
      () => route.path,
      () => nextTick(() => {
        mediumZoom('.main img', {
          // background: 'var(--vp-c-bg)',
          background: 'transparent',
        });
      }),
      { immediate: true }
    )
  },
} satisfies Theme
