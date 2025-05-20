<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { fetchNavigationData, fetchTrendingData } from '../api/index.js';

// 网站数据和分类数据
const websites = ref([]);

// 热搜榜数据
const trendingItems = ref([]);
const trendingLoading = ref(true);
const trendingError = ref(null);
let trendingInterval = null;

// 封装获取热搜数据的方法
async function getTrendingData() {
  trendingLoading.value = true;
  trendingError.value = null;
  try {
    trendingItems.value = await fetchTrendingData();
  } catch (error) {
    console.error('获取热搜数据失败:', error);
    trendingError.value = '获取热搜数据失败，请稍后再试';
  } finally {
    trendingLoading.value = false;
  }
}

onMounted(() => {
  fetchData();
  getTrendingData();
  trendingInterval = setInterval(getTrendingData, 10 * 60 * 1000); // 每10分钟刷新一次
});

onUnmounted(() => {
  if (trendingInterval) {
    clearInterval(trendingInterval);
  }
});

// 分类数据
const categories = ref([
  { id: 'all', name: '全部' }
]);

// 获取所有数据
async function fetchData() {
  try {
    const data = await fetchNavigationData();
    websites.value = data.websites;
    categories.value = data.categories;
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

// 响应式数据
const currentDate = new Date();
const day = currentDate.getDate();
const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][currentDate.getDay()];
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

// 当前选中的分类
const activeCategory = ref('all');

// 根据当前分类过滤网站
const filteredWebsites = computed(() => {
  if (activeCategory.value === 'all') {
    return websites.value;
  }
  return websites.value.filter(site => site.category === activeCategory.value);
});

// 切换分类方法
const changeCategory = (category) => {
  activeCategory.value = category;
};
</script>

<template src="./NavPage.html"></template>

<style scoped src="./NavPage.css"></style>