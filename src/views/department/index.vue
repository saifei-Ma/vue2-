<template>
  <div class="container">
    <div class="app-container">
      <!-- data : 绑定数据
          props : 指定数据源中每个元素迭代渲染时使用的属性
          default-expand-all : 是否默认展开所有节点
      -->
      <el-tree default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
          <!-- v-slot 只能作用在template -->
        <template v-slot="{ data }">
          <el-row style="width: 100%;height: 100%;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manage">{{ data.managerName }}</span>
              <!-- $event 实参 : 表示类型 -->
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon-right"></i>
                </span>
                <!-- 下来菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item class="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item class="del">删除部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department';
export default {
  name: 'Department',
  data(){
    return {
      depts : [{
        name: '欢乐贷公司',
        children: []
      }],
      defineProps : {
        children : 'children',
        name : 'name'
      }
    }
  },
  // 组件创建完成时执行的钩子函数
  created(){
    this.getDepartment();
  },
  methods: {
    async getDepartment(){
      const result = await getDepartment();
      console.log(result);
      this.depts = result;
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 10px;
}
</style>
