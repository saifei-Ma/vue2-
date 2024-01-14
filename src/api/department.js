// 组织架构 -- 相关接口

import request from '@/utils/request';
/**
* @author: 马赛飞
* @Description: 获取组织架构的API接口
* @param: 
*/
export function getDepartment(){
  return request({
    url : '/company/department'
  })
}
/**
* @author: 马赛飞
* @Description: 获取部门负责人的API接口
* @param: 
*/
export function getManagerList(){
  return request({
    url : '/sys/user/simple'
  })
}
/**
* @author: 马赛飞
* @Description: 新增部门的API接口
* @param: 
*/
export function addDepartment(data){
  return request({
    method : 'POST',
    url : '/company/department',
    data
  })
}
/**
* @author: 马赛飞
* @Description: 获取部门详情的API接口
* @param: 
*/
export const getDepartmentDetail = (id) => {
  return request({
    url : '/company/department/' + id
  })
}
/**
* @author: 马赛飞
* @Description: 更新部门详情数据的API接口
* @param: 
*/
export const updateDepartment = (data) => {
  return request({
    method : 'PUT',
    url : '/company/department/' + data.id,
    data
  })
}
/**
* @author: 马赛飞
* @Description: 删除部门的API接口
* @param: 
*/
export const deleteDepartment = (id) => {
  return request({
    method : 'DELETE',
    url : '/company/department/' + id
  })
}