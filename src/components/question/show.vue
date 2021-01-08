<template>
  <div class="show">
    <!-- 依据案例欢迎界面和答题界面布局是相同的所以引入到同一个组件里面 -->
    <el-card>
      <el-page-header content="答题页面" @back="goBack">
      </el-page-header>
    </el-card>
    <div class="card">
      <el-row type="flex" justify="center" style="margin-top: 50px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="font-size: 20px;">
            <div v-if="connectComponent == 'home'">欢迎来到本网站的学习小练专区~</div>
            <div v-if="connectComponent == 'question'">（单选题）题目{{ itemNum }}</div>
            <div v-if="connectComponent == 'score'">成绩</div>
          </div>

          <div class="content">
            <!-- 首页内容 -->
            <!-- <el-row type="flex" justify="center" style="font-size: 20px;">
              <h4 v-if="connectComponent == 'home'" class="content-hint">点击下方按钮开始答题！</h4>
            </el-row> -->
            <!-- 题目界面内容 -->
            <div v-if="connectComponent == 'question'">
              <el-row>
                <div class="grid-content" style="font-size: 15px;">
                  {{ problems[itemNum-1].stem }}
                </div>
              </el-row>
              <div>
                <ul>
                  <!-- 这边ABCD的显示由chooseType函数实现显示 -->
                  <el-radio-group v-model="choosedId">
                    <!-- <el-radio :label="0">备选项</el-radio>
                  <el-radio :label="1">备选项</el-radio>
                  <el-radio :label="2">备选项</el-radio> -->
                
                    <li v-for="(item, index) in problems[itemNum-1].answer" :key="index" style="margin-bottom: 4px" @click="choosed(index)">
                      <el-row>
                        <el-radio :label="index">{{ chooseType(index) }}. {{ item.describe }}</el-radio>
                        <!-- <span :class="{'beenchoosed':choosedId == index}">{{ chooseType(index) }}. </span>
                    <span :class="{'beenchoosed':choosedId == index}">{{ item.describe }}</span> -->
                      </el-row>
                    </li>
                  </el-radio-group>
                </ul>
              </div>
            </div>
            <!-- 结算界面内容 -->
            <el-row type="flex" justify="center">
              <div v-if="connectComponent == 'score'" class="content-score">
                总分为: {{ totleScore }}，共答对: {{ totleNum }} 道题目<br /><br />
              </div>
            </el-row>
            <el-row type="flex" justify="center">
              <div v-if="connectComponent == 'score'" class="content-score">
                <el-button type="primary" @click="returntohome">再次尝试</el-button>
              </div>
            </el-row>
          </div>
          <footer class="foot">
            <div v-if="connectComponent == 'home'" class="foot-home">
              <!-- 首页按钮点击路由到题目界面 -->
              <el-row type="flex" justify="center">
                <router-link :to="{ path: `/question/${this.$route.params.id}/questions` }" class="" style="font-weight:400">
                  <el-button type="primary">开始答题</el-button>
                </router-link>
              </el-row>
            </div>
            <div v-if="connectComponent == 'question'" class="foot-questiontips">
              <!-- 这边判定一下到最后一题的时候显示 -->
              <el-row type="flex" justify="end">
                <el-button v-if="itemNum < problems.length" type="primary" style="font-weight: 400;" @click="submitChoose">下一题</el-button>
                <el-button v-else type="primary" style="font-weight: 400;" @click="submitAnswer">交 卷</el-button>
              </el-row>
            </div>
          </footer>
        </el-card>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Show',
    props: {
        connectComponent: String
    },
    created () {
        if(this.fatherComponent === 'home') {
            this.initializeData();
        }
        // console.log (this.itemNum)
    },
    computed: mapState({
        itemNum : state => state.show.itemNum,
        result : state => state.show.result,
        problems: state => state.show.problems,
        rightResult : state => state.show.rightResult,
        totleScore : state => state.show.totleScore,
        totleNum : state => state.show.totleNum
    }),
    data () {
        return {
            choosedId : null,
        }
    },
    methods: {
        goBack () {
            this.$router.push({path: `/question`}) 
        },
        chooseType: type => {
            switch(type){
                case 0: return 'A';
                case 1: return 'B';
                case 2: return 'C';
                case 3: return 'D';
            }
        },
        choosed (type) {
            this.choosedId = type;
        },
        submitChoose () {
            // 当点击下一题时我们提交当前所选答案值
            if(this.choosedId !== null) {
                //保存答案, 题目索引加一，跳到下一题
                this.addNum(this.choosedId);
                this.choosedId = null;
            }
            else {
                this.$message.error('还未选择答案');
            }
        },
        ...mapActions({
            'addNum' : 'show/addNum',
            'initializeData' : 'show/initializeData',
            'countScore' : 'show/countScore'
        }),
        submitAnswer () {
            if(this.choosedId !== null) {
                // 交卷按钮任然要保存最后一个题答案，并且路由到结算页面
                this.addNum(this.choosedId);
                this.choosedId = null;
                this.countScore();
                this.$router.push({path: `/question/${this.$route.params.id}/score`});
            }
        },
        returntohome () {
            this.initializeData();
            this.$router.push({path: `/question/${this.$route.params.id}`});
        }
    }
}
</script>

<style scoped>
  .box-card {
    width: 610px;
  }
  .el-row {
    margin-bottom: 25px;
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>