<template>
  <div class="gcss-middle-svg-body">
    <div class="gcss-middle-svg-title">
      <img src="../../../static/gcss_general_view/line.png" />
      <span>全省故障监控</span>
      <img src="../../../static/gcss_general_view/line.png" />
    </div>
    <div id="mapPathSvg" class="gcss-middle-svg-content">
      <simple-svg :filepath="svgUrl" :width="'100%'" :height="'100%'" @ready="onSvgReady()" />
    </div>
  </div>
</template>


<script>
import "./gcss_general_view.css";
import { getSvgItemInfo } from "../../service/gcssGeneralViewAjax";
export default {
  name: "gcssMiddleSvg",
  props: ["userlevel", "userregionid"],
  data() {
    return {
      currProvinceId: 0,
      currRegionList: [],
      svgUrl: "../../../static/mapSvg/江苏省/江苏省.svg"
    };
  },

  //数据回收方法
  destroyed: function() {},

  watch: {
    //页面大小发生变化时触发该处理
    "$store.state.systemChange.Page_Size_Change": function(param) {
      //this.pageWidth = param.width;
      //this.pageHeight = param.height;
    },
    //系统主题样式变化时触发该处理
    "$store.state.systemChange.Style_Change": function(styleName) {}
  },

  components: {},

  methods: {
    //页面主入口方法
    startUp: function(pName, provinceId, svgName, regionList) {
      var self = this;
      this.currProvinceId = provinceId;
      this.currRegionList = regionList;
      //需要延时处理，v-bind动态绑定属性后值会有延时
      setTimeout(function() {
        self.initSVGView(pName, svgName);
      }, 10);
    },

    //初始化SVG地图
    initSVGView: function(pName, svgName) {
      var self = this;
      this.svgUrl = "../../../static/mapSvg/" + pName + "/" + svgName + ".svg";
    },

    //SVG文件准备完毕后触发
    onSvgReady: function() {
      this.setSvgEventInfo();
      this.getServiceInfo();
    },

    //获取专线信息
    getServiceInfo: function() {
      var self = this;
      var param = { province_id: this.userregionid, ContextName: "nmosdb" };
      getSvgItemInfo(param).then(data => {
        data.forEach(element => {
          self.createSVGLine(element);
        });
      });
    },

    createSVGLine: function(item) {
      var self = this;
      var tempDomId1 = ".gcss-middle-svg-body #SVG_" + this.currProvinceId;
      var docRoot = document.querySelector(tempDomId1);
      if (docRoot) {
        var tempLineId = "line_" + item.a_id + "_" + item.z_id;
        var regionIdA = "Circle_" + item.a_id;
        var tempDomId2 = ".gcss-middle-svg-body #" + regionIdA;
        var tempRegionA = document.querySelector(tempDomId2);
        var regionIdZ = "Circle_" + item.z_id;
        var tempDomId3 = ".gcss-middle-svg-body #" + regionIdZ;
        var tempRegionZ = document.querySelector(tempDomId3);
        if (tempRegionA && tempRegionZ) {
          var serviceName = "";
          if (item.serverList && item.serverList.length === 1) {
            serviceName = item.serverList[0].service_name;
          }
          var lineStr = self.getLineInfo(
            tempLineId,
            tempRegionA,
            tempRegionZ,
            item.serverList.length,
            item.a_id,
            item.z_id,
            item.service_sla,
            serviceName
          );
          var bubblie = self.parseSVG(lineStr);
          docRoot.appendChild(bubblie);
          $("path").dblclick(function(event) {
            event.stopPropagation(); //阻止事件冒泡
            //self._pathDbClick(event);
          });
        }
      }
    },

    getLineInfo: function(
      bubId,
      regionA,
      regionZ,
      count,
      aId,
      zId,
      service_sla,
      serviceName
    ) {
      var nodeA = {};
      nodeA.x = regionA.getBBox().x;
      nodeA.y = regionA.getBBox().y;
      var nodeB = {};
      nodeB.x = regionZ.getBBox().x;
      nodeB.y = regionZ.getBBox().y;
      var nodeC = {};
      nodeC.x = (nodeA.x + nodeB.x) / 2;
      nodeC.y = (nodeA.y + nodeB.y) / 2;
      var nodeE = {};
      var tempXdiff = Math.abs(nodeA.x - nodeB.x);
      var tempYdiff = Math.abs(nodeA.y - nodeB.y);
      nodeE.x = nodeC.x + (tempYdiff / 2) * (Math.cos(45) / Math.sin(45));
      nodeE.y = nodeC.y + (tempXdiff / 2) * (Math.cos(45) / Math.sin(45));
      var nodeD = {};
      nodeD.x = 0;
      nodeD.y = 0;
      var listNode = [];
      var numOfPoints = 3;
      var t = 1.0 / (numOfPoints - 1);
      for (var i = 0; i < numOfPoints; i++) {
        var tempNode = this.pointOnCubicBezier(nodeA, nodeE, nodeB, i * t);
        listNode.push(tempNode);
      }
      if (listNode && listNode.length > 2) {
        nodeD.x = listNode[1].x;
        nodeD.y = listNode[1].y;
      }
      var _lineWidthClass =
        "view-map-svg-region-line-stroke1 dygl-case-middle-map-line10";
      if (service_sla === 0) {
        _lineWidthClass =
          "view-map-svg-region-line-stroke4 dygl-case-middle-map-line25";
      } else if (service_sla === 1) {
        _lineWidthClass =
          "view-map-svg-region-line-stroke3 dygl-case-middle-map-line20";
      } else if (service_sla === 2) {
        _lineWidthClass =
          "view-map-svg-region-line-stroke2 dygl-case-middle-map-line15";
      }
      var temp = '<svg id="' + bubId + '">';
      temp =
        temp +
        '<path id="AZline_' +
        aId +
        "_" +
        zId +
        '" class="view-map-svg-region-line ' +
        _lineWidthClass +
        ' view-map-svg-region-line-green" d="M' +
        nodeA.x +
        " " +
        nodeA.y +
        "  Q " +
        nodeE.x +
        " " +
        nodeE.y +
        " " +
        nodeB.x +
        " " +
        nodeB.y +
        '"/>';
      temp = temp + "</svg>";

      temp = temp + "<svg>";
      temp =
        temp +
        ' <circle id="c_' +
        aId +
        "_" +
        zId +
        '" class="view-map-svg-green dygl-case-middle-map-circle" cx="' +
        nodeD.x +
        '" cy="' +
        nodeD.y +
        '" r="10"/>';
      temp =
        temp +
        '<text id="t_' +
        aId +
        "_" +
        zId +
        '" x="' +
        (nodeD.x - 4) +
        '" y="' +
        (nodeD.y + 4) +
        '" transform="matrix(1 0 0 1 0 0)" class="view-map-svg-bubble-text dygl-case-middle-map-circle">' +
        count +
        "</text>";
      if (Number(count) === 1) {
      }
      temp = temp + "</svg>";
      return temp;
    },

    //p0、p1、p2三个点，其中p0为起点，p2为终点，p1为控制点
    //它们的坐标用数组表示[x,y]
    //t的范围是0-1
    pointOnCubicBezier: function(p0, p1, p2, t) {
      var tempX =
        p0.x * Math.pow(1 - t, 2) +
        p1.x * t * (1 - t) * 2 +
        p2.x * Math.pow(t, 2);
      var tempY =
        p0.y * Math.pow(1 - t, 2) +
        p1.y * t * (1 - t) * 2 +
        p2.y * Math.pow(t, 2);
      var nodeE = {};
      nodeE.x = tempX;
      nodeE.y = tempY;
      return nodeE;
    },

    parseSVG: function(s) {
      var div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + "</svg>";
      var frag = document.createDocumentFragment();
      while (div.firstChild.firstChild) {
        frag.appendChild(div.firstChild.firstChild);
      }
      return frag;
    },

    //设置SVG上的相关事件
    setSvgEventInfo: function() {
      var self = this;
      $("text").click(function(event) {
        event.stopPropagation(); //阻止事件冒泡
      });
      $("circle").click(function(event) {
        event.stopPropagation(); //阻止事件冒泡
      });
      $("path").click(function(event) {
        event.stopPropagation(); //阻止事件冒泡
        self.svgPolygonClick(event);
      });
      $("path").dblclick(function(event) {
        event.stopPropagation(); //阻止事件冒泡
        self.svgPolygonClick(event);
      });
    },

    //SVG上text单击时触发
    svgPolygonClick: function(event) {
      var self = this;
      if ($(event.target).attr("id")) {
        var id = $(event.target).attr("id");
        var name = $(event.target).attr("name");
        self.setSelectedStatus(id);
      }
    },

    //设置地图节点的选中状态
    setSelectedStatus: function(id) {
      var svgId = "#SVG_" + this.currProvinceId.toString();
      for (var j = 0; j < $(svgId).find("path").length; j++) {
        var itemPath = $(svgId).find("path")[j];
        if (itemPath.id) {
          var tempClass = $("#" + itemPath.id)[0].getAttribute("class");
          if (tempClass === "view-map-svg-path-selected") {
            $("#" + itemPath.id)[0].setAttribute("class", "view-map-svg-path");
          }
        }
      }
      $("#" + id)[0].setAttribute("class", "view-map-svg-path-selected");
    }
  }
};
</script>

