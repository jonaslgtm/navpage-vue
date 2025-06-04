/**
 * API接口封装模块
 * 集中管理所有API请求
 */

// API URL配置
const API_URL = 'https://hao123.web025.cn/api.php';
const TRENDING_API_URL = 'https://v2.api-m.com/api/weibohot';

/**
 * 获取所有导航数据（网站和分类）
 * @returns {Promise<Object>} 包含网站和分类数据的对象
 */
export async function fetchNavigationData() {
  try {
    const response = await fetch(`${API_URL}?action=get_all_data`);
    if (!response.ok) {
      throw new Error('API请求失败');
    }
    const data = await response.json();
    if (data.code === 1 && data.data) {
      return {
        websites: data.data.websites,
        categories: [
          { id: 'all', name: '全部' },
          ...data.data.categories
            .filter(cat => cat.identifier !== 'all')
            .map(cat => ({ id: cat.identifier, name: cat.name }))
        ]
      };
    } else {
      throw new Error('数据格式不正确');
    }
  } catch (error) {
    console.error('获取导航数据失败:', error);
    // 返回空数据，让组件处理错误情况
    return { websites: [], categories: [{ id: 'all', name: '全部' }] };
  }
}

/**
 * 获取热搜榜数据
 * @returns {Promise<Object>} 包含热搜数据的对象
 */
export async function fetchTrendingData() {
  try {
    const response = await fetch(TRENDING_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error('API响应状态码:', response.status);
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    console.log('热搜API返回数据:', data); // 添加日志便于调试

    if (data.code === 1 && data.data && Array.isArray(data.data)) {
      return data.data.slice(0, 10).map(item => ({
        title: item.title,
        hot: item.hot ? item.hot.toString() : '',
        url: `https://s.weibo.com/weibo?q=%23${encodeURIComponent(item.title)}%23&t=31&band_rank=8&Refer=top`
      }));
    } else if (data.data && Array.isArray(data.data)) {
      // 如果数据格式略有不同，但仍包含必要字段，也尝试处理
      return data.data.slice(0, 10).map(item => ({
        title: item.title || item.name || '',
        hot: (item.hot || item.value || '').toString(),
        url: `https://s.weibo.com/weibo?q=%23${encodeURIComponent(item.title || item.name || '')}%23&t=31&band_rank=8&Refer=top`
      }));
    } else {
      console.error('API返回数据格式不正确:', data);
      throw new Error('数据格式不正确');
    }
  } catch (error) {
    console.error('获取热搜数据失败:', error);
    // 返回备用数据
    return [
      { title: '微博热搜实时数据1', hot: '5012万', url: '#' },
      { title: '最新科技发布会', hot: '4389万', url: '#' },
      { title: '国内重要新闻动态', hot: '3756万', url: '#' },
      { title: '热门影视作品上映', hot: '2934万', url: '#' },
      { title: '体育赛事最新战报', hot: '2145万', url: '#' }
    ].map(item => ({
      ...item,
      url: `https://s.weibo.com/weibo?q=%23${encodeURIComponent(item.title)}%23&t=31&band_rank=8&Refer=top`
    }));
  }
}