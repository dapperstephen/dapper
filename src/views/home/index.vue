<template>
    <div class="home-wrapper">
        <div class="column-left">
            <div class="column-box">
                <div class="col-text">Lottery is a way of life</div>
                <div class="col-tip">Discover, Track & Trade Everything DeFi, NFT and Gaming</div>
                <div class="btn-box">
                    <a @click="clickRoutr" class="col-btn launch" href="">Launch DAPP</a>
                    <a class="col-btn connect" @click="connectWallet()"> {{ text }} </a>
                </div>
                <div class="col-code">0xfdF282a1689439BD0261dB197921eEc4653800d5</div>
            </div>
        </div>
        <div class="column-right">
            <div style="margin-top: 150px;">
                <div>
                    <img src="../../assets/01.png">
                </div>
                <div>
                    <img src="../../assets/02.png">
                    <img src="../../assets/03.png">
                </div>
                <div>
                    <img src="../../assets/05.png">
                    <img src="../../assets/04.png">
                    <img src="../../assets/06.png">
                </div>
                <div>
                    <img src="../../assets/07.png">
                    <img src="../../assets/08.png">
                    <img src="../../assets/09.png">
                    <img src="../../assets/10.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {addLiquidity, approve, getTokenDecimal, getWeb3, queryPools, queryShares} from './Metamask'
export default {
    data () {
        return {
            text: 'connect wallet'
        }
    },
    created: async function () {
        let _this = this
        window.transfer = _this.transfer
        await getTokenDecimal("0x1B7B3A2b6715856d14f3358589f45EBA7fCe9210")
    },
    mounted(){
        const clientHeight = document.documentElement.clientHeight;
        const container = document.querySelector('.home-wrapper');
        container.style.height = `${clientHeight}px`;
    },
    methods: {
        async clickRoutr() {
            this.$router.push({name:'nft'})
        },
        async connectWallet () {
            await getWeb3('0x394AcA31aD54912cBD49c5F6eC2C68925f7CD62c', this.balance)
            let accounts = this.$utils.hideCode(this.accounts, 8, 8)
            this.text = accounts.substring(0,6) + '******' +  accounts.substring(accounts.length-6,accounts.length)
        }
    }
}
</script>
<style scoped>
    .home-wrapper{
        height: 100%;
        width: 100%;
        background-color: rgb(4, 40, 96);
    }
    .column-left {
        float: left;
        width: 50%;
        height: 100%;
        position: relative;
    }
    .column-right {
        overflow:hidden;
        text-align: center;
    }
    .column-right img{
        width: 80px;
        margin: 20px 20px 0 0;
    }
    .column-box{
        height: 50%;
        position: absolute;
        top: 50%;
        left: 42%;
        margin-top: -300px;
    }
    .col-text{
        font-size: 82px;
        font-weight: bold;
        line-height: 1;
        color: rgb(255, 255, 255);
        margin-bottom: 18px;
        word-break: break-word;
    }
    .col-tip{
        font-size: 21px;
        line-height: 1.52;
        color: rgb(255, 255, 255);
        margin-bottom: 48px;
        max-width: 550px;
        word-break: break-word;
    }
    .btn-box{
        height: 45px;
    }
    .col-btn{
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        width: fit-content;
        padding: 14px 32px;
        margin-right: 16px;
        margin-bottom: unset;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        border: 0px;
        border-radius: 5px;
        box-shadow: rgb(255 255 255) 0px 0px 15px 0px;
        transition: all 0.2s ease 0s;
        text-decoration:none
    }
    .launch{
        color: rgb(4, 40, 96);
        background-color: rgb(239, 239, 239);
    }
    .connect{
        color: rgb(255, 255, 255);
        background-color: rgb(255, 0, 108);
    }
    .launch:hover{
        color: rgb(4, 40, 96);
        background-color: rgb(239, 239, 239);
        box-shadow: unset;
    }
    .connect:hover{
        color: rgb(255, 255, 255);
        background-color: rgb(165, 6, 74);
        box-shadow: unset;
    }
    .col-code{
        font-size: 21px;
        margin-top: 40px;
        color: rgb(0, 108, 255);
    }
</style>
