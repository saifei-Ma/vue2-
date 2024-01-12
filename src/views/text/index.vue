<template>
  <el-time-select
    v-model="value"
    size="normal"
    placeholder=""
    :picker-options="{
      start: '0:00',
      step: '00:30',
      end: '0:30',
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