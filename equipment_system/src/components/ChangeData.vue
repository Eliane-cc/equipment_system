<template>
  <div class="contain">
    <div>
      <a-form class="form" :form="form">
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
              新零件名称：
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
              更换人员：
            </a-col>
            <a-col :span="17">
              <a-input placeholder="请输入维护人员" name="uName" v-model="uName"/>
            </a-col>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit" @click="handleSearch">
              查询
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="table">
        <a-table :columns="columns" :data-source.sync="data" bordered class="column" :pagination="pagination" :loading="isLoading">
          <template
            v-for="col in ['workshop', 'machine', 'equitment','model','factory','partName','partModel','partFactory','repairContent','repairPersonnel','repairTime','operation']"
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
  import {deleteChange, generateCode, getchangeList, getDropDownList, getDropChangeList} from "../api";
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
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eName' },
    },
    {
      title: '零件名称',
      dataIndex: 'ocName',
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'ocName' },
    },
    {
      title: '新零件名称',
      dataIndex: 'cName',
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'cName' },
    },
    {
      title: '更换人员',
      dataIndex: 'changePeopleName',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'changePeopleName' },
    },
    {
      title: '更换时间',
      dataIndex: 'changeTime',
      width: '13%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'changeTime' },
    },
    {
      title: '位置',
      dataIndex: 'cLocation',
      width: '13%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'cLocation' },
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
    name: "ChangeData.vue",
    components: {
      ActionModal
    },
    created() {
      //维护分页查询
      this.changeList()
      //下拉列表数据
      this.dropDownList()
    },
    data(){
      this.cacheData = data.map(item => ({ ...item }));
      return{
        label: [
          {
            title: '车间',
            placeholder: '请输入车间',
            name: 'e_workshop_id'
          },
          {
            title: '机台',
            placeholder: '请输入机台',
            name: 'e_machine_id'
          },
          {
            title: '设备名称',
            placeholder: '请输入设备名称',
            name: 'e_name'
          },
          {
            title: '新零件名称',
            placeholder: '请输入新零件名称',
            name: 'c_id'
          },
          {
            title: '更换人员',
            placeholder: '请输入更换人员',
            name: 'change _People'
          },
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
          onChange:(page,pageSize)=>this.changeList(page,pageSize),//点击页码事件
        },
        data,
        columns,
        editingKey: '',
        treeExpandedKeys: [],
        workshopValue: undefined,   //车间下拉
        eMachinesValue: undefined,   //机台下拉
        eNamesValue: undefined,      //设备名称下拉
        cNamesValue: undefined,       //新零件名称下拉
        uName: undefined,           //维护人员
      }
    },
    methods: {
      //更换列表显示
      changeList(pageNum=1, pageSize=10){
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
        }
        getchangeList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.data = res.data.list
              this.pagination.total = res.data.total
              this.isLoading = false
            }
            else if(res.msg == "用户未登录"){
              this.$message.info(res.msg)
              window.localStorage.removeItem('username')
              window.localStorage.removeItem('password')
              window.localStorage.removeItem('token')
              // window.localStorage.setItem('token', '')
              document.cookie = `accessToken=; expires=${new Date(0).toGMTString()}`
              this.$router.replace({path: '/',replace:true})
            }
            else{
              this.$message.info(res.msg)
            }
            console.log("更换列表", res);
          })
      },
      //下拉列表信息显示
      dropDownList(){
        getDropChangeList()
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.dropList = res.data
            }
          })
      },
      //表单查询
      handleSearch() {
        this.changeList()
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
            key: 'ocName',
            content: value.ocName
          },
          {
            title: '零件型号',
            key: 'ocType',
            content: value.ocType
          },
          {
            title: '零件厂家',
            key: 'ocFactory',
            content: value.ocFactory
          },
          {
            title: '零件编码',
            key: 'ocCode',
            content: value.ocCode
          },
        ]
        let editData = [
          {
            title: '新零件名称',
            key: 'newCname',
            content: value.cName,
            name: 'newCname'
          },
          {
            title: '新零件型号',
            key: 'newCtype',
            content: value.cType,
            name: 'newCtype'
          },
          {
            title: '新零件厂家',
            key: 'newCfactory',
            content: value.cFname,
            name: 'newCfactory'
          },
          {
            title: '新零件编码',
            key: 'newCcode',
            content: value.cCode,
            name: 'newCcode'
          },
          {
            title: '位置',
            key: 'cLocation',
            content: value.cLocation,
            name: 'cLocation'
          },
          {
            title: '更换人员',
            key: 'changePeople',
            content: value.changePeopleName,
            name: 'changePeople'
          },
          {
            title: '更换时间',
            key: 'startTime',
            content: value.changeTime,
            name: 'startTime'
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
        this.modalData.actionText = '编辑更换'
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
            key: 'ocName',
            content: value.ocName
          },
          {
            title: '零件编码',
            key: 'ocCode',
            content: value.ocCode
          },
          {
            title: '零件型号',
            key: 'ocType',
            content: value.ocType
          },
          {
            title: '零件厂家',
            key: 'ocFactory',
            content: value.ocFactory
          },
          {
            title: '新零件名称',
            key: 'cName',
            content: value.cName
          },
          {
            title: '新零件编码',
            key: 'cCode',
            content: value.cCode
          },
          {
            title: '新零件型号',
            key: 'cType',
            content: value.cType
          },
          {
            title: '新零件厂家',
            key: 'cFname',
            content: value.cFname
          },
          {
            title: '更换人员',
            key: 'changePeopleName',
            content: value.changePeopleName
          },
          {
            title: '更换时间',
            key: 'changeTime',
            content: value.changeTime
          },
          {
            title: '位置',
            key: 'cLocation',
            content: value.cLocation
          },
          {
            title: '图片',
            key: 'pName',
            content: value.pName
          }
        ]
        this.isShowModal = true
        this.modalTitle = '更换详情'
        this.modalData.id = value.changeId
        this.modalData.displayData = displayData
      },
      //删除当前行
      deleteDev(record) {
        console.log("陕柴更换",record)
        this.isLoading = true

        let params = {
          cId: record.changeId
        }
        deleteChange(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$message.success("删除该条更换数据成功！");
              //重新刷新用户列表
              this.changeList(this.pageNum, 10);
            }
          })
        this.isLoading = false
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
    flex-direction: row;
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