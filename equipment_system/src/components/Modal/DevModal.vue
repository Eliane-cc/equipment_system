<template>
  <div>
    <a-modal :visible="show" :title="title" @ok="handleOk" @cancel="handleCancel" cancelText="取消" okText="保存">
      <div v-if="data.data">
        <!--  设备基本信息显示    -->
        <a-row type="flex" justify="center">
          <a-col :span="12">
            <a-col :span="8" class="title">
              车间：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.eWorkshop}}
            </a-col>
          </a-col>
          <a-col :span="12">
            <a-col :span="8" class="title">
              机台：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.eMachine}}
            </a-col>
          </a-col>
        </a-row>
        <a-row class="margin-top"  type="flex" justify="center">
          <a-col :span="12">
            <a-col :span="8" class="title">
              设备名称：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.eName}}
            </a-col>
          </a-col>
          <a-col :span="12">
            <a-col :span="8" class="title">
              设备编码：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.eCode}}
            </a-col>
          </a-col>
        </a-row>
        <a-row class="margin-top"  type="flex" justify="center">
          <a-col :span="12">
            <a-col :span="8" class="title">
              零件名称：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.cName}}
            </a-col>
          </a-col>
          <a-col :span="12">
            <a-col :span="8" class="title">
              零件编码：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.cCode}}
            </a-col>
          </a-col>
        </a-row>
        <a-row class="margin-top"  type="flex" justify="center">
          <a-col :span="12">
            <a-col :span="8" class="title">
              零件型号：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.cType}}
            </a-col>
          </a-col>
          <a-col :span="12">

          </a-col>
        </a-row>

        <a-divider dashed/>

        <!--  输入    -->
        <template v-for="(item,index) in data.inputCon">
          <a-row class="margin-top-input" :key="index"  type="flex" justify="center" v-if="!isShow && !(item.label == '新零件名称' ||item.label == '新零件编码' || item.label == '新零件型号' || item.label == '新零件厂家' || item.label == '使用寿命')">
            <a-col :span="22" offset="2">
              <a-col :span="5" class="title">
                {{item.label}}：
              </a-col>
              <a-col :span="16">
                <template v-if="title == '设备维修'">
                  <template v-if="item.label == '维修内容'">
                    <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                  </template>
                  <template v-else-if="item.label == '零件更换'">
                    <a-switch checked-children="是" un-checked-children="否" @change="switchChange" v-model="isShow" @click="switchClick"/>
                  </template>
                  <template v-else-if="item.label == '新零件名称' ||item.label == '新零件编码' || item.label == '新零件型号' || item.label == '新零件厂家' || item.label == '使用寿命'">
                    <template v-if="isShow">
                      <template v-if="item.label == '使用寿命'">
                        <a-input-number v-model="value" :min="0" :name="item.name" @change="onChange" allowClear/> 天
                      </template>

                      <template v-else>
                        <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                      </template>
                    </template>
                  </template>
                  <template v-else>
                    <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                  </template>
                </template>
                <template v-else>
                  <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                </template>
              </a-col>
            </a-col>
          </a-row>
          <a-row class="margin-top-input" :key="index"  type="flex" justify="center" v-else-if="isShow">
            <a-col :span="22" offset="2">
              <a-col :span="5" class="title">
                {{item.label}}：
              </a-col>
              <a-col :span="16">
                <template v-if="title == '设备维修'">
                  <template v-if="item.label == '维修内容'">
                    <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                  </template>
                  <template v-else-if="item.label == '零件更换'">
                    <a-switch checked-children="是" un-checked-children="否" @change="switchChange" v-model="isShow" @click="switchClick"/>
                  </template>
                  <template v-else-if="item.label == '新零件名称' ||item.label == '新零件编码' || item.label == '新零件型号' || item.label == '新零件厂家' || item.label == '使用寿命'">
                    <template v-if="isShow">
                      <template v-if="item.label == '使用寿命'">
                        <a-input-number v-model="value" :min="0" :name="item.name" @change="onChange" allowClear/> 天
                      </template>

                      <template v-else>
                        <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear :default-value="item.defaultContent"/>
                      </template>
                    </template>
                  </template>
                  <template v-else>
                    <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                  </template>
                </template>
                <template v-else>
                  <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                </template>
              </a-col>
            </a-col>
          </a-row>
        </template>
        <!--  图片上传    -->
        <a-row class="margin-top-input" type="flex" justify="center">
          <a-col :span="22" offset="2">
            <a-col :span="5" class="title">
              图片上传：
            </a-col>
            <a-col :span="16" class="title text_left">
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                list-type="picture"
                :default-file-list="fileList"
              >
                <a-button> <a-icon type="upload" /> upload </a-button>
              </a-upload>
            </a-col>
          </a-col>
        </a-row>
      </div>

    </a-modal>
  </div>
</template>

<script>
  export default {
    name: "DevModal.vue",
    props: ['data','show','title'],
    data(){
      return{
        fileList: [],
        value: '',
        isShow: false
      }
    },
    methods: {
      //确定按钮事件
      handleOk(e) {
        this.$emit("update:show",false)
      },
      //取消按钮事件
      handleCancel(e) {
        this.$emit("update:show",false)
      },
      //使用寿命改变事件
      onChange(){

      },
      //是否更换零件
      switchChange(){
        console.log("更换")
        this.isShow = !this.isShow
      },
      switchClick(){
        console.log("点击")
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style scoped>
  .title{
    /*text-align: right;*/
    font-weight: 600;
    font-size: 14px;
  }
  .margin-top{
    margin-top: 10px;
  }
  .margin-top-input{
    margin-top: 20px;
  }
  /* 上传图片样式 */
  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
  /*维护、维修、更换显示数据样式*/
  .text_center{
    /*text-align: center;*/
  }
  .text_left{

  }
</style>