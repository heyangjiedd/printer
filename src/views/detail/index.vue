<template>
  <div
    style="display: flex;justify-content: center;align-items: center;flex-direction: column;"
  >
    <Detail id="printTest"></Detail>
    <div class="btn">
      <a-row>
        <a-button
          :style="{ marginLeft: '8px', float: 'right' }"
          type="primary"
          v-print="'printTest'"
        >
          打印
        </a-button>
        <a-button
          :style="{ marginLeft: '8px', float: 'right' }"
          @click="handleGoBack"
        >
          返回
        </a-button>
      </a-row>
    </div>
  </div>
</template>

<script>
import Detail from "./detail";
export default {
  name: "index",
  components: {
    Detail: Detail,
  },
  methods: {
    handleGoBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.ahh {
  font-size: 40px;
  height: 100px;
}
.btn {
  width: 794px;
  margin-bottom: 40px;
}
</style>
