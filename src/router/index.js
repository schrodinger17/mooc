import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import { getUserInfo } from 'utils/cache.js'
import Home from 'pages/home/index.vue'// 首页路由
import CourseIndex from 'pages/course/index.vue' // 免费课程路由
import CourseDetail from 'pages/course-detail/index.vue' // 免费课程详情路由
import QuestionIndex from 'pages/question/index.vue' // 学习小练路由
import ArticleIndex from 'pages/article/index.vue' // 手记路由
import UserCenter from 'pages/user/index.vue' // 个人中心路由
import UserCourse from 'pages/user-course/index.vue' // 我的课程路由
import OrderIndex from 'pages/order/index.vue' // 订单中心路由
import NoticeIndex from 'pages/notice/index.vue' // 消息中心路由
import Editor from 'pages/editor/index.vue'
import Video from 'pages/video-player/index.vue'
import ArticleDetail from 'pages/article-detail/index.vue'
import Question from 'pages/question/Question.vue'
import Score from 'pages/question/Score.vue'
import QuestionHome from 'pages/question/home.vue'
Vue.use(Router)


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
    path: '/notice',
    name: 'NoticeIndex',
    component:NoticeIndex,
    meta: {
      requireAuth: true
    }
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
    path: '/article/:id',
    name: 'ArticleDetail',
    component:ArticleDetail,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/video/:id/:chapter',
    name: 'video-player',
    component: Video,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/question/:id/questions',
    name: 'question',
    component: Question,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/question/:id/score',
    name: 'score',
    component: Score,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/question/:id',
    name: 'questionhome',
    component: QuestionHome,
    meta: {
      requireAuth: true
    }
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