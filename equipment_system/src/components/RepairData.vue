<template>
  <div class="contain">
    <div>
      <a-form class="form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col
            v-for="(item,index) in lable"
            :key="index"
            :span="8"
          >
            <a-form-item :label="item.title">
              <a-input :placeholder="item.placeholder"/>
            </a-form-item>
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
        <a-table :columns="columns" :data-source="data" bordered class="column">
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
                  <a @click="() => editDev(record,text)">编辑</a>
                  <a-popconfirm title="是否确定删除?" cancelText="取消" okText="确定" @confirm="() => deleteDev(record.key)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
            </div>
          </template>
        </a-table>
      </div>
    </div>
    <action-modal :modalVisible.sync="isShowModal" :data.sync="modalData" :title="modalTitle"></action-modal>
  </div>
</template>

<script>
  import ActionModal from "./Modal/ActionModal";
  const columns = [
    {
      title: '车间',
      dataIndex: 'workshop',
      width: '7%',
      scopedSlots: { customRender: 'workshop' },
    },
    {
      title: '机台',
      dataIndex: 'machine',
      width: '7%',
      scopedSlots: { customRender: 'machine' },
    },
    {
      title: '设备名称',
      dataIndex: 'equitment',
      width: '7%',
      scopedSlots: { customRender: 'equitment' },
    },
    {
      title: '设备型号',
      dataIndex: 'model',
      width: '7%',
      scopedSlots: { customRender: 'model' },
    },
    {
      title: '设备厂家',
      dataIndex: 'factory',
      width: '7%',
      scopedSlots: { customRender: 'factory' },
    },
    {
      title: '零件名称',
      dataIndex: 'partName',
      width: '7%',
      scopedSlots: { customRender: 'partName' },
    },
    {
      title: '零件型号',
      dataIndex: 'partModel',
      width: '7%',
      scopedSlots: { customRender: 'partModel' },
    },
    {
      title: '零件厂家',
      dataIndex: 'partFactory',
      width: '10%',
      scopedSlots: { customRender: 'partFactory' },
    },
    {
      title: '维修人员',
      dataIndex: 'repairPersonnel',
      width: '10%',
      scopedSlots: { customRender: 'repairPersonnel' },
    },
    {
      title: '维修内容',
      dataIndex: 'repairContent',
      width: '10%',
      scopedSlots: { customRender: 'repairContent' },
    },
    {
      title: '维修时间',
      dataIndex: 'repairTime',
      width: '10%',
      scopedSlots: { customRender: 'repairTime' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      workshop: `车间 ${i}`,
      machine: `机台 ${i}`,
      equitment: `设备名称. ${i}`,
      model: `型号. ${i}`,
      factory: `厂家. ${i}`,
      partName: `零件名称 ${i}`,
      partModel: `零件型号 ${i}`,
      partFactory: `零件厂家. ${i}`,
      repairContent: `维修内容. ${i}`,
      repairPersonnel: `维修人员. ${i}`,
      repairTime: `维修时间. ${i}`
    });
  }
  export default {
    name: "RepairData.vue",
    components: {
      ActionModal
    },
    data(){
      this.cacheData = data.map(item => ({ ...item }));
      return{
        lable: [
          {
            title: '车间',
            placeholder: '请输入车间'
          },
          {
            title: '零件名称',
            placeholder: '请输入零件名称'
          },
          {
            title: '设备名称',
            placeholder: '请输入设备名称'
          },
          {
            title: '机台',
            placeholder: '请输入机台'
          },
          {
            title: '维修人员',
            placeholder: '请输入维修人员'
          }
        ],
        isShowModal: false,
        modalTitle: '',
        modalData: [],
        form: this.$form.createForm(this, { name: 'advanced_search' }),
        data,
        columns,
      }
    },
    methods: {
      //表单查询
      handleSearch(e) {
        this.form.validateFields((error, values) => {
          console.log('error', error);
          console.log('Received values of form: ', values);
        });
      },
      //编辑
      editDev(value,text) {
        let displayData = [
          {
            title: '车间',
            key: 'workshop',
            content: value.workshop
          },
          {
            title: '机台',
            key: 'machine',
            content: value.machine
          },
          {
            title: '设备型号',
            key: 'model',
            content: value.model
          },
          {
            title: '设备厂家',
            key: 'factory',
            content: value.factory
          },
          {
            title: '设备名称',
            key: 'equitment',
            content: value.equitment
          },
          {
            title: '零件名称',
            key: 'partName',
            content: value.partName
          },
          {
            title: '零件型号',
            key: 'partModel',
            content: value.partModel
          },
          {
            title: '零件厂家',
            key: 'partFactory',
            content: value.partFactory
          }
        ]
        let editData = [
          {
            title: '维修内容',
            key: 'repairContent',
            content: value.repairContent
          },
          {
            title: '维修人员',
            key: 'repairPersonnel',
            content: value.repairPersonnel
          },
          {
            title: '维修时间',
            key: 'repairTime',
            content: value.repairTime
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
        this.modalData.displayData = displayData
        this.modalData.editData = editData
        console.log(value,text)
      },
      //删除当前行
      deleteDev(key) {
        let newData = [...this.data];
        const target = newData.filter((item,index) => {
          return key != item.key
        })
        if (target) {
          this.data = target;
        }
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
    padding-right: 20px;
  }
</style>