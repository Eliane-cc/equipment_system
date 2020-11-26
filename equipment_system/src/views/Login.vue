<template>
  <div>
    <!--  首页底部平行四边形框  -->
    <div class="flex-center common login-contain">
      <div class="login left">
        <div class="blue-square">
          <div class="deep-square"></div>
          <div class="light-square"></div>
        </div>
      </div>
    </div>
    <div class="flex-center common contain">
      <div class="triangle left">
        <div class="triangle-in">
        </div>
      </div>
    </div>
    <!-- 表单主体内容   -->
    <div class="flex-center common contain">
      <div class="content">
        <div class="title">设备生命周期管理系统</div>
        <div class="bottom-line"></div>
        <!--   登录     -->
        <div class="login-triangle">
          <div class="login-btn">
            <div class="login-text" @click="login">登录</div>
          </div>
        </div>
        <div class="input-contain">
          <div class="flex-center input-row">
            <div class="flex-center icon-border">
              <icon-svg icon-class="icon-user" class="icon_svg" icon-size="20px"></icon-svg>
            </div>
            <div>
              <input type="text" class="input" placeholder="用户名" v-model="username">
            </div>
          </div>
          <div class="flex-center input-row">
            <div class="flex-center icon-border">
              <icon-svg icon-class="icon-unlock" class="icon_svg" icon-size="20px"></icon-svg>
            </div>
            <div>
              <input type="password" class="input" placeholder="密码" v-model="password">
            </div>
          </div>
          <!--    验证码      -->
          <div class="flex-center verification">
            <div class="flex-center verification-code">2323</div>
            <div class="verification-btn">验证码</div>
          </div>
          <!--    自动登录      -->
          <div class="flex-center auto-login">
            <div class="check-icon" v-if="!isAutoLogin" @click="changeAuto"></div>
            <div class="check-icon checked"  @click="changeAuto" v-else>
              <icon-svg icon-class="icon-check" class="checked-icon" icon-size="12px"></icon-svg>
            </div>
            <div class="auto-login-text" @click="changeAuto">自动登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login.vue",
    data(){
      return{
        isAutoLogin: false,
        username: '',
        password: ''
      }
    },
    methods: {
      changeAuto(){
        this.isAutoLogin = !this.isAutoLogin
      },
      login(){
        if (this.username && this.password){
          this.$router.replace('/index')
        }else{
          this.$message.warning('用户名或密码不能为空！');
        }
      }
    }
  }
</script>

<style scoped>
  .flex-center{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .common{
    width: 100%;
    align-items: center;
    height: 600px;
  }
  .left{
    margin-left: 70px;
  }
  .login-contain{
    background-color: #FBD951;
  }
  .blue-square{
    border:3px solid #61C1FF;
    background-color: #F2D34F;
    width: 400px;
    height: 300px;
    transform: rotateY(38deg) rotateZ(-48deg) rotateY(30deg);
    margin-top: -20px;
    margin-left: -55px;
  }
  .light-square{
    background-color: #FCD636;
    width: 300px;
    height: 200px;
    transform: rotateZ(-5deg);
    margin-top: -250px;
    box-shadow: 1px 1px 10px 1px #333333;
  }
  .deep-square{
    background-color: #EDB200;
    width: 300px;
    height: 200px;
    transform: rotateZ(-8deg);
    margin-left: 15px;
    margin-top: 120px;
    box-shadow: 1px 1px 10px 1px #333333;
  }
  .triangle{
    width: 0px;
    height: 0px;
    border-top: 280px solid transparent;
    border-bottom: 280px solid transparent;
    border-left: 320px solid rgba(255,255,255,0.4);
  }
  .triangle-in{
    width: 0px;
    height: 0px;
    border-top: 260px solid transparent;
    border-bottom: 260px solid transparent;
    border-left: 300px solid #ffffff;
    margin-left: -310px;
    margin-top: -260px;
  }
  .contain{
    position: absolute;
    top: 0px;
  }
  .content{
    margin-top: 50px;
  }
  .title{
    font-size: 16px;
    font-weight: 600;
    color: #4472C4;
    margin-left: -49px;
  }
  .bottom-line{
    border-bottom: 1px solid #FCDF6C;
    width: 100px;
    margin-top: 10px;
    margin-left: 98px;
    /*margin: 25px 10px;*/
  }
  .login-triangle{
    width: 0px;
    height: 0px;
    border-top: 61px solid transparent;
    border-bottom: 61px solid transparent;
    border-left: 71px solid #D9D9D9;
    margin-left: 300px;
    margin-top: 10px;
    margin-bottom: -10px;
  }
  .login-btn{
    width: 0px;
    height: 0px;
    border-top: 55px solid transparent;
    border-bottom: 55px solid transparent;
    border-left: 65px solid #F2F2F2;
    margin-left: -68px;
    margin-top: -55px;
    cursor: pointer;
  }
  .login-text{
    color: #44546A;
    width: 60px;
    height: 30px;
    font-size: 15px;
    transform: rotateZ(90deg);
    margin-left: -80px;
    margin-top: -15px;
  }
  .login-text:hover{
    color: #4472C4;
  }
  .icon_svg{
    color: #B5924C;
    margin-top: 2px;
  }
  .input-row{
    margin-top: 10px;
  }
  .input-contain{
    margin-top: -100px;
  }
  .input{
    padding: 5px;
    border: none;
    border-bottom: 1px solid #C4C4C4;
    color: #333333;
  }
  .input:focus{
    outline: none;
  }
  .input-row{
    justify-items: center;
    justify-content: center;
  }
  .icon-border{
    border-bottom: 1px solid #C4C4C4;
  }
  .verification{
    margin-top: 20px;
  }
  .verification-code{
    background-color: #CDD5CD;
    width: 60px;
    height: 30px;
    font-size: 19px;
    align-items: center;
    font-weight: 700;
  }
  .verification-btn{
    border-radius: 20px;
    background-color: #7F7174;
    color: #ffffff;
    padding: 6px 18px;
    font-size: 13px;
    margin-left: 10px;
    cursor: pointer;
  }
  .verification-btn:hover{
    background-color: rgba(127,113,116,0.8);
  }
  .check-icon{
    border: 1px solid #000000;
    width: 10px;
    height: 10px;
    margin-right: 8px;
    cursor: pointer;
  }
  .auto-login{
    font-size: 13px;
    color: #000000;
    align-items: center;
    margin-left: -120px;
    margin-top: 45px;
  }
  .auto-login-text{
    cursor: pointer;
  }
  .checked-icon{
    margin-left: -2px;
    margin-bottom: 6px;
  }
  .checked{
    border: 1px solid #0075FF;
    background-color: #0075FF;
    color: #ffffff;
  }
</style>