import axios from 'utils/axios.js'


// 获取底部版权footer数据
export function getFooter () {
  return axios.get(`/api/common/footer`)
}

// 获取头部数据接口
export function getHeader () {
  return axios.get(`/api/common/nav`)
}
