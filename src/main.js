// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $utils from './utils/utils'
let ABI = [
    'function approve(address, uint256) view returns (boolean)',
    'function queryPools() view public returns(address[], tuple(uint256,uint256,uint256,uint256)[])',
    'function queryShares(address) public view returns (uint totalShares, uint shares, uint balances)',
    'function addLiquidity(address token, uint amount) payable',
    'function removeLiquidity(address token, uint shares) public',
    'function luckyOrder(address token, uint multiplier, uint orderAmount) public payable',
    'function decimals() public view returns (uint8)'
]
let queryAddress = '0x426a0641fA825a9bC12946c8A2c9F0F086a71fEe'
Vue.prototype.ABI = ABI
Vue.prototype.queryAddress = queryAddress
Vue.prototype.$utils = $utils
Vue.use(ElementUI);
Vue.config["productionTip"] = false
import '@/styles/index.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
