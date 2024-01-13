<template>
  <!-- :visible：对话框的可见性，通过绑定变量 showDialog 来控制
        @close：对话框关闭时触发的事件，这里绑定了一个方法 close
        title：对话框的标题，这里设置为 "新增部门"
  -->
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <el-form label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%;" size="mini"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%;" size="mini"></el-input>
      </el-form-item>
      <el-form-item prop="mangerId" label="部门负责人">
        <el-select v-model="formData.mangerId" placeholder="请选择负责人" style="width: 80%;" size="mini">
          <!-- 下拉选项--遍历managerList数组 label : 显示的字段  value : 存储字段 -->
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" placeholder="1-100个字符" style="width: 80%;" size="mini" type="textarea"
          :rows="4"></el-input>
      </el-form-item>
      <el-item-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini">确认</el-button>
            <el-button size="mini">取消</el-button>
          </el-col>
        </el-row>
      </el-item-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment,getManagerList } from '@/api/department'
export default {
  name: 'AddDept',
  // 声明一个props属性，用于接收父组件传入的showDialog属性
  props: {
    showDialog: {
      // 声明showDialog属性的类型为Boolean
      type: Boolean,
      // 声明showDialog属性的默认值为false
      default: false
    },

  },
  data() {
    return {
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        mangerId: '', // 部门管理者id
        name: '', // 部门名称
        pid: '', // 父部门id
      },
      rules: {
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码2-10个字符', trigger: 'blur' },
          {
            trigger : 'blur',
            // 自定义校验规则
            validator: async(rule, value, callback) => {
              // value : 输入编码
              let result = await getDepartment();
              // result数组中是否存在 value 值
              if(result.some(item => item.code === value)){
                callback(new Error('部门编码已存在'))
              }else{
                callback()
              }
            }
          }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍1-100个字符', trigger: 'blur' }
        ],
        mangerId: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称2-10个字符', trigger: 'blur' },
          {
            trigger : 'blur',
            // 自定义校验规则
            validator: async(rule, value, callback) => {
              // value : 输入的部门名称
              let result = await getDepartment();
              // 判断result数组中是否存在 value 值
              if(result.some(item => item.name === value)){
                callback(new Error('部门名称已存在'))
              }else {
                callback()
              }
            }
          }
        ],
        // pid: '' // 父级部门的id 不需要做校验
      },
      managerList : [], // 部门负责人列表
    }
  },
  // 声明一个methods属性，用于定义关闭弹窗的方法
  methods: {
    // 关闭弹窗调用的方法
    close() {
      // 调用父组件传入的emit方法，传入参数，将showDialog属性值设置为false
      this.$emit('update:showDialog', false)
    },
    /**
    * @author: 马赛飞
    * @Description: 获取部门负责人列表的功能函数
    * @param: 
    */
    async getManagerList() {
      this.managerList = await getManagerList();
      // console.log(this.managerList);
    }
  },
  created(){
    // 调用获取部门负责人列表的方法
    this.getManagerList();
  }
}
</script>

<style scoped></style>