<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <!-- 搜索框 -->
        <el-input style="margin-bottom: 10px;" type="text" prefix-icon="el-icon-search" size="small"
          placeholder="输入员工姓名全员搜索"></el-input>
        <!-- 树形组件 -->
        <!--  :props="defaultProps"：这是定义节点属性的配置项
              default-expand-all：表示默认展开所有的节点
              :expand-on-click-node="false"：表示点击节点时不自动展开或收缩
              highlight-current：表示高亮当前节点
        -->
        <el-tree
          ref="deptTree"
          node-key="id"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          @current-change="selectNode"
        >
        <!-- 需要给定node-key属性，否则setCurrentKey方法不知道设置的是哪个字段的值 -->
        </el-tree>
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="center">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>
<script>
import { getDepartment } from '@/api/department';
import { tranListToTreeData } from '@/utils/index';
export default {
  name: 'Employee',
  data() {
    return {
      // 部门列表
      depts : [
      ],
      // 默认属性
      defaultProps: {
        // 标签
        label: 'name',
        // 子节点
        children: 'children'
      },
      // 存储查询参数
      queryParams: {
        departmentId : null
      }
    }
  },
  created(){
    this.getDepartment1();
  },
  methods: {
    async getDepartment1() {
      // 递归的方法, 将列表转化成树形
      let result = await getDepartment();
      // console.log(tranListToTreeData(result, 0));
      this.depts = tranListToTreeData(result, 0)
      // 初始化之前将第一个设置为高亮
      this.queryParams.departmentId = this.depts[0].id;
      // 树组件渲染是异步的, 等到更新完毕, 需要使用nextTick
      this.$nextTick(() => {
        // 当组件加载完成之后，设置当前的key为查询参数中的部门id
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId);
      })
    },
    selectNode(node) {
      // 设置查询参数中的部门id为当前节点id
      this.queryParams.departmentId = node.id;
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
