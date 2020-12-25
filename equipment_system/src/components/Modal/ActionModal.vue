<template>
  <div>
    <!--  新增  -->
    <a-modal :visible="modalVisible" :title="title" @ok="handleCreate(data.actionText)" @cancel="handleCancel" cancelText="取消" :okText="title" v-if="title=='新增'">
      <div v-if="data.label">
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
        <a-row class="margin-top" v-for="i in data.label" :key="i" type="flex" justify="center">
          <a-col :span="22" offset="2">
            <a-col :span="5" class="title">
              {{i}}：
            </a-col>
            <a-col :span="16">
              <template v-if="i == '使用寿命'">
                <a-input-number v-model="value" :min="0" @change="onChange" allowClear/> 天
              </template>
              <template v-else-if="i == '开始使用时间'">
                <a-date-picker show-time placeholder="请选择时间" @change="selectTime" :default-value="moment()" :format="dateFormat" />
              </template>
              <template v-else-if="i == '密码'">
                <a-input-password placeholder="请输入密码"  allowClear/>
              </template>
              <template v-else-if="i == '用户角色'">
                <a-tree-select
                  v-model="value"
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '260px', overflow: 'auto' }"
                  placeholder="请选择用户角色"
                  allow-clear
                  tree-default-expand-all
                >
                  <a-tree-select-node key="random1" value="操作工">
                    <div slot="title">操作工</div>
                  </a-tree-select-node>
                  <a-tree-select-node key="random2" value="管理员">
                    <div slot="title">管理员</div>
                  </a-tree-select-node>
                </a-tree-select>
              </template>
              <template v-else>
                <a-input :placeholder="`请输入${i}`" :rows="3" allowClear/>
              </template>
            </a-col>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <!--  详情  -->
    <a-modal :visible="modalVisible" :title="title" @ok="handleEdit" @cancel="handleCancel" cancelText="取消" okText="确定" v-else-if="title == '详情'">
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
        </div>
      </div>
    </a-modal>
    <!--  编辑  -->
    <a-modal :visible="modalVisible" :title="title" @ok="handleEdit" @cancel="handleCancel" cancelText="取消" :okText="title" v-else>
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
          <a-row class="margin-top" v-for="(item,index) in data.editData" :key="index" type="flex" justify="center">
            <a-col :span="22" offset="2">
              <a-col :span="5" class="title">
                {{item.title}}：
              </a-col>
              <a-col :span="16">
                <template v-if="item.title == '使用寿命'">
                  <a-input-number :min="0" :name="item.name" @change="onChange" allowClear :default-value="item.content"/> 天
                </template>
                <template v-else-if="item.title == '开始使用时间'">
                  <a-date-picker show-time placeholder="请选择时间" @change="selectTime" :default-value="item.content" :format="dateFormat" />
                </template>
                <template v-else-if="item.title == '维护时间' || item.title == '维修时间' || item.title == '更换时间'">
                  <a-date-picker show-time placeholder="请选择时间" @change="selectActionTime" :default-value="item.content" :format="dateFormat" />
                </template>
                <template v-else-if="item.title == '维护内容' || item.title == '维修内容' || item.title == '更换内容'">
                  <a-textarea :placeholder="`请输入${item.title}`" :rows="3" v-model="item.content" @change="editContent(item,index)" :name="item.name"/>
                </template>
                <template v-else-if="item.title == '密码'">
                  <a-input-password :placeholder="`请输入${item.title}`"  allowClear/>
                </template>
                <template v-else-if="item.title == '用户角色'">
                  <a-tree-select
                    v-model="value"
                    style="width: 100%"
                    :dropdown-style="{ maxHeight: '260px', overflow: 'auto' }"
                    placeholder="请选择"
                    allow-clear
                    tree-default-expand-all
                  >
                    <a-tree-select-node key="random1" value="操作工">
                      <div slot="title">操作工</div>
                    </a-tree-select-node>
                    <a-tree-select-node key="random2" value="管理员">
                      <div slot="title">管理员</div>
                    </a-tree-select-node>
                  </a-tree-select>
                </template>
                <template v-else-if="item.title == '运行时间'">
                  <div>{{operTime}}</div>
                </template>
                <template v-else>
                  <a-input :placeholder="`请输入${item.title}`" :rows="3" v-model="item.content" @change="editContent(item,index)" :name="item.name"/>
                </template>
              </a-col>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "ActionModal.vue",
    props: ['data','modalVisible','title'],
    data(){
      return{
        fileList: [],
        tableData: this.data,
        value: '',
        operTime: '0天0小时0分',
        dateFormat: 'YYYY-MM-DD HH:mm',
        valueEdit: ''
      }
    },
    methods: {
      //引入时间格式处理moment
      moment,
      //编辑确定事件
      handleEdit(e) {
        this.$emit("update:modalVisible",false)
        // console.log("更改后",this.tableData)
        // this.$emit("update:data",this.tableData)
      },
      //新增确定事件
      handleCreate(text) {
        //新增用户
        if (text == "新增用户"){

        }
        this.$emit("update:modalVisible",false)
      },
      //编辑内容
      editContent(newValue,index){
        this.tableData.editData[index].content = newValue.content
      },
      //取消按钮事件
      handleCancel(e) {
        this.$emit("update:modalVisible",false)
      },
      //使用寿命改变事件
      onChange(){

      },
      //计算运行时间
      selectTime(value){
        this.operTime = moment().diff(value, 'day') + '天' + moment().diff(value, 'hour')%24 + '小时' + moment().diff(value, 'minute')%60 + '分钟';
      },
    }
  }
</script>

<style scoped>
  .title{
    font-weight: 600;
    font-size: 14px;
  }
  .margin-top{
    margin-bottom: 15px;
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
</style>