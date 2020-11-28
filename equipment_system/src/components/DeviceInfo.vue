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
              <a-input :placeholder="item.placeholder" :name="item.name"/>
            </a-form-item>
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
        <a-table :columns="columns" :data-source="data" bordered class="column">
          <template
            v-for="col in ['workshop', 'machine', 'equitment','model','factory','operation']"
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
               <span>
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
      width: '16.6%',
      scopedSlots: { customRender: 'workshop' },
    },
    {
      title: '机台',
      dataIndex: 'machine',
      width: '16.6%',
      scopedSlots: { customRender: 'machine' },
    },
    {
      title: '设备名称',
      dataIndex: 'equitment',
      width: '16.7%',
      scopedSlots: { customRender: 'equitment' },
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: '16.6%',
      scopedSlots: { customRender: 'model' },
    },
    {
      title: '厂家',
      dataIndex: 'factory',
      width: '16.6%',
      scopedSlots: { customRender: 'factory' },
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
      factory: `厂家. ${i}`
    });
  }
  export default {
    name: "DeviceInfo.vue",
    components: {
      ActionModal
    },
    data(){
      this.cacheData = data.map(item => ({ ...item }));
      return{
        lable: [
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
        let editData = [
          {
            title: '车间',
            key: 'workshop',
            content: value.workshop,
            name: 'e_workshop_id'
          },
          {
            title: '机台',
            key: 'machine',
            content: value.machine,
            name: 'e_machine_id'
          },
          {
            title: '型号',
            key: 'model',
            content: value.model,
            name: 'e_type'
          },
          {
            title: '厂家',
            key: 'factory',
            content: value.factory,
            name: 'f_id'
          },
          {
            title: '设备名称',
            key: 'equitment',
            content: value.equitment,
            name: 'e_name'
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
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
      //新增设备
      createDev(){
        this.isShowModal = true
        this.modalTitle = '新增'
        this.modalData.label = ['车间','机台','设备名称','型号','厂家']
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
    padding-right: 25px;
  }

</style>