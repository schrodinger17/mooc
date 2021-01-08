<template>
  <div class="editor">
    <el-card>
      <el-page-header content="编辑文章" @back="goBack">
      </el-page-header>
    </el-card>
    <el-card style="text-align: left;width: 1250px;margin: 35px auto 0 auto">
      <el-container>
        <el-header height="120px">
          <el-row>
            <el-input
              v-model="article.articleTitle"
              style="margin: 10px 0px;font-size: 18px;"
              placeholder="请输入标题"
            ></el-input>
          </el-row>
        
          <el-row>
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加新标签</el-button>
          </el-row>
        </el-header>
        <el-main>
          <el-row style="height: calc(85vh - 140px);">
            <mavon-editor
              ref="md"
              v-model="article.articleContentMd"
              style="height: 100%;"
              font-size="16px"
              @save="saveArticles"
            >
              <button slot="left-toolbar-after" type="button" class="op-icon el-icon-document" :title="'摘要/封面'"
                      @click="dialogVisible = true"
              ></button>
            </mavon-editor>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-divider content-position="left">摘要</el-divider>
      <el-input
        v-model="article.articleAbstract"
        type="textarea"
        rows="6"
        maxlength="255"
        show-word-limit
      ></el-input>
      <el-divider content-position="left">封面</el-divider>
      <div style="margin-top: 20px">
        <el-input v-model="article.articleCover" autocomplete="off" placeholder="图片 URL"></el-input>
        <!-- <img-upload ref="imgUpload" style="margin-top: 5px" @onUpload="uploadImg"></img-upload> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//   import ImgUpload from './ImgUpload'
import {newArticle} from "api/article.js"
import {ERR_OK} from 'api/config.js'
import {getUserInfo} from 'utils/cache.js'
  export default {
    name: 'Editor',
    data () {
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        article: {},
        dialogVisible: false
      }
    },
    mounted () {
    },
    methods: {
      handleClose (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput () {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm () {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      goBack ()
      {
        this.$router.go(-1)
      },
      getTime (){   
        let date = new Date(); //创建时间对象  
        let month = date.getMonth() + 1;//获取月
        let day = date.getDate(); //获取当日  
        let time = month.toString().padStart(2, '0') + "." + day.toString().padStart(2, '0'); //组合时间  
        return time
       },
      saveArticles (value, render) {
        // value 是 md，render 是 html
        this.$confirm('是否保存并发布文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(!this.article.articleTitle)
          {
            this.$message({
              type:"warning",
              message:"你必须输入文章的标题！"
            })
            return
          }
          let params = {
                // id: this.article.id,
                type:{
                  text:"推荐",
                  code:0
                },
                author:getUserInfo().nickname,
                title: this.article.articleTitle,
                content_md: value,
                content_html: render,
                abstract: this.article.articleAbstract,
                img:this.article.articleCover ? this.article.articleCover : "https://www.imooc.com/static/img/article/cover/pic8.jpg",
                time: this.getTime(),
                tag: this.dynamicTags.join(','),
              }
              // console.log(params)
          newArticle(params).then(resp => {
              if (resp && resp.code === ERR_OK) {
                this.$message({
                  type: 'info',
                  message: '已保存成功'
                })
                this.$router.push({path:`/article/${resp.id}`})
              }
            })
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
      },
    //   uploadImg () {
    //     this.article.articleCover = this.$refs.imgUpload.url
    //   }
    }
  }
</script>

<style scoped>
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-row {
    margin-bottom: 0px;
  }
  .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: left;
    line-height: 50px;
  }
  
  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 160px;
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
