<template>
  <div>
    <a-modal v-model="show" :title="title" @ok="handleOk">
      <a-row>
          <a-col :span="3" class="title" offset="2">
            车间：
          </a-col>
          <a-col :span="7">
            {{data.data.workshop}}
          </a-col>
          <a-col :span="3" class="title" offset="2">
            机台：
          </a-col>
          <a-col :span="7">
            {{data.data.machine}}
          </a-col>
        </a-row>
      <a-row class="margin-top">
        <a-col :span="4" class="title" offset="1">
          设备名称：
        </a-col>
        <a-col :span="7">
          {{data.data.equitment}}
        </a-col>
        <a-col :span="4" class="title" offset="1">
          部件名称：
        </a-col>
        <a-col :span="7">
          {{data.data.part}}
        </a-col>
      </a-row>
      <a-row class="margin-top-input" v-for="(item,index) in data.inputCon" :key="item">
        <div>
          <a-col :span="4" class="title" offset="1" v-if="title != '设备更换'">
            {{item.lable}}：
          </a-col>
          <a-col :span="5" class="title" offset="1" v-else>
            {{item.lable}}：
          </a-col>
        </div>
        <a-col :span="15">
          <a-textarea :placeholder="item.placeholder" :rows="3" />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: "DevModal.vue",
    props: ['data','show','title'],
    data(){
      return{
        show: true
      }
    },
    methods: {
      showModal() {
        this.show = true;
      },
      handleOk(e) {
        console.log(e);
        this.show = false;
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
    margin-top: 10px;
  }
  .margin-top-input{
    margin-top: 20px;
  }
</style>