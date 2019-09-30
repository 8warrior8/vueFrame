<template>
    <div id="app" class="ln-mobile-cloud">
      <div class="ln-mobile-cloud-title">
        辽宁移动私有云端到端业务
      </div>
      <div class="ln-mobile-cloud-content">
        <div class="ln-mobile-cloud-left">
          <div class="ln-mobile-cloud-left-top">
            <div class="ln-mobile-cloud-headline">当前业务办理总量及金额</div>
            <div class="ln-mobile-cloud-info">
              <LnMobileCloudTotal></LnMobileCloudTotal>
            </div>
          </div>
          <div class="ln-mobile-cloud-left-bottom">
            <div class="ln-mobile-cloud-headline">业务端到端分析</div>
            <div class="ln-mobile-cloud-info">
              <LnMobileCloudAnalysis></LnMobileCloudAnalysis>
            </div>
          </div>
        </div>
        <div class="ln-mobile-cloud-center">
          <div class="ln-mobile-cloud-center-top">
            <div class="ln-mobile-cloud-headline">全省业务感知</div>
            <div class="ln-mobile-cloud-info">
              <LnMobileCloudMaps></LnMobileCloudMaps>
            </div>
          </div>
          <div class="ln-mobile-cloud-center-bottom">
            <div class="ln-mobile-cloud-headline">城市感知排行</div>
            <div class="ln-mobile-cloud-info">
              <LnMobileCloudRank></LnMobileCloudRank>
            </div>
          </div>
        </div>
        <div class="ln-mobile-cloud-right">
          <div class="ln-mobile-cloud-right-top">
            <div class="ln-mobile-cloud-headline">实厅当前业务办理情况</div>
            <div class="ln-mobile-cloud-info">
              <LnMobileCloudSituation></LnMobileCloudSituation>
            </div>
          </div>
          <div class="ln-mobile-cloud-right-bottom">
            <div class="ln-mobile-cloud-headline">业务承载</div>
            <div class="ln-mobile-cloud-info">
              <div class="ln-mobile-cloud-bearing">
                <LnMobileCloudBear></LnMobileCloudBear>
              </div>
              <div class="ln-mobile-cloud-forecast">
                <LnMobileCloudForecast></LnMobileCloudForecast>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import LnMobileCloudTotal from "./LnMobileCloud/LnMobileCloudTotal.vue";
  import LnMobileCloudAnalysis from "./LnMobileCloud/LnMobileCloudAnalysis.vue";
  import LnMobileCloudMaps from "./LnMobileCloud/LnMobileCloudMaps.vue";
  import LnMobileCloudRank from "./LnMobileCloud/LnMobileCloudRank.vue";
  import LnMobileCloudSituation from "./LnMobileCloud/LnMobileCloudSituation.vue";
  import LnMobileCloudBear from "./LnMobileCloud/LnMobileCloudBear.vue";
  import LnMobileCloudForecast from "./LnMobileCloud/LnMobileCloudForecast.vue";
    export default {
      components: {
        LnMobileCloudAnalysis: LnMobileCloudAnalysis,
        LnMobileCloudTotal:LnMobileCloudTotal,
        LnMobileCloudMaps:LnMobileCloudMaps,
        LnMobileCloudRank:LnMobileCloudRank,
        LnMobileCloudSituation:LnMobileCloudSituation,
        LnMobileCloudBear:LnMobileCloudBear,
        LnMobileCloudForecast:LnMobileCloudForecast
      }
    }
</script>

<style>
  .ln-mobile-cloud{
    display: flex;
    flex-direction: column;
    /*width:2880px !important;*/
    /*height:1080px !important;*/
    /*width:5760px !important;*/
    /*height:2160px !important;*/
  }
  .ln-mobile-cloud-title{
    width:100%;
    height:50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom:1px solid #ccc;
  }
  .ln-mobile-cloud-content{
    flex:1 1 auto;
    display: flex;
  }
  .ln-mobile-cloud-info{
    flex:1 1 auto;
    position: relative;
  }
  .ln-mobile-cloud-left{
    width:32%;
    height:100%;
  }
  .ln-mobile-cloud-left-top{
    position: relative;
    width:100%;
    height:35%;
    display: flex;
    flex-direction: column;
  }
  .ln-mobile-cloud-left-bottom{
    position: relative;
    width:100%;
    height:65%;
    display: flex;
    flex-direction: column;
    border-top:1px solid #ccc;
  }
  .ln-mobile-cloud-center{
    width:36%;
    height:100%;
    border-left:1px solid #ccc;
    border-right:1px solid #ccc;
  }
  .ln-mobile-cloud-center-top{
    position: relative;
    width:100%;
    height:70%;
    display: flex;
    flex-direction: column;
  }
  .ln-mobile-cloud-center-bottom{
    position: relative;
    width:100%;
    height:30%;
    display: flex;
    flex-direction: column;
    border-top:1px solid #ccc;
  }
  .ln-mobile-cloud-right{
    width:32%;
    height:100%;
  }
  .ln-mobile-cloud-right-top{
    position: relative;
    width:100%;
    height:35%;
    display: flex;
    flex-direction: column;
  }
  .ln-mobile-cloud-right-bottom{
    position: relative;
    width:100%;
    height:65%;
    display: flex;
    flex-direction: column;
    border-top:1px solid #ccc;
  }
  .ln-mobile-cloud-bearing{
    position: relative;
    width:100%;
    height:65%;
  }
  .ln-mobile-cloud-forecast{
    position: relative;
    width:100%;
    height:35%;
  }
</style>
