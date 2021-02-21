<template>
  <div v-if='show'>
    <a-modal v-model="show" title="二维码扫描" :footer="null" @cancel="cancelScan">
      <div class="flex">
        <video id="video" width="300px" height="300px" autoplay="autoplay"></video>
      </div>
      <template>
        <div class="flex code" v-if="code">设备编码：<span>{{code}}</span></div>
        <div class="flex scanning" v-else>正在扫描二维码……</div>
      </template>
      <div v-show="false">
        <canvas id="canvas" width="300px" height="300px"></canvas>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import QRCode from 'qrcode-decoder';
  import {scannCode} from "../../api";

  export default {
    name: "ScanCode.vue",
    props: ['show'],
    data(){
      return{
        context: '',
        video: '',
        canvas: '',
        interval: '',
        visible: true,
        code: ''
      }
    },
    mounted() {
      this.initCanvas()
      this.getMedia()
      this.getCodeInterval()
    },
    methods: {
      //初始化画布
      initCanvas() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
      },
      //成功的回调函数
      success(stream){
        //兼容webkit内核浏览器
        var CompatibleURL = window.URL || window.webkitURL;
        //将视频流设置为video元素的源
       // video.src = CompatibleURL.createObjectURL(stream);
        video.srcObject = stream;
        //播放视频
        video.play();
      },
      //异常的回调函数
      error(error){
        console.log("访问用户媒体设备失败：",error.name,error.message);
      },
      //浏览器兼容
      //访问用户媒体设备的兼容方法
      getUserMedia(constrains,success,error){
        if(navigator.mediaDevices.getUserMedia){
          //最新标准API
          navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia){
          //webkit内核浏览器
          navigator.webkitGetUserMedia(constrains).then(success).catch(error);
        } else if (navigator.mozGetUserMedia){
          //Firefox浏览器
          navigator.mozGetUserMedia(constrains).then(success).catch(error);
        } else if (navigator.getUserMedia){
          //旧版API
          navigator.getUserMedia(constrains).then(success).catch(error);
        }
      },
      //获取媒体对象
      getMedia() {
        //let video = document.getElementById("video");
        // let constraints = {
        //   video: {width: 300, height: 300}
        // };
        //兼容
        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia){
          //调用用户媒体设备，访问摄像头
          this.getUserMedia({
            video:{width:480,height:320, facingMode: { exact: "environment" }}
          },this.success,this.error);
        } else {
          alert("你的浏览器不支持访问用户媒体设备");
        }
        /*
        这里介绍新的方法:H5新媒体接口 navigator.mediaDevices.getUserMedia()
        这个方法会提示用户是否允许媒体输入,(媒体输入主要包括相机,视频采集设备,屏幕共享服务,麦克风,A/D转换器等)
        返回的是一个Promise对象。
        如果用户同意使用权限,则会将 MediaStream对象作为resolve()的参数传给then()
        如果用户拒绝使用权限,或者请求的媒体资源不可用,则会将 PermissionDeniedError作为reject()的参数传给catch()
        */
        // let promise = navigator.mediaDevices.getUserMedia(constraints);
        // promise.then(function (MediaStream) {
        //   video.srcObject = MediaStream;
        //   video.play();
        // }).catch(function (PermissionDeniedError) {
        //   console.log(PermissionDeniedError);
        // })
      },
      //每500毫秒获取当前图片
      getCodeInterval() {
        this.interval = setInterval(this.takePhoto, 500)
      },
      //关闭摄像头
      closeMedia() {
        let video = document.getElementById('video')
        if (!video.srcObject) return
        let stream = video.srcObject
        let tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop()
        })
        clearInterval(this.interval);
      },
      //拍照识别二维码
      takePhoto() {
        let canvas = document.getElementById('canvas')
        let context = canvas.getContext('2d');
        this.context = canvas.getContext('2d');
        let video = document.getElementById('video')

        setTimeout(() => {
          this.context.clearRect(0, 0, 300, 300)
          this.context.save() // 保存
          // 绘制视窗
          this.context.beginPath()
          // 绘制图片
          this.context.drawImage(video, 0, 0, 300, 300)
          this.context.restore() // 状态恢复
        }, 10)

        var imageData = context.getImageData(0, 0, 300, 300);

        console.log("imageData",imageData)
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        //扫描编码成功
        if (code) {
          this.code = code.data
          this.closeMedia()
          console.log("我是码", code.data)
          //请求设备信息
          let params = {
            eCode: code.data
          }
          console.log("params",params)
          scannCode(params)
            .then((res) => {
              console.log("scan res",res)
              if (res.msg == "SUCCESS"){
                this.$emit('code-data', res.data)
                this.$emit("update:show",false)
              }else{
                this.$message.error(res.msg);
              }
            })
        } else {
          //扫描失败
          //console.log("对不起，无法识别到二维码")
        }
      },
      //关闭扫描弹窗
      cancelScan(){
        this.closeMedia()
        this.show = false
        this.$emit("update:show",false)
      }
    }
  }
</script>

<style scoped>
  .flex{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .scanning{
    font-size: 16px;
    font-weight: 500;
  }
  .code{
    font-size: 16px;
    font-weight: 600;
  }
</style>