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
              {{data.data.workshop}}
            </a-col>
          </a-col>
          <a-col :span="12">
            <a-col :span="8" class="title">
              机台：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.machine}}
            </a-col>
          </a-col>
        </a-row>
        <a-row class="margin-top"  type="flex" justify="center">
          <a-col :span="12">
            <a-col :span="8" class="title">
              设备名称：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.equitment}}
            </a-col>
          </a-col>
          <a-col :span="12">
            <a-col :span="8" class="title">
              设备编码：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.equitmentCode}}
            </a-col>
          </a-col>
        </a-row>
        <a-row class="margin-top"  type="flex" justify="center">
          <a-col :span="12">
            <a-col :span="8" class="title">
              零件名称：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.part}}
            </a-col>
          </a-col>
          <a-col :span="12">
            <a-col :span="8" class="title">
              零件编码：
            </a-col>
            <a-col :span="16" class="text_center">
              {{data.data.partCode}}
            </a-col>
          </a-col>
        </a-row>

        <a-divider dashed/>

        <!--  输入    -->
        <a-row class="margin-top-input" v-for="(item,index) in data.inputCon" :key="index"  type="flex" justify="center">
          <a-col :span="22" offset="2">
            <template>
              <a-col :span="5" class="title" v-if="title != '设备更换'">
                {{item.label}}：
              </a-col>
              <a-col :span="5" class="title" v-else>
                {{item.label}}：
              </a-col>
            </template>
            <a-col :span="16">
              <template v-if="title == '设备更换'">
                <template v-if="item.label == '使用寿命'">
                  <a-input-number v-model="value" :min="0" :name="item.name" @change="onChange" allowClear/> 天
                </template>
                <template v-else>
                  <a-input :placeholder="item.placeholder" :rows="3" allow-clear :name="item.name" allowClear/>
                </template>
              </template>
              <template v-else>
                <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
              </template>
            </a-col>
          </a-col>
        </a-row>
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
        value: ''
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