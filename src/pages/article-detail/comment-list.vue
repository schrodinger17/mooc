<template>
  <div class="comment">
    <ul class="comment-list">
      <li
        v-for="(comment,index) in commentList"
        :key="index"
        class="comment-item"
      >
        <div class="img-box">
          <img :src="comment.avatar" alt="">
        </div>
        <div class="comment-content-wrapper">
          <p>
            <span class="name">{{ comment.name }}</span>
          </p>
          <p class="content">
            {{ comment.comment }}
          </p>
          <p>
            <span class="time">时间：{{ comment.time }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getArticleComment } from 'api/article.js'
import { ERR_OK } from 'api/config.js'
export default {
  data () {
    return {
      commentList: []
    }
  },
  mounted () {
    this.getArticleComment()
  },
  methods: {
    // 分页值更新
    // handlePaginationChange (page) {
    //   this.page = page
    //   this.getLessonComment()
    // },
    // 获取课程评价列表
    getArticleComment () {
      const params = {
        id: this.$route.params.id
      }
      this.commentList = []
      getArticleComment(params).then((res) => {
        const { code, data, msg } = res
        if (code === ERR_OK) {
          this.commentList = data
        } else {
          this.$message.error(msg)
        }
      }).catch(() => {
        this.$message.error('接口异常')
      })
    },
  }, 
  computed: {
    
  }
}
</script>
<style lang="stylus" scoped>
  .comment
    .comment-list
      margin-top: 24px;
      .comment-item
        margin-bottom: 8px;
        padding: 24px; 36px;
        display: flex;
        align-items: flex-start;
        background-color: #fff;
        box-shadow: 0 0 8px 4px rgba(7,17,27,.1);
        border-radius: 12px;
        .img-box
          margin-right: 20px;
          flex: 0 0 48px;
          width: 48px;
          height: 48px;
          & > img
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        .comment-content-wrapper
          flex: 1;
          & > p
            font-size: 14px;
            color: #14191e;
            line-height: 24px;
            &.content
              margin-top: 4px;
              margin-bottom: 8px;
              line-height: 28px;
            .name
              color: #787d82;
              font-weight: 700;
            .score, .time
              float: right;
            .time
              color: #b5b9bc;
              font-size: 12px;
</style>