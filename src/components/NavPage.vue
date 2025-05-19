<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// API URL（根据您的实际部署情况修改）
const API_URL = 'http://localhost:8000/api.php';

// 网站数据和分类数据
const websites = ref([]);


// 热搜榜数据
const trendingItems = ref([]);
const trendingLoading = ref(true);
const trendingError = ref(null);
let trendingInterval = null;

async function fetchTrendingData() {
  trendingLoading.value = true;
  trendingError.value = null;
  try {
    const response = await fetch('https://zj.v.api.aa1.cn/api/weibo-rs/');
    if (!response.ok) {
      throw new Error('API请求失败');
    }
    const data = await response.json();
    if (data.code === 1 && data.data && Array.isArray(data.data)) {
      trendingItems.value = data.data.slice(0, 10).map(item => ({
        title: item.title,
        hot: item.hot ? item.hot.toString() : '',
        url: `https://s.weibo.com/weibo?q=%23${encodeURIComponent(item.title)}%23&t=31&band_rank=8&Refer=top`
      }));
    } else {
      throw new Error('数据格式不正确');
    }
  } catch (error) {
    console.error('获取热搜数据失败:', error);
    trendingError.value = '获取热搜数据失败，请稍后再试';
    // 返回备用数据
    trendingItems.value = [
      { title: '微博热搜实时数据1', hot: '5012万', url: '#' },
      { title: '最新科技发布会', hot: '4389万', url: '#' },
      { title: '国内重要新闻动态', hot: '3756万', url: '#' },
      { title: '热门影视作品上映', hot: '2934万', url: '#' },
      { title: '体育赛事最新战报', hot: '2145万', url: '#' }
    ].map(item => ({ ...item, url: `https://s.weibo.com/weibo?q=%23${encodeURIComponent(item.title)}%23&t=31&band_rank=8&Refer=top` }));
  } finally {
    trendingLoading.value = false;
  }
}

onMounted(() => {
  fetchData();
  fetchTrendingData();
  trendingInterval = setInterval(fetchTrendingData, 10 * 60 * 1000); // 每10分钟刷新一次
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
    const response = await fetch(`${API_URL}?action=get_all_data`);
    if (!response.ok) {
      throw new Error('API请求失败');
    }
    const data = await response.json();
    if (data.code === 1 && data.data) {
      websites.value = data.data.websites;
      
      // 转换分类数据格式
      categories.value = [
        { id: 'all', name: '全部' },
        ...data.data.categories.filter(cat => cat.identifier !== 'all')
          .map(cat => ({ id: cat.identifier, name: cat.name }))
      ];
    }
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