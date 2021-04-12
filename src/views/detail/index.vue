<template>
  <div
    style="display: flex;justify-content: center;align-items: center;flex-direction: column;"
  >
    <Detail id="printTest"></Detail>
    <div class="btn" v-show="show">
      <a-row>
        <a-button
          :style="{ marginLeft: '8px', float: 'right' }"
          type="primary"
          @click="handlePrint"
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
  data() {
    return {
      show: true,
    };
  },
  components: {
    Detail: Detail,
  },
  methods: {
    handlePrint() {
      this.show = false;
      this.$nextTick(() => {
        window.print();
        this.show = true;
      });
    },
    handleGoBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.btn {
  width: 794px;
  margin-bottom: 40px;
}
</style>
