import { createRouter, createWebHistory } from "vue-router";
import { staticRoutes } from "./routes";
import { useUserInfoStore } from '../stores/userInfo';
import pinia from '../stores';
import { getToken, removeToken } from '../utils/token-utils';
import { ElMessage } from 'element-plus';



const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
});

const userInfoStore = useUserInfoStore(pinia)

//Global before guard
router.beforeEach(async (to, from, next) => {
  const token = getToken()
  const userInfo = !!userInfoStore.nickName
  if (token) {
    if (to.path == "/login") {
      next({ path: "/" })
    } else {
       if (userInfo) {
      next()
       } else {
         try {
        await userInfoStore.getInfo()
       next()
      } catch (error) {
        removeToken()
      }
    }
    }
  } else {
   next()
  }
});

// //
// router.afterEach(() => {
//   NProgress.done();
// });

// export router
export default router;
