<template>
  <div >
    <Header v-show="isHeader"></Header>
    <router-view></router-view>
  </div>
</template>


<script >
import Header from './components/Header.vue'
 import { defineComponent } from 'vue'
  export default  defineComponent({
    name:'App'
  })
</script>
<script  setup>

import { computed } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute() // router object

//check is header should be displayed
 const isHeader =  computed(() => {
    return route.name !== "Login" && route.name !== "Register" && route.name !== "addNews";
})
  
</script>

<style lang="less" scoped>
  
</style>