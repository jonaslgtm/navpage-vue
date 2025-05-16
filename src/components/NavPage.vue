<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 网站数据
const websites = [
  // 科技类
  { name: 'Apple', url: 'https://www.apple.com/cn/', category: 'tech', img: 'https://www.apple.com/ac/globalnav/7/zh_CN/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg' },
  { name: 'iCloud', url: 'https://www.icloud.com/', category: 'tech', img: 'https://www.apple.com/v/icloud/b/images/overview/icloud_icon__er1ur1j3rys2_large_2x.png' },
  { name: 'GitHub', url: 'https://github.com/', category: 'tech', img: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' },
  { name: 'DeepSeek', url: 'https://www.deepseek.com/', category: 'tech', img: 'https://www.deepseek.com/images/logo.svg' },
  
  // 社交类
  { name: 'Instagram', url: 'https://www.instagram.com/', category: 'social', img: 'https://static.cdninstagram.com/rsrc.php/v3/yt/r/30PrGfR3xhB.png' },
  { name: '抖音', url: 'https://www.douyin.com/', category: 'social', img: 'https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/public/favicon.ico' },
  
  // 资讯类
  { name: '央视视频', url: 'https://tv.cctv.com/', category: 'news', img: 'https://p1.img.cctvpic.com/photoAlbum/templet/common/DEPA1452928658061849/cctv_logo_20161128.png' },
  { name: 'YouTube', url: 'https://www.youtube.com/', category: 'news', img: 'https://www.youtube.com/s/desktop/e4d15d2c/img/favicon_144x144.png' },
  { name: '知乎', url: 'https://www.zhihu.com/', category: 'news', img: 'https://static.zhihu.com/heifetz/favicon.ico' },
  { name: '微博', url: 'https://weibo.com/', category: 'news', img: 'https://weibo.com/favicon.ico' },
  { name: '鸟类', url: 'https://www.niaolei.org.cn/', category: 'news', img: 'https://www.niaolei.org.cn/favicon.ico' },
  
  // 工具类
  { name: '微信公众平台', url: 'https://work.weixin.qq.com/', category: 'tools', img: 'https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png' },
  { name: '百度翻译', url: 'https://fanyi.baidu.com/', category: 'tools', img: 'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/favicon/favicon-32x32_ca689c3.png' },
  { name: '腾讯翻译', url: 'https://fanyi.qq.com/', category: 'tools', img: 'https://fanyi.qq.com/favicon.ico' },
  { name: '石墨', url: 'https://www.shimo.im/', category: 'tools', img: 'https://assets.shimonote.com/favicon.ico' },
  { name: '天眼查', url: 'https://www.tianyancha.com/', category: 'tools', img: 'https://static.tianyancha.com/wap-static/images/favicon.ico' },
  
  // 购物类
  { name: '小红书', url: 'https://www.xiaohongshu.com/', category: 'shopping', img: 'https://ci.xiaohongshu.com/favicon.ico' },
  { name: '京东购物', url: 'https://www.jd.com/', category: 'shopping', img: 'https://www.jd.com/favicon.ico' },
];

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
  fetchTrendingData();
  trendingInterval = setInterval(fetchTrendingData, 10 * 60 * 1000); // 每10分钟刷新一次
});

onUnmounted(() => {
  if (trendingInterval) {
    clearInterval(trendingInterval);
  }
});

// 分类数据
const categories = [
  { id: 'all', name: '全部' },
  { id: 'news', name: '资讯' },
  { id: 'tech', name: '科技' },
  { id: 'tools', name: '工具' },
  { id: 'social', name: '社交' },
  { id: 'shopping', name: '购物' },
];

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
    return websites;
  }
  return websites.filter(site => site.category === activeCategory.value);
});

// 切换分类方法
const changeCategory = (category) => {
  activeCategory.value = category;
};
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>网站导航</h1>
      <div class="date-info">
        <div class="date-day">{{ day }}</div>
        <div>{{ weekday }}</div>
        <div>{{ year }}年{{ month }}月</div>
      </div>
    </div>
    
    <div class="category-nav">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="category-item"
        :class="{ active: activeCategory === category.id }"
        @click="changeCategory(category.id)"
      >
        {{ category.name }}
      </div>
    </div>
    
    <div class="grid-container">
      <a 
        v-for="site in filteredWebsites" 
        :key="site.name"
        :href="site.url" 
        class="grid-item"
        :data-category="site.category"
        target="_blank"
      >
        <img :src="site.img" :alt="site.name">
        <span>{{ site.name }}</span>
      </a>
    </div>
    
    <div class="trending">
      <h3>热搜榜</h3>
      <ul class="trending-list">
        <li v-if="trendingLoading">加载中...</li>
        <li v-if="trendingError">{{ trendingError }}</li>
        <template v-if="!trendingLoading && !trendingError">
          <li v-for="(item, index) in trendingItems" :key="item.title">
            <a :href="item.url" target="_blank">
              <span :class="{ 'top-1': index === 0, 'top-2': index === 1, 'top-3': index === 2 }">{{ index + 1 }}</span>
              {{ item.title }}
              <small v-if="item.hot" class="hot-count">{{ item.hot }}</small>
            </a>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* 导航页面样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  color: #333;
  font-size: 24px;
}

.date-info {
  background-color: #ff6b6b;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.date-day {
  font-size: 20px;
  font-weight: bold;
}

.category-nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-item {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #333;
}

.category-item:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.category-item.active {
  background-color: #4a89dc;
  color: white;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 15px 10px;
  background-color: white;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-decoration: none;
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.grid-item img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 10px;
  object-fit: contain;
}

.grid-item span {
  font-size: 14px;
  color: #333;
}

.trending {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.trending h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}

.trending h3::before {
  content: '🔥';
  margin-right: 8px;
}

.trending-list {
  list-style-type: none;
}

.trending-list li {
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}

.trending-list li a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 100%;
  /* justify-content: space-between; */ /* 已移除，恢复左对齐 */
}

.trending-list li:hover {
  background-color: rgba(255, 255, 255, 0.5);
  padding-left: 5px;
}

.trending-list li:last-child {
  border-bottom: none;
}

.trending-list li span {
  background-color: #f0f0f0;
  color: #999;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 12px;
  flex-shrink: 0;
}

/* 前三名特殊样式 */
.trending-list li span.top-1 {
  background-color: #ff4d4f;
  color: white;
}

.trending-list li span.top-2 {
  background-color: #ff7a45;
  color: white;
}

.trending-list li span.top-3 {
  background-color: #ffa940;
  color: white;
}

.hot-count {
  font-size: 0.8em;
  color: #999;
  margin-left: auto; /* 修改为auto以实现右对齐 */
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
}

/* 前三名热搜数量特殊样式 */
.trending-list li a span.top-1 ~ .hot-count {
  background-color: #ff4d4f;
  color: white;
}

.trending-list li a span.top-2 ~ .hot-count {
  background-color: #ff7a45;
  color: white;
}

.trending-list li a span.top-3 ~ .hot-count {
  background-color: #ffa940;
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .date-info {
    margin-top: 10px;
    align-self: flex-end;
  }
  
  .category-nav {
    flex-wrap: wrap;
  }
  
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}

@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 10px;
    padding: 10px;
  }
  
  .grid-item img {
    width: 40px;
    height: 40px;
  }
  
  .grid-item span {
    font-size: 12px;
  }
}
</style>