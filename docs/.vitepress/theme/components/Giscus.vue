<template>
  <div style="margin-top: 8dvh;">
    <Giscus
      id="comments"
      :repo="repo"
      :repoId="repoId"
      :category="category"
      :categoryId="categoryId"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      loading="lazy"
      :theme="isDark ? 'dark' : 'light'"
      :key="route.path"
      strict="0"
      lang="zh-CN"
      crossorigin="anonymous"
      async
    />
  </div>
</template>

<script setup>
import Giscus from '@giscus/vue';
import { useRoute, useData } from 'vitepress';
const route = useRoute();
const { isDark } = useData()

const repo = import.meta.env.VITE_GISCUS_REPO
const repoId = import.meta.env.VITE_GISCUS_REPO_ID
const category = import.meta.env.VITE_GISCUS_CATEGORY
const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID

</script>