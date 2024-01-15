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
        <el-table :data="list">
          <el-table-column prop="staffPhoto" align="center" label="头像">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30"></el-avatar>
              <span v-else class="username">{{ row.username?.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="手机号" sortable></el-table-column>
          <el-table-column prop="workNumber" label="工号" sortable></el-table-column>
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row }">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门"></el-table-column>
          <el-table-column prop="timeOfEntry" label="入职时间" sortable></el-table-column>
          <el-table-column label="操作" width="200px">
            <template>
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px" align="center" type="flex" justify="end">
          <el-pagination
            layout="total, prev, pager, next"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { getDepartment } from '@/api/department';
import { tranListToTreeData } from '@/utils/index';
import { getEmployeeList } from '@/api/employee';
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
      },
      list: [], // 存放员工数据
      queryParams: {
        departmentId :null,
        page: 1,
        pageSize: 10, // 记录员工的总数
      },
      total: 0, // 记录员工的总数
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
      // 重新获取员工列表
      this.getEmployeeList();
    },
    async getEmployeeList(){
      const { rows, total } = await getEmployeeList(this.queryParams);
      this.list = rows;
      this.total = total;
      // console.log(this.list);
    },
    selectNode(node) {
      // 设置查询参数中的部门id为当前节点id
      this.queryParams.departmentId = node.id;
      // 设置为第一页
      this.queryParams.page = 1;
      // 重新获取员工列表
      this.getEmployeeList();
    },
    // 点击切换页码的回调
    changePage(newPage){
      this.queryParams.page = newPage // 赋值新页码
      this.getEmployeeList(); // 重新获取员工列表
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
