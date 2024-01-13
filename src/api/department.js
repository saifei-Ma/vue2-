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