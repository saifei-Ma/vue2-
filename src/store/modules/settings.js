// 页面的交互状态 (折叠侧边栏 -> 固定头部)

import defaultSettings from '@/settings'

// 获取默认设置
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

// 初始化设置状态
const state = {
  // 是否显示设置
  showSettings: showSettings,
  // 是否固定头部
  fixedHeader: fixedHeader,
  // 侧边栏logo
  sidebarLogo: sidebarLogo
}

// 定义mutations，用于更新设置状态
const mutations = {
  // 修改设置
  CHANGE_SETTING: (state, { key, value }) => {
    // 如果state中存在key，则将value赋值给state[key]
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

// 定义actions，用于更新设置状态
const actions = {
  // 改变设置
  changeSetting({ commit }, data) {
    // 提交改变设置的mutation
    commit('CHANGE_SETTING', data)
  }
}

// 导出默认的模块，使用命名空间
export default {
  namespaced: true,
  // 定义状态
  state,
  // 定义mutations
  mutations,
  // 定义actions
  actions
}