<style>
.gcss-middle-svg-body {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.gcss-middle-svg-content {
  height: 100%;
  width: 100%;
}

.gcss-middle-svg-content > div {
  position: absolute;
  height: calc(100% - 25px);
  width: 100%;
  padding-top: 25px;
}

.gcss-middle-svg-title {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
  position: absolute;
  width: 100%;
  top: 5px;
  z-index: 10;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gcss-middle-svg-title > img:nth-last-of-type(1) {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -webkit-transform: rotate(180deg);
  /* Safari and Chrome */
  -o-transform: rotate(180deg);
  /* Opera */
  -moz-transform: rotate(180deg);
  /* Firefox */
}

.gcss-middle-svg-title > span {
  margin: 0 10px;
  flex: 0 0 auto;
}

.gcss-general-svg-legend {
  width: 100px;
  height: 90px;
  padding: 5px;
  position: absolute;
  margin: 12px;
}

.gcss-general-svg-legend-item {
  background: #f2f2f2;
  padding: 6px;
  border-radius: 3px;
}

.gcss-general-svg-legend-item > div > span {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  margin-right: 5px;
}

.gcss-general-svg-legend-item > div:nth-of-type(1) > span {
  background: red;
}

.gcss-general-svg-legend-item > div:nth-of-type(2) > span {
  background: orange;
}

.gcss-general-svg-legend-item > div:nth-of-type(3) > span {
  background: green;
}

.gcss-general-svg-legend-l {
  left: 10px;
}

.gcss-general-svg-legend-r {
  right: 10px;
}

.gcss-general-svg-legend-t {
  top: 10px;
}

.gcss-general-svg-legend-b {
  bottom: 10px;
}

.view-map-svg-background {
  fill: #bdf476;
  stroke: #ffffff;
  stroke-miterlimit: 10;
  opacity: 0.23;
  enable-background: new;
}

.view-map-svg-text {
  font-family: "MicrosoftYaHeiLight";
  font-size: 12.7881px;
  transform: matrix(1 0 0 1 0 0);
  cursor: pointer;
  font-weight: 700;
}

.view-map-svg-path {
  fill: #c0ddff;
  stroke: #ffffff;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  cursor: pointer;
}

.view-map-svg-path-selected {
  fill: #97c1ec;
  stroke: #6699ff;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  cursor: pointer;
}

.view-map-svg-red {
  fill: red;
}

.view-map-svg-orange {
  fill: orange;
}

.view-map-svg-yellow {
  fill: yellow;
}

.view-map-svg-blue {
  fill: blue;
}

.view-map-svg-green {
  fill: #8cc63f;
}

.view-map-svg-bubble-text {
  font-family: "MicrosoftYaHeiLight";
  font-size: 12px;
}

.view-map-svg-region-circle {
  fill: #ffffff;
  stroke: #b3beff;
  stroke-miterlimit: 10;
}

.view-map-svg-region-name-blink {
  -webkit-animation: regionNameBlinkAnimation 1s ease-in-out infinite;
}

@-webkit-keyframes regionNameBlinkAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50.01% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.view-map-svg-region-line {
  fill: none;
  stroke-miterlimit: 10;
  stroke-dasharray: 8, 8;
  stroke-dashoffset: 100;
  -webkit-animation: regionLineAnimation 4s linear forwards infinite;
}

@-webkit-keyframes regionLineAnimation {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.view-map-svg-region-line-stroke1 {
  stroke-width: 1 !important;
}

.view-map-svg-region-line-stroke2 {
  stroke-width: 2 !important;
}

.view-map-svg-region-line-stroke3 {
  stroke-width: 3 !important;
}

.view-map-svg-region-line-stroke4 {
  stroke-width: 4 !important;
}

.view-map-svg-region-line-stroke5 {
  stroke-width: 5 !important;
}

.view-map-svg-region-line-red {
  stroke: red !important;
}

.view-map-svg-region-line-orange {
  stroke: orange !important;
}

.view-map-svg-region-line-yellow {
  stroke: yellow !important;
}

.view-map-svg-region-line-blue {
  stroke: blue !important;
}

.view-map-svg-region-line-green {
  stroke: #20df8f !important;
}
</style>

