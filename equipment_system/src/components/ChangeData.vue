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
              <template v-if="item.title == '更换人员'">
                <a-col :span="7">
                  {{item.title}}：
                </a-col>
                <a-col :span="17">
                  <a-input :placeholder="item.placeholder" :name="item.name"/>
                </a-col>
              </template>
              <template v-else>
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
              </template>
            </div>
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
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'equitment' },
    },
    {
      title: '零件名称',
      dataIndex: 'partName',
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'partName' },
    },
    {
      title: '新零件名称',
      dataIndex: 'newPartName',
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'newPartName' },
    },
    {
      title: '更换人员',
      dataIndex: 'changePersonnel',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'changePersonnel' },
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
      dataIndex: 'position',
      width: '13%',
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
      newPartName: `新零件名称 ${i}`,
      newPartNameCode: `new-3080647${i}`,
      newPartModel: `新零件型号 ${i}`,
      newPartFactory: `新零件厂家. ${i}`,
      changePersonnel: `更换人员 ${i}`,
      changeTime: `更换时间. ${i}`,
      position: `纸架推杆丝杆轴承 ${i}`,
      picture: `图片(样式先暂定)`
    });
  }
  export default {
    name: "ChangeData.vue",
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
            title: '设备名称',
            key: 'equitment',
            content: value.equitment
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
            title: '设备编码',
            key: 'equitmentCode',
            content: value.equitmentCode
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
          },
          {
            title: '零件编码',
            key: 'partNameCode',
            content: value.partNameCode
          },
        ]
        let editData = [
          {
            title: '新零件名称',
            key: 'newPartName',
            content: value.newPartName
          },
          {
            title: '新零件型号',
            key: 'newPartModel',
            content: value.newPartModel
          },
          {
            title: '新零件厂家',
            key: 'newPartFactory',
            content: value.newPartFactory
          },
          {
            title: '新零件编码',
            key: 'newPartNameCode',
            content: value.newPartNameCode
          },
          {
            title: '位置',
            key: 'position',
            content: value.position
          },
          {
            title: '更换人员',
            key: 'changePersonnel',
            content: value.changePersonnel
          },
          {
            title: '更换时间',
            key: 'changeTime',
            content: value.changeTime
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
        this.modalData.displayData = displayData
        this.modalData.editData = editData
        console.log(value,text)
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
            title: '新零件名称',
            key: 'newPartName',
            content: value.newPartName
          },
          {
            title: '新零件编码',
            key: 'newPartNameCode',
            content: value.newPartNameCode
          },
          {
            title: '新零件型号',
            key: 'newPartModel',
            content: value.newPartModel
          },
          {
            title: '新零件厂家',
            key: 'newPartFactory',
            content: value.newPartFactory
          },
          {
            title: '更换人员',
            key: 'changePersonnel',
            content: value.changePersonnel
          },
          {
            title: '更换时间',
            key: 'changeTime',
            content: value.changeTime
          },
          {
            title: '位置',
            key: 'position',
            content: value.position
          },
          {
            title: '图片',
            key: 'picture',
            content: value.picture
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