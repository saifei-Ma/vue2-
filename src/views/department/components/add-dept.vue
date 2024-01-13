<template>
  <!-- :visible：对话框的可见性，通过绑定变量 showDialog 来控制
        @close：对话框关闭时触发的事件，这里绑定了一个方法 close
        title：对话框的标题，这里设置为 "新增部门"
  -->
  <el-dialog title="新增部门" :visible="showDialog" @close="close">

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