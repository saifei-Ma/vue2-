// vueX 集中式状态管理工具的入口文件

/* 导入vue */
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 导入getters
import getters from './getters'
// 导入app模块
import app from './modules/app'
// 导入settings模块
import settings from './modules/settings'
// 导入user模块
import user from './modules/user'
// 安装vuex
Vue.use(Vuex)

// 创建store实例
const store = new Vuex.Store({
  // 使用全局状态vuex状态管理 (根据不同的功能拆分成不同的模块, 存放于modules)
  modules: {
    app,
    settings,
    user
  },
  // 获取getters
  getters
})

// 导出store实例
export default store
