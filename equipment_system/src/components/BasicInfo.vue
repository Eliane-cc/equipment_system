<template>
  <div class="contain">
    <div>
      <a-form class="form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col
            v-for="(item,index) in lable"
            :key="item"
            :span="6"
          >
            <a-form-item :label="item.title">
              <a-input :placeholder="item.placeholder"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="QRCode">
              设备二维码
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="devNFC">
              设备NFC
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="table">
        <a-table :columns="columns" :data-source="data" bordered class="column">
          <template
            v-for="col in ['workshop', 'machine', 'equitment','part','operation']"
            :slot="col"
            slot-scope="text,record,index"
          >
            <div :key="col" class="column-content">
              {{ text }}
            </div>
          </template>
          <template slot="operation" slot-scope="text,record,index">
            <div class="oper">
              <a @click="maintainDev(record)">维护</a>
              <a @click="serviceDev(record)">维修</a>
              <a @click="replaceDev(record)">更换</a>
            </div>
          </template>
        </a-table>
      </div>
    </div>
    <dev-modal :show="isShowModal" :data="modalData" :title="modalTitle"></dev-modal>
  </div>
</template>

<script>
  import DevModal from "./DevModal/DevModal";
  const columns = [
    {
      title: '车间',
      dataIndex: 'workshop',
      width: '20%',
      scopedSlots: { customRender: 'workshop' },
    },
    {
      title: '机台',
      dataIndex: 'machine',
      width: '20%',
      scopedSlots: { customRender: 'machine' },
    },
    {
      title: '设备名称',
      dataIndex: 'equitment',
      width: '20%',
      scopedSlots: { customRender: 'equitment' },
    },
    {
      title: '部件名称',
      dataIndex: 'part',
      width: '20%',
      scopedSlots: { customRender: 'part' },
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
      equitment: `设备名称 ${i}`,
      part: `部件名称 ${i}`
    });
  }
  export default {
    name: "BasicInfo.vue",
    components: {
      DevModal
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
            title: '机台',
            placeholder: '请输入机台'
          },
          {
            title: '设备名',
            placeholder: '请输入设备名称'
          },
          {
            title: '部件名',
            placeholder: '请输入部件名称'
          }
        ],
        isShowModal: false,
        modalTitle: '',
        modalData: [],
        index: '0',
        form: this.$form.createForm(this, { name: 'advanced_search' }),
        data,
        columns,
        editingKey: '',
      }
    },
    methods: {
      //设备二维码
      QRCode(){

      },
      //表单查询
      handleSearch(e) {
        this.form.validateFields((error, values) => {
          console.log('error', error);
          console.log('Received values of form: ', values);
        });
      },
      //设备NFC
      devNFC(){

      },
      //维护设备
      maintainDev(value){
        let inputCon = [
          {
            lable: '维护内容',
            placeholder: '请输入维护内容'
          }
        ]
        this.isShowModal = true
        this.modalTitle = '设备维护'
        this.modalData.data = value
        this.modalData.inputCon = inputCon
        console.log(value)
      },
      //维修设备
      serviceDev(value){
        let inputCon = [
          {
            lable: '维修内容',
            placeholder: '请输入维修内容'
          }
        ]
        this.isShowModal = true
        this.modalTitle = '设备维修'
        this.modalData.data = value
        this.modalData.inputCon = inputCon
      },
      //更换设备
      replaceDev(value){
        let inputCon = [
          {
            lable: '新部件名称',
            placeholder: '请输入新部件名称'
          },
          {
            lable: '新部件型号',
            placeholder: '请输入新部件型号'
          },
          {
            lable: '新部件厂家',
            placeholder: '请输入新部件厂家'
          },
        ]
        this.isShowModal = true
        this.modalTitle = '设备更换'
        this.modalData.data = value
        this.modalData.inputCon = inputCon
      }
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
    padding-right: 25px;
  }

</style>