<template>
  <div>
    <!--  新增  -->
    <a-modal :visible="modalVisible" :title="title" @ok="handleCreate(data.actionText)" @cancel="handleCancel" cancelText="取消" :okText="title" v-if="title=='新增'"  :confirm-loading="confirmCreateLoading">
      <div v-if="data.createData">
        <!--  设备基本信息显示    -->
        <div v-if="data.displayData">
          <a-row type="flex" justify="center">
            <a-col :span="12" v-for="(item,index) in data.displayData" :key="index" class="margin-top" >
              <a-col :span="8" class="title">
                {{item.title}}：
              </a-col>
              <a-col :span="16" class="text_center">
                {{item.content}}
              </a-col>
            </a-col>
          </a-row>
          <a-divider dashed/>
        </div>
        <!--  输入    -->
        <a-row v-for="(item,index) in data.createData" :key="index" class="margin-top">
          <a-form :form="form" :label-col="{ span: 4,offset: 1 }" :wrapper-col="{ span: 17,offset: 1 }">
            <a-form-item :label="item.label">
              <template v-if="item.label == '使用寿命'">
                <a-input-number v-model="value" :min="0" @change="onChange" allowClear :ref="item.name" :value="lifespan" v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}]}]"/> 天
              </template>
              <template v-else-if="item.label == '开始使用时间'">
                <a-date-picker show-time placeholder="请选择时间" @change="selectTime" :default-value="moment()" :format="dateFormat" :ref="item.name" v-model="starttime"/>
              </template>
              <template v-else-if="item.label == '密码'">
                <a-input-password placeholder="请输入密码"  allowClear :ref="item.name" v-decorator="[item.name, validatorRules.pwd]"/>
              </template>
              <template v-else-if="item.label == '用户角色'">
                <a-select
                  placeholder="请选择用户角色"
                  style="width: 100%"
                  allow-clear
                  v-decorator="[item.name, validatorRules.common]"
                >
                  <a-select-option v-for="(Item,Index) in item.children" :key="Item.id" :value="Item.id">
                    {{Item.name}}
                  </a-select-option>
                </a-select>
              </template>
              <template v-else-if="item.label == '联系方式'">
                <a-input :placeholder="`请输入${item.label}`" :rows="3"  allowClear :ref="item.name" v-decorator="[item.name, validatorRules.phone]"/>
              </template>
              <template v-else-if="item.label == '工号/账号'">
                <a-input :placeholder="`请输入${item.label}`" :rows="3"  allowClear :ref="item.name" v-decorator="[item.name, validatorRules.workNumber]"/>
              </template>
              <template v-else-if="item.label == '设备编码'">
                <a-input :placeholder="`请输入${item.label}`" :rows="3"  allowClear :ref="item.name" v-decorator="[item.name, validatorRules.devCode]"/>
              </template>
              <template v-else>
                <a-input :placeholder="`请输入${item.label}`" :rows="3" allowClear :ref="item.name" v-decorator="[item.name, validatorRules.common]" />
              </template>
            </a-form-item>
          </a-form>
        </a-row>
      </div>
    </a-modal>
    <!--  详情  -->
    <a-modal :visible="modalVisible" :title="title" @ok="handleOk" @cancel="handleCancel" cancelText="取消" okText="确定" v-else-if="title == '详情' || title == '维护详情' || title == '维修详情' || title == '更换详情'"  :confirmLoading="confirmDetailLoading">
      <div>
        <!--  设备基本信息显示    -->
        <div v-if="data.displayData">
          <a-row>
            <template v-for="(item,index) in data.displayData" >
              <template v-if="item.title == '维护时间'">
                <a-col :span="15" class="margin-top" >
                  <a-col :span="6" class="title">
                    {{item.title}}：
                  </a-col>
                  <a-col :span="16" class="text_center">
                    {{item.content}}
                  </a-col>
                </a-col>
              </template>
              <template v-else-if="item.title == '图片'">
                <a-col :span="24" class="margin-top" >
                  <a-col :span="4" class="title">
                    {{item.title}}：
                    <template v-if="picList.length == 0">
                      <span class="noneCss">无</span>
                    </template>
                  </a-col>
                  <a-col :span="24">
                    <template v-if="picList.length != 0">
                      <template v-for="(itemPic,indexPic) in picList">
                        <img :src="'data:image/png;base64,'+itemPic" alt="" class="imgList">
                      </template>
                    </template>
                  </a-col>
                </a-col>
              </template>
              <template v-else>
                <a-col :span="12" class="margin-top" >
                  <a-col :span="8" class="title">
                    {{item.title}}：
                  </a-col>
                  <a-col :span="16" class="text_center">
                    {{item.content}}
                  </a-col>
                </a-col>
              </template>
            </template>
          </a-row>
        </div>
      </div>
    </a-modal>
    <!--  编辑  -->
    <a-modal :visible="modalVisible" :title="title" @ok="handleEdit(data.actionText)" @cancel="handleCancel" cancelText="取消" :okText="title" v-else>
      <div>
        <!--  设备基本信息显示    -->
        <div v-if="data.displayData">
          <a-row type="flex" justify="center">
            <a-col :span="12" v-for="(item,index) in data.displayData" :key="index" class="margin-top" >
              <a-col :span="8" class="title">
                {{item.title}}：
              </a-col>
              <a-col :span="16" class="text_center">
                {{item.content}}
              </a-col>
            </a-col>
          </a-row>
          <a-divider dashed/>
        </div>

        <!--  输入    -->
        <div v-if="data.editData">
          <a-row class="margin-top" v-for="(item,index) in data.editData" :key="index">
            <a-form :form="form" :label-col="{ span: 4,offset: 1 }" :wrapper-col="{ span: 17,offset: 1 }">
              <a-form-item :label="item.title">
                <template v-if="item.title == '使用寿命'">
