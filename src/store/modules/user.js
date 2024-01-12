// 导出vuex子模块--声明一个状态token

const state = {
  token : null
}
const mutations = {

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