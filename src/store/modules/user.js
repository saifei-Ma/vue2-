// 导出vuex子模块--声明一个状态token

import { getToken, setToken, removeToken } from "@/utils/auth";
import { login, getUserInfo } from "@/api/user";

const state = {
  token: getToken(), // 获取token (从缓存中读取初始值)
  userInfo: {}, // 存放用户信息
}
const mutations = {
  // 设置token
  setToken(state, token) {
    // 将state中的token设置为传入的token
    state.token = token
    // 调用setToken函数，传入token  (同步到缓存)
    setToken(token)
  },
  // 移除token
  removeToken(state) {
    // 设置state.token为null，并调用removeToken函数
    state.token = null
    removeToken()
  },
  // 获取用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  /**
  * @author: 马赛飞
  * @Description: 登录的功能函数
  * @param: 
  */
  // context上下文, 传入参数
  async login(context, data) {
    console.log(data);
    const token = await login(data)
    console.log(token);
    // 提交mutations中的setToken函数，传入token
    context.commit('setToken', token)
  },
  /**
  * @author: 马赛飞
  * @Description: 获取用户信息的功能函数
  * @param: 
  */
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result);
  }
}
// 导出默认的模块，设置命名空间为true，state为初始状态，mutations为状态变更函数，actions为执行函数
export default {
  namespaced: true,
  state,
  mutations,
  actions
}