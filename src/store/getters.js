
// 进行状态管理 通过getters建立对于模块中属性的快捷访问
const getters = {
  // 获取侧边栏状态
  sidebar: state => state.app.sidebar,
  // 获取设备状态
  device: state => state.app.device,
  // 获取token
  token: state => state.user.token,
  // 获取头像
  avatar: state => state.user.avatar,
  // 获取用户名
  name: state => state.user.name
}
export default getters
