<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">

          <router-link style="margin-right:15px;" v-show='isEdit' :to="{ path:'create-form'}">
            <el-button type="info">创建form</el-button>
          </router-link>

          <el-dropdown trigger="click">
            <el-button>{{!postForm.comment_disabled?'评论已打开':'评论已关闭'}}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="no-padding" slot="dropdown">
              <el-dropdown-item>
                <el-radio-group style="padding: 10px;" v-model="postForm.comment_disabled">
                  <el-radio :label="true">关闭评论</el-radio>
                  <el-radio :label="false">打开评论</el-radio>
                </el-radio-group>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click">
            <el-button>平台
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="no-border" slot="dropdown">
              <el-checkbox-group v-model="postForm.platforms" style="padding: 5px 15px;">
                <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
                  {{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click">
            <el-button>
              外链
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="no-padding no-border" style="width:300px" slot="dropdown">
              <el-form-item label-width="0px" style="margin-bottom: 0px" prop="source_uri">
                <el-input placeholder="请输入内容" v-model="postForm.source_uri">
                  <template slot="prepend">填写url</template>
                </el-input>
              </el-form-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布
          </el-button>
          <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>

        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
        </template>

      </sticky>

      <div class="createPost-main-container">
        <el-row :gutter="divgutter">
          <el-col :span="10">
          	<h3>个人信息</h3>
            <div class="postInfo-container">
              <el-row>
                
                
                <el-col :span="24">
                  <el-tooltip class="item" effect="dark" content="客户姓名" placement="top">
                    <el-form-item label-width="75px" label="客户姓名:" class="postInfo-container-item" style="width: 100%;">
                      <el-input placeholder="客户姓名">
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>

                <el-col :span="24">
                  <el-tooltip class="item" effect="dark" content="客户电话" placement="top">
                    <el-form-item label-width="75px" label="客户电话:" class="postInfo-container-item" style="width: 100%;">
                      <el-input placeholder="客户电话">
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>
                
                <el-col :span="24">
                  <el-tooltip class="item" effect="dark" content="身份证号" placement="top">
                    <el-form-item label-width="75px" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                      <el-input placeholder="身份证号">
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>
            
            <h3>来源信息</h3>
            <div class="postInfo-container">
            	<el-row>
            		<el-col :span="24">
                  <el-form-item label-width="75px" label="客户来源:" class="postInfo-container-item" style="width: 100%;">
                    <el-select class="filter-item" placeholder="客户来源" style="width: 100%;">
        							<el-option label="经销商" value="1">
        							</el-option>
      							</el-select>
                  </el-form-item>
                </el-col>
                
                <el-col :span="24">
                  <el-form-item label-width="75px" label="车辆类型:" class="postInfo-container-item" style="width: 100%;">
                    <el-radio v-model="cartype" label="1">新车</el-radio>
  									<el-radio v-model="cartype" label="2">二手车</el-radio>
                  </el-form-item>
                </el-col>
               </el-row>
            </div>
          </el-col>
          <el-col :span="14" :gutter="divgutter">
          	<h3>征信资料</h3>
            <div class="postInfo-container">
              <el-row>
              	<el-col :span="24">
              		身份证
              		<img-list>
              			
              		</img-list>
              		<el-col :span="24" style="height: 600px;">
              			<div class="images" v-viewer="{movable: false,inline: true}">
								      <img v-for="src in images" :src="src.src" :key="src.src" style="width: 100px;height: 200px;display: none;">
								    </div>
              		</el-col>
							    <button type="button" @click="show">Show</button>
              	</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.image_uri"></Upload>
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { userSearch } from '@/api/remoteSearch'
import imgList from './imgList'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

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
  name: 'articleDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky , imgList, Viewer},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(null)
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(null)
        }
      } else {
        callback()
      }
    }
    return {
    	images: [{src:"http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"},{src:"http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/045b6526879073d440c470d1e78969fa.JPG"},{src:"http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/043147fb1aa26f82167a73b535ea4686.JPG"}],
			divgutter: '20',
			cartype: '1',
			imgs1: [],
			imgs2: [],
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      userLIstOptions: [],
      platformsOptions: [
        { key: 'a-platform', name: 'a-platform' },
        { key: 'b-platform', name: 'b-platform' },
        { key: 'c-platform', name: 'c-platform' }
      ],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    }
  },
  created() {
    if (this.isEdit) {
      this.fetchData()
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
  	show () {
	    const viewer = this.$el.querySelector('.images').$viewer
	    viewer.show()
	  },
    fetchData() {
      fetchArticle().then(response => {
        this.postForm = response.data
      }).catch(err => {
        this.fetchSuccess = false
        console.log(err)
      })
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        console.log(response)
        this.userLIstOptions = response.data.items.map(v => ({
          key: v.name
        }))
      })
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
  }
</style>

