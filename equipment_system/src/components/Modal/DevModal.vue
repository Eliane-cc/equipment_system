<template>
  <div>
    <a-modal :visible="show" :title="title" @ok="handleEdit(title)" @cancel="handleCancel" cancelText="取消" okText="保存" :confirm-loading="confirmCreateLoading">
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
          <a-row class="margin-top-input" :key="index">
            <a-form :form="form" :label-col="{ span: 5,offset: 1 }" :wrapper-col="{ span: 15,offset: 1 }">
              <a-form-item :label="item.label"   v-if="!(item.label == '新零件名称' ||item.label == '新零件编码' || item.label == '新零件型号' || item.label == '新零件厂家' || item.label == '使用寿命')">
                <template v-if="title == '设备维修'">
                  <template v-if="item.label == '维修内容'">
                    <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                  </template>
                  <template v-else-if="item.label == '零件更换'">
                    <a-switch checked-children="是" un-checked-children="否" @change="switchChange" v-model="isShow" @click="switchClick"/>
                  </template>
                  <template v-else-if="item.label == '图片上传'">
                    <a-upload
                      :multiple="true"
                      list-type="picture"
                      :file-list="fileList"
                      ref="file"
                      name="file"
                      @customRequest="picRequest"
                      @change="handlePicChange"
                      :beforeUpload="beforeUpload"
                    >
                      <a-button> <a-icon type="upload" /> upload </a-button>
                    </a-upload>
                  </template>
                  <template v-else-if="item.label == '新零件名称' ||item.label == '新零件编码' || item.label == '新零件型号' || item.label == '新零件厂家' || item.label == '使用寿命'">
<!--                    <template v-show="isShow">-->
                      <template v-if="item.label == '使用寿命'">
                        <a-input-number v-model="value" :min="0" :name="item.name" @change="onChange" allowClear/> 天
                      </template>
                      <template v-else>
                        <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                      </template>
<!--                    </template>-->
                  </template>
                  <template v-else>
                    <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                  </template>
                </template>
                <!--      维护内容          -->
                <template v-else>
                  <template v-if="item.label == '图片上传'">
                    <a-upload
                      :multiple="true"
                      list-type="picture"
                      :file-list="fileList"
                      ref="file"
                      name="file"
                      @customRequest="picRequest"
                      @change="handlePicChange"
                      :beforeUpload="beforeUpload"
                    >
                      <a-button> <a-icon type="upload" /> upload </a-button>
                    </a-upload>
                  </template>
                  <template v-else>
                    <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" :ref="item.name" allowClear v-model="mContent"/>
                  </template>
                </template>
              </a-form-item>
              <template v-else-if="isShow">
                <a-form-item :label="item.label">
                  <template v-if="item.label == '使用寿命'">
                    <a-input-number v-model="value" :min="0" :name="item.name" @change="onChange" allowClear/> 天
                  </template>
                  <template v-else>
                    <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>
                  </template>
                </a-form-item>
              </template>
              <!--              <a-form-item label="图片上传">-->
<!--                <a-upload-->
<!--                  :multiple="true"-->
<!--                  list-type="picture"-->
<!--                  :file-list="fileList"-->
<!--                  ref="file"-->
<!--                  name="file"-->
<!--                  @customRequest="picRequest"-->
<!--                  @change="handlePicChange"-->
<!--                  :beforeUpload="beforeUpload"-->
<!--                >-->
<!--                  <a-button> <a-icon type="upload" /> upload </a-button>-->
<!--                </a-upload>-->
<!--              </a-form-item>-->
            </a-form>
          </a-row>
<!--          <a-row class="margin-top-input" :key="index" v-else-if="isShow">-->
<!--            <a-form :form="form" :label-col="{ span: 5,offset: 1 }" :wrapper-col="{ span: 15,offset: 1 }">-->
<!--              <a-form-item :label="item.label">-->
<!--                <template v-if="title == '设备维修'">-->
<!--                  <template v-if="item.label == '维修内容'">-->
<!--                    <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>-->
<!--                  </template>-->
<!--                  <template v-else-if="item.label == '零件更换'">-->
<!--                    <a-switch checked-children="是" un-checked-children="否" @change="switchChange" v-model="isShow" @click="switchClick"/>-->
<!--                  </template>-->
<!--                  <template v-else-if="item.label == '新零件名称' ||item.label == '新零件编码' || item.label == '新零件型号' || item.label == '新零件厂家' || item.label == '使用寿命'">-->
<!--                    <template v-if="isShow">-->
<!--                      <template v-if="item.label == '使用寿命'">-->
<!--                        <a-input-number v-model="value" :min="0" :name="item.name" @change="onChange" allowClear/> 天-->
<!--                      </template>-->

