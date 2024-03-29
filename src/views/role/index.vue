<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- 放置 table 组件 -->
      <el-table :data="list">
        <!-- 放置列 -->
        <el-table-column prop="name" align="center" width="200" label="角色">
          <template v-slot="{ row }">
            <!-- 条件判断 -->
            <el-input v-if="row.isEdit" size="mini" v-model="row.editRow.name"></el-input>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200" label="启用">
          <!-- 自定义列结构 -->
          <template v-slot="{ row }">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-color="0" :active-value="1"></el-switch>
            <span v-else>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" type="textarea" v-model="row.editRow.description"></el-input>
            <span v-else>{{  row.description  }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作">
          <!-- 放置操作按钮 -->
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <!-- 编辑模式 -->
              <el-button size="mini" type="primary" @click="btnEditOK(row)">确认</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
            <!-- 非编辑模式 -->
              <el-button type="text" size="mini">分配权限</el-button>
              <el-button type="text" size="mini" @click="btnEditRow(row)">编辑</el-button>
              <!-- 在删除的时候,弹出气泡框 -->
              <el-popconfirm title="确定要删除吗？" @onConfirm="confirmDel(row.id)">
                <el-button type="text" size="mini" slot="reference" style="margin-left: 10px;">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" style="height: 60px;" align="middle" justify="end">
        <!-- 放置分页组件 -->
        <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" @current-change="changePage"
          :total="pageParams.total" layout="prev ,pager, next"></el-pagination>
      </el-row>
    </div>
    <!-- 弹层内容 -->
    <el-dialog title="新增角色" :visible.sync="showDialog" @close="btnCancel" width="500">
      <!-- 表单内容 -->
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width: 300px;" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="启用">
          <!-- 如果不需要校验--就不需要prop属性 -->
          <el-switch size="mini"></el-switch>
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width: 300px;" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOk">确认</el-button>
              <el-button size="mini">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addRole, getRoleList, updateRole, delRole } from '@/api/role';
export default {
  name: 'Role',
  data() {
    return {
      list: [], // 角色列表
      pageParams: {
        page: 1, // 当前页
        pagesize: 5, // 每页条数
        total: 0 // 总条数
      },
      showDialog: false, // 控制弹层显示
      roleForm: { // 表单数据
        name: '', // 角色名称
        description: '', // 角色描述
        state: 0, // 默认未启用 关闭 0 打开1
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams);
      this.list = rows; // 赋值数据
      // console.log(rows);
      this.pageParams.total = total; // 初始化时 : 赋值总条数
      // console.log(total);
      this.list.forEach(item => {
        // item.isEdit = false // 添加一个属性 初始值为false
        // 数据响应式的问题  数据变化 视图更新
        // 添加的动态属性 不具备响应式特点
        // this.$set(目标对象, 属性名称, 初始值) 可以针对目标对象 添加的属性 添加响应式
        this.$set(item, 'isEdit', false);
        // 初始化时缓存数据
        this.$set(item, 'editRow',{
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    changePage(newPage) {
      this.pageParams.page = newPage; // 赋值当前页
      console.log(newPage);
      this.getRoleList(); // 重新调用获取数据的方法
    },
    // 弹层点击确认按钮的回调
    btnOk() {
      // 验证表单是否有效
      this.$refs.roleForm.validate(async isOK => {
        // 如果表单有效
        if (isOK) {
          // 添加角色
          await addRole(this.roleForm)
          // 提示添加角色成功
          this.$message.success('添加角色成功')
          // 获取角色列表
          this.getRoleList()
          // 取消按钮
          this.btnCancel()
        }
      })
    },
    // 弹层点击取消按钮的回调
    btnCancel(){
      // 重置表单
      this.$refs.roleForm.resetFields();
      // 关闭弹窗
      this.showDialog = false;
    },
    // 点击编辑行的回调
    btnEditRow(row){
      row.isEdit = true // 改变行的编辑状态
      // 更新状态数据
      row.editRow.name = row.name
      row.editRow.description = row.description
      row.editRow.state = row.state
    },
    // 行内编辑--点击确认按钮的回调
    async btnEditOK(row){
      if (row.editRow.name && row.editRow.description) {
        // 下一步操作
        await updateRole({ ...row.editRow, id: row.id });
        // 更新操作
        this.$message.success('更新角色成功!');
        // 更新显示数据, 退出编辑模式
        // row.name = row.editRow.name // eslint的一校验 误判
        // Object.assign(target, source)
        Object.assign(row, {
          ...row.editRow,
          isEdit: false // 退出编辑模式
        }) // 避免eslint的误判
      } else {
        this.$message.warning('角色名和描述不能为空!');
      }
    },
    // 删除气泡框的回调函数
   async confirmDel(id){
      // 调用删除角色函数
      await delRole(id);
      // 提示删除角色成功
      this.$message.success('删除角色成功!');
      // 如果删除的是最后一个 (页数就减一)
      if (this.list.length === 1) this.pageParams.page--;
      // 重新获取角色列表
      this.getRoleList();}
  },
  created() {
    this.getRoleList();
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
