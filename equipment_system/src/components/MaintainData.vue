<template>
  <div class="contain">
    <div>
      <a-form class="form" :form="form" @submit="handleSearch">
        <a-row>
          <a-col
            :span="8"
            class="margin-bottom"
          >
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
                  <a-tree-select-node :key="'eWorkshops'+index" :value="item">
                    <div slot="title">{{item}}</div>
                  </a-tree-select-node>
                </template>
              </a-tree-select>
            </a-col>
          </a-col>
          <a-col
            :span="8"
            class="margin-bottom"
          >
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
          </a-col>
          <a-col
            :span="8"
            class="margin-bottom"
          >
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
                  <a-tree-select-node :key="'eNames'+index" :value="item">
                    <div slot="title">{{item}}</div>
                  </a-tree-select-node>
                </template>
              </a-tree-select>
            </a-col>
          </a-col>
          <a-col
            :span="8"
            class="margin-bottom"
          >
            <a-col :span="7">
              零件名称：
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
          </a-col>
          <a-col
            :span="8"
            class="margin-bottom"
          >
            <a-col :span="7">
              维护人员：
            </a-col>
            <a-col :span="17">
              <a-input placeholder="请输入维护人员" name="uName" v-model="uName"/>
            </a-col>
          </a-col>
          <a-col
            :span="8"
            class="margin-bottom"
          >
            <a-col :span="7">
              维护时间：
            </a-col>
            <a-col :span="17">
              <a-range-picker @change="onChangeDate"/>
            </a-col>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit" @click="searchDev">
              查询
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="table">
        <a-table :columns="columns" :data-source.sync="data" bordered class="column" :pagination="pagination" :loading="isLoading">
          <template
            v-for="col in ['workshop', 'machine', 'equitment','model','factory','partName','partModel','partFactory','maintenanceContent','maintenancePersonnel','maintenanceTime','operation']"
            :slot="col"
            slot-scope="text, record, index"
          >
            <div :key="col">
              <template>
                {{ text }}
              </template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
               <span class="oper">
                 <a @click="() => detailDev(record,text)">详情</a>
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
    <action-modal :modalVisible.sync="isShowModal" :data.sync="modalData" :title="modalTitle" :dataList.sync="data"></action-modal>
  </div>
</template>

