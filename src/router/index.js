import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import { getUserInfo } from 'utils/cache.js'
import Home from 'pages/home/index.vue'// 首页路由
import CourseIndex from 'pages/course/index.vue' // 免费课程路由
import CourseDetail from 'pages/course-detail/index.vue' // 免费课程详情路由
import LessonIndex from 'pages/lesson/index.vue' // 实战课程路由
import LessonDetail from 'pages/lesson-detail/index.vue' // 实战课程详情路由
import ReadIndex from 'pages/read/index.vue' // 专栏路由
import ReadDetaiil from 'pages/read-detail/index.vue'// 专栏详情路由
import QuestionIndex from 'pages/question/index.vue' // 猿问路由
import ArticleIndex from 'pages/article/index.vue' // 手记路由
import UserCenter from 'pages/user/index.vue' // 个人中心路由
import UserCourse from 'pages/user-course/index.vue' // 我的课程路由
import OrderIndex from 'pages/order/index.vue' // 订单中心路由
import NoticeIndex from 'pages/notice/index.vue' // 消息中心路由
import CartIndex from 'pages/cart/cart.vue' // 购物车路由
import CartConfirm from 'pages/cart/confirm.vue' // 购物车确认路由
import CartPay from 'pages/cart/pay.vue' // 购物车支付路由
import IntegralIndex from 'pages/integral/index.vue'// 积分商场路由
import Editor from 'pages/editor/index.vue'
import Video from 'pages/video-player/index.vue'

Vue.use(Router)

// const Home = () => import('pages/home/index.vue') // 首页路由
// const CourseIndex = () => import('pages/course/index.vue') // 免费课程路由
// const CourseDetail = () => import('pages/course-detail/index.vue') // 免费课程详情路由
// const LessonIndex = () => import('pages/lesson/index.vue') // 实战课程路由
// const LessonDetail = () => import('pages/lesson-detail/index.vue') // 实战课程详情路由
// const ReadIndex = () => import('pages/read/index.vue') // 专栏路由
// const ReadDetaiil = () => import('pages/read-detail/index.vue') // 专栏详情路由
// const QuestionIndex = () => import('pages/question/index.vue') // 猿问路由
// const ArticleIndex = () => import('pages/article/index.vue') // 手记路由
// const UserCenter = () => import('pages/user/index.vue') // 个人中心路由
// const UserCourse = () => import('pages/user-course/index.vue') // 我的课程路由
// const OrderIndex = () => import('pages/order/index.vue') // 订单中心路由
// const NoticeIndex = () => import('pages/notice/index.vue') // 消息中心路由
// const CartIndex = () => import('pages/cart/cart.vue') // 购物车路由
// const CartConfirm = () => import('pages/cart/confirm.vue') // 购物车确认路由
// const CartPay = () => import('pages/cart/pay.vue') // 购物车支付路由
// const IntegralIndex = () => import('pages/integral/index.vue') // 积分商场路由
// const Editor = () => import('pages/editor/index.vue')
// const Video = () => import('pages/video-player/index.vue')


const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component:Home 
  },
  {
    path: '/user',
    name: 'UserCenter',
    component:UserCenter,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user/course',
    name: 'UserCourse',
    component: UserCourse,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/order',
    name: 'OrderIndex',
    component:OrderIndex,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/course',
    name: 'CourseIndex',
    component: CourseIndex,
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: CourseDetail
  },
  {
    path: '/lesson',
    name: 'LessonIndex',
    component:LessonIndex
  },
  {
    path: '/lesson/:id',
    name: 'LessonDetail',
    component: LessonDetail
  },
  {
    path: '/notice',
    name: 'NoticeIndex',
    component:NoticeIndex,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/cart',
    name: 'CartIndex',
    component:CartIndex,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/cart/confirm',
    name: 'CartConfirm',
    component:CartConfirm,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/cart/pay/:code',
    name: 'CartPay',
    component:CartPay,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/read',
    name: 'ReadIndex',
    component:ReadIndex,
  },
  {
    path: '/read/:id',
    name: 'ReadDetaiil',
    component:ReadDetaiil,
  },
  {
    path: '/question',
    name: 'QuestionIndex',
    component:QuestionIndex
  },
  {
    path: '/article',
    name: 'ArticleIndex',
    component:ArticleIndex
  },
  {
    path: '/integral',
    name: 'IntegralIndex',
    component: IntegralIndex
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor,
    // meta: {
    //   requireAuth: true
    // }
  },
  {
    path: '/video',
    name: 'video-player',
    component: Video,
    // meta: {
    //   requireAuth: true
    // }
  }
]
const router = new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})

// 路由拦截
router.beforeEach((to, from, next) => {
  let userinfo = getUserInfo()
  if (to.meta.requireAuth) {
    if (userinfo.id) {
      next()
    } else{
      store.commit('login/SET_LOGIN_ACTION', 'login')
      store.commit('login/SET_SHOW_LOGIN', true)
      next('/home')
    }
  } else {
    next()
  }
})


export default router