<!--                      <template v-else>-->
<!--                        <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear :default-value="item.defaultContent"/>-->
<!--                      </template>-->
<!--                    </template>-->
<!--                  </template>-->
<!--                  <template v-else>-->
<!--                    <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear/>-->
<!--                  </template>-->
<!--                </template>-->
<!--                <template v-else>-->
<!--                  <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" :ref="item.name" allowClear/>-->
<!--                </template>-->
<!--              </a-form-item>-->
<!--              <a-form-item label="图片上传">-->
<!--                <a-upload-->
<!--                  action="http://localhost:8085/api/index/uploadImage"-->
<!--                  :multiple="true"-->
<!--                  list-type="picture"-->
<!--                  :default-file-list="fileList"-->
<!--                  @change="handlePicChange"-->
<!--                  ref="file"-->
<!--                >-->
<!--                  <a-button> <a-icon type="upload" /> upload </a-button>-->
<!--                </a-upload>-->
<!--              </a-form-item>-->
<!--            </a-form>-->
<!--          </a-row>-->
        </template>
      </div>

    </a-modal>
  </div>
</template>

<script>
  import {maintainInfo} from "../../api";

  export default {
    name: "DevModal.vue",
    props: ['data','show','title'],
    data(){
      return{
        form: this.$form.createForm(this, { name: 'coordinated' }),
        fileList: [],
        value: '',
        isShow: false,
        mContent: '',
        confirmCreateLoading: false
      }
    },
    methods: {
      //图片上传之前事件
      beforeUpload(file, fileList){
        console.log('fileList', file,fileList)
        return false
      },
      //图片上传
      picRequest(){
        console.log("我是图片上传",this.fileList)
      },
      //图片上传事件
      handlePicChange(info){
        this.fileList = info.fileList
        // this.fileList.push(info.file)
        console.log("图片变化事件",this.fileList,info)
      },
      //维护维修事件
      handleEdit(text){
        console.log(text)
        let data;
        // 拉取表单数据的方法
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log("测试")
            let form = new FormData();
            form.append("eId", this.data.data.eId);
            form.append("file", this.fileList);
            form.append("mContent", this.mContent);

            console.log("表单数据",form)
            this.confirmCreateLoading = true
            if (form && this.mContent){
              //设备维护
              if (text == "设备维护"){
                console.log("我是设备维护")
                maintainInfo(form)
                  .then((res) => {
                    if (res.msg == "SUCCESS"){
                      this.$message.success("保存成功！");
                    }else{
                      this.$message.error(res.msg);
                    }
                    this.mContent = ''
                    this.fileList = []
                    this.$emit("update:modalVisible",false);
                  })
                this.confirmCreateLoading = false
              }
              else if (text == '设备维修'){
                addDev(data)
                  .then((res) => {
                    console.log("res",res)
                    if (res.msg == "SUCCESS"){
                      this.$message.success("添加设备成功！");
                      this.form.resetFields();
                      //重新刷新设备
                      this.devList();
                    }else{
                      this.$message.error(res.msg);
                      this.form.resetFields();
                    }
                    this.$emit("update:modalVisible",false);
                  })
                this.confirmCreateLoading = false
              }
            }
            else{
              this.$message.info("维护内容不能为空！");
              this.confirmCreateLoading = false
            }
          }
        })
      },
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

<style lang="less" scoped>
  .title{
    /*text-align: right;*/
    font-weight: 600;
    font-size: 14px;
  }
  .margin-top{
    margin-bottom: 10px;
  }
  .margin-top-input{
    margin-bottom: 10px;
  }
  /* 上传图片样式 */
  .upload-list-inline {
    .ant-upload-list-item {
      float: left;
      width: 200px;
      margin-right: 8px;
    }
  }
  .upload-list-inline {
    .ant-upload-animate-enter {
      animation-name: uploadAnimateInlineIn;
    }
  }
  .upload-list-inline {
    .ant-upload-animate-leave {
      animation-name: uploadAnimateInlineOut;
    }
  }
  /*维护、维修、更换显示数据样式*/
  .text_center{
    /*text-align: center;*/
  }
  .text_left{

  }

  /* 覆盖默认的ant样式 */
  .margin-top-input{
    :global(.ant-form-item){
      margin-bottom: 0px;
    }
  }
</style>