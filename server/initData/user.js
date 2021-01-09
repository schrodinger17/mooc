import crypto from 'crypto-js'
const userData = [
  {
    username: 'admin',
    password: crypto.MD5('admin').toString(),
    nickname: 'admin',
    avatar: 'https://avatars0.githubusercontent.com/u/35279858?s=400&u=dc1e81c28da7f54c6986644e0b3bf986b03bf30b&v=4',
    sex: 'male',
    job: 'Web前端工程师',
    city: 'Manchester City',
    signature: '嘿嘿',
    hour: 1255,
    exp: 20884,
    integral: 160,
    follow: 5,
    fans: 1,
    email: 'rycbar17th@gmail.com',
    qq: '5xxxxxxxxx',
    phone: '1xxxxxxxxxx',
    wechat: 'wechat',
    weibo: 'weibo'
  }
]

export default userData
