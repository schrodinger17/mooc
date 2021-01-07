<template>
  <div class="articles-area">
    <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto">
      <div v-if="article && article.length">
        <span style="font-size: 25px"><strong>{{ article[0].title }}</strong></span>
        <el-divider content-position="left">{{ article[0].time }} {{ article[0].author }}</el-divider>
        <div class="markdown-body">
          <!-- eslint-disable-next-line -->
          <div v-html="article[0].content_html"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// import 'github-markdown-css/github-markdown.css'
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
    methods: {
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