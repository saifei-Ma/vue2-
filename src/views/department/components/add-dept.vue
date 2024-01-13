<template>
  <!-- :visible：对话框的可见性，通过绑定变量 showDialog 来控制
        @close：对话框关闭时触发的事件，这里绑定了一个方法 close
        title：对话框的标题，这里设置为 "新增部门"
  -->
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <el-form label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input placeholder="2-10个字符" style="width: 80%;" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input placeholder="2-10个字符" style="width: 80%;" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select placeholder="请选择负责人" style="width: 80%;" size="mini"></el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input placeholder="1-100个字符" style="width: 80%;" size="mini" type="textarea" :rows="4" ></el-input>
      </el-form-item>
      <el-item-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
          <el-button type="primary" size="mini">确认</el-button>
          <el-button size="mini"></el-button>
        </el-col>
        </el-row>
      </el-item-item>
    </el-form>
  </el-dialog>
</template>

<script>
 export default {
    name:'AddDept',
    // 声明一个props属性，用于接收父组件传入的showDialog属性
    props:{
      showDialog:{
        // 声明showDialog属性的类型为Boolean
        type:Boolean,
        // 声明showDialog属性的默认值为false
        default:false
      }
    },
    // 声明一个methods属性，用于定义关闭弹窗的方法
    methods : {
      close(){
        // 调用父组件传入的emit方法，传入参数，将showDialog属性值设置为false
        this.$emit('update:showDialog',false)
      }
    }
  }
</script>

<style scoped>
  
</style>