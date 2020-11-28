<template>
  <div>
    <a-modal :visible="show" :title="title" @ok="handleOk" @cancel="handleCancel" cancelText="取消" okText="保存">
      <div v-if="data.data">
        <!--  设备基本信息显示    -->
        <a-row>
          <a-col :span="3" class="title" offset="2">
            车间：
          </a-col>
          <a-col :span="7">
            {{data.data.workshop}}
          </a-col>
          <a-col :span="3" class="title" offset="2">
            机台：
          </a-col>
          <a-col :span="7">
            {{data.data.machine}}
          </a-col>
        </a-row>
        <a-row class="margin-top">
          <a-col :span="4" class="title" offset="1">
            设备名称：
          </a-col>
          <a-col :span="7">
            {{data.data.equitment}}
          </a-col>
          <a-col :span="4" class="title" offset="1">
            零件名称：
          </a-col>
          <a-col :span="7">
            {{data.data.part}}
          </a-col>
        </a-row>
        <!--  输入    -->
        <a-row class="margin-top-input" v-for="(item,index) in data.inputCon" :key="index">
          <div>
            <a-col :span="4" class="title" offset="1" v-if="title != '设备更换'">
              {{item.lable}}：
            </a-col>
            <a-col :span="5" class="title" offset="1" v-else>
              {{item.lable}}：
            </a-col>
          </div>
          <a-col :span="15">
            <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name"/>
          </a-col>
        </a-row>
        <!--  图片上传    -->
        <a-row class="margin-top-input">
          <a-col :span="4" class="title" offset="1">
            图片上传：
          </a-col>
          <div>
            <a-col :span="15" class="title" offset="1" v-if="title=='设备更换'">
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                list-type="picture"
                :default-file-list="fileList"
              >
                <a-button> <a-icon type="upload" /> upload </a-button>
              </a-upload>
            </a-col>
            <a-col :span="15" class="title" v-else>
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                list-type="picture"
                :default-file-list="fileList"
              >
                <a-button> <a-icon type="upload" /> upload </a-button>
              </a-upload>
            </a-col>
          </div>

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
        fileList: []
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
      }
    }
  }
</script>

<style scoped>
  .title{
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
</style>