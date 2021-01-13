<template>
  <div class="contain">
    <div>
      <a-form class="form" :form="form" @submit="handleSearch">
        <a-row>
          <a-col
            :span="8"
            class="margin-bottom"
          >
            <a-col :span="7">
              姓名：
            </a-col>
            <a-col :span="17">
              <a-input placeholder="请输入姓名" name="uName" v-model="uName"/>
            </a-col>
          </a-col>
          <a-col
            :span="8"
            class="margin-bottom"
          >
            <a-col :span="7">
              工号：
            </a-col>
            <a-col :span="17">
              <a-input placeholder="请输入工号" name="uWorknumber" v-model="uWorknumber"/>
            </a-col>
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
            v-for="col in ['isadmin']"
            :slot="col"
            slot-scope="text, record, index"
          >
            <template v-if="text > 2">
              <div :key="index" class="column-content" slot="title" :title="text">
                {{ text==3 ? '超级管理员' : '' }}
              </div>
            </template>
            <template v-else>
              <div :key="index" class="column-content" slot="title" :title="text">
                {{ text==1 ? '操作员' : '管理员' }}
              </div>
            </template>

          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
               <span class="oper">
                  <a @click="() => editDev(record,text)"><a-icon type="edit" />编辑</a>
                  <a-popconfirm title="是否确定删除?" cancelText="取消" okText="确定" @confirm="() => deleteDev(record)">
                    <a><a-icon type="delete" />删除</a>
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
  import {getUserList,deleteUser} from  "../api/index";
  //表列
  const columns = [
    {
      title: '序号',
      dataIndex: 'uId',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'uId' },
    },
    {
      title: '姓名',
      dataIndex: 'uName',
      width: '15%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'uName' },
    },
    {
      title: '工号',
      dataIndex: 'uWorknumber',
      width: '19%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'uWorknumber' },
    },
    {
      title: '联系方式',
      dataIndex: 'uPhone',
      width: '19%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'uPhone' },
    },
    {
      title: '用户角色',
      dataIndex: 'isadmin',
      width: '19%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'isadmin' },
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
    name: "UserManagement.vue",
    components: {
      ActionModal
    },
    created() {
      //用户分页显示
      this.userList()
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
        isLoading: true, //表格分页加载
        pageNum: 1,   //记录当前页码
        pagination: {
          total: 0,
          defaultPageSize: 10,
          onChange:(page,pageSize)=>this.userList(page,pageSize),//点击页码事件
        },
        data,
        columns,
        editingKey: '',
        treeExpandedKeys: [],
        uWorknumber: undefined,   //工号
        uName: undefined          //姓名
      }
    },
    methods: {
      //用户列表显示
      userList(pageNum=1, pageSize=10){
        this.isLoading = true
        this.pageNum = pageNum

        let params = {
          pageNum: pageNum,
          pageSize: pageSize,
          uName: this.uName,
          uWorknumber: this.uWorknumber
        }
        getUserList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.data = res.data.list
              this.pagination.total = res.data.total
              this.isLoading = false
            }
            console.log("用户管理列表", res);
          })
      },

      //表单查询
      handleSearch() {
        this.userList()
      },
      //编辑
      editDev(value,text) {
        //console.log("编辑",value,text);
        let displayData = [
          {
            title: '序号',
            key: 'uId',
            content: value.uId
          },
          {
            title: '姓名',
            key: 'uName',
            content: value.uName
          },
          {
            title: '工号',
            key: 'uWorknumber',
            content: value.uWorknumber
          },
          {
            title: '联系方式',
            key: 'uPhone',
            content: value.uPhone
          }
        ]
        let editData = [
          {
            title: '重置密码',
            key: 'uPassword',
            content: '',
            name: 'uPassword'
          },
          {
            title: '确认密码',
            key: 'uPasswordConfirm',
            content: '',
            name: 'uPasswordConfirm'
          },
          {
            title: '用户角色',
            key: 'isadmin',
            content: value.isadmin,
            name: 'isadmin',
            children: [
              {
                id: '1',
                name: '操作工'
              },
              {
                id: '2',
                name: '管理员'
              },
            ]
          }
        ]
        this.isShowModal = true
        this.modalTitle = '编辑'
        this.modalData.actionText = '编辑用户'
        this.modalData.displayData = displayData
        this.modalData.editData = editData
        this.modalData.value = value
        this.modalData.pageNum = this.pageNum
      },

      //删除用户
      deleteDev(record) {
        this.isLoading = true
        //let params = new URLSearchParams();
        //params.append("uWorknumber", record.uWorknumber);
        let params = {
          uWorknumber: record.uWorknumber
        }
        deleteUser(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$message.success("删除用户成功！");
              //重新刷新用户列表
              this.userList(this.pageNum, 10);
            }
            this.isLoading = false
          })
      },

      //查询设备
      searchDev(){},
      //新增用户
      createDev(){
        this.isShowModal = true
        this.modalTitle = '新增'
        this.modalData.actionText = '新增用户'
        let data = [
          {
            label: '姓名',
            name: 'uName'
          },
          {
            label: '联系方式',
            name: 'uPhone'
          },
          {
            label: '工号/账号',
            name: 'uWorknumber'
          },
          {
            label: '用户角色',
            name: 'isadmin',
            children: [
              {
                id: '1',
                name: '操作工'
              },
              {
                id: '2',
                name: '管理员'
              },
            ]
          },
          {
            label: '密码',
            name: 'uPassword'
          },
        ]
        this.modalData.createData = data
        this.modalData.displayData = ""
        this.modalData.pageNum = this.pageNum
      },

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
  .spin-container {
    width: 100%;
    height: 400px;
    background-color: yellow;
  }
</style>