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
            Elaine
          </a-col>
        </a-col>
        <a-col :span="18" class="col">
          <a-col :span="11" class="title">
            工号/账号：
          </a-col>
          <a-col :span="1" class="title">
          </a-col>
          <a-col :span="10" class="text_left">
            3220000719
          </a-col>
        </a-col>
        <a-col :span="18" class="col">
          <a-col :span="11" class="title">
            联系方式：
          </a-col>
          <a-col :span="1" class="title">
          </a-col>
          <a-col :span="10" class="text_left">
            18816827777
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
            <a-form-model-item has-feedback label="确认密码" prop="checkPass">
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
      //表单校验
      let validateOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请重新输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("输入的两次密码不一致！"));
        } else {
          callback();
        }
      };
      return {
        //表单验证
        rules: {
          pass: [{ validator: validatePass, trigger: 'change' }],
          checkPass: [{ validator: validatePass2, trigger: 'change' }],
          oldPass: [{ validator: validateOldPass, trigger: 'change' }],
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
        isShow: true
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      switchChange(val){
        this.isShow = val
      }
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