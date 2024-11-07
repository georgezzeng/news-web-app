<template>
  <div class="container">
    <div class="listItem">
      <!-- Headlines -->
      <div class="containerItem" v-for="item in pageData" :key="item.hid">
        <div>
          <span class="text">{{ item.title }}</span>
        </div>
        <div class="detail">
          <span>{{ item.type == 1 ? "News":item.type == 2 ? "Sports": item.type == 3 ? "Entertainment": item.type == 4 ? "Tech" : "Others" }}</span>
          <span>{{item.pageViews}} views</span>
        </div>
        <div>
          <el-button @click="toDetail(item.hid)" size="small"
            style="background: #198754; margin-left: 15px; color: #bbd3dc">View Full Article</el-button>
          <el-popconfirm v-if="item.publisher == type" @confirm="handlerDelete(item.hid)" :title="`Do you want to delete ${item.title}?`">
            <template #reference>
              <el-button    size="small" style="background: #dc3545; color: #bbd3dc">Delete</el-button>
            </template>
          </el-popconfirm>

          <el-button @click="Modify(item.hid)" v-if="item.publisher == type"  size="small" style="background: #212529; color: #bbd3dc">Update</el-button>
        </div>
      </div>
  
      <!-- Pagination -->
      <div style="margin-top: 20px">
        <el-pagination 
          v-model:current-page="findNewsPageInfo.pageNum"
          v-model:page-size="findNewsPageInfo.pageSize" 
          @size-change="getPageList"
          @current-change="getPageList"
          :page-sizes="[5,7,10]" 
          background
          layout="prev, pager, next , ->, sizes, total" 
          :total="totalSize" />
      </div>
    </div>
  </div>
</template>

<script >
import { getfindNewsPageInfo , removeByHid } from "../../api/index"
 import { defineComponent } from 'vue'
  export default  defineComponent({
    name:'HeadlineNews'
  })
</script>
<script  setup>
import { ref, onMounted, getCurrentInstance, watch } from "vue"
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import pinia from '../../stores/index';
import { useUserInfoStore } from '../../stores/userInfo'
const  { Bus } = getCurrentInstance().appContext.config.globalProperties
const userInfoStore = useUserInfoStore(pinia)
const router = useRouter()
const type = userInfoStore.uid
const findNewsPageInfo = ref(
  {
    keyWords: "", // keywords
    type: 0,           // headline type
    pageNum: 1,        // page number
    pageSize: 5,     // page size
  }
)
const totalSize = ref(0) //size of pages
// page data initialization
const pageData = ref([{
  hid: null,
  pageViews: null,
  pastHours: null,
  publisher: null,
  title: "",
  type: null
}])


//Receive data searched by users from the header component.
Bus.on('keyword', (keywords) => {
  findNewsPageInfo.value.keyWords = keywords
})
//tid passed over when the header is clicked to toggle highlight."
Bus.on('tid', (type) => {
  findNewsPageInfo.value.type = type
})
// Monitor changes in the initialization parameter 'type',
// and resend the request to fetch the list data when 'type' changes
watch(() => findNewsPageInfo.value, () => {
  getPageList()
}, {
  deep: true,
})
// Initialize request for paginated list data
const getPageList = async () => {
  let result = await getfindNewsPageInfo(findNewsPageInfo.value)
  pageData.value = result.pageInfo.pageData
 findNewsPageInfo.value.pageNum = result.pageInfo.pageNum
 findNewsPageInfo.value.pageSize = result.pageInfo.pageSize
 totalSize.value = +result.pageInfo.totalSize
}
// Lifecycle hook for component mounting.
onMounted(() => {
  getPageList()
})
// redirect to details page
const toDetail = (hid) => {
  router.push({ name: "Detail" ,query:{ hid }});
}

// delete
const handlerDelete = async (id) => {
  await removeByHid(id)
  ElMessage.success('Deleted!')
  getPageList()
}
//modify

const Modify = (hid) => {
  router.push({ name: "addOrModifyNews", query: { hid } });
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .listItem {
    .containerItem {
      margin-top: 20px;
      border-radius: 10px;
      border: 2px solid #ebebeb;
      width: 600px;
      height: 120px;

      div {
        margin-top: 10px;
      }

      .text {
        margin-left: 15px;
        color: #353a3f;
      }

      .detail {
        span {
          margin-left: 15px;
          color: #8b778a;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
