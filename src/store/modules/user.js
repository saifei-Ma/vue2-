// 导出vuex子模块--声明一个状态token

import { getToken, setToken, removeToken } from "@/utils/auth"

const state = {
  token : getToken(), // 获取token (从缓存中读取初始值)
}
const mutations = {
  // 设置token
  setToken(state, token){
    // 将state中的token设置为传入的token
    state.token = token
    // 调用setToken函数，传入token  (同步到缓存)
    setToken(token)
  },
  // 移除token
  removeToken(state){
     // 设置state.token为null，并调用removeToken函数
    state.token = null
    removeToken()
  }
}
const actions = {

}
// 导出默认的模块，设置命名空间为true，state为初始状态，mutations为状态变更函数，actions为执行函数
export default {
  namespaced : true,
  state,
  mutations,
  actions
}