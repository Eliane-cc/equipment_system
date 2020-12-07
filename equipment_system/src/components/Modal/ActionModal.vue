<template>
  <div>
    <!--  新增  -->
    <a-modal :visible="modalVisible" :title="title" @ok="handleCreate" @cancel="handleCancel" cancelText="取消" :okText="title" v-if="title=='新增'">
      <div v-if="data.label">
        <!--  输入    -->
        <a-row class="margin-top" v-for="i in data.label" :key="i" type="flex" justify="center">
          <a-col :span="22" offset="2">
            <a-col :span="5" class="title">
              {{i}}：
            </a-col>
            <a-col :span="16">
              <a-input :placeholder="`请输入${i}`" :rows="3" allowClear/>
            </a-col>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <!--  编辑  -->
    <a-modal :visible="modalVisible" :title="title" @ok="handleEdit" @cancel="handleCancel" cancelText="取消" :okText="title" v-else>
      <div>
        <!--  设备基本信息显示    -->
        <div class="display" v-if="data.displayData">
          <div class="item" v-for="(item,index) in data.displayData" :key="index">
            <div class="title">{{item.title}}：</div>
            <div class="content">{{item.content}}</div>
          </div>
        </div>
        <!--  输入    -->
        <div v-if="data.editData">
          <a-row class="margin-top" v-for="(item,index) in data.editData" :key="index" type="flex" justify="center">
            <a-col :span="22" offset="2">
              <a-col :span="5" class="title">
                {{item.title}}：
              </a-col>
              <a-col :span="16">
                <a-input :placeholder="`请输入${item.title}`" :rows="3" v-model="item.content" @change="editContent(item,index)" :name="item.name"/>
              </a-col>
            </a-col>
          </a-row>
        </div>
      </div>

    </a-modal>
  </div>
</template>

<script>
  export default {
    name: "ActionModal.vue",
    props: ['data','modalVisible','title'],
    data(){
      return{
        fileList: [],
        tableData: this.data
      }
    },
    methods: {
      //编辑确定事件
      handleEdit(e) {
        this.$emit("update:modalVisible",false)
        // console.log("更改后",this.tableData)
        // this.$emit("update:data",this.tableData)
      },
      //新增确定事件
      handleCreate(e) {
        this.$emit("update:modalVisible",false)
      },
      //编辑内容
      editContent(newValue,index){
        this.tableData.editData[index].content = newValue.content
      },
      //取消按钮事件
      handleCancel(e) {
        this.$emit("update:modalVisible",false)
      }
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