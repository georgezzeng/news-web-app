<template>
  <el-card class="box-card AddNewsContainer">
    <el-form :rules="newsRules" :model="formData" ref="formRef" size="default">
      <el-form-item label="Topic" prop="title">
        <el-input v-model="formData.title" placeholder="Enter Topic"></el-input>
      </el-form-item>
      <el-form-item style="margin: 50px 0;" label="Content" prop="article">
        <el-input v-model="formData.article" type="textarea" rows="8"></el-input>
      </el-form-item>
      <el-form-item label="Type"  prop="type">
        <el-select v-model="formData.type" placeholder="Please select Type">
          <el-option v-for="item in article" :label="item.name" :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form-item>
      <el-button   @click="handlerCancel">Cancel</el-button>
      <el-button type="primary"  @click="handlerSave">Save</el-button>
    </el-form-item>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue'
import { isUserOverdue } from '../../api/index'
export default defineComponent({
  name: 'AddNews'
})
</script>
<script  setup>
import { getFindHeadlineByHid , saveOrAddNews, issueNews } from "../../api/index"
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter() 
const route = useRoute() 


const formRef = ref()
// Validation rule: missing type
const validateType = (rule, value, callback) => {
  if (value.length) {
    callback()
  } else {
    callback(new Error('Missing type'))
  }
}
// Validation rule: missing type
const validateArticle = (rule, value, callback) => {
  if (value.length) {
    callback()
  } else {
    callback(new Error('Missing content'))
  }
}
// Validation rule: missing type
const validateTitle = (rule, value, callback) => {
  if (value.length) {
    callback()
  } else {
    callback(new Error('Miss Topic'))
}
}
// Validation rules
const newsRules = {
  title: [{ required: true, trigger: 'blur', validator: validateTitle }],
  article: [{ required: true, trigger: 'blur', validator: validateArticle }],
  type: [{ required: true, validator: validateType }],
}


const formData = ref({
  hid:null,
  title: "",   // Topic
  article: "", // Content
  type: ""     // Type
})
//Headline type initialization
const article = [
  {
    type: "1",
    name: "News"
  },
  {
    type: "2",
    name: "Sports"
  },
  {
    type: "3",
    name: "Entertainment"
  },
  {
    type: "4",
    name: "Tech"
  },
  {
    type: "5",
    name: "Others"
  }
]
// If it is a click to modify, the route will carry the hid parameter
// and a request needs to be sent to retrieve data for echo back
const clickModifyEcho = async () => {
  if (!route.query.hid)  return
    let result = await getFindHeadlineByHid(route.query.hid)
    formData.value.title = result.headline.title
    formData.value.article = result.headline.article
    formData.value.type = result.headline.type === 1 ? "News" : result.headline.type === 2 ? "Sports" : result.headline.type === 3 ? "Entertainment" : result.headline.type === 4 ? "Tech" : "Others" 
}

//Page mounting lifecycle
onMounted(() => {
  clickModifyEcho()
})

//Cancel button
const handlerCancel = () => {
  router.back()
}
//Save button
const handlerSave = async () => {
  await formRef.value?.validate()
    //send request to see if token is expired
  await isUserOverdue()
const Obj = {...formData.value}

  //organize request params
//  Obj.hid = userInfoStore.uid.toString()
 Obj.hid = route.query.hid  //add user id so backend knows who added the user id
// check types
 if(Obj.type == "News" ) Obj.type = "1"
 if(Obj.type == "Sports" ) Obj.type = "2"
 if(Obj.type == "Entertainment" ) Obj.type = "3"
 if(Obj.type == "Tech" ) Obj.type = "4"
 if (Obj.type == "Others") Obj.type = "5"
  //send request
  if (route.query.hid) {
    await saveOrAddNews(Obj)
    ElMessage.success("Saved")
  }
  else {
    await issueNews(formData.value)
    ElMessage.success("Saved")
    }
    router.push({ name: "HeadlineNews" });
}


</script>

<style lang="less" scoped>
.AddNewsContainer {
  width: 600px;
  margin: 150px auto;
}
</style>
