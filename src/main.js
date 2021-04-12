import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import Print from "./utils/print/index";
import {
  Button,
  Card,
  Form,
  Input,
  Icon,
  Table,
  Divider,
  Row,
  Col,
  InputNumber,
} from "ant-design-vue";
const { Item: FormItem } = Form;
const { TextArea } = Input;
Vue.config.productionTip = false;
Vue.component(Button.name, Button);
Vue.component(Card.name, Card);
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(Icon.name, Icon);
Vue.component(Table.name, Table);
Vue.component(FormItem.name, FormItem);
Vue.component(Divider.name, Divider);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(TextArea.name, TextArea);
Vue.component(InputNumber.name, InputNumber);
Vue.use(Print);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