<script>
  import ActionModal from "./Modal/ActionModal";
  import {deleteMaintain, getDropMaintainList, getmaintainList} from "../api";
  const columns = [
    {
      title: '车间',
      dataIndex: 'eWorkshop',
      width: '9%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eWorkshop' },
    },
    {
      title: '机台',
      dataIndex: 'eMachine',
      width: '9%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eMachine' },
    },
    {
      title: '设备名称',
      dataIndex: 'eName',
      width: '12%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eName' },
    },
    {
      title: '零件名称',
      dataIndex: 'cName',
      width: '12%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'cName' },
    },
    {
      title: '维护人员',
      dataIndex: 'mPeopleName',
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'mPeopleName' },
    },
    {
      title: '维护内容',
      dataIndex: 'mContent',
      width: '16%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'mContent' },
    },
    {
      title: '维护时间',
      dataIndex: 'mTime',
      width: '16%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'mTime' },
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
    name: "MaintainData.vue",
    components: {
      ActionModal
    },
    created() {
      //维护分页查询
      this.maintainList()
      //下拉列表信息获取
      this.getDropList()
    },
    data(){
      this.cacheData = data.map(item => ({ ...item }));
      return{
        label: [
          {
            title: '车间',
            placeholder: '请输入车间',
            name: 'eWorkshop'
          },
          {
            title: '机台',
            placeholder: '请输入机台',
            name: 'eMachine'
          },
          {
            title: '设备名称',
            placeholder: '请输入设备名称',
            name: 'eName'
          },
          {
            title: '零件名称',
            placeholder: '请输入零件名称',
            name: 'cName'
          },
          {
            title: '维护人员',
            placeholder: '请输入维护人员',
            name: 'maintainer'
          },
          {
            title: '维护时间',
            placeholder: '请输入维护时间',
            name: 'maintainer_time'
          }
        ],
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
          onChange:(page,pageSize)=>this.maintainList(page,pageSize),//点击页码事件
        },
        data,
        columns,
        editingKey: '',
        treeExpandedKeys: [],
        workshopValue: undefined,   //车间下拉
        eMachinesValue: undefined,   //机台下拉
        eNamesValue: undefined,      //设备名称下拉
        cNamesValue: undefined,       //零件名称下拉
        uName: undefined,           //维护人员
        startTime: undefined,        //开始时间
        endTime: undefined,           //结束时间
      }
    },
    methods: {
      //维护列表显示
      maintainList(pageNum=1, pageSize=10){
        this.isLoading = true
        this.pageNum = pageNum
        let params = {
          pageNum: pageNum,
          pageSize: pageSize,
          eWorkshop: this.workshopValue,
          eMachine: this.eMachinesValue,
          eName: this.eNamesValue,
          cName: this.cNamesValue,
          uName: this.uName,
          startTime: this.startTime,
          endTime: this.endTime
        }
        getmaintainList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.data = res.data.list
              this.pagination.total = res.data.total
              this.isLoading = false
            }
            console.log("维护列表", res);
          })
      },
      //下拉列表信息显示
      getDropList(){
        getDropMaintainList()
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.dropList = res.data
            }
          })
      },
      //维护时间
      onChangeDate(date, String){
        this.startTime = String[0]
        this.endTime = String[1]
      },
      //表单查询
      handleSearch() {
        this.maintainList()
      },
      //编辑
      editDev(value,text) {
        let displayData = [
          {
            title: '车间',
            key: 'eWorkshop',
            content: value.eWorkshop
          },
          {
            title: '机台',
            key: 'eMachine',
            content: value.eMachine
          },
          {
            title: '设备名称',
            key: 'eName',
            content: value.eName
          },
          {
            title: '设备型号',
            key: 'eType',
            content: value.eType
          },
          {
            title: '设备厂家',
            key: 'eFname',
            content: value.eFname
          },
          {
            title: '设备编码',
            key: 'eCode',
            content: value.eCode
          },
          {
            title: '零件名称',
            key: 'cName',
            content: value.cName
          },
          {
            title: '零件型号',
            key: 'cType',
            content: value.cType
          },
          {
            title: '零件厂家',
            key: 'cFname',
            content: value.cFname
          },
          {
            title: '零件编码',
            key: 'cCode',
            content: value.cCode
          },
        ]
        let editData = [
          {
            title: '维护人员',
            key: 'mPeopleName',
            content: value.mPeopleName,
            name: 'mPeopleName'
          },
          {
            title: '维护时间',
            key: 'mTime',
            content: value.mTime,
            name: 'mTime'
          },
          {
            title: '维护内容',
            key: 'mContent',
            content: value.mContent,
            name: 'mContent'
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
        this.modalData.actionText = '编辑维护'
        this.modalData.displayData = displayData
        this.modalData.editData = editData
        this.modalData.value = value
        this.modalData.pageNum = this.pageNum
      },
      //查看详情
      detailDev(value,text){
        let displayData = [
          {
            title: '车间',
            key: 'eWorkshop',
            content: value.eWorkshop
          },
          {
            title: '机台',
            key: 'eMachine',
            content: value.eMachine
          },
          {
            title: '设备名称',
            key: 'eName',
            content: value.eName
          },
          {
            title: '设备编码',
            key: 'eCode',
            content: value.eCode
          },
          {
            title: '设备型号',
            key: 'eType',
            content: value.eType
          },
          {
            title: '设备厂家',
            key: 'eFname',
            content: value.eFname
          },
          {
            title: '零件名称',
            key: 'cName',
            content: value.cName
          },
          {
            title: '零件编码',
            key: 'cCode',
            content: value.cCode
          },
          {
            title: '零件型号',
            key: 'cType',
            content: value.cType
          },
          {
            title: '零件厂家',
            key: 'cFname',
            content: value.cFname
          },
          {
            title: '维护人员',
            key: 'mPeopleName',
            content: value.mPeopleName
          },
          {
            title: '维护内容',
            key: 'mContent',
            content: value.mContent
          },
          {
            title: '维护时间',
            key: 'mTime',
            content: value.mTime
          },
          {
            title: '图片',
            key: 'pName',
            content: value.pName
          }
        ]
        this.isShowModal = true
        this.modalTitle = '详情'
        this.modalData.displayData = displayData
      },
      //删除当前行
      deleteDev(record) {
        this.isLoading = true
        let params = {
          mId : record.mId
        }
        deleteMaintain(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$message.success("删除该条维护数据成功！");
              //重新刷新用户列表
              this.maintainList(this.pageNum, 10);
            }
            this.isLoading = false
          })
      },

      //查询设备
      searchDev(){},
    },
  }
</script>

<style scoped>
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
</style>