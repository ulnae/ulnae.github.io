// https://vitepress.dev/guide/custom-theme
import { h, nextTick, watch } from 'vue'
import { useRoute, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Giscus from './components/Giscus.vue';
// import mediumZoom from 'medium-zoom';
import { 
  NolebaseEnhancedReadabilitiesMenu, 
  NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

import './style.css'
import './medium-zoom.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu), 
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // layout: 'doc'
      // 'doc-top':()=>h('div','doc-top'),
      // 'doc-bottom':()=>h('div','doc-bottom'),
      // 'doc-footer-before':()=>h('div','doc-footer-before'),
      // 'doc-before':()=>h('div','doc-before'),
      'doc-after': () => h(Giscus),
      // 'sidebar-nav-before':()=>h('div','sidebar-nav-before'),
      // 'sidebar-nav-after':()=>h('div','sidebar-nav-after'),
      // 'aside-top':()=>h('div','aside-top'),
      // 'aside-bottom':()=>h('div','aside-bottom'),
      // 'aside-outline-before':()=>h('div','aside-outline-before'),
      // 'aside-outline-after':()=>h('div','aside-outline-after'),
      // 'aside-ads-before':()=>h('div','aside-ads-before'),
      // 'aside-ads-after':()=>h('div','aside-ads-after'),
      // layout: 'home'
      // 'home-hero-before':()=>h('div','home-hero-before'),
      // 'home-hero-info-before':()=>h('div','home-hero-info-before'),
      // 'home-hero-info':()=>h('div','home-hero-info'),
      // 'home-hero-info-after':()=>h('div','home-hero-info-after'),
      // 'home-hero-actions-before-actions':()=>h('div','home-hero-actions-before-actions'),
      // 'home-hero-actions-after':()=>h('div','home-hero-actions-after'),
      // 'home-hero-image':()=>h('div','home-hero-image'),
      // 'home-hero-after':()=>h('div','home-hero-after'),
      // 'home-features-before':()=>h('div','home-features-before'),
      // 'home-features-after':()=>h('div','home-features-after'),
      // layout: 'page'
      // 'page-top':()=>h('div','page-top'),
      // 'page-bottom':()=>h('div','page-bottom'),
      // 404
      // 'not-found':()=>h('div','not-found'),
      // 总是启用
      // 'layout-top':()=>h('div','layout-top'),
      // 'layout-bottom':()=>h('div','layout-bottom'),
      // 'nav-bar-title-before':()=>h('div','nav-bar-title-before'),
      // 'nav-bar-title-after':()=>h('div','nav-bar-title-after'),
      // 'nav-bar-content-before':()=>h('div','nav-bar-content-before'),
      // 'nav-bar-content-after':()=>h('div','nav-bar-content-after'),
      // 'nav-screen-content-before':()=>h('div','nav-screen-content-before'),
      // 'nav-screen-content-after':()=>h('div','nav-screen-content-after'),
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
