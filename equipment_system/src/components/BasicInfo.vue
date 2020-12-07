<template>
  <!-- 首页 -->
  <div class="contain">
    <div>
      <!--  查询    -->
      <a-form class="form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
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

<!--            <a-form-item :label="item.title">-->
<!--              <div>-->

<!--              </div>-->
<!--&lt;!&ndash;              <a-input :placeholder="item.placeholder" :name="item.name"/>&ndash;&gt;-->
<!--            </a-form-item>-->
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
      <!--  表格列表信息    -->
      <div class="table">
        <a-table :columns="columns" :data-source="data" bordered class="column">
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
              <a @click="replaceDev(record)">更换</a>
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
  //表格格式
  const columns = [
    {
      title: '车间',
      dataIndex: 'workshop',
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'workshop' },
    },
    {
      title: '机台',
      dataIndex: 'machine',
      width: '11%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'machine' },
    },
    {
      title: '设备名称',
      dataIndex: 'equitment',
      width: '16%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'equitment' },
    },
    {
      title: '设备编码',
      dataIndex: 'equitmentCode',
      width: '15%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'equitmentCode' },
    },
    {
      title: '零件名称',
      dataIndex: 'part',
      width: '16%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'part' },
    },
    {
      title: '零件编码',
      dataIndex: 'partCode',
      width: '15%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'partCode' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      scopedSlots: { customRender: 'operation' },
    },
  ];

  const data = [];
  //表格数据
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      workshop: `车间 ${i}`,
      machine: `卫卷${i}#`,
      equitment: `双面对齿橡胶齿形带4326-14M-${i}`,
      equitmentCode: `${i}01430022`,
      part: `滚珠丝杆轴承${i}20A1D-A`,
      partCode: `${i}41430022`,
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
            title: '设备名',
            placeholder: '请输入设备名称',
            name: 'e_name'
          },
          {
            title: '零件名',
            placeholder: '请输入零件名称',
            name: 'c_name'
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
        treeExpandedKeys: [],
        value: undefined,
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
            label: '维护内容',
            placeholder: '请输入维护内容',
            name: 'maintenance_text'
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
            label: '维修内容',
            placeholder: '请输入维修内容',
            name: 'servicing_text'
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
            label: '新零件名称',
            placeholder: '请输入新零件名称',
            name: 'c_name'
          },
          {
            label: '新零件编码',
            placeholder: '请输入新零件编码',
            name: 'c_code'
          },
          {
            label: '新零件型号',
            placeholder: '请输入新零件型号',
            name: 'c_id'
          },
          {
            label: '新零件厂家',
            placeholder: '请输入新零件厂家',
            name: 'f_id'
          },
          {
            label: '使用寿命',
            placeholder: '请输入数字',
            name: 'f_used'
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