<template>
  <div class="container">
    <div class="app-container">
      <!-- data : 绑定数据
          props : 指定数据源中每个元素迭代渲染时使用的属性
          default-expand-all : 是否默认展开所有节点
      -->
      <el-tree default-expand-all :data="depts" :props="defaultProps" :expand-on-click-node="false">
        <!-- 节点结构 -->
        <!-- v-slot 只能作用在template -->
        <template v-slot="{ data }">
          <el-row style="width: 100%;height: 100%;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- $event 实参 : 表示类型 -->
              <el-dropdown @command="operateDept($event,data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon-right"></i>
                </span>
                <!-- 下来菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 编辑子部门的对话框 
          :show-dialog.sync : 实现了子组件的 showDialog 属性与父组件中的 showDialog 变量的双向绑定
    -->
    <add-dept @updateDepartment="getDepartment" ref="addDept" :current-node-id="currentNodeId" :show-dialog.sync="showDialog"  />
  </div>
</template>

<script>
import { getDepartment, deleteDepartment } from '@/api/department';
import { tranListToTreeData } from '@/utils/index';
import AddDept from './components/add-dept.vue';
export default {
  name: 'Department',
  components : {AddDept},
  data() {
    return {
      depts: [{
        name: '欢乐贷公司',
        children: []
      }],
      defineProps: {
        children: 'children',
        name: 'name'
      },
      // 控制弹层的显示与隐藏
      showDialog: false,
      // 存储当前点击的部门id
      currentNodeId: null,
    }
  },
  // 组件创建完成时执行的钩子函数
  created() {
    this.getDepartment();
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment();
      // console.log(result);
      this.depts = tranListToTreeData(result, 0);
    },
    // 操作部门
    operateDept(type,id) {
      // 判断type是否为add
      if (type === 'add') {
        // 显示对话框
        this.showDialog = true;
        
        // 给当前点击的部门id赋值
        this.currentNodeId = id;
        console.log(this.currentNodeId);
      }else if(type === 'edit'){
        // 编辑部门场景
        this.showDialog = true;
        this.currentNodeId = id; // 保存id, 用它来获取数据
        
        // 因为弹出层之后紧接着要调用子组件方法，第一次弹出层时，里面的组件还未完成渲染，所以要等到showDialog这个属性设置的数据完成渲染之后才进行调用
        // 利用$nextTick方法，在DOM更新循环之后执行延迟回调
        this.$nextTick(() => {
          // 更新props- 异步动作
          // 直接调用了子组件的方法 同步的方法
          // 要在子组件获取数据
          // 父组件调用子组件的方法来获取数据
          this.$refs.addDept.getDepartmentDetail();
        })
      }else if(type === 'del'){
        this.$confirm('确定删除该部门吗？').then(async () => {
          // 调用删除的API
          await deleteDepartment(id);
          // 删除成功的提示信息
          this.$message.success('删除成功');
          // 重新拉取数据
          this.getDepartment();
        })
      }
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
  margin-right: 40px;
}
</style>
