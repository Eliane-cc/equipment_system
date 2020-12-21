<template>
  <div>
    <div class="flex search">
      <a-col :span="5">
        零件名：
      </a-col>
      <a-col :span="15">
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
      <a-col :span="4">
        <a-button :style="{ marginLeft: '8px' }" type="primary" html-type="submit" size="small">
          筛选
        </a-button>
      </a-col>
    </div>
    <div class="flex btn">
      <a-button @click="QRCode" type="primary">
        设备二维码
      </a-button>
      <a-button :style="{ marginLeft: '26px' }" @click="devNFC" type="primary">
        设备NFC
      </a-button>
    </div>
    <div class="result">
      <div class="result-title con">
        双面对齿橡胶齿形带4326-14M
      </div>
      <div class="result-content">
        <a-card hoverable style="width: 100%" class="margin-top">
          <div>
            <a-row>
              <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                零件名称:
              </a-col>
              <a-col :span="18" :style="{ textAlign: 'left' }">
                滚珠丝干轴承020A1D-A
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                零件编码：
              </a-col>
              <a-col :span="18" :style="{ textAlign: 'left' }">
                04143479977
              </a-col>
            </a-row>
          </div>
          <template slot="actions" class="ant-card-actions">
            <div @click="maintainDev()">
              <a-icon key="setting" type="setting" />维护
            </div>
            <div @click="serviceDev()">
              <a-icon key="edit" type="tool" />维修
            </div>
          </template>
        </a-card>
        <a-card hoverable style="width: 100%"  class="margin-top">
          <div>
            <a-row>
              <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                零件名称:
              </a-col>
              <a-col :span="18" :style="{ textAlign: 'left' }">
                滚珠丝干轴承020A1D-A
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                零件编码：
              </a-col>
              <a-col :span="18" :style="{ textAlign: 'left' }">
                04143479977
              </a-col>
            </a-row>
          </div>
          <template slot="actions" class="ant-card-actions">
            <div @click="maintainDev()">
              <a-icon key="setting" type="setting" />维护
            </div>
            <div @click="serviceDev()">
              <a-icon key="edit" type="tool" />维修
            </div>
          </template>
        </a-card>
        <a-card hoverable style="width: 100%"  class="margin-top">
          <div>
            <a-row>
              <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                零件名称:
              </a-col>
              <a-col :span="18" :style="{ textAlign: 'left' }">
                滚珠丝干轴承020A1D-A
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                零件编码：
              </a-col>
              <a-col :span="18" :style="{ textAlign: 'left' }">
                04143479977
              </a-col>
            </a-row>
          </div>
          <template slot="actions" class="ant-card-actions">
            <div @click="maintainDev()">
              <a-icon key="setting" type="setting" />维护
            </div>
            <div @click="serviceDev()">
              <a-icon key="edit" type="tool" />维修
            </div>
          </template>
        </a-card>
        <a-card hoverable style="width: 100%"  class="margin-top">
          <div>
            <a-row>
              <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                零件名称:
              </a-col>
              <a-col :span="18" :style="{ textAlign: 'left' }">
                滚珠丝干轴承020A1D-A
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6" :style="{ textAlign: 'left' }" class="result-title">
                零件编码：
              </a-col>
              <a-col :span="18" :style="{ textAlign: 'left' }">
                04143479977
              </a-col>
            </a-row>
          </div>
          <template slot="actions" class="ant-card-actions">
            <div @click="maintainDev()">
              <a-icon key="setting" type="setting" />维护
            </div>
            <div @click="serviceDev()">
              <a-icon key="edit" type="tool" />维修
            </div>
          </template>
        </a-card>
      </div>

    </div>
    <!--  维修、维护、更换弹窗  -->
    <dev-modal :show.sync="isShowModal" :data="modalData" :title="modalTitle"></dev-modal>
  </div>
</template>

<script>
  import DevModal from "../Modal/DevModal";
  export default {
    name: "MoBasicInfo.vue",
    components: {
      DevModal
    },
    data(){
      return{
        isShowModal: false,
        modalTitle: '',
        modalData: [],
      }
    },
    methods: {
      //维护设备
      maintainDev(){
        let inputCon = [
          {
            label: '维护内容',
            placeholder: '请输入维护内容',
            name: 'maintenance_text'
          }
        ]
        let value = {
          equitment: "双面对齿橡胶齿形带4326-14M-0",
          equitmentCode: "001430022",
          key: "0",
          machine: "卫卷0#",
          part: "滚珠丝杆轴承020A1D-A",
          partCode: "041430022",
          workshop: "车间 0",
        }
        this.isShowModal = true
        this.modalTitle = '设备维护'
        this.modalData.data = value
        this.modalData.inputCon = inputCon
      },
      //维修设备
      serviceDev(){
        let inputCon = [
          {
            label: '维修内容',
            placeholder: '请输入维修内容',
            name: 'servicing_text'
          },
          {
            label: '使用寿命',
            placeholder: '请输入数字',
            name: 'f_used'
          },
          {
            label: '零件更换',
            placeholder: '请输入维修内容',
            name: 'change'
          },
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
        ]
        let value = {
          equitment: "双面对齿橡胶齿形带4326-14M-0",
          equitmentCode: "001430022",
          key: "0",
          machine: "卫卷0#",
          part: "滚珠丝杆轴承020A1D-A",
          partCode: "041430022",
          workshop: "车间 0",
        }
        this.isShowModal = true
        this.modalTitle = '设备维修'
        this.modalData.data = value
        this.modalData.inputCon = inputCon
      },
    }
  }
</script>

<style scoped>
  .flex{
    display: flex;
    flex-direction: row;
  }
  .search{
    justify-content: space-between;
    align-items: center;
  }
  .title{
    margin-right: 20px;
  }
  .btn{
    justify-content: center;
    margin-top: 15px;
  }
  .result{
    margin-top: 20px;
  }
  .result-title{
    font-weight: 600;
  }
  .margin-top{
    margin-top: 10px;
  }
  .con{
    padding: 10px;
    font-size: 16px;
    background-color: #f3f3f3;
  }
  .result-content{
    height: 75vh;
    overflow-y:auto;
  }
</style>