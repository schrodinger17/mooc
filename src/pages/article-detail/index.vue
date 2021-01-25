<template>
  <div class="articles-area">
    <el-card v-if="article && article.length">
      <el-page-header :content="article[0].title" @back="goBack">
      </el-page-header>
    </el-card>
    <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto">
      <div v-if="article && article.length">
        <!-- <span style="font-size: 25px"><strong>{{ article[0].title }}</strong></span> -->
        
        <div class="markdown-body">
          <!-- eslint-disable-next-line -->
          <div v-html="filterXSS(article[0].content_html)"></div>
        </div>
      </div>
    </el-card>
    
    <el-container style="text-align: left;width: 990px;margin: 35px auto 0 auto">
      <el-header>
        <el-divider v-if="article && article.length" content-position="center">{{ article[0].author }} {{ article[0].time }}</el-divider>
      </el-header>
      <CommentList></CommentList>
    </el-container>
    <Comment></Comment>
  </div>
</template>

<script>
// import 'github-markdown-css/github-markdown.css'
import Comment from './comment.vue'
import CommentList from './comment-list.vue'
import {ERR_OK} from "api/config.js";
import {getArticle} from "api/article.js";
export default {
    name: 'ArticleDetails',
    data () {
      return {
        article: []
      }
    },
    mounted () {
      this.getArticleData()
    },
    components: {
      Comment,
      CommentList
    },
    methods: {
       goBack () {
        // this.$router.push({path: `/article`})
        this.$router.go(-1)
      },
      getArticleData () {
        const params = {
            id:this.$route.params.id
        }
        getArticle(params).then(res => {
            let { code, data, msg } = res
            if (code === ERR_OK) {
                this.article = data.article
            } else {
            this.article = {}
            this.$message.error(msg)
        }
        }).catch(() => {
            this.article = {}
            this.$message.error('接口异常')
        })
        }
    },
}
</script>

<style scoped>

</style>