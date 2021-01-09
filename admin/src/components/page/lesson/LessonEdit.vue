<template>
  <div>
    <chapter-form ref="chapterForm" />
<div>
      <el-button type="primary" @click="addChapter()">添加章节</el-button>
    </div>
 

    <ul class="chapterList">
      <li v-for="chapter in chapterList" :key="chapter.id">
        <p>{{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="addVideo(chapter.id)">添加课时</el-button>
            <el-button type="text" @click="editChapter(chapter.id)">编辑</el-button>
            <el-button type="text" @click="removeChapterById(chapter.id)">删除</el-button>
          </span>
        </p>
        <ul class="chapterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>{{ video.title }}
              <el-tag v-if="!video.videoSourceId" size="mini" type="danger">
                {{ '尚未上传视频' }}
              </el-tag>
              <span class="acts">
                <el-tag v-if="video.free" size="mini" type="success">{{ '免费观看' }}</el-tag>
                <el-button type="text" @click="editVideo(chapter.id, video.id)">编辑</el-button>
                <el-button type="text" @click="removeVideoById(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
        <div style="text-align:center">
      <el-button type="primary" @click="prev()">上一步</el-button>
      <el-button type="primary" @click="next()">下一步</el-button>
    </div>
  </div>
</template>
<script>

import ChapterForm from './aForm.vue'
import chapterApi from '../../../api/chapter'
export default {
  
  components: { ChapterForm}, // 2、注册组件
  data() {
    return {
      chapterList: [] // 章节嵌套列表
    }
  },
  created() {
    this.fetchNodeList()
  },

  methods:{
    fetchNodeList() {
      chapterApi.getNestedTreeList(this.$parent.courseId).then(response => {
        console.log(response)
        this.chapterList = response.data.items
      })
    },
    removeChapterById(chapterId) {
      this.$confirm('此操作将永久删除该章节，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return chapterApi.removeById(chapterId)
      }).then(response => {
        this.fetchNodeList()
        this.$message.success(response.message)
      }).catch((response) => {
        if (response === 'cancel') {
          this.$message.info('取消删除')
        }
      })
    },
  addChapter() {
      this.$refs.chapterForm.open()
    },},
    editChapter(chapterId) {
      this.$refs.chapterForm.open(chapterId)
    },
}
</script>


<style scoped>
.chapterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chapterList li{
  position: relative;
}
.chapterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chapterList .acts {
    float: right;
    font-size: 14px;
}
</style>