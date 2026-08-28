// https://vitepress.dev/guide/custom-theme
import { h, nextTick, watch } from 'vue'
import { useRoute, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Giscus from './components/Giscus.vue';
// import mediumZoom from 'medium-zoom';
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
    router.onBeforeRouteChange = (to) => {
      console.log('onBeforeRouteChange：', to)
    }
    router.onBeforePageLoad = (to) => {
      console.log('onBeforePageLoad：', to)
    }
    router.onAfterPageLoad = (to) => {
      console.log('onAfterPageLoad：', to)
    }
    router.onAfterRouteChange = (to) => {
      console.log('onAfterRouteChange：', to)
    }
    // ...
  },
  setup() {
    const route = useRoute();
    watch(
      () => route.path,
      () => nextTick(() => {
        // 处理medium-zoom打包报错问题
        // https://github.com/francoischalifour/medium-zoom/issues/81
        (typeof window !== 'undefined') && import('medium-zoom').then(mediumZoom => {
          mediumZoom.default('.main img', {
            // background: 'var(--vp-c-bg)',
            background: 'transparent',
          })
        })
        // mediumZoom('.main img', {
        //   // background: 'var(--vp-c-bg)',
        //   background: 'transparent',
        // });
      }),
      { immediate: true }
    )
  },
} satisfies Theme
