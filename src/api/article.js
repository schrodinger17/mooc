import axios from 'utils/axios.js'

// 获取手记导航数据
export function getArticleNavList () {
  return axios.get('/api/article/type')
}
// 获取猿问列表数据
export function getArticleList (params) {
  return axios.get('/api/article/list', {
    params
  })
}
export function getArticle (params) {
  return axios.get('/api/article/', {
    params
  })
}

export function newArticle (params) {
  return axios.post('/api/article/', {
    params
  })
}