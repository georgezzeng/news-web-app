
import { defineStore } from 'pinia';
import { getToken, removeToken, setToken } from '../utils/token-utils';
import { getLogin,getUserInfo } from '../api/index';


/**
 * user information
 * @methods setUserInfos set user information
 */
export const useUserInfoStore = defineStore('userInfo', {

	state: () => ({
    token: getToken(),
    nickName: '',
    uid: '',
  }),

	actions: {
    // log in async action
    async login (loginForm) {
       // send request to login
      const result = await getLogin(loginForm)
      // get token and save after login
      const token = result.token
      
      this.token = token
      setToken(token)
    },
    async getInfo () {
      const result = await getUserInfo()
      this.nickName = result.loginUser.nickName
      this.uid = result.loginUser.uid
    },
    initUserInfo(){
      removeToken()
      this.nickName = ""
      this.uid = ""
      console.log('1111111111');
      
    }

  },
  

});