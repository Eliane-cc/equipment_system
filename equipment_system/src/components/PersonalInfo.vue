<template>
  <div class="contain">
    <div class="contain-content">
      <div class="contain-title">基本信息</div>
      <a-row type="flex" justify="center" class="content">
        <a-col :span="18" class="col">
          <a-col :span="11" class="title">
            姓名：
          </a-col>
          <a-col :span="1" class="title">
          </a-col>
          <a-col :span="10" class="text_left">
            {{userInfo.uName}}
          </a-col>
        </a-col>
        <a-col :span="18" class="col">
          <a-col :span="11" class="title">
            工号/账号：
          </a-col>
          <a-col :span="1" class="title">
          </a-col>
          <a-col :span="10" class="text_left">
            {{userInfo.uWorknumber}}
          </a-col>
        </a-col>
        <a-col :span="18" class="col">
          <a-col :span="11" class="title">
            联系方式：
          </a-col>
          <a-col :span="1" class="title">
          </a-col>
          <a-col :span="10" class="text_left">
            {{userInfo.uPhone}}
          </a-col>
        </a-col>
        <a-col :span="18" class="col">
          <a-col :span="11" class="title">
            更改密码：
          </a-col>
          <a-col :span="1" class="title">
          </a-col>
          <a-col :span="10" class="text_left">
            <a-switch checked-children="是" un-checked-children="否" default-checked @change="switchChange"/>
          </a-col>
        </a-col>
        <a-col :span="18" class="col" v-show="isShow">
          <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item has-feedback label="旧密码" prop="oldPass">
              <a-input v-model="ruleForm.oldPass" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="新密码" prop="pass">
              <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="确认密码" prop="checkPass" ref="pwd">
              <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }" class="margin-top">
              <a-button type="primary" @click="submitForm('ruleForm')">
                提交
              </a-button>
              <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
                清空
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PersonalInfo.vue",
    data(){
      //表单密码校验
      let validateOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if(!reg.test(value) && value){
            callback('密码需由8-16位字母和数字组成，请重新输入')
          }
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请重新输入确认密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("输入的两次密码不一致！"));
        } else {
          callback();
        }
      };
      return {
        //表单验证
        rules: {
          pass: [{ validator: validatePass, trigger: 'change' }],   //新密码校验
          checkPass: [{ validator: validatePass2, trigger: 'change' }],   //确认密码校验
          oldPass: [{ validator: validateOldPass, trigger: 'change' }],   //旧密码校验
        },
        ruleForm: {
          pass: '',
          checkPass: '',
          oldPass: '',
        },
        layout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        },
        //自动创建表单
        form: this.$form.createForm(this),
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
        //是否显示更改密码
        isShow: true,
        //当前用户信息
        userInfo: {}
      }
    },
    created() {
      //设备分页查询
      this.getUserInfo()
    },
    methods: {
      //获取当前用户基本信息
      getUserInfo(){
        this.userInfo = window.localStorage.getItem('userInfo')
      },
      //修改密码用户表单提交
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //修改密码接口
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //切换是否更改用户密码
      switchChange(val){
        this.isShow = val
        if(!this.isShow){
          this.resetForm('ruleForm')
        }
      },

    }
  }
</script>

<style scoped>
  .contain{
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-items: center;
    padding: 10px;
  }
  .contain-content{
    width: 80%;
    border-radius: 7px;
    border: 1px solid #C4C4C4;
    margin-top: 10px;
  }
  .contain-title{
    font-size: 19px;
    background: #efefef;
    font-weight: 600;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    padding: 10px;
  }
  .content{
    font-size: 16px;
    margin-top: 20px;
  }
  .title{
    text-align: right;
    font-weight: 500;
  }
  .text_left{
    text-align: left;
    margin-left: 10px;
  }
  .margin-top{
    margin-top: 15px;
  }
  .col{
    margin-bottom: 15px;
  }
</style>