<!--                  <a-input-number v-model="value" :min="0" @change="onChange" allowClear :ref="item.name" :value="lifespan" v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}]}]"/> 天-->
                  <a-input-number :min="0" :name="item.name" @change="onChange" allowClear :ref="item.name" :value="lifespan" v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}],initialValue: item.content}]"/> 天
                </template>
                <template v-else-if="item.title == '开始使用时间'">
<!--                  <a-date-picker show-time placeholder="请选择时间" @change="selectTime" :default-value="moment()" :format="dateFormat" :ref="item.name" v-model="starttime"/>-->
<!--                  <a-date-picker show-time placeholder="请选择时间" @change="selectTime" :defaultValue="item.content" :format="dateFormat" :ref="item.name" v-model="createValue"/>-->
                  <a-date-picker show-time placeholder="请选择时间" @change="selectTime" :format="dateFormat" :ref="item.name" :value="createValue" v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}],initialValue: item.content}]"/>
                </template>
                <template v-else-if="item.title == '维护时间' || item.title == '维修时间' || item.title == '更换时间'">
                  <a-date-picker show-time placeholder="请选择时间" @change="selectActionTime" :format="dateFormat" :value="actionTime" :ref="item.name"  v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}]}]"/>
                </template>
                <template v-else-if="item.title == '维护内容' || item.title == '维修内容' || item.title == '更换内容'">
                  <a-textarea :placeholder="`请输入${item.title}`" :rows="3" @change="editContent(item,index)" :name="item.name" :ref="item.name" v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}],initialValue: item.content}]"/>
                </template>
                <template v-else-if="item.title == '维护人员' || item.title == '维修人员' || item.title == '更换人员'">
                  <a-input :placeholder="`请输入${item.title}`" :rows="3" :ref="item.name"  v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}],initialValue: item.content}]"/>
                </template>
                <template v-else-if="item.title == '重置密码'">
                  <a-input-password :placeholder="`请输入${item.title}`" allowClear v-model="pwd" v-decorator="[item.name, validatorRules.resetPwd]"/>
                </template>
                <template v-else-if="item.title == '确认密码'">
                  <a-input-password :placeholder="`请输入${item.title}`" v-model="pwdConfirm" allowClear :ref="item.name"/>
                </template>
                <template v-else-if="item.title == '用户角色'">
                  <a-select
                    placeholder="请选择用户角色"
                    style="width: 100%"
                    allow-clear
                    v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}],initialValue: item.content}]"
                  >
                    <a-select-option v-for="(Item,Index) in item.children" :key="Item.id" :value="Item.id">
                      {{Item.name}}
                    </a-select-option>
                  </a-select>
                </template>
                <template v-else-if="item.title == '运行时间'">
                  <template v-if="operTime == '0天0小时0分'">
                    <div>{{item.content}}</div>
                  </template>
                  <template v-else>
                    <div>{{operTime}}</div>
                  </template>
                </template>
                <template v-else-if="item.title == '设备编码'">
                  <a-input :placeholder="`请输入${item.title}`" :rows="3" @change="editContent(item,index)" :ref="item.name"  v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}],initialValue: item.content} ]"/>
                </template>
                <template v-else>
                  <a-input :placeholder="`请输入${item.title}`" :rows="3" @change="editContent(item,index)" :ref="item.name"  v-decorator="[item.name,  {rules: [{required: true,message: '该字段不能为空，请重新输入'}],initialValue: item.content}]"/>
                </template>
              </a-form-item>
            </a-form>
          </a-row>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import moment from 'moment'
  import {
    getDevList,
    getUserList,
    addUser,
    addDev,
    addEquipment,
    updateUser,
    updateDev,
    updateEquipment,
    updateMaintain,
    updateRepair,
    updateChange,
    getequitmentList,
    getmaintainList, getrepairList, getchangeList, getDropDevList, getDropEquipList,
    getPicMaintain,getPicRepair,getPicChange
  } from "../../api";
  export default {
    name: "ActionModal.vue",
    props: ['data','modalVisible','title','dataList'],
    watch:{
      modalVisible: {
        handler(newValue, oldValue) {
          console.log(newValue);
          if (newValue){
            if (this.title == '详情'){
              this.confirmDetailLoading = false
            }else{
              this.onLoadPic()
            }
          }
        }
      }
    },
    // mounted(){
    //   console.log("value", this.data.id)
    //   if (this.data.modalVisible){
    //     this.onLoadPic()
    //   }
    // },
    data(){
      return{
        form: this.$form.createForm(this, { name: 'coordinated' }),
        fileList: [],
        tableData: this.data,
        value: '',
        pwd: '',
        pwdConfirm: '',
        operTime: '0天0小时0分',
        dateFormat: 'yyyy-MM-DD HH:mm',
        valueEdit: '',
        validatorRules: {
          common: {
            rules: [
              {
                required: true,
                message: '该字段不能为空，请重新输入'
              }
            ]
          },
          pwd: {
            rules: [
              {
                required: true,
                message: '该字段不能为空，请重新输入'
              },
              {
                validator: this.pwdCheck.bind(this)
              }
            ]
          },
          resetPwd: {
            rules: [
              {
                validator: this.pwdCheck.bind(this)
              }
            ]
          },
          phone: {
            rules: [
              {
                required: true,
                message: '该字段不能为空，请重新输入'
              },
              {
                validator: this.phoneCheck.bind(this)
              }
            ]
          },
          workNumber: {
            rules: [
              {
                required: true,
                message: '该字段不能为空，请重新输入'
              },
              {
                validator: this.workNumberCheck.bind(this)
              }
            ]
          },
          // devCode: {
          //   rules: [
          //     {
          //       required: true,
          //       message: '该字段不能为空，请重新输入'
          //     },
          //     {
          //       validator: this.devCodeCheck.bind(this)
          //     }
          //   ]
          // },
        },
        confirmCreateLoading: false,
        lifespan: '',
        starttime: this.moment(),
        timeFormat: this.moment(),
        imgSrc: [],//图片地址
        createValue: [],
        actionTime: [],
        picList: [],    //图片列表
        confirmDetailLoading: true,   //详情页信息加载
      }
    },
    methods: {
      //创建即加载
      onLoadPic(){
        console.log("详情加载图片")
        if (this.data.id){
          if (this.title == '维护详情'){
            let params = {
              mId: this.data.id
            }
            console.log("我是维护详情",params)
            getPicMaintain(params)
              .then((res) => {
                if (res.msg == "SUCCESS"){
                  this.picList = res.data
                }else {
                  this.$message.info(res.msg)
                }
                this.confirmDetailLoading = false
              })
          }
          else if (this.title == '维修详情'){
            let params = {
              rId: this.data.id
            }
            getPicRepair(params)
              .then((res) => {
                if (res.msg == "SUCCESS"){
                  this.picList = res.data
                }else {
                  this.$message.info(res.msg)
                }
                this.confirmDetailLoading = false
              })
          }
          else if (this.title == '更换详情'){
            let params = {
              cId: this.data.id
            }
            getPicChange(params)
              .then((res) => {
                if (res.msg == "SUCCESS"){
                  this.picList = res.data
                }else {
                  this.$message.info(res.msg)
                }
                this.confirmDetailLoading = false
              })
          }
        }
      },
      //引入时间格式处理moment
      moment,
      //手机号码校验
      phoneCheck(rule, value, callbackFn) {
        const reg = /^(13[0-9]|14[5679]|15[0-3,5-9]|16[56]|17[0-9]|18[0-9]|19[189])\d{8}$/
        if (!reg.test(value) && value) {
          callbackFn('请输入格式正确的手机号码')
          return
        }
        callbackFn()
      },
      //密码校验
      pwdCheck(rule, value, callbackFn) {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        if (!reg.test(value) && value) {
          callbackFn('密码需由8-16位字母和数字组成，请重新输入')
          return
        }
        callbackFn()
      },
      //工号校验
      workNumberCheck(rule, value, callbackFn) {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{10,10}$/
        if (!reg.test(value) && value) {
          callbackFn('工号需由10位的数字和字母组成，请重新输入')
          return
        }
        callbackFn()
      },
      //设备编码校验
      // devCodeCheck(rule, value, callbackFn){
      //   const reg = /^[0-9]{11,11}$/
      //   if (!reg.test(value) && value) {
      //     callbackFn('设备编码需由11位数字组成')
      //     return
      //   }
      //   callbackFn()
      // },
      //编辑确定事件
      handleEdit(text) {
        let data;
        console.log("编辑数据",this.data.value)
        //判断重置密码和确认密码是否一致
        if(this.pwdConfirm == this.pwd){
          // 拉取表单数据的方法
          this.form.validateFields((err, values) => {
            if (!err) {
              data = this.form.getFieldsValue()
              if(this.pwdConfirm){
                data.uPassword = this.pwdConfirm
              }
              this.confirmCreateLoading = true
              if (data){
                //编辑用户
                if (text == "编辑用户"){
                  data.uId = this.data.value.uId
                  updateUser(data)
                    .then((res) => {
                      if (res.msg == "SUCCESS"){
                        this.$message.success("修改用户成功！");
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                        //重新刷新用户列表
                        this.userList();
                      }else{
                        this.$message.error(res.msg);
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                      }
                    })
                  this.confirmCreateLoading = false
                }
                //编辑设备
                else if (text == '编辑设备'){
                  console.log("data编辑",data)
                  data.eId = this.data.value.eId
                  updateDev(data)
                    .then((res) => {
                      console.log("res",res)
                      if (res.msg == "SUCCESS"){
                        this.$message.success("修改设备信息成功！");
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                        //重新刷新用户列表
                        this.devList();
                      }else{
                        this.$message.error(res.msg);
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                      }
                    })
                  this.confirmCreateLoading = false
                }
                //编辑零件
                else if (text == '编辑零件'){
                  console.log("data编辑",data)
                  data.cId = this.data.value.cId
                  if (this.lifespan){
                    data.lifespan = this.lifespan
                  }else{
                    data.lifespan =  this.data.editData[5].content
                  }
                  console.log("lifespan",this.lifespan, this.data.editData[5].content)
                  if (this.createValue.length == 0){
                    data.starttime = this.data.editData[6].content
                  }else{
                    data.starttime = this.createValue
                  }
                  // console.log("零件编辑",this.createValue.length == 0,this.data.editData[6].content)
                  console.log("零件请求参数",data)
                  updateEquipment(data)
                    .then((res) => {
                      console.log("res",res)
                      if (res.msg == "SUCCESS"){
                        this.$message.success("修改零件信息成功！");
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                        //重新刷新用户列表
                        this.equitmentList();
                      }else{
                        this.$message.error(res.msg);
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                      }
                    })
                  this.confirmCreateLoading = false
                }
                //编辑维护
                else if (text == '编辑维护'){
                  data.mId = this.data.value.mId
                  data.mTime = this.actionTime
                  updateMaintain(data)
                    .then((res) => {
                      console.log("res",res)
                      if (res.msg == "SUCCESS"){
                        this.$message.success("修改维护信息成功！");
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                        //重新刷新用户列表
                        this.maintainList();
                      }else{
                        this.$message.error(res.msg);
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                      }
                    })
                  this.confirmCreateLoading = false
                }
                //编辑维修
                else if (text == '编辑维修'){
                  data.rId = this.data.value.rId
                  data.rTime = this.actionTime
                  updateRepair(data)
                    .then((res) => {
                      if (res.msg == "SUCCESS"){
                        this.$message.success("修改维修信息成功！");
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                        //重新刷新用户列表
                        this.repairList();
                      }else{
                        this.$message.error(res.msg);
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                      }
                    })
                  this.confirmCreateLoading = false
                }
                //编辑更换
                else if (text == '编辑更换'){
                 // data.eId = this.data.value.eId
                  data.cid = this.data.value.cId
                  data.startTime = this.actionTime
                 // data.cId = this.data.value.cId
                  console.log("更换",data)
                  updateChange(data)
                    .then((res) => {
                      if (res.msg == "SUCCESS"){
                        this.$message.success("修改更换信息成功！");
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                        //重新刷新更换列表
                        this.changeList();
                      }else{
                        this.$message.error(res.msg);
                        this.$emit("update:modalVisible",false);
                        this.form.resetFields();
                      }
                    })
                  this.confirmCreateLoading = false
                }
              }
            }
          })
        }else{
          this.$message.info('两次密码输入不一致，请重新输入！');
        }
        this.operTime = '0天0小时0分'
        this.lifespan = ''
        this.createValue = []
        this.starttime = this.moment()
        this.picList = []   //图片为空
      },
      //新增确定事件
      handleCreate(text) {
        let data;
        // 拉取表单数据的方法
        this.form.validateFields((err, values) => {
          if (!err) {
            data = this.form.getFieldsValue()
            console.log("表单数据",data)
            this.confirmCreateLoading = true
            if (data){
              //新增用户
              if (text == "新增用户"){
                addUser(data)
                  .then((res) => {
                    if (res.msg == "SUCCESS"){
                      this.$message.success("添加用户成功！");
                      this.form.resetFields();
                      //重新刷新用户列表
                      this.userList();
                    }else{
                      this.$message.error(res.msg);
                      this.form.resetFields();
                    }
                    this.$emit("update:modalVisible",false);
                  })
                this.confirmCreateLoading = false
              }
              else if (text == '新增设备'){
                addDev(data)
                  .then((res) => {
                    console.log("res",res)
                    if (res.msg == "SUCCESS"){
                      this.$message.success("添加设备成功！");
                      this.form.resetFields();
                      //重新刷新设备
                      this.devList();
                      //重新刷新下拉列表数据
                      this.getDropList();
                    }else{
                      this.$message.error(res.msg);
                      this.form.resetFields();
                    }
                    this.$emit("update:modalVisible",false);
                  })
                this.confirmCreateLoading = false
              }
              else if (text == '新增零件'){
                data.eId = this.data.value.eId
                data.lifespan = this.lifespan
                if (this.starttime._isAMomentObject){
                  console.log("我是moment")
                  data.starttime = this.starttime.format('yyyy-MM-DD HH:mm:ss')
                }else{
                  data.starttime = this.starttime
                }
                addEquipment(data)
                  .then((res) => {
                    console.log("res",res)
                    if (res.msg == "SUCCESS"){
                      this.$message.success("添加零件成功！");
                      this.form.resetFields();
                      this.operTime = '0天0小时0分'
                      this.lifespan = ''
                      this.createValue = []
                      this.starttime = this.moment()
                      //重新刷新零件列表
                      this.equitmentList();
                      //重新刷新零件下拉列表
                      this.getEquitDropList();
                    }else{
                      this.$message.error(res.msg);
                      this.form.resetFields();
                      this.operTime = '0天0小时0分'
                      this.lifespan = ''
                      this.createValue = []
                      this.starttime = this.moment()
                    }
                    this.$emit("update:modalVisible",false);
                  })
                this.confirmCreateLoading = false
              }
            }
          }
        })
      },
      //用户列表
      userList(){
        let params = {
          pageNum: this.data.pageNum,
          pageSize: 10
        }
        getUserList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$emit("update:dataList",res.data.list);
            }
          })
      },
      //设备列表
      devList(){
        let params = {
          pageNum: this.data.pageNum,
          pageSize: 10
        }
        getDevList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$emit("update:dataList",res.data.list);
            }
          })
      },
      //零件列表
      equitmentList(){
        let params = {
          pageNum: this.data.pageNum,
          pageSize: 10
        }
        getequitmentList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$emit("update:dataList",res.data.list);
            }
            console.log("零件管理列表", res);
          })
      },
      //维护列表显示
      maintainList(){
        let params = {
          pageNum: this.data.pageNum,
          pageSize: 10
        }
        getmaintainList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$emit("update:dataList",res.data.list);
            }
          })
      },
      //维修列表显示
      repairList(){
        let params = {
          pageNum: this.data.pageNum,
          pageSize: 10
        }
        getrepairList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$emit("update:dataList",res.data.list);
            }
          })
      },
      //更换列表显示
      changeList(){
        let params = {
          pageNum: this.data.pageNum,
          pageSize: 10
        }
        getchangeList(params)
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$emit("update:dataList",res.data.list);
            }
          })
      },
      //设备下拉列表信息更新
      getDropList(){
        getDropDevList()
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$emit("update:dataDrop",res.data);
            }
          })
      },
      //零件下拉列表信息更新
      getEquitDropList(){
        getDropEquipList()
          .then((res) => {
            if (res.msg == "SUCCESS"){
              this.$emit("update:dataDrop",res.data);
            }
          })
      },
      //编辑内容
      editContent(newValue,index){
        this.tableData.editData[index].content = newValue.content
        console.log("编辑",newValue,index)
      },
      //详情确定事件
      handleOk(){
        this.picList = []   //图片为空
        // this.$emit("update:data",'')
        this.$emit("update:modalVisible",false)
      },
      //取消按钮事件
      handleCancel(e) {
        console.log("弹窗时间")
        this.form.resetFields();
        this.operTime = '0天0小时0分'
        this.lifespan = ''
        this.createValue = []
        this.starttime = this.moment()
        this.picList = []   //图片为空
        // this.form.setFieldsValue({
        //   "starttime": []
        // })
        // this.$emit("update:data",'')
        this.$emit("update:modalVisible",false)
      },
      //使用寿命改变事件
      onChange(value) {
        console.log('changed', value);
        this.lifespan = value
      },
      //计算运行时间
      selectTime(value){
        console.log("value",value)
        this.operTime = moment().diff(value, 'day') + '天' + moment().diff(value, 'hour')%24 + '小时' + moment().diff(value, 'minute')%60 + '分钟';
        this.starttime = this.$moment(value).format('yyyy-MM-DD HH:mm:ss');
        this.createValue = this.$moment(value).format('yyyy-MM-DD HH:mm:ss');
      },
      //时间格式转换
      selectActionTime(value){
        this.timeFormat = this.$moment(value).format('yyyy-MM-DD HH:mm:ss');
        this.actionTime = this.$moment(value).format('yyyy-MM-DD HH:mm:ss');
        console.log("转化后的维护维修时间",this.actionTime,this.timeFormat)
      }
    }
  }
</script>

<style lang="less" scoped>
  .title{
    font-weight: 600;
    font-size: 14px;
  }
  .noneCss{
    font-weight: 500;
  }
  .margin-top{
    margin-bottom: 10px;
  }
  .margin-top-input{
    margin-top: 20px;
  }
  .item{
    display: inline-flex;
    padding: 0;
    width: 49.5%;
    text-align: right;
    margin-bottom: 10px;
  }
  .content{
    margin-left: 10px;
  }
  .display{
    margin-bottom: 20px;
  }
  .imgList{
    width: 140px;
    height: 140px;
    margin-top: 10px;
    margin-left: 10px;
  }

  /* 覆盖默认的ant样式 */
  .margin-top{
    :global(.ant-form-item){
      margin-bottom: 0px;
    }
  }
</style>
