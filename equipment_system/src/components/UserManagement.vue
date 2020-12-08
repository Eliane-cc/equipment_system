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
                <a-input :placeholder="item.placeholder" :name="item.name"/>
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
            v-for="col in ['username', 'workNo', 'telephone']"
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
                  <a @click="() => editDev(record,text)"><a-icon type="edit" />编辑</a>
                  <a-popconfirm title="是否确定删除?" cancelText="取消" okText="确定" @confirm="() => deleteDev(record.key)">
                    <a><a-icon type="delete" />删除</a>
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
      title: '序号',
      dataIndex: 'index',
      width: '8%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'index' },
    },
    {
      title: '姓名',
      dataIndex: 'username',
      width: '12%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'username' },
    },
    {
      title: '工号',
      dataIndex: 'workNo',
      width: '15%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'workNo' },
    },
    {
      title: '联系方式',
      dataIndex: 'telephone',
      width: '17%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'telephone' },
    },
    {
      title: 'XXXXX暂定',
      dataIndex: 'telephone',
      width: '17%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'telephone' },
    },
    {
      title: 'XXXX暂定',
      dataIndex: 'telephone',
      width: '17%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'telephone' },
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
      index: `${i+1}`,
      username: `Elaine ${i}`,
      workNo: `322000071${i}`,
      telephone: `17${i}39564023`
    });
  }
  export default {
    name: "UserManagement.vue",
    components: {
      ActionModal
    },
    data(){
      this.cacheData = data.map(item => ({ ...item }));
      return{
        label: [
          {
            title: '姓名',
            placeholder: '请输入姓名',
            name: 'e_workshop_id'
          },
          {
            title: '工号',
            placeholder: '请输入工号',
            name: 'e_machine_id'
          }
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
            title: '序号',
            key: 'index',
            content: value.index
          },
          {
            title: '姓名',
            key: 'username',
            content: value.username
          },
          {
            title: '工号',
            key: 'workNo',
            content: value.workNo
          },
          {
            title: '联系方式',
            key: 'telephone',
            content: value.telephone
          }
        ]
        let editData = [
          {
            title: '密码',
            key: 'password',
            content: value.password,
            name: 'e_workshop_id'
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
        this.modalData.displayData = displayData
        this.modalData.editData = editData
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
        this.modalData.label = ['姓名','联系方式','工号/账号','密码']
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