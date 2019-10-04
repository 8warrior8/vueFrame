<template>
    <div id="app" class="ln-mobile-cloud-analysis-bg">
      <div class="ln-mobile-cloud-analysis-left">
        <div class="ln-mobile-cloud-analysis-content">

          <div class="ln-mobile-cloud-analysis-item" v-for="item in dataList" @click="showInfo(item)">
            <div class="ln-mobile-cloud-analysis-item-title">
              {{item.name}}
            </div>
            <div class="ln-mobile-cloud-analysis-item-content">
              <div class="ln-mobile-cloud-analysis-progress">
                <div>{{item.total}}</div>
                <div class="ln-mobile-cloud-analysis-schedule"><div></div></div>
              </div>
              <div class="ln-mobile-cloud-analysis-progress">
                <div>{{item.percent}}%</div>
                <div class="ln-mobile-cloud-analysis-schedule"><div></div></div>
              </div>
              <div class="ln-mobile-cloud-analysis-progress">
                <div>{{item.time}}秒</div>
                <div class="ln-mobile-cloud-analysis-schedule"><div></div></div>
              </div>
            </div>
          </div>

        </div>
        <div class="ln-mobile-cloud-analysis-bottom">
          <div><span></span>总量</div>
          <div><span></span>成功率</div>
          <div><span></span>时长</div>
        </div>
      </div>
      <div class="ln-mobile-cloud-analysis-right" @click="hideTangle">
        <div class="ln-mobile-cloud-analysis-title">
          充值/缴费
        </div>
        <div class="ln-mobile-cloud-analysis-content">

          <div class="ln-mobile-cloud-analysis-circle" v-for="item in infoList" @click.stop="showTangle(item)">
            <div class="ln-mobile-cloud-analysis-circle-left">
              <span>{{item.name}}</span>
            </div>
            <div class="ln-mobile-cloud-analysis-circle-right">
              <div><span>调用时长</span><span>{{item.time}}秒</span></div>
              <div><span>调用成功率</span><span>{{item.percent}}%</span></div>
              <div><span>调用次数</span><span>{{item.times}}</span></div>
            </div>
          </div>

          <div class="ln-mobile-cloud-analysis-rectangle-bg" v-if="show">
            <div class="ln-mobile-cloud-analysis-rectangle" v-for="item in retangleList">
              <div class="ln-mobile-cloud-analysis-rectangle-left">
                <span>{{item.ip}}</span>
              </div>
              <div class="ln-mobile-cloud-analysis-rectangle-right">
                <div><span>主机名称</span><span>{{item.mainboard}}</span></div>
                <div><span>CPU利用率</span><span>{{item.cpu}}%</span></div>
                <div><span>内存利用率</span><span>{{item.storage}}%</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          dataList: [
            {name:'充值/缴费',total:'3470',percent:'99.45',time:'16',info:[
              {name:'证件采集信息',time:'15',percent:'99.45',times:'5',tangleList:[
                {ip:'10.65.4.48',mainboard:'APDIDI',cpu:'99.45',storage:'99.45'}
              ]},
              {name:'选号',time:'15',percent:'99.45',times:'5'}]},
            {name:'账单查询',total:'3470',percent:'99.45',time:'16',info:[
              {name:'选卡',time:'15',percent:'99.45',times:'5'},
              {name:'选择产品',time:'15',percent:'99.45',times:'5'}
            ]},
            {name:'实时话费',total:'3470',percent:'99.45',time:'16'},
            {name:'查询套餐变更',total:'3470',percent:'99.45',time:'16'},
            {name:'停机',total:'3470',percent:'99.45',time:'16'},
            {name:'开户',total:'3470',percent:'99.45',time:'16'},
            {name:'服务变更',total:'3470',percent:'99.45',time:'16'}
          ],
          infoList:[
            {name:'证件采集信息',time:'15',percent:'99.45',times:'5'},
            {name:'选号',time:'15',percent:'99.45',times:'5'},
            {name:'选卡',time:'15',percent:'99.45',times:'5'},
            {name:'选择产品',time:'15',percent:'99.45',times:'5'}
          ],
          retangleList:[{ip:'10.65.4.48',mainboard:'APDIDI',cpu:'99.45',storage:'99.45'}],
          show:false
        };
      },
      methods: {
        showInfo: function(item) {
          this.infoList=item.info;
        },
        showTangle: function(item) {
          this.show=true;
          this.retangleList=item.tangleList;
        },
        hideTangle: function() {
          this.show=false;
        },
      },
    }
</script>

