<template>
  <div>
    <div class="flex search">
      <a-col :span="5">
        零件名：
      </a-col>
      <a-col :span="15">
        <a-tree-select
          v-model="cNamesValue"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '260px', overflow: 'auto' }"
          placeholder="请选择"
          allow-clear
          tree-default-expand-all
        >
          <template v-for="(item,index) in dropList.cNames">
            <a-tree-select-node :key="'cNames'+index" :value="item">
              <div slot="title">{{item}}</div>
            </a-tree-select-node>
          </template>
        </a-tree-select>
      </a-col>
      <a-col :span="4">
        <a-button :style="{ marginLeft: '8px' }" type="primary" html-type="submit" size="small">
          筛选
        </a-button>
      </a-col>
    </div>
    <div class="flex btn">
      <a-button @click="QRCode" type="primary" icon="scan">
        设备二维码
      </a-button>
      <a-button :style="{ marginLeft: '26px' }" @click="devNFC" type="primary">
        设备NFC
      </a-button>
    </div>
    <div class="result" v-if="deviceName">
      <div class="result-title con">
        {{deviceName}}
      </div>
      <div class="result-content">
        <template v-for="(item,index) in comInfo">
          <a-card hoverable style="width: 100%" class="margin-top">
            <div>
              <a-row>
                <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                  零件名称:
                </a-col>
                <a-col :span="18" :style="{ textAlign: 'left' }">
                  {{item.name}}
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                  零件编码：
                </a-col>
                <a-col :span="18" :style="{ textAlign: 'left' }">
                  {{item.code}}
                </a-col>
              </a-row>
            </div>
            <template slot="actions" class="ant-card-actions">
              <div @click="maintainDev()">
                <a-icon key="setting" type="setting" />维护
              </div>
              <div @click="serviceDev()">
                <a-icon key="edit" type="tool" />维修
              </div>
            </template>
          </a-card>
        </template>
      </div>
    </div>

    <template v-if="isShowScan">
      <scan-code :show.sync="isShowScan" @code-data="scanCodeData"></scan-code>
    </template>
    <!--  维修、维护、更换弹窗  -->
    <dev-modal :show.sync="isShowModal" :data="modalData" :title="modalTitle"></dev-modal>
  </div>
</template>

<script>
  import DevModal from "../Modal/DevModal";
  import ScanCode from "../Modal/ScanCode";
  import {getDropIndexList, getIndexList} from "../../api";

  export default {
    name: "MoBasicInfo.vue",
    components: {
      DevModal,
      ScanCode
    },
    data(){
      return{
        isShowModal: false,
        isShowScan: false,    //设备扫描弹窗显示
        modalTitle: '',
        modalData: [],
        dropList: [],
        cNamesValue: undefined,   //下拉列表
        comInfo: [
          {
            name: '零件一',
            code: '2343543',
          },
          {
            name: '零件一',
            code: '2343543',
          },
          {
            name: '零件一',
            code: '2343543',
          },
          {
            name: '零件一',
            code: '2343543',
          },
        ],
        deviceName: '',     //设备名称

      }
    },
    created() {
      //this.QRCode()
      //首页分页查询
      this.indexList()
      //下拉列表信息获取
      this.getDropList()
    },
    methods: {
      //首页分页查询
      indexList(pageNum=1, pageSize=10){
        this.pageNum = pageNum
        let params = {
          pageNum: pageNum,
          pageSize: pageSize,
          cNames: this.cNamesValue,
        }
        getIndexList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.data = res.data.list
            }
          })
      },
      //下拉列表信息显示
      getDropList(){
        getDropIndexList()
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.dropList = res.data
            }
          })
      },
      //维护设备
      maintainDev(value){
        let inputCon = [
          {
            label: '维护内容',
            placeholder: '请输入维护内容',
            name: 'mContent '
          },
          {
            label: '图片上传',
            placeholder: '请输入维护内容',
            name: 'file '
          }
        ]
        this.isShowModal = true
        this.modalTitle = '设备维护'
        this.modalData.data = value
        this.modalData.inputCon = inputCon
      },
      //维修设备
      serviceDev(value){
        let inputCon = [
          {
            label: '维修内容',
            placeholder: '请输入维修内容',
            defaultContent: '',
            name: 'content'
          },
          {
            label: '零件更换',
            placeholder: '请输入维修内容',
            defaultContent: '',
            name: 'change'
          },
          {
            label: '新零件名称',
            placeholder: '请输入新零件名称',
            defaultContent: value.part,
            name: 'newCname'
          },
          {
            label: '新零件编码',
            placeholder: '请输入新零件编码',
            defaultContent: value.partCode,
            name: 'newCcode'
          },
          {
            label: '新零件型号',
            placeholder: '请输入新零件型号',
            defaultContent: value.partModel,
            name: 'newCtype'
          },
          {
            label: '新零件厂家',
            placeholder: '请输入新零件厂家',
            defaultContent: '',
            name: 'newFactory'
          },
          {
            label: '使用寿命',
            placeholder: '请输入数字',
            name: 'lifespan'
          },
          {
            label: '图片上传',
            placeholder: '请输入',
            name: 'file'
          },
        ]
        this.isShowModal = true
        this.modalTitle = '设备维修'
        this.modalData.data = value
        this.modalData.inputCon = inputCon
      },
      //扫描设备二维码
      QRCode(){
        this.isShowScan = true
        // QrScanner.hasCamera().then(hasCamera => camHasCamera.textContent = hasCamera);
        //
        // const scanner = new QrScanner(video, result => setResult(camQrResult, result), error => {
        //   camQrResult.textContent = error;
        //   camQrResult.style.color = 'inherit';
        // });
        // scanner.start().then(() => {
        //   scanner.hasFlash().then(hasFlash => {
        //     camHasFlash.textContent = hasFlash;
        //     if (hasFlash) {
        //       flashToggle.style.display = 'inline-block';
        //       flashToggle.addEventListener('click', () => {
        //         scanner.toggleFlash().then(() => flashState.textContent = scanner.isFlashOn() ? 'on' : 'off');
        //       });
        //     }
        //   });
        // });
        //
        // // for debugging
        // window.scanner = scanner;
      },
      //扫描到的设备数据
      scanCodeData(data){
        console.log("我是传回父组件的数据", data)

      },
      devNFC(){

      }
    }
  }
</script>

<style scoped>
  .flex{
    display: flex;
    flex-direction: row;
  }
  .search{
    justify-content: space-between;
    align-items: center;
  }
  .title{
    margin-right: 20px;
  }
  .btn{
    justify-content: center;
    margin-top: 15px;
  }
  .result{
    margin-top: 20px;
  }
  .result-title{
    font-weight: 600;
  }
  .margin-top{
    margin-top: 10px;
  }
  .con{
    padding: 10px;
    font-size: 16px;
    background-color: #f3f3f3;
  }
  .result-content{
    height: 75vh;
    overflow-y:auto;
  }
</style>