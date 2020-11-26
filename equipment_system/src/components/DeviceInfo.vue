<template>
  <div class="contain">
    <div>
      <a-form class="form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col
            v-for="(item,index) in lable"
            :key="item"
            :span="6"
          >
            <a-form-item :label="item.title">
              <a-input :placeholder="item.placeholder"/>
            </a-form-item>
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
      <div class="table">
        <a-table :columns="columns" :data-source="data" bordered class="column">
          <template
            v-for="col in ['workshop', 'machine', 'equitment','part','operation']"
            :slot="col"
            slot-scope="text, record, index"
          >
            <div :key="col">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">Save</a>
              <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
              <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
            </span>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
  const columns = [
    {
      title: '车间',
      dataIndex: 'workshop',
      width: '20%',
      scopedSlots: { customRender: 'workshop' },
    },
    {
      title: '机台',
      dataIndex: 'machine',
      width: '20%',
      scopedSlots: { customRender: 'machine' },
    },
    {
      title: '设备名称',
      dataIndex: 'equitment',
      width: '20%',
      scopedSlots: { customRender: 'equitment' },
    },
    {
      title: '部件名称',
      dataIndex: 'part',
      width: '20%',
      scopedSlots: { customRender: 'part' },
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
      workshop: `Edrward ${i}`,
      machine: 32,
      equitment: `London Park no. ${i}`,
      part: `London Park no. ${i}`
    });
  }
  export default {
    name: "DeviceInfo.vue",
    data(){
      this.cacheData = data.map(item => ({ ...item }));
      return{
        lable: [
          {
            title: '车间',
            placeholder: '请输入车间'
          },
          {
            title: '机台',
            placeholder: '请输入机台'
          },
          {
            title: '设备名',
            placeholder: '请输入设备名称'
          },
          {
            title: '部件名',
            placeholder: '请输入部件名称'
          }
        ],
        form: this.$form.createForm(this, { name: 'advanced_search' }),
        data,
        columns,
        editingKey: '',
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
      handleChange(value, key, column) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.data = newData;
        }
      },
      edit(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = key;
        if (target) {
          target.editable = true;
          this.data = newData;
        }
      },
      save(key) {
        const newData = [...this.data];
        const newCacheData = [...this.cacheData];
        const target = newData.filter(item => key === item.key)[0];
        const targetCache = newCacheData.filter(item => key === item.key)[0];
        if (target && targetCache) {
          delete target.editable;
          this.data = newData;
          Object.assign(targetCache, target);
          this.cacheData = newCacheData;
        }
        this.editingKey = '';
      },
      cancel(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = '';
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.data = newData;
        }
      },
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
    background-color: #A5A5A5;
  }
</style>