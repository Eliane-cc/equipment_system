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
                  <a-tree-select-node :key="'eWorkshops'+index" :value="item">
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
                    <a-tree-select-node :key="'eNames'+index" :value="item">
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
            </div>
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
            v-for="col in ['workshop', 'machine', 'equitment','equitmentCode','model','factory','partName','partNameCode','partModel','partFactory','serviceLife','startTime','operationTime','position','operation']"
            :slot="col"
            slot-scope="text, record, index"
          >
            <div :key="index" class="column-content" slot="title" :title="text">
              {{ text }}
            </div>
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
              <template v-if="record.children">
                <span class="oper oper-center">
                  <a @click="() => createRepair(record,text,index)"><a-icon type="plus-circle" />  新增零件</a>
                </span>
              </template>
              <template v-else>
                <span class="oper">
                  <a @click="() => detailDev(record,text,index)">详情</a>
                  <a @click="() => editDev(record,text,index)">编辑</a>
                  <a-popconfirm title="是否确定删除?" cancelText="取消" okText="确定" @confirm="() => deleteDev(record)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
              </template>
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
  import {deleteEquipment, getDropDevList, getequitmentList, getDropEquipList} from "../api";
  const columns = [
    {
      title: '车间',
      dataIndex: 'eWorkshop',
      width: '8%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eWorkshop' },
    },
    {
      title: '机台',
      dataIndex: 'eMachine',
      width: '8%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eMachine' },
    },
    {
      title: '设备名称',
      dataIndex: 'eName',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eName' },
    },
    {
      title: '零件名称',
      dataIndex: 'cName',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'cName' },
    },
    {
      title: '使用寿命',
      dataIndex: 'lifespan',
      width: '8%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'lifespan' },
    },
    {
      title: '开始使用时间',
      dataIndex: 'starttime',
      width: '16%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'starttime' },
    },
    {
      title: '运行时间',
      dataIndex: 'runtime',
      width: '15%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'runtime' },
    },
    {
      title: '位置',
      dataIndex: 'cLocation',
      width: '10%',
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
    name: "EquitmentPartInfo.vue",
    components: {
      ActionModal
    },
    created() {
      //零件分页查询
      this.equitmentList()
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
            name: "eWorkshop"
          },
          {
            title: '机台',
            placeholder: '请输入机台',
            name: 'eMachine'
          },
          {
            title: '设备名称',
            placeholder: '请输入设备名称',
            name: "eName"
          },
          {
            title: '零件名称',
            placeholder: '请输入零件名称',
            name: "cName"
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
          onChange:(page,pageSize)=>this.equitmentList(page,pageSize),//点击页码事件
        },
        data,
        columns,
        editingKey: '',
        treeExpandedKeys: [],
        workshopValue: undefined,   //车间下拉
        eMachinesValue: undefined,   //机台下拉
        eNamesValue: undefined,      //设备名称下拉
        cNamesValue: undefined       //零件名称下拉
      }
    },
    methods: {
      //零件列表显示
      equitmentList(pageNum=1, pageSize=10){
        this.isLoading = true
        this.pageNum = pageNum
        let params = {
          pageNum: pageNum,
          pageSize: pageSize,
          eWorkshop: this.workshopValue,
          eMachine: this.eMachinesValue,
          eName: this.eNamesValue,
          cName: this.cNamesValue,
        }
        getequitmentList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.data = res.data.list
              this.pagination.total = res.data.total
              this.isLoading = false
            }
            else{
              this.$message.info(res.msg)
            }
            console.log("零件管理列表", res);
          })
      },
      //下拉列表信息显示
      getDropList(){
        getDropEquipList()
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.dropList = res.data
            }
          })
      },
      //表单查询
      handleSearch(e) {
        this.equitmentList()
      },
      //编辑
      editDev(value,text,index) {
        console.log("编辑", value)
        let data = this.data.filter(item => item.eId === value.eId)
        let cData = data[0]

        let displayData = [
          {
            title: '车间',
            key: 'eWorkshop',
            content: cData.eWorkshop
          },
          {
            title: '机台',
            key: 'eMachine',
            content: cData.eMachine
          },
          {
            title: '设备型号',
            key: 'eType',
            content: cData.eType
          },
          {
            title: '设备厂家',
            key: 'fName',
            content: cData.efName
          },
          {
            title: '设备名称',
            key: 'eName',
            content: cData.eName
          },
          {
            title: '设备编码',
            key: 'eCode',
            content: cData.eCode
          }
        ]
        let editData = [
          {
            title: '零件名称',
            key: 'cName',
            content: value.cName,
            name: 'cName'
          },
          {
            title: '零件编码',
            key: 'cCode',
            content: value.cCode,
            name: 'cCode'
          },
          {
            title: '零件型号',
            key: 'cType',
            content: value.cType,
            name: 'cType'
          },
          {
            title: '零件厂家',
            key: 'fName',
            content: value.cfName,
            name: 'fName'
          },
          {
            title: '位置',
            key: 'cLocation',
            content: value.cLocation,
            name: 'cLocation'
          },
          {
            title: '使用寿命',
            key: 'lifespan',
            content: value.lifespan,
            name: 'lifespan'
          },
          {
            title: '开始使用时间',
            key: 'starttime',
            content: value.starttime,
            name: 'starttime'
          },
          {
            title: '运行时间',
            key: 'runtime',
            content: value.runtime,
            name: 'runtime'
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
        this.modalData.actionText = '编辑零件'
        this.modalData.displayData = displayData
        this.modalData.editData = editData
        this.modalData.value = value
        this.modalData.pageNum = this.pageNum
      },
      //查看详情
      detailDev(value,text,index){
        let data = this.data.filter(item => item.eId === value.eId)
        let cData = data[0]
        console.log("详情测试value",value,cData)
        let displayData = [
          {
            title: '车间',
            key: 'eWorkshop',
            content: cData.eWorkshop
          },
          {
            title: '机台',
            key: 'eMachine',
            content: cData.eMachine
          },
          {
            title: '设备名称',
            key: 'eName',
            content: cData.eName
          },
          {
            title: '设备编码',
            key: 'eCode',
            content: cData.eCode
          },
          {
            title: '设备型号',
            key: 'eType',
            content: cData.eType
          },
          {
            title: '设备厂家',
            key: 'efName',
            content: cData.efName
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
            key: 'cfName',
            content: value.cfName
          },
          {
            title: '使用寿命',
            key: 'lifespan',
            content: value.lifespan
          },
          {
            title: '开始使用时间',
            key: 'starttime',
            content: value.starttime
          },
          {
            title: '运行时间',
            key: 'runtime',
            content: value.runtime
          },
          {
            title: '位置',
            key: 'cLocation',
            content: value.cLocation
          }
        ]
        this.isShowModal = true
        this.modalTitle = '详情'
        this.modalData.displayData = displayData
      },
      //删除当前行
      deleteDev(record) {
        this.isLoading = true
        console.log("record",record)
        let params = {
          cCode: record.cCode
        }
        deleteEquipment(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$message.success("删除零件成功！");
              //重新刷新用户列表
              this.equitmentList(this.pageNum, 10);
            }
            else{
              this.$message.info(res.msg);
            }
            this.isLoading = false
          })
      },

      //新增零件
      createRepair(value,text,index){
        this.isShowModal = true
        this.modalTitle = '新增'
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
            title: '设备型号',
            key: 'eType',
            content: value.eType
          },
          {
            title: '设备厂家',
            key: 'fId',
            content: value.fId
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
          }
        ]
        this.modalData.actionText = '新增零件'
        let data = [
          {
            label: '零件名称',
            name: 'cName'
          },
          {
            label: '零件型号',
            name: 'cType'
          },
          {
            label: '零件编码',
            name: 'cCode'
          },
          {
            label: '零件厂家',
            name: 'fName'
          },
          {
            label: '位置',
            name: 'cLocation'
          },
          {
            label: '使用寿命',
            name: 'lifespan'
          },
          {
            label: '开始使用时间',
            name: 'starttime'
          }
        ]
        this.modalData.value = this.data[index]
        this.modalData.createData = data
        this.modalData.pageNum = this.pageNum
        this.modalData.displayData = displayData
        this.modalData.editData = ""
      },
      //查询设备
      searchDev(){},
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
  .ant-form-item {
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
  .oper-center{
    justify-content: center;
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

  /*覆盖ant默认样式*/
  .table{
    :global(.ant-table-thead > tr > th){
      padding: 15px 6px;
    }
    :global(.ant-table-tbody > tr > td){
      padding: 13px 6px;
    }
  }
</style>