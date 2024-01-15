// 员工管理 -- 相关接口

import request from '@/utils/request';
/**
* @author: 马赛飞
* @Description: 获取员工数据的API接口
* @param: 
*/
export function getEmployeeList(params) {
  return request({
    url : '/sys/user',
    params // 地址参数 查询参数
  })
}