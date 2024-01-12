// 路由导航守卫 文件

import router from './router'
// 导入store
import store from './store'
// 导入element-ui的Message
import { Message } from 'element-ui'
// 导入nprogress
import NProgress from 'nprogress' 
// 导入nprogress的css样式
import 'nprogress/nprogress.css' 
// 导入获取token的函数
import { getToken } from '@/utils/auth' 
// 导入获取页面标题的函数
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) 

// 设置白名单，哪些路由可以不显示进度条
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 获取token
  const hasToken = getToken()
  // 如果有token
  if (hasToken) {
    // 如果访问的是登录页面
    if (to.path === '/login') {
      // 重定向到根路由
      next({ path: '/' })
      // 结束进度条
      NProgress.done()
    } else {
      // 获取用户信息
      const hasGetUserInfo = store.getters.name
      // 如果有用户信息
      if (hasGetUserInfo) {
        // 继续执行
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')
          // 继续执行
          next()
        } catch (error) {
          // 重置token
          await store.dispatch('user/resetToken')
          // 提示错误信息
          Message.error(error || 'Has Error')
          // 重定向到登录页面
          next(`/login?redirect=${to.path}`)
          // 结束进度条
          NProgress.done()
        }
      }
    }
 } else {
    // 判断是否在白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单中，则直接进入
      next()
    } else {
      // 不在白名单中，则跳转到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 每次路由变化后调用NProgress.done()方法，使进度条结束
router.afterEach(() => {
  NProgress.done()
})
