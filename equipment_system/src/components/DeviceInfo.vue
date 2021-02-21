<template>
  <div class="contain">
    <div>
      <a-form class="form" :form="form">
        <a-row>
          <a-col
            :span="8"
            class="margin-bottom"
          >
            <div class="flex-center">
              <a-col :span="7">
                车间：
              </a-col>
              <a-col :span="17">
                <a-tree-select
                  v-model="workshopValue"
                  show-search
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '260px', overflow: 'auto' }"
                  placeholder="请选择"
                  allow-clear
                  tree-default-expand-all
                >
                  <template v-for="(item,index) in dropList.eWorkshops">
                    <a-tree-select-node :key="'eworkshop'+index" :value="item">
                      <div slot="title">{{item}}</div>
                    </a-tree-select-node>
                  </template>
                </a-tree-select>
              </a-col>
            </div>
          </a-col>
          <a-col
            :span="8"
            class="margin-bottom"
          >
            <div class="flex-center">
              <a-col :span="7">
                机台：
              </a-col>
              <a-col :span="17">
                <a-tree-select
                  v-model="eMachinesValue"
                  show-search
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '260px', overflow: 'auto' }"
                  placeholder="请选择"
                  allow-clear
                  tree-default-expand-all
                >
                  <template v-for="(item,index) in dropList.eMachines">
                    <a-tree-select-node :key="'eMachines'+index" :value="item">
                      <div slot="title">{{item}}</div>
                    </a-tree-select-node>
                  </template>
                </a-tree-select>
              </a-col>
            </div>
          </a-col>
          <a-col
            :span="8"
            class="margin-bottom"
          >
            <div class="flex-center">
              <a-col :span="7">
                设备名称：
              </a-col>
              <a-col :span="17">
                <a-tree-select
                  v-model="eNamesValue"
                  show-search
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '260px', overflow: 'auto' }"
                  placeholder="请选择"
                  allow-clear
                  tree-default-expand-all
                >
                  <template v-for="(item,index) in dropList.eNames">
                    <a-tree-select-node :key="'eNames'+ index" :value="item">
                      <div slot="title">{{item}}</div>
                    </a-tree-select-node>
                  </template>
                </a-tree-select>
              </a-col>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" @click="printClick" icon="printer">
              打印二维码
            </a-button>
            <a-button type="primary" :style="{ marginLeft: '8px' }" @click="handleSearch">
              查询
            </a-button>
            <a-button type="primary" :style="{ marginLeft: '8px' }" @click="createDev">
              新增
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="table">
        <a-table :columns="columns" :data-source.sync="data" bordered class="column" :pagination="pagination" :loading="isLoading"
                 :row-selection="{ onSelect: onSelect,onSelectAll: onSelectAll}" >
          <template
            v-for="col in ['workshop', 'machine', 'equitment','equitmentCode','model','factory','operation']"
            :slot="col"
            slot-scope="text, record, index"
          >
            <div :key="index" class="column-content" slot="title" :title="text">
              {{ text }}
            </div>
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
               <span class="oper">
<!--                  <a @click="() => createRepair(record,text)">新增零件</a>-->
                  <a @click="() => editDev(record,text)">编辑</a>
                  <a-popconfirm title="是否确定删除?" cancelText="取消" okText="确定" @confirm="() => deleteDev(record)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
            </div>
          </template>
        </a-table>
      </div>
    </div>
    <div style="margin:0 auto;display:none;" id="qrcode2" v-html="printHtml"></div>
    <action-modal :modalVisible.sync="isShowModal" :data.sync="modalData" :title="modalTitle" :dataList.sync="data"></action-modal>
  </div>
</template>

