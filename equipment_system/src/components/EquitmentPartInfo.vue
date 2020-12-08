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
        <a-table :columns="columns" :data-source="data" bordered class="column">
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
               <span class="oper">
                  <a @click="() => detailDev(record,text)">详情</a>
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
      width: '9%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'workshop' },
    },
    {
      title: '机台',
      dataIndex: 'machine',
      width: '9%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'machine' },
    },
    {
      title: '设备名称',
      dataIndex: 'equitment',
      width: '13%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'equitment' },
    },
    {
      title: '零件名称',
      dataIndex: 'partName',
      width: '13%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'partName' },
    },
    {
      title: '使用寿命',
      dataIndex: 'serviceLife',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'serviceLife' },
    },
    {
      title: '开始使用时间',
      dataIndex: 'startTime',
      width: '12%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'startTime' },
    },
    {
      title: '运行时间',
      dataIndex: 'operationTime',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'operationTime' },
    },
    {
      title: '位置',
      dataIndex: 'position',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'position' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
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
      equitmentCode: `50143083409${i}`,
      model: `型号. ${i}`,
      factory: `厂家. ${i}`,
      partName: `零件名称 ${i}`,
      partNameCode: `50143080647${i}`,
      partModel: `零件型号 ${i}`,
      partFactory: `零件厂家. ${i}`,
      serviceLife: `${i}`,
      startTime: `2020-3-7 14:00`,
      operationTime: `运行时间. ${i}`,
      position: `位置. ${i}`
    });
  }
  export default {
    name: "EquitmentPartInfo.vue",
    components: {
      ActionModal
    },
    data(){
      this.cacheData = data.map(item => ({ ...item }));
      return{
        label: [
          {
            title: '车间',
            placeholder: '请输入车间',
            name: "e_workshop_id"
          },
          {
            title: '机台',
            placeholder: '请输入机台',
            name: 'e_machine_id'
          },
          {
            title: '设备名称',
            placeholder: '请输入设备名称',
            name: "e_name"
          },
          {
            title: '零件名称',
            placeholder: '请输入零件名称',
            name: "c_name"
          },
        ],
        isShowModal: false,
        modalTitle: '',
        modalData: [],
        form: this.$form.createForm(this, { name: 'advanced_search' }),
        data,
        columns,
        editingKey: '',
        treeExpandedKeys: [],
        value: undefined,
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
            title: '设备编码',
            key: 'equitmentCode',
            content: value.equitmentCode
          }
        ]
        let editData = [
          {
            title: '零件名称',
            key: 'partName',
            content: value.partName,
            name: 'c_name'
          },
          {
            title: '零件编码',
            key: 'partNameCode',
            content: value.partNameCode,
            name: 'c_nameCode'
          },
          {
            title: '零件型号',
            key: 'partModel',
            content: value.partModel,
            name: 'c_id'
          },
          {
            title: '零件厂家',
            key: 'partFactory',
            content: value.partFactory,
            name: 'f_id'
          },
          {
            title: '位置',
            key: 'position',
            content: value.position,
            name: 'component_location'
          },
          {
            title: '使用寿命',
            key: 'serviceLife',
            content: value.serviceLife,
            name: 'working_life'
          },
          {
            title: '开始使用时间',
            key: 'startTime',
            content: value.startTime,
            name: 'start_time'
          },
          {
            title: '运行时间',
            key: 'operationTime',
            content: value.operationTime,
            name: 'run_time'
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
        this.modalData.displayData = displayData
        this.modalData.editData = editData
      },
      //查看详情
      detailDev(value,text){
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
            title: '设备名称',
            key: 'equitment',
            content: value.equitment
          },
          {
            title: '设备编码',
            key: 'equitmentCode',
            content: value.equitmentCode
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
            title: '零件名称',
            key: 'partName',
            content: value.partName
          },
          {
            title: '零件编码',
            key: 'partNameCode',
            content: value.partNameCode
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
          },
          {
            title: '使用寿命',
            key: 'serviceLife',
            content: value.serviceLife
          },
          {
            title: '开始使用时间',
            key: 'startTime',
            content: value.startTime
          },
          {
            title: '运行时间',
            key: 'operationTime',
            content: value.operationTime
          },
          {
            title: '位置',
            key: 'position',
            content: value.position
          }
        ]
        this.isShowModal = true
        this.modalTitle = '详情'
        this.modalData.displayData = displayData
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
        this.modalData.label = ['车间','机台','设备名称','设备型号','设备厂家','零件名称','零件型号','零件厂家','位置','使用寿命','开始使用时间']
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