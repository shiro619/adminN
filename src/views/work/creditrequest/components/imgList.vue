<template>
  <div class="createPost-container" :span="24">
    <div class="imgList">
    	<span class="imgList-left" @click="imgLeft">左</span>
    	<span class="imgList-right" @click="imgRight">右</span>
    	<div class="imgList-container">
    		<div class="imgList-list">
	    		<div v-for="item in imgs" class="imgList-span">
	    			<img :src="item.src"/>
	    		</div>
	    	</div>
    	</div>
    </div>
  </div>
</template>

<script>

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  source_name: '', // 文章外部作者
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false
}

export default {
  name: 'imgList',
  components: {},
  props: {
  },
  data() {
    return {
			imgs: [{'src': "http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"},{'src': "http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/045b6526879073d440c470d1e78969fa.JPG"},{'src': "http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/043147fb1aa26f82167a73b535ea4686.JPG"}],
			imgScroll: 0
    }
  },
  computed: {
  	
  },
  created() {
  },
  methods: {
    imgLeft: function(){
    	this.imgScroll++;
    	console.log(this.imgScroll);
    },
    imgRight: function(){
    	this.imgScroll--;
    	console.log(this.imgScroll)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
    
    .imgList{
    	box-sizing: border-box;
    	padding: 20px 70px;
    	height: 220px;
    	background-color: #F5F7FE;
    	position: relative;
    }
    .imgList-left{
    	position: absolute;
    	left: 20px;
    	top: 50px;
    }
    .imgList-right{
    	position: absolute;
    	right: 20px;
    	top: 50px;
    }
    .imgList-list{
    	position: absolute;
    	transition: 0.3s linear;
    }
    .imgList-span{
    	display: inline-block;
    	width: 100px;
    	height: 180px;
    	margin-right: 10px;
    }
    .imgList-span>img{
    	width: 100%;
    	height: 100%;
    }
  }
</style>

