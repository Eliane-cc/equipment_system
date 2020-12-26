<template>
  <div class="contain">
    <div>
      <div class="login-form">
        <div class="title">设备生命周期管理系统</div>
        <a-row class="row">
          <div class="border"></div>
        </a-row>
        <a-row class="row">
          <a-col :span="5">
            <div class="login-title">
<!--              <a-icon type="user" :style="{ fontSize: '17px'}"/>-->
              <div class="row-title">用户名：</div>
            </div>
          </a-col>
          <a-col :span="1"></a-col>
          <a-col :span="14">
            <a-input placeholder="请输入用户名" allowClear v-model="username"/>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col :span="5">
            <div class="login-title">
<!--              <a-icon type="lock" :style="{ fontSize: '17px'}"/>-->
              <div class="row-title">密码：</div>
            </div>
          </a-col>
          <a-col :span="1"></a-col>
          <a-col :span="14">
            <a-input-password placeholder="请输入密码" allowClear v-model="password"/>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col :span="5">
            <div class="login-title">
              <!--              <a-icon type="lock" :style="{ fontSize: '17px'}"/>-->
              <div class="row-title">验证码：</div>
            </div>
          </a-col>
          <a-col :span="1"></a-col>
          <a-col :span="6">
            <a-input allowClear v-model="code"/>
          </a-col>
          <a-col :span="2"></a-col>
          <a-col :span="6">
            <div class="vertify" @click="refreshCode">{{verificationCode}}</div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="22">
            <a-checkbox @change="onChange">
              自动登录
            </a-checkbox>
          </a-col>
        </a-row>
        <a-row class="row btn-margin">
          <div>
            <a-button type="primary" @click="login">登录</a-button>
            <a-button class="btn-space" @click="reset">重置</a-button>
          </div>
        </a-row>
      </div>
    </div>

  </div>

</template>

<script>
  import {login,generateCode} from '../api/index';
  export default {
    name: "Login.vue",
    data(){
      return{
        username: '',
        password: '',
        verificationCode: '',     //验证码值
        code: '',                 //验证码输入框
        isAutoLogin: false        //是否自动登录
      }
    },
    created() {
      //生成验证码
      this.generateVerifyCode();
    },
    methods: {
      //登录
      login(){
        if (this.code){
          if(this.code == this.verificationCode){
            if(this.username && this.password){
              let params = new URLSearchParams();
              params.append("uWorknumber", this.username);
              params.append("uPassword", this.password);
              console.log("params",params)
              login(params)
                .then((res) => {
                  console.log("res",res)
                  if (res.msg == "SUCCESS"){
                    //自动登录
                    if (this.isAutoLogin){

                    }
                    this.$message.success("登录成功！");
                    this.$router.replace('/index')
                  }else{
                    this.$message.error(res.msg);
                    this.username = ''
                    this.password = ''
                    this.code = ''
                  }
                })
            }else {
              this.$message.info('用户名跟密码不能为空！');
            }
          }else{
            this.$message.error("验证码错误，请重新输入！");
          }
        }else{
          this.$message.info('验证码不能为空！');
        }
      },
      //生成验证码
      generateVerifyCode(){
        generateCode()
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.verificationCode = res.data
            }
          })
      },
      //刷新二维码
      refreshCode(){
        this.generateVerifyCode()
      },
      //是否自动登录
      onChange(e){
        this.isAutoLogin = e.target.checked
        console.log(`checked = ${e.target.checked}`);
      },
      //重置
      reset(){
        this.username = ''
        this.password = ''
        this.code = ''
      }

    }
  }
</script>

<style scoped>
  .contain{
    width: 100%;
    height: 100vh;
    /*background-image: url("../assets/sky2.jpg");*/
    /*background-position: center center;*/
    /*background-size:cover;*/
    background: #001529;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .login-form{
    width: 430px;
    background: rgba(255,255,255,1);
    padding: 10px;
    margin-top: 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
  }
  .title{
    color: #001529;
    font-weight: 600;
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  .border{
    background: #001529;
    width: 100px;
    height: 2px;
    margin-bottom: 20px;
  }
  .login-title{
    display: flex;
    flex-direction: row;
    justify-content: right;
    justify-items: right;
    align-items: center;
    padding: 5px;
  }
  .row{
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }
  .row-title{
    font-size: 16px;
  }
  .vertify{
    background-image: url("../assets/vertify_code.jpg");
    width: 60px;
    height: 80%;
    font-size: 22px;
    vertical-align: middle;
    cursor: pointer;
    /*height: 50px;*/
  }
  .btn-space{
    margin-left: 80px;
  }
  .btn-margin{
    margin-top: 30px;
  }
</style>