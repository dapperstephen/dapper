<template>
    <div class="home-wrapper">
        <div class="header">
            <div @click="$router.back(-1)" class="navigation">
                <img src="../../assets/ico03.png" alt="">
                <span>Lucky lottery</span>
            </div>
        </div>
        <div class="main">
            <ul class="tab-tilte">
                <li @click="check(0)" :class="[cur == 0 ? 'active' : '']">
                    <i class="ico ico01">
                        <img src="../../assets/ico01.png" alt="">
                    </i>
                    <span>All</span>
                </li>
                <li @click="check(1)" :class="[cur == 1 ? 'active' : '']">
                    <i class="ico ico02">
                        <img src="../../assets/ico02.png" alt="">
                    </i>
                    <span>Buy</span>
                </li>
                <li @click="check(2)" :class="[cur == 2 ? 'active' : '']">
                    <i class="ico ico03">
                        <img src="../../assets/ico03.png" alt="">
                    </i>
                    <span>Pool</span>
                </li>
                <li @click="check(3)" :class="[cur == 3 ? 'active' : '']">
                    <i class="ico ico04">
                        <img src="../../assets/ico04.png" alt="">
                    </i>
                    <span>FAQ</span>
                </li>
                <!-- <li @click="check(4)" :class="[cur == 4 ? 'active' : '']">
                    <i class="ico ico05">
                        <img src="../../assets/ico05.png" style="position: relative;top: -2px;" alt="">
                    </i>
                    <span>Exchanges</span>
                </li> -->
            </ul>
            <el-table v-show="cur==0" :data="tableData" class="table-list">
                <el-table-column prop="Name" label="Name">
                    <template #default="scope">
                        <el-image
                            :src=scope.row.img
                            class="image"
                        />
                        <span>{{ scope.row.Name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="totalAmount" label="TotalAmount"></el-table-column>
                <el-table-column v-if="show" prop="status" label="status"></el-table-column>
                <el-table-column prop="Trade" label="Trade" width="150px">
                    <template #default="scope">
                        <el-button @click="buyClick(scope.row)" type="primary" size="small">Buy</el-button>
                        <el-button @click="poolClick(scope.row)" type="success" size="small">Pool</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div v-show="cur==1" class="form-box">
                <el-form ref="form" :model="form" label-width="80px" style="padding: 20px 0">
                    <el-form-item label="Multiplier：">
                        <el-input-number v-model="form.name" size="mini"></el-input-number>
                        <span>(1.05~1000)</span>
                        <p>When the multiplier equals 65, the maximum amount you can buy is 0, and your chance to win is 1.538%.</p>
                    </el-form-item>
                    <el-form-item label="Amount：">
                        <el-input-number v-model="form.name" size="mini"></el-input-number>
                        <span>> 0</span>
                        <p>The fee you paid for this lottery is 0.02{{ query }}. If you win, the reward is 63.70{{ query }}.</p>
                    </el-form-item>
                    <el-button class="btn" type="primary" size="mini">Buy Lottery!</el-button>
                    <el-form-item>
                        <el-select v-model="form.status" placeholder="select" clearable>
                            <el-option label="Lotteries of All Addresses" :value="1"></el-option>
                            <el-option label="Lotteries of My Address" :value="2"></el-option>
                            <el-option label="Lotteries of a Specified Address" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button class="btn" type="primary" size="mini">Show at most 200 records.</el-button>
                    <br>
                    <el-button class="btn" type="primary" icon="el-icon-refresh" size="mini">Buy Lottery!</el-button>
                </el-form>
            </div>

            <div v-show="cur==2" class="form-box">
                <el-form ref="form" :model="form" label-width="20px" style="padding: 20px 0">
                    <el-form-item>
                        <p>
                            Current address:
                        </p>
                        <p>
                            You can deposit {{ query }} into this lottery pool and earn fees. But if lottery buyers win their rewards, you will suffer some loss together with the pool.
                        </p>
                        <p>
                            Now the lottery pool has -- shares and each share equals -- {{ query }} (totally {{ query }}). You have -- shares in the pool (equaling -- {{ query }}).
                        </p>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini">Deposit</el-button>
                        <el-input-number v-model="form.deposit" size="mini"></el-input-number>
                        <span>{{ query }}</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini">Withdraw</el-button>
                        <el-input-number v-model="form.withdraw" size="mini"></el-input-number>
                        <span>{{ query }}</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini">Show My Deposits(+) and Withdraws(-)</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="cur==3" class="form-box">
                <el-form ref="form" :model="form" label-width="20px" style="padding: 20px 0">
                    <el-form-item>
                        <h3>Who's behind Catsluck?</h3>
                        <p>We are supporters of cashcats. People often ask what can we do with {{ query }}? So catsluck was born. You can bet and invest with {{ query }} now, and do more things in the future.</p>
                        <h3>What is CLK?</h3>
                        <p>CLK's address: 0x659F04F36e90143fCaC202D4BC36C699C078fC98</p>
                        <p>CLK is catsluck's exclusive token. CLK does not set a fixed upper limit. Before , users will get 1 free CLK every time he bets 1 {{ query }}. After that, the total amount of CLK does not increase. Till now, totally -- CLK have been minted. Please let your wallet watch CLK.</p>
                        <h3>Does the development team reserve CLK?</h3>
                        <p>Not at all. Absolutely fair distribution.</p>
                        <h3>Where to trade CLK?</h3>
                        <p>CLK/{{ query }} trading pair on benswap.</p>
                        <h3>What is house edge?</h3>
                        <p>The house edge is 2%.</p>
                        <p>1% is allocated to reward pool and another 1% is used to buy back CLK in circulation. Currently, there have been -- {{ query }} accumulated for buyback, which equals about -- CLK. Anyone can send a transaction to buy CLK with these {{ query }} and burn them. Till now, totally -- CLK have been bought back and burnt.</p>
                        <h3>Future plans?</h3>
                        <p>1.Code Audit</p>
                        <p>2.Support other tokens, such as BCH and various stablecoins</p>
                        <p>3.Support DAO</p>
                        <p>4.Add the "bet on any event" function. For example, people can predict what the price of BTC is going to be a month from now? Who will win the next U.S. presidential election? Who won the World Cup final? All CLK holders can act as judges and vote with their CLK.</p>
                        <h3>Is it open source?</h3>
                        <p>Yes. Check it here https://github.com/catsluck/catsluck.</p>
                        <h3>Where can I find help?</h3>
                        <p>Some users set up these channels:</p>
                        <p>https://t.me/catsluck_chinese</p>
                        <p>https://t.me/catsluck_english</p>
                        <p>You can try to ask question there. But the lazy developers are not in them.</p>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>
</template>

<script>
import { ethers } from 'ethers'
export default {
    data () {
        return {
            cur: 0, //默认选中第一个tab
            isBuy: true,
            show: false,
            form: {},
            query: '',
            tableData: [],
        }
    },
    mounted(){
        //查询币种
        this.queryPools()
    },
    methods:{
        async queryPools(){
             let Provider = null
            Provider = new ethers.providers.Web3Provider(window.ethereum)
            let daiContract = new ethers.Contract(this.queryAddress, this.ABI, Provider.getSigner(), {
                estimateGas: 100000
            })
            try {
                const pools = await daiContract.queryPools()
                console.log('币种:', pools)
                for (let index = 0; index < pools.length; index++) {
                    const element = pools[1];
                    console.log(element)
                    element.forEach(e => {
                        this.tableData.push({
                            Name : 'Curve DAO Token  CRV',
                            img: require('../../assets/01.png'),
                            status: false,
                            totalAmount: e[3].toString()
                        })
                    });
                }
                return pools
            } catch (error) {
                console.log(error)
                return 0
            }
        },
        check: function (index) {
            this.cur = index
        },
        buyClick(row){
            this.query = row.Name
            this.cur = 1
        },
        poolClick(row){
            this.query = row.Name
            this.cur = 2
        }
    }
}
</script>
<style scoped>
    .home-wrapper{
        height: 100%;
        width: 100%;
        background-color: #041941;
    }
    .main{
        width: 70%;
        margin: 0 auto;
        padding: 80px 0;
    }
    .tab-tilte {
        width: 700px;
        height: 50px;
        align-items: center;
        flex-direction: row;
        color: #fff;
        cursor: pointer;
        background-color: #01112f;
        border-radius: 20px;
        transition: all .2s ease;
    }
    .tab-tilte li {
        float: left;
        padding: 0 20px ;
        line-height: 50px;
        height: 100%;
        text-align: center;
        cursor: pointer;
        border-radius: 20px;
        position: relative;
        font-size: 16px;
    }
    .tab-tilte .ico {
        width: 30px;
        border-radius: 50px;
        display: inline-block;
        line-height: 30px;
        margin-left: -5px;
        margin-right: 8px;
    }
    .tab-tilte li.active .ico:nth-child(1){
        background: #6208F2;
    }
    .tab-tilte li:hover{
        color: #fff;
        background-color: #4f6698;
    }
    .tab-tilte li:nth-child(1):hover .ico,
    .tab-tilte li:nth-child(1).active .ico{
        background: #6208F2;
    }
    .tab-tilte li:nth-child(2):hover .ico,
    .tab-tilte li:nth-child(2).active .ico{
        background: #003bff;
    }
    .tab-tilte li:nth-child(3):hover .ico,
    .tab-tilte li:nth-child(3).active .ico{
        background: #FF9300;
    }
    .tab-tilte li:nth-child(4):hover .ico,
    .tab-tilte li:nth-child(4).active .ico{
        background: #FF0000;
    }
    .tab-tilte li:nth-child(5):hover .ico,
    .tab-tilte li:nth-child(5).active  .ico{
        background: #03A503;
    }
    .tab-tilte .ico img {
        vertical-align: middle;
    }
    .tab-tilte .active {
        color: #01112f;
        background-color: #fff
    }
    .table-list{
        width: 70%;
        border-radius: 6px;
        margin-top: 50px;
    }
    .table-list .image{
        width: 20px;
        height: 20px;
        margin-right: 5px;
        border-radius: 50%;
        position: relative;
        top: 5px;
    }
    .header{
        height: 55px;
        line-height: 55px;
        width: 100%;
        position: fixed;
        z-index: 2000;
        background: rgb(0, 108, 255);
        box-shadow: unset;
        color: #fff;
    }
    .navigation{
        width: 70%;
        margin: 0 auto;
        font-size: 22px;
        cursor: pointer;
    }
    .navigation img{
        width: 20px;
    }
    .form-box{
        width: 70%;
        background: #fff;
        border-radius: 6px;
        margin-top: 50px;
        padding: 5px;
        font-size: 14px;
    }
    .form-box p{
        line-height: 30px;
    }
    .btn{
        margin-left: 80px;
        margin-bottom: 20px;
    }
</style>