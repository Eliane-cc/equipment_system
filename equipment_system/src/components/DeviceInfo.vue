<template>
  <div class="contain">
    <div>
      <a-form class="form" :form="form" @submit="handleSearch">
        <a-row>
          <a-col
            v-for="(item,index) in label"
            :key="index"
            :span="8"
            class="margin-bottom"
          >
            <div class="flex-center">
              <a-col :span="7">
                {{item.title}}：
              </a-col>
              <a-col :span="17">
                <a-tree-select
                  v-model="value"
                  show-search
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '260px', overflow: 'auto' }"
                  placeholder="请选择"
                  allow-clear
                  tree-default-expand-all
                >
                  <a-tree-select-node key="random1" value="车间0">
                    <div slot="title">车间0</div>
                  </a-tree-select-node>
                  <a-tree-select-node key="random2" value="sss">
                    <div slot="title">车间1</div>
                  </a-tree-select-node>
                  <a-tree-select-node key="random3" value="sss">
                    <div slot="title">车间2</div>
                  </a-tree-select-node>
                  <a-tree-select-node key="random3" value="sss">
                    <div slot="title">车间4</div>
                  </a-tree-select-node>
                  <a-tree-select-node key="random3" value="sss">
                    <div slot="title">车间0</div>
                  </a-tree-select-node>
                  <a-tree-select-node key="random3" value="sss">
                    <div slot="title">车间0</div>
                  </a-tree-select-node>
                  <a-tree-select-node key="random3" value="sss">
                    <div slot="title">车间0</div>
                  </a-tree-select-node>  <a-tree-select-node key="random3" value="sss">
                  <div slot="title">车间0</div>
                </a-tree-select-node>  <a-tree-select-node key="random3" value="sss">
                  <div slot="title">车间0</div>
                </a-tree-select-node>  <a-tree-select-node key="random3" value="车间0">
                  <div slot="title">车间0</div>
                </a-tree-select-node>  <a-tree-select-node key="random3" value="车间8">
                  <div slot="title">车间8</div>
                </a-tree-select-node>
                </a-tree-select>
              </a-col>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit" @click="searchDev">
              查询
            </a-button>
            <a-button type="primary" :style="{ marginLeft: '8px' }" @click="createDev">
              新增
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="table">
        <a-table :columns="columns" :data-source.sync="data" bordered class="column" :pagination="pagination" :loading="isLoading">
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
                  <a @click="() => createRepair(record,text)">新增零件</a>
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
  import {deleteDev, getDevList} from "../api/index";
  const columns = [
    {
      title: '车间',
      dataIndex: 'eWorkshop',
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eWorkshop' },
    },
    {
      title: '机台',
      dataIndex: 'eMachine',
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'eMachine' },
    },
    {
      title: '设备名称',
      dataIndex: 'eName',
      width: '16%',
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
      width: '16%',
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
          }
        ],
        isShowModal: false,
        modalTitle: '',
        modalData: [],
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
        value: undefined,
      }
    },
    methods: {
      //设备列表显示
      devList(pageNum=1, pageSize=10){
        this.isLoading = true
        this.pageNum = pageNum
        //let params = new URLSearchParams();
        //params.append("pageNum", pageNum);
        //params.append("pageSize", pageSize);
        let params = {
          pageNum: pageNum,
          pageSize: pageSize
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
      //表单查询
      handleSearch(e) {
        this.form.validateFields((error, values) => {
          console.log('error', error);
          console.log('Received values of form: ', values);
        });
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
            key: 'e_fName',
            content: value.e_fName,
            name: 'e_fName'
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
            name: 'e_fName'
          }
        ]
        this.modalData.createData = data
        this.modalData.displayData = ""
        this.modalData.pageNum = this.pageNum
      },
      //新增零件
      createRepair(value,text){
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
        this.modalData.value = value
        this.modalData.createData = data
        this.modalData.pageNum = this.pageNum
        this.modalData.displayData = displayData
      }
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