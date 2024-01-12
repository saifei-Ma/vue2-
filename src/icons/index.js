import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 全局注册svg-icon组件
Vue.component('svg-icon', SvgIcon)

// 加载svg文件 (引入目录所有的svg)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
