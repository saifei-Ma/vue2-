<template>
  <el-time-select
    v-model="value"
    size="normal"
    placeholder=""
    :picker-options="{
      start: '8:30',
      step: '00:30',
      end: '18:30',
    }"
    change=""
  >
  </el-time-select>
</template>

<script>
export default {
  name: "form",
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style scoped></style>
