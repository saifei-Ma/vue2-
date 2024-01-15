// 角色管理 -- 相关接口

import request from '@/utils/request';
/**
* @author: 马赛飞
* @Description: 获取角色列表数据的API接口
* @param: 
*/
export function getRoleList(params) {
  return request({
    url : '/sys/role',
    params // 查询参数
  })
}
/**
* @author: 马赛飞
* @Description: 新增角色的API接口
* @param: 
*/
export function addRole(data) {
  return request({
    url : '/sys/role',
    method : 'post',
    data // 新增的数据对象
  })
}
/**
* @author: 马赛飞
* @Description: 更新角色信息的API接口
* @param: 
*/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}