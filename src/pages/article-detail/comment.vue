<template>
  <comment 
    ref="my_comment" 
    :placeholder="placeholder"
    :ifnotlogined="if_not_logined"
    :emojilist="emojilist"
    :verifyonce="verify_once"
    @submit_click="submit_click"
  />
</template>

<script>
/* eslint-disable */
import {newArticleComment} from 'api/article.js'
import comment from 'components/article-comment/b_comment.vue'
export default {
  name: "HelloWorld",
	components: {
		comment,
	},
  data () {
    return {
		placeholder: "想说点什么？", //默认文字提示。
        if_not_logined: true, //用户是否没有登录。
        //颜文字列表。
		emojilist: ['(⌒▽⌒)', '（￣▽￣）', '(=・ω・=)', '(｀・ω・´)', '(〜￣△￣)〜', '(･∀･)', '(￣3￣)', '╮(￣▽￣)╭', '( ´_ゝ｀)', '←_←', '→_→', '(<_<)', '(>_>)', '(;¬_¬)', '("▔□▔)/', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', '(｡･ω･｡)', '(´･_･`)', '（￣へ￣）', '(╯°口°)╯(┴—┴', '_(:3」∠)_'],
		verify_once: false, //未登录时，每次评论都需输入验证码。
    };
  },
  computed:{
    comment_text (){//获取子组件的评论内容。
        return this.$refs.my_comment.insert_comment.comment_text;
	},
	comment_name (){//获取子组件的评论昵称。
		return this.$refs.my_comment.insert_comment.comment_name;
	}
  },
  methods:{
	//点击评论按钮后，触发的事件。
    //（在这之前会先检验是否为空、是否输入验证码）
   getTime(){   
    var date = new Date(); //创建时间对象  
    var year = date.getFullYear(); //获取年   
    var month = date.getMonth()+1;//获取月
    var day = date.getDate(); //获取当日  
    var time = year+"-"+month+"-"+day; //组合时间  
    return time
   },
	submit_click (){
        let comments={
            comment: this.comment_text,
            avatar:"https://img.mukewang.com/5599e8e100010c2110800960-40-40.jpg",
            name: this.comment_name,
            time: this.getTime()
        }
        const params = {
        id: this.$route.params.id,
        params: comments
        }
        // console.log(params.id)
		const result=newArticleComment(
            params
        )
        console.log(result)
        location.reload()
		//你可以在这里验证用户输入的格式。
		//若格式错误可调用此函数：
		//this.$refs.my_comment.err_submitFn("格式错误",1500)

		//你可以在这儿请求AJAX
		//失败回调：
		// this.$refs.my_comment.err_submitFn("评论失败",1500)
		//成功回调
		this.$refs.my_comment.success_submit("评论成功", 1500)
	}
  },
};
</script>