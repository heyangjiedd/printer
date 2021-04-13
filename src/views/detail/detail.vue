<template>
  <div class="index">
    <div class="container">
      <div class="title">成都天成恒洋装饰工程有限公司</div>
      <div class="name">送货单</div>
      <div class="box">
        <div class="span3">
          <span class="w100">客户名称</span>
          <span class="mg-10">:</span>
          <span class="flw">{{ title.customerName }}</span>
        </div>
        <div class="span3">
          <span class="w100">客户地址</span>
          <span class="mg-10">:</span>
          <span class="flw">{{ title.customerAddr }}</span>
        </div>
        <div class="span3">
          <span class="w100">联系电话</span>
          <span class="mg-10">:</span>
          <span class="flw">{{ title.phone }}</span>
        </div>
      </div>
      <div class="box">
        <div class="span3">
          <span class="w100">订单号</span>
          <span class="mg-10">:</span>
          <span class="flw">{{ title.orderNo }}</span>
        </div>
        <div class="span3">
          <span class="w100">送货日期</span>
          <span class="mg-10">:</span>
          <span class="flw">{{ title.date }}</span>
        </div>
        <div class="span3">
          <span class="w100">备注</span>
          <span class="mg-10">:</span>
          <span class="flw">{{ title.remark }}</span>
        </div>
      </div>
      <table class="table-list">
        <tr>
          <th class="w15">序号</th>
          <th class="w15">产品名称</th>
          <th class="w15">型号(规格)</th>
          <th class="w10">单位</th>
          <th class="w10">数量</th>
          <th class="w10">单价</th>
          <th class="w10">金额(元)</th>
          <th class="w15">备注</th>
        </tr>
        <tr v-for="(item, index) in data" :key="index" class="center">
          <td>{{ item.order }}</td>
          <td>{{ item.product }}</td>
          <td>{{ item.specifications }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.number }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.remark }}</td>
        </tr>
        <tr>
          <td colspan="5">合计金额大写（人民币）：{{ totalNumCN }}</td>
          <td>小写：</td>
          <td colspan="2">{{ totalNum }}</td>
        </tr>
      </table>

      <div class="box">
        <div class="span2">
          <span class="w100">账户名称</span>
          <span class="mg-10">:</span>
          <span class="flw">成都天成恒洋装饰工程有限公司</span>
        </div>
        <div class="span2">
          <span class="w100">账户号码</span>
          <span class="mg-10">:</span>
          <span class="flw">11373000000094431</span>
        </div>
      </div>
      <div class="box">
        <div class="span2">
          <span class="w100">开户银行</span>
          <span class="mg-10">:</span>
          <span class="flw">华夏银行股份有限公司成都龙泉驿支行</span>
        </div>
        <div class="span2">
          <span class="w100">纳税码</span>
          <span class="mg-10">:</span>
          <span class="flw">91510112MA6AB17W6G</span>
        </div>
      </div>
      <div class="box">
        <div class="span1">
          <span class="w100">公司地址</span>
          <span class="mg-10">:</span>
          <span class="flw"
            >四川省成都市龙泉驿区龙泉街道驿都中路331号B区3栋86-88号</span
          >
        </div>
      </div>
      <div class="box">
        <div class="span1">
          <span class="w100">联系方式</span>
          <span class="mg-10">:</span>
          <span class="flw">13258222105 13880674998（微信同号）</span>
        </div>
      </div>
      <div class="box">
        <div class="span3">
          <span class="w100">制表人</span>
          <span class="mg-10">:</span>
          <span class="flw">管理员</span>
        </div>
        <div class="span3">
          <span class="w100">送货人</span>
          <span class="mg-10">:</span>
          <span class="flw">{{ title.deliverer }}</span>
        </div>
        <div class="span3">
          <span class="w100">客户签字</span>
          <span class="mg-10">:</span>
          <span class="flw">{{ title.sign }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      title: {},
      data: [],
      totalNum: "",
      totalNumCN: "",
    };
  },
  methods: {
    handleGoBack() {
      this.$router.go(-1);
    },
    handlePrint() {
      window.print();
    },
  },
  activated() {
    const { title = {}, data = [], totalNum, totalNumCN } =
      JSON.parse(sessionStorage.getItem("data")) || {};
    this.title = title;
    this.data = data;
    this.totalNum = totalNum;
    this.totalNumCN = totalNumCN;
  },
};
</script>
<style scoped lang="less">
.index {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  color: black;
  font-weight: bold;
  .btn {
    width: 770px;
    box-sizing: border-box;
    margin-bottom: 40px;
  }
  .container {
    width: 794px;
    padding: 10px;
  }
  .title {
    font-size: 32px;
    line-height: 48px;
    text-align: center;
  }
  .name {
    font-size: 28px;
    line-height: 48px;
    text-align: center;
    margin-bottom: 20px;
  }
  .box {
    display: flex;
    .span3,
    .span2,
    .span1 {
      display: flex;
      width: 33.33%;
      .w100 {
        flex: 0 0 auto;
        width: 60px;
        display: inline-block;
        text-align: justify;
        &::after {
          content: "";
          display: inline-block;
          width: 100%;
        }
      }
      .mg-10 {
        margin-right: 10px;
      }
      .flw {
        word-wrap: break-word;
      }
    }
    .span2 {
      width: 50%;
    }
    .span1 {
      width: 100%;
    }
  }
  .table-list {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;
    border-left: 2px solid black;
    border-top: 2px solid black;
    .center {
      td {
        text-align: center;
      }
    }
    tr {
      th {
        padding: 10px;
        text-align: center;
        font-weight: bold;
        border-right: 2px solid black;
        border-bottom: 2px solid black;
      }
      .w10 {
        width: 10%;
      }
      .w15 {
        width: 15%;
      }
      td {
        padding: 10px;
        border-right: 2px solid black;
        border-bottom: 2px solid black;
      }
    }
  }
}
</style>