<script>
  import ActionModal from "./Modal/ActionModal";
  import {deleteDev, getDevList, getDropDevList} from "../api/index";
  import QRCode from 'qrcodejs2';     //引入二维码
  const columns = [
    {
      title: '车间',
      dataIndex: 'eWorkshop',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eWorkshop' },
    },
    {
      title: '机台',
      dataIndex: 'eMachine',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eMachine' },
    },
    {
      title: '设备名称',
      dataIndex: 'eName',
      width: '15%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eName' },
    },
    {
      title: '设备编码',
      dataIndex: 'eCode',
      width: '14%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eCode' },
    },
    {
      title: '型号',
      dataIndex: 'eType',
      width: '14%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eType' },
    },
    {
      title: '厂家',
      dataIndex: 'e_fName',
      width: '15%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'e_fName' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      scopedSlots: { customRender: 'operation' },
    },
  ];

  const data = [];

  export default {
    name: "DeviceInfo.vue",
    components: {
      ActionModal
    },
    created() {
      //设备分页查询
      this.devList()
      //下拉列表信息获取
      this.getDropList()
    },
    data(){
      this.cacheData = data.map(item => ({ ...item }));
      return{
        isShowModal: false,
        modalTitle: '',
        modalData: [],
        dropList: [],   //下拉列表
        form: this.$form.createForm(this, { name: 'advanced_search' }),
        isLoading: true, //表格分页加载
        pageNum: 1,   //记录当前页码
        pagination: {
          total: 0,
          defaultPageSize: 10,
          onChange:(page,pageSize)=>this.devList(page,pageSize),//点击页码事件
        },
        data,
        columns,
        editingKey: '',
        treeExpandedKeys: [],
        workshopValue: undefined,   //车间下拉
        eMachinesValue: undefined,   //机台下拉
        eNamesValue: undefined,        //设备名称下拉
        selectCode: [],
      }
    },
    mounted() {
      this.creatQrCode();
    },
    methods: {
      //选择
      onSelect(record, selected, selectedRows){
        this.selectCode = selectedRows
        console.log("select选中",record, selected, selectedRows);
        console.log("this.selectedRow", this.selectCode)
      },
      //选择全部
      onSelectAll(selected, selectedRows, changeRows){
        this.selectCode = selectedRows
        console.log("全选",selected, selectedRows, changeRows);
      },
      //打印二维码
      printCode(){
        console.log("打印二维码",this.selectCode)
      },
      printClick(){
        let _self = this;
        let head_str ='<html><head><title>设备生命周期管理系统二维码打印</title></head><body>';//先生成头部
        let foot_str ="</body></html>";//生成尾部
        let printBeforeStr = "<em style='padding: 10px;text-align: center'><table style='border-collapse:collapse;width: auto;><tr style='padding:10px;'>";
        let printContent = "";
        let pLength = _self.selectCode.length; //pLength为所要打印的数组对象的长度
        for(let i=0;i<pLength;i++){
          if(i!=0 && i%3==0 && i!=pLength){
            printContent +="</tr><tr style='padding:10px;'>"
          }
          printContent += "<td width='30%' height='250' style='padding-left: 30px;padding-top: 30px'><div id='XQ"+i+"'></div><div style='text-align: center'><strong>"+_self.selectCode[i].eCode+"</strong></div></td>";
        }
        let printAfter = "</tr></table></em>";
        _self.printHtml = printBeforeStr+printContent+printAfter;
        document.getElementById("qrcode2").innerHTML = _self.printHtml;

        let new_str =document.getElementById("qrcode2").innerHTML;//获取指定打印区域
        //构建新网页(关键步骤,必须先构建新网页,在生成二维码,否则不能显示二维码)
        document.body.innerHTML =head_str + new_str +foot_str;
        for(let j=0;j<_self.selectCode.length;j++){
          document.getElementById('XQ'+j).innerHTML='';//置空
          let contentStr=_self.selectCode[j].eCode;//二维码内容
          let qrcode =new QRCode(document.getElementById("XQ"+j), {
            text: contentStr,
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff"
          });
        }
        window.print();//打印刚才新建的网页
        window.location.reload();
        return false;
      },
      //生成二维码
      creatQrCode() {
        //二维码生成
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: '5667', // 需要转换为二维码的内容
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
        //二维码生成
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: '57', // 需要转换为二维码的内容
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      },
      //设备列表显示
      devList(pageNum=1, pageSize=10){
        this.isLoading = true
        this.pageNum = pageNum
        let params = {
          pageNum: pageNum,
          pageSize: pageSize,
          eWorkshop: this.workshopValue,
          eMachine: this.eMachinesValue,
          eName: this.eNamesValue
        }
        getDevList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.data = res.data.list
              this.pagination.total = res.data.total
              this.isLoading = false
            }
            console.log("设备管理列表", res);
          })
      },
      //下拉列表信息显示
      getDropList(){
        getDropDevList()
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.dropList = res.data
            }
          })
      },
      //表单查询
      handleSearch() {
        this.devList()
      },
      //编辑
      editDev(value,text) {
        let editData = [
          {
            title: '车间',
            key: 'eWorkshop',
            content: value.eWorkshop,
            name: 'eWorkshop'
          },
          {
            title: '机台',
            key: 'eMachine',
            content: value.eMachine,
            name: 'eMachine'
          },
          {
            title: '型号',
            key: 'eType',
            content: value.eType,
            name: 'eType'
          },
          {
            title: '厂家',
            key: 'fName',
            content: value.e_fName,
            name: 'fName'
          },
          {
            title: '设备名称',
            key: 'eName',
            content: value.eName,
            name: 'eName'
          },
          {
            title: '设备编码',
            key: 'eCode',
            content: value.eCode,
            name: 'eCode'
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
        this.modalData.actionText = '编辑设备'
        this.modalData.editData = editData
        this.modalData.value = value
        this.modalData.displayData = ""
        this.modalData.pageNum = this.pageNum
      },
      //删除当前行
      deleteDev(record) {
        this.isLoading = true

        let params = {
          eId: record.eId
        }
        deleteDev(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$message.success("删除设备成功！");
              //重新刷新用户列表
              this.devList(this.pageNum, 10);
            }
            else{
              this.$message.info(res.msg)
            }
            this.isLoading = false
          })
      },

      //查询设备
      searchDev(){},
      //新增设备
      createDev(){
        this.isShowModal = true
        this.modalTitle = '新增'
        this.modalData.actionText = '新增设备'
        let data = [
          {
            label: '车间',
            name: 'eWorkshop'
          },
          {
            label: '机台',
            name: 'eMachine'
          },
          {
            label: '设备名称',
            name: 'eName'
          },
          {
            label: '设备编码',
            name: 'eCode'
          },
          {
            label: '型号',
            name: 'eType'
          },
          {
            label: '厂家',
            name: 'fName'
          }
        ]
        this.modalData.createData = data
        this.modalData.editData = ""
        this.modalData.displayData = ""
        this.modalData.value = ""
        this.modalData.pageNum = this.pageNum
      },
      //新增零件
      // createRepair(value,text){
      //   this.isShowModal = true
      //   this.modalTitle = '新增'
      //   let displayData = [
      //     {
      //       title: '车间',
      //       key: 'eWorkshop',
      //       content: value.eWorkshop
      //     },
      //     {
      //       title: '机台',
      //       key: 'eMachine',
      //       content: value.eMachine
      //     },
      //     {
      //       title: '设备型号',
      //       key: 'eType',
      //       content: value.eType
      //     },
      //     {
      //       title: '设备厂家',
      //       key: 'fId',
      //       content: value.fId
      //     },
      //     {
      //       title: '设备名称',
      //       key: 'eName',
      //       content: value.eName
      //     },
      //     {
      //       title: '设备编码',
      //       key: 'eCode',
      //       content: value.eCode
      //     }
      //   ]
      //   this.modalData.actionText = '新增零件'
      //   let data = [
      //     {
      //       label: '零件名称',
      //       name: 'cName'
      //     },
      //     {
      //       label: '零件型号',
      //       name: 'cType'
      //     },
      //     {
      //       label: '零件编码',
      //       name: 'cCode'
      //     },
      //     {
      //       label: '零件厂家',
      //       name: 'fName'
      //     },
      //     {
      //       label: '位置',
      //       name: 'cLocation'
      //     },
      //     {
      //       label: '使用寿命',
      //       name: 'lifespan'
      //     },
      //     {
      //       label: '开始使用时间',
      //       name: 'starttime'
      //     }
      //   ]
      //   this.modalData.value = value
      //   this.modalData.createData = data
      //   this.modalData.pageNum = this.pageNum
      //   this.modalData.displayData = displayData
      //   this.modalData.editData = ""
      // }
    },
  }
</script>

<style lang="less" scoped>
  .contain{
    color: #ffffff;
    background-color: #040014;
  }
  .form {
    padding: 24px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
  .form .ant-form-item {
    display: flex;
  }
  .table{
    background-color: #fbfbfb;
    margin-top: 30px;
    border-radius: 6px;
  }
  .column{
    background-color: #ffffff;
  }
  .oper{
    display: flex;
    justify-content: space-between;
  }
  .column-content{
    overflow: hidden;
  }
  .flex-center{
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
  }
  .margin-bottom{
    margin-bottom: 20px;
  }
  .printCode{
    background-color: #2f54eb;
  }
  .title{
    font-size: 16px;
    font-weight: 600;

  }
  .qrcode{
    background-color: red;
    margin-top: 10px;
    img {
      display: inline-block;
      width: 132px;
      height: 132px;
      background-color: #fff; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
      box-sizing: border-box;
      border: 1px solid yellow;
      margin-right: 10px;
    }
  }
  .imgGen{
    background-color: #13c2c2;
  }
</style>