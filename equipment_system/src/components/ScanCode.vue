<template>
  <div>
    <input type="button" title="开启摄像头" value="开启摄像头" @click="getMedia()" />
    <video id="video" width="300px" height="300px" autoplay="autoplay"></video>
    <img :src="imgSrc" alt="" style="width: 200px;height: 200px;">
    <canvas id="canvas" width="300px" height="300px"></canvas>
    <div>数值</div>
    <button id="snap" @click="takePhoto()">拍照</button>
    <button id="close" @click="closeMedia()">关闭</button>
    <button id="upload" @click="uploadImage()">上传</button>
    <img :src="picPath" alt="">
  </div>
</template>

<script>
  import QRCode from 'qrcode-decoder';     //引入二维码
  //获得video摄像头区域
  //let video = document.getElementById("video");
  //var canvas = document.getElementById('canvas');
  //var context = canvas.getContext('2d');

  export default {
    name: "ScanCode.vue",
    data(){
      return{
        context: '',
        video: '',
        canvas: '',
        picPath: '',
        imgSrc: require('../assets/bg.jpeg')
      }
    },
    mounted() {
      this.initCanvas()
      this.getMedia()
      this.takePhoto()
    },
    // created() {
    //   this.vedio = document.getElementById('video');
    //   this.canvas = document.getElementById('canvas');
    //   if (this.canvas.getContext()){
    //     this.context = this.canvas.getContext('2d');
    //   }
    // },
    methods: {
      //初始化画布
      initCanvas(){
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
      },
      closeMedia() {
        if (!this.video.srcObject) return
        let stream = this.video.srcObject
        let tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop()
        })
      },
      getMedia() {
        let constraints = {
          video: {width: 300, height: 300},
          audio: true
        };
        /*
        这里介绍新的方法:H5新媒体接口 navigator.mediaDevices.getUserMedia()
        这个方法会提示用户是否允许媒体输入,(媒体输入主要包括相机,视频采集设备,屏幕共享服务,麦克风,A/D转换器等)
        返回的是一个Promise对象。
        如果用户同意使用权限,则会将 MediaStream对象作为resolve()的参数传给then()
        如果用户拒绝使用权限,或者请求的媒体资源不可用,则会将 PermissionDeniedError作为reject()的参数传给catch()
        */
        let promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then(function (MediaStream) {
          video.srcObject = MediaStream;
          video.play();
        }).catch(function (PermissionDeniedError) {
          console.log(PermissionDeniedError);
        })
      },
      takePhoto() {
        let video = document.getElementById('video')

        //const imgUpload = new Image()
        //console.log("this.video",this.video,video)
        //imgUpload.src = video
      //  imgUpload.src = this.imgSrc
        // imgUpload.onload = function(){
        //   this.context.drawImage(imgUpload, 0, 0, 300, 300);
        // }
        setTimeout(() => {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.context.save() // 保存
          // 绘制视窗
          this.context.beginPath()
          // 绘制图片
          this.context.drawImage(video, 0, 0,300,300)
          this.context.restore() // 状态恢复
        }, 10)
        console.log("拍照",this.context)
        //ctx.drawImage(this.video, 0, 0, 500, 500);
      },
      uploadImage(){
        let canvas = document.getElementById('canvas')
        let context = canvas.getContext('2d');
       // this.canvas.width = 300;
        //this.canvas.height = 300;
        //this.context.drawImage(this.video, 0, 0, 300, 300);
        const imgUpload = new Image()
        imgUpload.src = this.video
        imgUpload.onload = function(){
          context.drawImage(imgUpload, 0, 0, 300, 300);
        }
        var imgData = canvas.toDataURL("image/jpg");
        imgData = imgData.replace(/^data:image\/(png|jpg);base64,/,"")
        console.log("上传图片", imgData)
        //转码base64
          //这里的 picPath 'data:image/png;base64,'+ base64为编码字符串拼接形成图片的
        //this.picPath = this.base64ImgtoFile('data:image/jpg;base64,'+imgData)
        this.picPath = 'data:image/jpg;base64,'+imgData
        console.log("图片地址", this.picPath)

        var imageData = context.getImageData(0, 0, 300, 300);

        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if(code){
          console.log("我是码",code.data)
        }else{
          alert("识别错误")
        }
        //上传到后台。
        // var uploadAjax = $.ajax({
        //   type: "post",
        //   //后端需要调用的地址
        //   url:"/receiveImage/",
        //   data: JSON.stringify({"imgData": imgData}),
        //   contentType:"json/application",
        //   //设置超时
        //   timeout:10000,
        //   async: true,
        //   success: function (htmlVal) {
        //     //成功后回调
        //   },
        //   error: function(data) {
        //   },
        //   //调用执行后调用的函数
        //   complete: function (XMLHttpRequest, textStatus) {
        //     if(textStatus == 'timeout'){
        //       uploadAjax.abort(); //取消请求
        //       //超时提示：请求超时，请重试
        //       alert("请求超时，请重试")
        //       //请求超时返回首页
        //       closeCard();
        //     }
        //   }
        // });
      },
      //base64转图片
      base64ImgtoFile(dataurl, filename = 'file') {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let suffix = mime.split('/')[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {
          type: mime
        })
      },
    }
  }
</script>

<style scoped>

</style>