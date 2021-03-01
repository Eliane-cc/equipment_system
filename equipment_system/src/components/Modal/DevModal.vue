<template>
  <div>
    <a-modal :visible="show" :title="title" @ok="handleEdit(title)" @cancel="handleCancel" cancelText="取消" okText="保存" :confirmLoading="confirmCreateLoading">
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
                    <a-textarea :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}]}]"/>
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
                      :remove="handleRemove"
                      :beforeUpload="beforeUpload"
                    >
                      <a-button> <a-icon type="upload" /> upload </a-button>
                    </a-upload>
                  </template>
                  <template v-else-if="item.label == '新零件名称' ||item.label == '新零件编码' || item.label == '新零件型号' || item.label == '新零件厂家' || item.label == '使用寿命'">
                    <template v-if="item.label == '使用寿命'">
                      <a-input-number v-model="lifespan" :min="0" :name="item.name" @change="onlispanChange" allowClear/> 天
                    </template>
                    <template v-else>
                      <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear  v-decorator="[item.name,  {rules: [{required: false}]}]"/>
                    </template>
                  </template>
                  <template v-else>
                    <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear  v-decorator="[item.name,  {rules: [{required: false}]}]"/>
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
                      :remove="handleRemove"
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
                    <a-input-number v-model="lifespan" :min="0" :name="item.name" @change="onlispanChange" allowClear/> 天
                  </template>
                  <template v-else>
                    <a-input :placeholder="item.placeholder" :rows="3" :name="item.name" allowClear v-decorator="[item.name,  {rules: [{required: false}]}]"/>
                  </template>
                </a-form-item>
              </template>
            </a-form>
          </a-row>
        </template>
      </div>

    </a-modal>
  </div>
</template>

<script>
  import {maintainInfo} from "../../api";
  import reqwest from 'reqwest';
  // import VConsole from 'vconsole';
  // let vConsole = new VConsole();

  export default {
    name: "DevModal.vue",
    props: ['data','show','title'],
    data(){
      return{
        form: this.$form.createForm(this, { name: 'coordinated' }),
        fileList: [],
        lifespan: '',
        isShow: false,
        mContent: '',
        confirmCreateLoading: false
      }
    },
    methods: {
      handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
      },
      //图片上传之前事件
      beforeUpload(file, fileList){
        this.fileList = [...this.fileList, file];
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
        console.log("图片变化事件",this.fileList,info)
      },
      //维护维修事件
      handleEdit(text){
        let data;
        const _this = this;
        // 拉取表单数据的方法
        this.form.validateFields((err, values) => {
          if (!err) {
            const { fileList } = this;
            const formData = new FormData();
            fileList.forEach(file => {
              formData.append('file', file);
            });

            if (text == '设备维护'){
              formData.append("cId", this.data.data.cId);
              formData.append("mContent", this.mContent);
              formData.append("peopleId", window.localStorage.getItem('userInfo.uId'))
              this.confirmCreateLoading = true
              if (this.mContent){
                console.log("我是维护数据cId,mContent,peopleId",formData,this.data.data.cId,this.mContent,window.localStorage.getItem('userInfo.uId'))
                //设备维护
                reqwest({
                  url: 'https://sayn.com.cn/api/index/maintain',
                  method: 'post',
                  processData: false,
                  data: formData,
                  success: (res) => {
                    if (res.msg == "SUCCESS"){
                      this.$message.success('保存成功');
                    }else {
                      this.$message.error(res.msg);
                    }
                  },
                  error: (err) => {
                    this.$message.error('保存失败');
                  },
                  complete: () => {
                    this.mContent = ''
                    this.fileList = []
                    this.confirmCreateLoading = false
                    this.$emit("update:show",false)
                  }
                });
              }
              else{
                this.$message.info("内容不能为空！");
                this.confirmCreateLoading = false
                this.$emit("update:show",false)
              }
            }
            else if(text == '设备维修'){
              //设备维修数值
              formData.append("cId", this.data.data.cId);
              formData.append('content',this.form.getFieldsValue().mContent);
              formData.append("peopleId", window.localStorage.getItem('userInfo.uId'))
              this.confirmCreateLoading = true
              //更换
              if (this.isShow){
                // formData.append("eId", this.data.data.eId);
                formData.append("oldCname", this.data.data.cName);
                formData.append("oldCcode", this.data.data.cCode);
                formData.append("oldCtype", this.data.data.cType);
                formData.append('newCcode',this.form.getFieldsValue().newCcode);
                formData.append('newCname',this.form.getFieldsValue().newCname);
                formData.append('newCtype',this.form.getFieldsValue().newCtype);
                formData.append('newFactory',this.form.getFieldsValue().newFactory);
                formData.append("lifespan", this.lifespan);

                if (formData){
                  console.log("我是更换数据formData,cId,content,peopleId",formData,this.data.data.cId,this.form.getFieldsValue().mContent,window.localStorage.getItem('userInfo.uId'))
                  console.log("更换oldCname,oldCcode,oldCtype,newCcode,newCname,newCtype,newFactory,lifespan",this.data.data.cName, this.data.data.cCode,this.data.data.cType,this.form.getFieldsValue())
                  //更换
                  reqwest({
                    url: 'https://sayn.com.cn/api/index/change',
                    method: 'post',
                    processData: false,
                    data: formData,
                    success: (res) => {
                      if (res.msg == "SUCCESS"){
                        this.$message.success('保存成功');
                      }else {
                        this.$message.error(res.msg);
                      }
                    },
                    error: (err) => {
                      this.$message.error('保存失败');
                    },
                    complete: () => {
                      this.mContent = ''
                      this.fileList = []
                      this.lifespan = ''
                      this.isShow = false
                      this.form.resetFields();
                      this.$emit("update:show",false);
                      this.confirmCreateLoading = false
                    }
                  });
                }
              }
              //维修
              else{
                if (formData){
                  console.log("我是维修数据formData,cId,content,peopleId",formData,this.data.data.cId,this.form.getFieldsValue().mContent,window.localStorage.getItem('userInfo.uId'))
                  //设备维修
                  reqwest({
                    url: 'https://sayn.com.cn/api/index/repair',
                    method: 'post',
                    processData: false,
                    data: formData,
                    success: (res) => {
                      if (res.msg == "SUCCESS"){
                        this.$message.success('保存成功');
                      }else {
                        this.$message.error(res.msg);
                      }
                    },
                    error: (err) => {
                      this.$message.error('保存失败');
                    },
                    complete: () => {
                      this.mContent = ''
                      this.fileList = []
                      this.lifespan = ''
                      this.isShow = false
                      this.form.resetFields();
                      this.$emit("update:show",false);
                      this.confirmCreateLoading = false
                    }
                  });
                }
              }
              console.log("设备维修表单数据",formData)
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
        this.mContent = ''
        this.fileList = []
        this.$emit("update:show",false)
      },
      //使用寿命改变事件
      onlispanChange(value){
        console.log("使用寿命",value,this.lifespan)
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