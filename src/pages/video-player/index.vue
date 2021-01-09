<template>
  <div class="video">
    <el-container>
      <el-header>
        <el-card>
          <el-page-header :content="chapter" @back="goBack">
          </el-page-header>
        </el-card>
      </el-header>
      <el-main style="text-align: left;width: 990px;margin: 35px auto 0 auto">
        <div>
          <video-player ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true"
          >
          </video-player>
        </div>
      </el-main>
      <el-container>
        <el-main>
          <div class="course-detail-content">
            <!-- 导航部分 -->
            <div class="detail-nav">
              <ul class="m-center">
                <li
                  v-for="(nav,index) in navList"
                  :key="index"
                  class="nav-item"
                  :class="{active: index==currentNavIndex}"
                  @click="currentNavIndex = index"
                >
                  {{ nav.title }}
                </li>
              </ul>
            </div>

            <!-- 内容部分 -->
            <div class="detail-information m-center" style="text-align: left;width: 990px;margin: 35px auto 0 auto">
              <div class="information-left">
                <component :is="componentName" :catalog="catalogList" />
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // custom skin css
  // import 'assets/css/video-theme.css'
  // import {getUserInfo} from 'utils/cache.js'
  import { getLessonDetail, getChapterVideo, alterChapterVideo } from 'api/lesson.js'
  import { ERR_OK } from 'api/config.js'
  import Chapter from 'components/chapter/chapter.vue'
  import QuestionAnswer  from 'components/question-answer/question-answer.vue'
  import Comment from 'components/comment/comment.vue'
  export default {
    name:"VideoIndex",
    data () {
      return {
        chapter: this.$route.params.chapter,
        currentNavIndex: 0,
        navList: [],
        courseDetail: {},
        videosrc:"",
        // videojs options
        playerOptions: {
          // height: document.documentElement.clientWidth * 2 / 3 * 9 / 16,
          // width: document.documentElement.clientWidth * 2 / 3,
          playbackRates: [0.8, 1.0, 1.5, 2.0], // 播放速度
          autoplay: false, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            src: "http://video9.snrtv.com/fs/editor/20201016/eeb/eeb3919c-0f4d-11eb-8549-00110a6cb16c_split_1602811295.mp4", // 路径
            type: 'video/mp4' // 类型
          }],
          poster: "", // 你的封面地址
          
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: true,
            fullscreenToggle: true // 全屏按钮
          }
        }
        // playerOptions: {
        //   height: '360',
        //   autoplay: true,
        //   muted: true,
        //   language: 'en',
        //   playbackRates: [0.7, 1.0, 1.5, 2.0],
        //   sources: [{
        //     type: "video/mp4",
        //     // mp4
        //     src: "http://vjs.zencdn.net/v/oceans.mp4",
        //     // webm
        //     // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        //   }],
        //   poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
        // }
      }
    },
    components: {
      Chapter,
      QuestionAnswer,
      Comment
    },
    created () {
      this.getCourseDetailData()
      // this.alterVideoSource("http://vjs.zencdn.net/v/oceans.mp4")
      this.getVideoSource()

    // 初始化导航数据
      // if( this.fullWidth && this.fullHeight)
      // {
      //   if(this.fullWidth * 9 / 16 < this.fullHeight)
      //   {
      //     this.playerOptions.width = document.documentElement.clientWidth * 2 / 3
      //     this.playerOptions.height = document.documentElement.clientWidth * 2 / 3 * 9 / 16
      //   }
      //   else{ 
      //     this.playerOptions.width = document.documentElement.clientHeight * 2 / 3
      //     this.playerOptions.height = document.documentElement.clientHeight * 2 / 3 * 9 / 16
      //   }
          
      // }
      // console.log(getUserInfo())
      window.addEventListener('resize', this.handleResize)

      this.navList = [
        { title: '课程章节', componentName: 'chapter' },
        { title: '问答', componentName: 'question-answer' },
        { title: '用户评价', componentName: 'comment' }
      ]
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted () {
     
      // console.log('this is current player instance object', this.player)
      // setTimeout(() => {
      //   // console.log('dynamic change options', this.player)
      //   // change src
      //   // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
      //   // change item
      //   // this.$set(this.playerOptions.sources, 0, {
      //   //   type: "video/mp4",
      //   //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      //   // })
      //   // change array
      //   // this.playerOptions.sources = [{
      //   //   type: "video/mp4",
      //   //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      //   // }]
      //   this.player.muted(false)
      // }, 5000)
    },
    computed: {
      componentName () {
        return this.navList[this.currentNavIndex].componentName
      },
      catalogList () {
        return this.courseDetail.catalog || {}
      },
      player () {
        return this.$refs.videoPlayer.player
      }
    },
    watch:{
      $route (to, from){
        this.chapter = this.$route.params.chapter
        console.log(from.path);//从哪来
        console.log(to.path);//到哪去
        this.getVideoSource()
      }
    },
    methods: {
      handleResize ()
      { 
        // this.fullHeight = document.documentElement.clientHeight
        // this.fullWidth = document.documentElement.clientWidth
        // if( this.fullWidth && this.fullHeight)
        // {
        //   if(this.fullWidth * 9 / 16 < this.fullHeight)
        //   {
        //     this.playerOptions.width = document.documentElement.clientWidth * 2 / 3
        //     this.playerOptions.height = document.documentElement.clientWidth * 2 / 3 * 9 / 16
        //   }
        //   else{ 
        //     this.playerOptions.width = document.documentElement.clientHeight * 2 / 3
        //     this.playerOptions.height = document.documentElement.clientHeight * 2 / 3 * 9 / 16
        //   }
          
        // }
          
        // console.log(this.fullWidth)
      },
      goBack () {
        // console.log('go back');
        // this.$router.push({path : `/course/${this.$route.params.id}`})
        this.$router.go(-1)
      },
      getCourseDetailData () {
      const params = {
        id: this.$route.params.id
      }
      // console.log(this.$route.params.id)
      getLessonDetail(params).then(res => {
        let { code, data, msg } = res
        if (code === ERR_OK) {
          this.courseDetail = data
        } else {
          this.courseDetail = {}
          this.$message.error(msg)
        }
      }).catch (() => {
        this.courseDetail = {}
        this.$message.error('接口异常')
      })
    },
    getVideoSource () {
      const params = {
        id: this.$route.params.id,
        chapter: this.$route.params.chapter
      }
      // console.log(this.$route.params.chapter)
      getChapterVideo(params).then(res => {
        let { code, data, msg } = res
        if (code === ERR_OK) {
          this.playerOptions.sources[0].src = data.src
        } else {
          this.playerOptions.sources[0].src = ""
          this.$message.error(msg)
        }
      }).catch (() => {
        this.playerOptions.sources[0].src = ""
        this.$message.error('接口异常')
      })
    },
    alterVideoSource (src) {
      const params = {
        id: this.$route.params.id,
        chapter: this.$route.params.chapter,
        src:src
      }
      // console.log(this.$route.params.chapter)
      alterChapterVideo(params).then(res => {
        let { code, msg } = res
        if (code === ERR_OK) {
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      }).catch (() => {
        this.$message.error('接口异常')
      })
    }
      // listen event
      // onPlayerPlay (player) {
      //   // console.log(this.videosrc)
      //   console.log('player play!', player)
      // },
      // onPlayerPause (player) {
      //   console.log('player pause!', player)
      // },
      // onPlayerEnded (player) {
      //   console.log('player ended!', player)
      // },
      // onPlayerLoadeddata (player) {
      //   console.log('player Loadeddata!', player)
      // },
      // onPlayerWaiting (player) {
      //   console.log('player Waiting!', player)
      // },
      // onPlayerPlaying (player) {
      //   console.log('player Playing!', player)
      // },
      // onPlayerTimeupdate (player) {
      //   console.log(this.$route.params.id)
      //   console.log('player Timeupdate!', player.currentTime())
      // },
      // onPlayerCanplay (player) {
      //   console.log('player Canplay!', player)
      // },
      // onPlayerCanplaythrough (player) {
      //   console.log('player Canplaythrough!', player)
      // },
      // // or listen state event
      // playerStateChanged (playerCurrentState) {
      //   console.log('player current update state', playerCurrentState)
      // },
      // player is ready
      // playerReadied (player) {
      //   // seek to 10s
      //   console.log('example player 1 readied', player)
      //   player.currentTime(10)
      //   // console.log('example 01: the player is readied', player)
      // }
    }
  }
</script>


<style lang="stylus" scoped>
  .course-detail-content
    .detail-nav
      position: relative;
      height: 68px;
      line-height: 68px;
      box-shadow: 0 4px 8px 0 rgba(7,17,27,0.15);
      .nav-item
        position: relative;
        display: inline-block;
        margin-right: 80px;
        font-size: 16px;
        color: #1c1f21;
        font-weight: 700;
        cursor: pointer;
        &.active
          color: #f20d0d;
          &::after {
            content: '';
            display: block;
            margin: -15px auto 0px;
            width: 16px;
            height: 3px;
            border-radius: 15px;
            background-color: #f20d0d;
          }
    .detail-information
      margin-top: 36px;
      margin-bottom: 36px;
      display: flex;
      align-items: top;
      .information-left
        flex: 1;
      .information-right
        margin-left: 32px;
        flex: 0 0 320px;
        width: 320px;
        & > div
          margin-bottom: 36px;
</style>


<style scoped>
.el-row {
    margin-bottom: 20px;

  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 10px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
   
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