<style>
  .ln-mobile-cloud-analysis-bg{
    display: flex;
  }
  .ln-mobile-cloud-analysis-left{
    width:50%;
    height:calc(100% - 20px);
    padding:10px;
    display: flex;
    flex-direction: column;
    background:#192649;
    color:#fff;
  }
  .ln-mobile-cloud-analysis-item{
    width: calc(100% - 20px);
    /*height:50px;*/
    margin-top:20px;
    padding:20px 10px 10px 10px;
    border:1px solid #40AED5;
    position: relative;
  }
  .ln-mobile-cloud-analysis-item-title{
    position: absolute;
    top:-10px;
    left:calc(50% - 50px);
    width:100px;
    background:#122649;
    text-align:center;
    font-size:15px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
  }
  .ln-mobile-cloud-analysis-item-content{
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ln-mobile-cloud-analysis-progress{
    width:30%;
  }
  .ln-mobile-cloud-analysis-progress>div:nth-of-type(1){
    display: flex;
    align-items: center;
    font-size:12px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
    margin-bottom: 5px;
  }
  .ln-mobile-cloud-analysis-schedule{
    width:100%;
    height:8px;
  }
  .ln-mobile-cloud-analysis-schedule>div{
    background: #41B1D9;
    width:50%;
    height:100%;
    border-radius: 3px;
  }
  .ln-mobile-cloud-analysis-progress:nth-of-type(1) .ln-mobile-cloud-analysis-schedule>div{
    background:#4CD7FE;
  }
  .ln-mobile-cloud-analysis-progress:nth-of-type(2) .ln-mobile-cloud-analysis-schedule>div{
    background:#CE76FC;
  }
  .ln-mobile-cloud-analysis-progress:nth-of-type(3) .ln-mobile-cloud-analysis-schedule>div{
    background:#7CE188;
  }
  .ln-mobile-cloud-analysis-bottom{
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size:12px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
  }
  .ln-mobile-cloud-analysis-bottom>div>span{
    display: inline-block;
    width:10px;
    height:10px;
    border-radius: 50%;
    margin-right:5px;
  }
  .ln-mobile-cloud-analysis-bottom>div:nth-of-type(1)>span{
    background:#4CD7FE;
  }
  .ln-mobile-cloud-analysis-bottom>div:nth-of-type(2)>span{
    background:#CE76FC;
  }
  .ln-mobile-cloud-analysis-bottom>div:nth-of-type(3)>span{
    background:#7CE188;
  }
  .ln-mobile-cloud-analysis-right{
    width:50%;
    height:calc(100% - 20px);
    padding:10px;
    display: flex;
    flex-direction: column;
    border:1px solid #2BC3DA;
    background: #032D81;
    color:#fff;
    position: relative;
  }
  .ln-mobile-cloud-analysis-title{
    text-align: center;
    font-size:16px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
  }
  .ln-mobile-cloud-analysis-content{
    flex:1 1 auto;
  }
  .ln-mobile-cloud-analysis-circle{
    display: flex;
  }
  .ln-mobile-cloud-analysis-circle-left{
    width:60px;
    height:60px;
    padding:10px;
    border-radius: 50%;
    border:1px solid #38AADF;
    flex:0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ln-mobile-cloud-analysis-circle-left>span{
    text-align: center;
    font-size:16px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
  }
  .ln-mobile-cloud-analysis-circle-right{
    flex:1 1 auto;
    font-size:12px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ln-mobile-cloud-analysis-circle-right>div{
    display: flex;
    align-items: center;
    width:100%;
    height:20px;
    background: #12519B;
    border-radius: 5px;
    margin:3px 0;
  }
  .ln-mobile-cloud-analysis-circle-right>div>span:nth-of-type(1){
    display:inline-block;
    width:60%;
  }
  .ln-mobile-cloud-analysis-circle-right>div>span:nth-of-type(2){
    display:inline-block;
    width:40%;
  }

  .ln-mobile-cloud-analysis-rectangle-bg{
    position:absolute;
    left:calc(100% + 20px);
    top:20px;
    z-index:10;
    width: 280px;
    height:370px;
    background: #032D81;
  }
  .ln-mobile-cloud-analysis-rectangle{
    display: flex;
    padding:10px
  }
  .ln-mobile-cloud-analysis-rectangle-left{
    width:60px;
    height:60px;
    padding:10px;
    border-radius: 5px;
    border:1px solid #38AADF;
    flex:0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ln-mobile-cloud-analysis-rectangle-left>span{
    text-align: center;
    font-size:16px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
  }
  .ln-mobile-cloud-analysis-rectangle-right{
    flex:1 1 auto;
    font-size:12px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ln-mobile-cloud-analysis-rectangle-right>div{
    display: flex;
    align-items: center;
    width:100%;
    height:20px;
    background: #12519B;
    border-radius: 5px;
    margin:3px 0;
  }
  .ln-mobile-cloud-analysis-rectangle-right>div>span:nth-of-type(1){
    display:inline-block;
    width:60%;
  }
  .ln-mobile-cloud-analysis-rectangle-right>div>span:nth-of-type(2){
    display:inline-block;
    width:40%;
  }
</style>
