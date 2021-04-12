<template>
  <div class="index">
    <div class="title">成都天成恒洋装饰工程有限公司</div>
    <div class="name">送货单</div>
    <a-form :form="form" class="search-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="客户名称" v-bind="formItemLayout">
            <a-input placeholder="输入客户名称" v-model="title.customerName" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="客户地址" v-bind="formItemLayout">
            <a-input placeholder="输入客户地址" v-model="title.customerAddr" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="联系电话" v-bind="formItemLayout">
            <a-input placeholder="输入联系电话" v-model="title.phone" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="订单号" v-bind="formItemLayout">
            <a-input placeholder="输入订单号" v-model="title.orderNo" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="送货日期" v-bind="formItemLayout">
            <a-input placeholder="输入送货日期" v-model="title.date" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="备注" v-bind="formItemLayout">
            <a-input placeholder="输入备注" v-model="title.remark" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="data"
        bordered
        :pagination="false"
      >
        <template
          v-for="col in [
            'order',
            'product',
            'specifications',
            'unit',
            'number',
            'price',
            'amount',
            'remark',
          ]"
          :slot="col"
          slot-scope="text, record, index"
        >
          <div :key="`${index}-${col}`">
            <a-input-number
              v-if="col === 'number' || col === 'price'"
              style="margin: -2px 0"
              :value="text"
              :min="0"
              @change="(e) => handleChange(e, record.key, col)"
            />
            <a-input-number
              v-else-if="col === 'amount'"
              style="margin: -2px 0"
              :value="text"
              disabled
            />
            <a-textarea
              v-else
              style="margin: -2px 0"
              :value="text"
              :autoSize="{ minRows: 1, maxRows: 6 }"
              @change="(e) => handleChange(e.target.value, record.key, col)"
            />
          </div>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <div>
            <span>
              <a @click="() => add()" v-if="index === data.length - 1">增加</a>
              <a-divider
                type="vertical"
                v-if="index === data.length - 1 && data.length !== 1"
              ></a-divider>
              <a @click="() => remove(index)" v-if="data.length !== 1">删除</a>
            </span>
          </div>
        </template>
      </a-table>
      <div class="total">
        <div class="capitalization">
          合计金额大写（人民币）：{{ this.totalNumCN }}
        </div>
        <div class="lowercaseTitle">小写：{{ totalNum }}</div>
        <div class="lowercaseTotal"></div>
      </div>
      <a-row :gutter="24" style="margin-top:20px">
        <a-col :span="12">
          <a-form-item label="账户名称" v-bind="formItemLayout1">
            <!-- <a-input placeholder="输入账户名称" v-model="title.accountName" /> -->
            成都天成恒洋装饰工程有限公司
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="账户号码" v-bind="formItemLayout1">
            <!-- <a-input placeholder="输入账户号码" v-model="title.accountNo" /> -->
            11373000000094431
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="开户银行" v-bind="formItemLayout1">
            <!-- <a-input placeholder="输入开户银行" v-model="title.bank" /> -->
            华夏银行股份有限公司成都龙泉驿支行
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="纳税码" v-bind="formItemLayout1">
            <!-- <a-input placeholder="输入纳税码" v-model="title.taxesNo" /> -->
            915110112MA6AB17W6G
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="公司地址" v-bind="formItemLayout2">
            <!-- <a-input placeholder="输入公司地址" v-model="title.companyAddr" /> -->
            四川省成都市龙泉驿区龙泉街道驿都中路331号B区3栋86-88号
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="联系方式" v-bind="formItemLayout2">
            <!-- <a-input placeholder="输入联系方式" v-model="title.linkPhone" /> -->
            13258222105 13880674998（微信同号）
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="制表人" v-bind="formItemLayout">
            <!-- <a-input placeholder="输入制表人" v-model="title.tablePerson" /> -->
            管理员
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="送货人" v-bind="formItemLayout">
            <a-input placeholder="输入送货人" v-model="title.deliverer" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="客户签字" v-bind="formItemLayout">
            <a-input placeholder="输入客户签字" v-model="title.sign" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-button
          :style="{ marginLeft: '8px', float: 'right' }"
          type="primary"
          @click="handleGo"
        >
          打印预览
        </a-button>
        <a-button
          :style="{ marginLeft: '8px', float: 'right' }"
          @click="handleEmpty"
        >
          清空
        </a-button>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import ToString from "../../utils/index";
const columns = [
  {
    title: "序号",
    dataIndex: "order",
    width: "10%",
    scopedSlots: { customRender: "order" },
  },
  {
    title: "产品名称",
    dataIndex: "product",
    width: "15%",
    scopedSlots: { customRender: "product" },
  },
  {
    title: "型号(规格)",
    dataIndex: "specifications",
    width: "10%",
    scopedSlots: { customRender: "specifications" },
  },
  {
    title: "单位",
    dataIndex: "unit",
    width: "10%",
    scopedSlots: { customRender: "unit" },
  },
  {
    title: "数量",
    dataIndex: "number",
    width: "10%",
    scopedSlots: { customRender: "number" },
  },
  {
    title: "单价",
    dataIndex: "price",
    width: "10%",
    scopedSlots: { customRender: "price" },
  },
  {
    title: "金额(元)",
    dataIndex: "amount",
    width: "10%",
    scopedSlots: { customRender: "amount" },
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: "15%",
    scopedSlots: { customRender: "remark" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "10%",
    scopedSlots: { customRender: "operation" },
  },
];

const dataInit = {
  key: 0,
  order: "",
  product: "",
  specifications: "",
  unit: "",
  number: "",
  price: "",
  amount: "",
  remark: "",
};
export default {
  name: "index",
  data() {
    return {
      formItemLayout: {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 18,
        },
      },
      formItemLayout1: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        },
      },
      formItemLayout2: {
        labelCol: {
          span: 2,
        },
        wrapperCol: {
          span: 22,
        },
      },
      form: this.$form.createForm(this, { name: "advanced_search" }),
      title: {},
      data: [{ ...dataInit }],
      totalNum: "",
      columns,
    };
  },
  computed: {
    titleList() {
      return Object.keys(this.title);
    },
    totalNumCN() {
      return ToString(this.totalNum);
    },
  },
  methods: {
    handleEmpty() {
      this.title = {};
      this.data = [{ ...dataInit }];
    },
    handleGo() {
      const { title, data } = this;
      sessionStorage.setItem(
        "data",
        JSON.stringify({
          title,
          totalNum: this.totalNum,
          totalNumCN: this.totalNumCN,
          data,
        })
      );
      this.$router.push("/detail");
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        newData.forEach((item) => {
          item.amount = Number((item.number * item.price).toFixed(2));
        });
        const totalNum = newData.reduce((total, item) => {
          return total + item.amount;
        }, 0);
        this.totalNum = Number(totalNum.toFixed(2));
        this.data = newData;
      }
    },
    add() {
      this.data.push({
        ...dataInit,
        key: this.data[this.data.length - 1].key + 1,
      });
    },
    remove(index) {
      this.data.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="less">
.index {
  padding: 10px;
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
  .search-form {
    padding: 24px;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    margin-bottom: 20px;
  }
  .total {
    display: flex;
    border: 1px solid #e8e8e8;
    border-top: none;
    .capitalization {
      width: 55%;
      padding: 16px;
    }
    .lowercaseTitle {
      border-left: 1px solid #e8e8e8;
      width: 10%;
      padding: 16px;
    }
    .lowercaseTotal {
      border-left: 1px solid #e8e8e8;
      width: 30%;
      padding: 16px;
    }
  }
}
</style>
