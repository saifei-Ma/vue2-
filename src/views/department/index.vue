<template>
  <div class="container">
    <div class="app-container">
      <!-- data : 绑定数据
          props : 指定数据源中每个元素迭代渲染时使用的属性
          default-expand-all : 是否默认展开所有节点
      -->
      <el-tree default-expand-all :data="depts" :props="defaultProps"></el-tree>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Department',
  data(){
    return {
      depts : [{
        name: '欢乐贷公司',
        children: [
          { name : '技术部' },
          { name : '市场部' },
          { name : '财务部' },
          { name : '总经办' }
        ]
      }],
      defineProps : {
        children : 'children',
        name : 'name'
      }
    }
  }
}
</script>
