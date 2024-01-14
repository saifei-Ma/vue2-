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