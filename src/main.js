import Vue from 'vue'
import App from './App.vue'
import router from 'router/index.js'
import store from './store/index.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'github-markdown-css/github-markdown.css'
import 'font-awesome/css/font-awesome.min.css'
// import 'highlight.js/styles/default.css';
// import Highlight from 'vue-markdown-highlight'
// Vue.use(Highlight)


// element-ui
import ElementUI from 'element-ui'
// import {
//   Icon,
//   Table,
//   TableColumn,
//   Form,
//   FormItem,
//   RadioGroup,
//   Radio,
//   Input,
//   Checkbox,
//   MessageBox,
//   Pagination,
//   Dialog,
//   Scrollbar,
//   Button,
//   Card,
//   Row,
//   Container,
//   Header,
//   Main,
//   Footer,
//   Col,
// } from 'element-ui'

import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

Vue.use(mavonEditor)
// Vue.use(Icon)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(Input)
// Vue.use(Checkbox)
// Vue.use(Pagination)
// Vue.use(Dialog)
// Vue.use(Button)
// Vue.use(Card)
// Vue.use(Row)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Main)
// Vue.use(Footer)
// Vue.use(Col)
// Vue.use(Scrollbar)
Vue.use(ElementUI)
Vue.prototype.$msgbox = ElementUI.MessageBox;
Vue.prototype.$alert = ElementUI.MessageBox.alert;
Vue.prototype.$confirm = ElementUI.MessageBox.confirm;

import filterXSS from 'xss'
filterXSS.whiteList['input'] = ['type', 'src', 'disabled', 'checked', 'class']
filterXSS.whiteList['img'] = ['src', 'alt', 'title', 'width', 'max-width', 'style', 'height']
filterXSS.whiteList['math'] = []
filterXSS.whiteList['semantics'] = []
filterXSS.whiteList['mrow'] = []
filterXSS.whiteList['mtext'] = []
filterXSS.whiteList['annotation'] = ['encoding']
filterXSS.whiteList['msub'] = []
filterXSS.whiteList['mi'] = []
filterXSS.whiteList['mo'] = []
filterXSS.whiteList['mn'] = []
filterXSS.whiteList['li'] = ['class']
filterXSS.whiteList['span'] = ['class', 'title', 'aria-hidden', 'style']
filterXSS.whiteList['code'] = []
filterXSS.whiteList['li'] = ['class', 'id']
filterXSS.whiteList['td'] = ['style', 'class']
filterXSS.whiteList['p'] = ['style', 'class']
filterXSS.whiteList['div'] = ['style', 'class']
filterXSS.whiteList['a'] = ['style', 'class', 'id', 'target', 'href', 'title']
filterXSS.stripIgnoreTag = true
Vue.prototype.filterXSS = filterXSS;

// register custom base component
import Mooc from './register.js'
import 'assets/theme/index.styl'
Vue.use(Mooc)

import 'assets/stylus/index.styl'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
