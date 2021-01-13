<template>
  <!-- 首页 -->
  <div class="contain">
    <div>
      <!--  查询    -->
      <a-form class="form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col
            :span="10"
            class="margin-bottom"
          >
            <div class="flex-center">
              <a-col :span="8">
                零件名：
              </a-col>
              <a-col :span="17">
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

            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button @click="QRCode" size="large">
              设备二维码
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="devNFC" size="large">
              设备NFC
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" type="primary" html-type="submit" size="large" @click="handleSearch">
              筛选
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <!--  表格列表信息    -->
      <div class="table">
        <a-table :columns="columns" :data-source="data" bordered class="column" :pagination="pagination" :loading="isLoading">
          <template
            v-for="col in ['workshop', 'machine', 'equitment','equitmentCode','part','partCode','operation']"
            :slot="col"
            slot-scope="text,record,index"
          >
            <div :key="index" class="column-content" slot="title" :title="text">
              {{ text }}
            </div>
          </template>
          <template slot="operation" slot-scope="text,record,index">
            <div class="oper">
              <a @click="maintainDev(record)">维护</a>
              <a @click="serviceDev(record)">维修</a>
            </div>
          </template>
        </a-table>
      </div>
    </div>

    <!--  维修、维护、更换弹窗  -->
    <dev-modal :show.sync="isShowModal" :data="modalData" :title="modalTitle"></dev-modal>
  </div>
</template>

<script>
  import DevModal from "./Modal/DevModal";
  import {getIndexList, getDropIndexList} from "../api";
  //表格格式
  const columns = [
    {
      title: '设备名称',
      dataIndex: 'eName',
      width: '26%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eName' },
    },
    {
      title: '零件名称',
      dataIndex: 'cName',
      width: '26%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'cName' },
    },
    {
      title: '零件编码',
      dataIndex: 'cCode',
      width: '26%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'cCode' },
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
    name: "BasicInfo.vue",
    components: {
      DevModal
    },
    data(){
      this.cacheData = data.map(item => ({ ...item }));
      return{
        isShowModal: false,
        modalTitle: '',
        modalData: [],
        dropList: [],   //下拉列表
        index: '0',
        form: this.$form.createForm(this, { name: 'advanced_search' }),
        isLoading: true, //表格分页加载
        pageNum: 1,   //记录当前页码
        pagination: {
          total: 0,
          defaultPageSize: 10,
          onChange:(page,pageSize)=>this.indexList(page,pageSize),//点击页码事件
        },
        data,
        columns,
        editingKey: '',
        treeExpandedKeys: [],
        cNamesValue: undefined,   //下拉列表
      }
    },
    created() {
      //首页分页查询
      this.indexList()
      //下拉列表信息获取
      this.getDropList()
    },
    methods: {
      //首页分页查询
      indexList(pageNum=1, pageSize=10){
        this.isLoading = true
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
              this.pagination.total = res.data.total
              this.isLoading = false
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

      //设备二维码
      QRCode(){

      },
      //表单查询
      handleSearch() {
        this.indexList()
      },
      //设备NFC
      devNFC(){

      },
      //维护设备
      maintainDev(value){
        let inputCon = [
          {
            label: '维护内容',
            placeholder: '请输入维护内容',
            name: 'mContent '
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
        ]
        this.isShowModal = true
        this.modalTitle = '设备维修'
        this.modalData.data = value
        this.modalData.inputCon = inputCon
      },
    },
  }
</script>

<style scoped>
  .contain{
    color: #ffffff;
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

</style>