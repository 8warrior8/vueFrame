<template>
  <div class="flowMain">
    <div class="flow">
      <div class="flowChart" style="width:800px;height:500px;" id="flowChart"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["screenWidth", "workflowid", "requestid"],
  data() {
    return {};
  },
  methods: {
    _getSvgInfo: function(d3, selector) {},

    //轨道图
    flowChart(selector) {
      var dataset = this.getTestJson();
      const d3 = this.$d3;
      const width = 2000;
      const height = 400;
      var marge = { top: 50, bottom: 0, left: 10, right: 0 };
      //创建svg
      this.svg = d3
        .select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      var g = this.svg
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");
      var scale = this.svg
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

      //创建一个层级布局
      var hierarchyData = d3.hierarchy(dataset).sum(function(d) {
        return d.value;
      });

      //创建一个树状图
      var tree = d3
        .tree()
        .size([width - 50, height - 50])
        .separation(function(a, b) {
          return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

      //初始化树状图，也就是传入数据,并得到绘制树基本数据
      var treeData = tree(hierarchyData);

      //得到边和节点（已经完成转换的）
      var nodes = treeData.descendants();
      var links = treeData.links();
      //创建一个贝塞尔生成曲线生成器   d3.linkHorizontal()，创建一个贝塞尔生成曲线生成器，当然不止只有水平的，
      //还有垂直的（d3.linkVertical()），这里给出官方API的示例
      var Bézier_curve_generator = d3
        .linkVertical()
        .x(function(d) {
          return d.x;
        })
        .y(function(d) {
          return d.y;
        });
      //绘制边
      g.append("g")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("d", function(d) {
          var start = { x: d.source.x, y: d.source.y };
          var end = { x: d.target.x, y: d.target.y };
          return Bézier_curve_generator({ source: start, target: end });
        })
        .attr("fill", "none")
        .attr("stroke", "yellow")
        .attr("stroke-width", 1);
      var gs = g
        .append("g")
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", function(d) {
          var cx = d.y;
          var cy = d.x;
          return "translate(" + cy + "," + cx + ")";
        });

      //绘制节点
      var rectPadding = 20;
      gs.append("rect")
        .attr("x", function(d, i) {
          return -20 ;
        })
        .attr("y", function(d, i) {
          return 0;
        })
        .attr("width", function() {
          return 50;
        })
        .attr("height", function(d) {
          return 23;
        })
        .attr("fill", "blue");

      //文字
      gs.append("text")
        .attr("x", function(d) {
          return -20; //文本X轴坐标起点
        })
        .attr("y", 5)
        .attr("dy", 10)
        .text(function(d) {
          return d.data.name;
        });
    },

    getTestJson: function() {
      var details = {
        name: "中国",
        children: [
          {
            name: "浙江",
            children: [
              { name: "杭州", value: 100 },
              { name: "宁波", value: 100 },
              { name: "温州", value: 100 },
              { name: "绍兴", value: 100 }
            ]
          },
          {
            name: "广西",
            children: [
              {
                name: "桂林",
                children: [
                  { name: "秀峰区", value: 100 },
                  { name: "叠彩区", value: 100 },
                  { name: "象山区", value: 100 },
                  { name: "七星区", value: 100 }
                ]
              },
              { name: "南宁", value: 100 },
              { name: "柳州", value: 100 },
              { name: "防城港", value: 100 }
            ]
          },
          {
            name: "黑龙江",
            children: [
              { name: "哈尔滨", value: 100 },
              { name: "齐齐哈尔", value: 100 },
              { name: "牡丹江", value: 100 },
              { name: "大庆", value: 2000 }
            ]
          },
          {
            name: "新疆",
            children: [
              { name: "乌鲁木齐" },
              { name: "克拉玛依" },
              { name: "吐鲁番" },
              { name: "哈密" }
            ]
          }
        ]
      };

      return details;
    }
  },

  computed: {},

  watch: {},

  mounted: function() {
    //数据模拟
    this.details = this.getTestJson();
    this.flowChart("#flowChart");
  }
};
</script>


<style>
.flowMain {
  position: relative;
}

.flow {
  width: 90%;
  height: 500px;
  overflow-y: auto;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.flow ul {
  margin: 0;
  padding: 0;
  text-align: center;
}

.flow li {
  list-style: none;
  margin-right: 20px;
  display: inline;
}

.flow li i {
  font-size: 0.9em;
  font-style: normal;
  color: #828990;
}

.flow li i:before {
  display: inline-block;
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #ff4a3b;
  margin-right: 4px;
  position: relative;
  top: 4px;
}

.flow li:first-child > i:before {
  background-color: #ccab76;
}

.flow li:last-child > i:before {
  background-color: #becfd9;
}

.flow .flowChart {
  text-align: center;
}

.flow .flowChart .node {
  cursor: pointer;
}

.flow .flowChart .node circle {
  fill: #999;
}

.flow .flowChart .node--end circle {
  fill: #ccab76;
}

.flow .flowChart .node--noData circle {
  fill: #becfd9;
}

.flow .flowChart .node--doing circle {
  stroke-width: 2px;
  fill: #ff4a3b;
  animation: bounce 3s infinite;
}

.flow .flowChart .link--doing {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0% {
    stroke: #d2d391;
    stroke-width: 0;
    fill: #c55a19;
    transform: scale(0.6);
  }
  50% {
    stroke: #faffaf;
    stroke-width: 0.2em;
    fill: #ff4a3b;
    transform: scale(1.2);
  }
  to {
    stroke: #d2d391;
    stroke-width: 0;
    fill: #c55a19;
    transform: scale(0.6);
  }
}

.flow .flowChart .node text {
  font: 0.7em Segoe UI, Microsoft YaHei;
  fill: #333;
}

.flow .flowChart .link {
  fill: none;
  stroke: #96b791;
  stroke-opacity: 0.8;
  stroke-width: 0.1em;
}

.flow .cardInfo {
  width: 240px;
  height: 140px;
  position: absolute;
  font: 0.7em Segoe UI, Microsoft YaHei;
  background-color: #efefef;
  color: #b57474;
  z-index: 10;
}

.flow .cardInfo .el-row {
  margin-bottom: 10px;
}

.flow .cardInfo .el-row:last-child {
  margin-bottom: 0;
}

.flow .pullUp {
  position: absolute;
  bottom: 0;
  left: 47%;
  cursor: pointer;
  width: 100px;
  height: 100px;
}

.flow .pullUp > i {
  color: #3b9c81;
  font-weight: 600;
  position: absolute;
  left: 40%;
  bottom: 0;
  animation: pullupicon 3s infinite;
}

@keyframes pullupicon {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: scale(2) translateY(-10px);
  }
}

.dataPanel {
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 5%;
  height: 70vh;
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  z-index: 200;
}

.dataPanel .el-container {
  height: 100%;
}

.dataPanel .el-aside {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  margin: 0 10px 30px 10px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.dataPanel .asideTitle {
  text-align: center;
  margin-top: 20px;
  font-size: 1em;
  color: #776565;
}

.dataPanel .el-main {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  margin: 0 10px 30px 0;
  border-radius: 5px;
}

.dataPanel .pullDown {
  position: absolute;
  top: 0;
  left: 47%;
  cursor: pointer;
  width: 100px;
  height: 50px;
}

.dataPanel .pullDown > i {
  color: #3b9c81;
  font-weight: 600;
  position: absolute;
  left: 40%;
  top: 0;
  animation: pulldownicon 3s infinite;
}

@keyframes pulldownicon {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: scale(2) translateY(10px);
  }
}

.dataPanel .dataTitle {
  margin-top: 30px;
  text-align: center;
  font-size: 1.2em;
  color: #776565;
}

.dataPanel .el-row {
  padding: 10px;
  margin: 10px 10px 5px 10px;
  font-size: 0.9em;
  color: #776565;
  border-bottom: 1px dotted #f3f2f2;
}

.dataPanel .dataChart {
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
}

.dataPanel .dataChart > div {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}

.dataPanel .dataChart > div > div {
  text-align: center;
  color: #776565;
  font-size: 1em;
}

.dataPanel .chartLine {
  fill: none;
  stroke: #6b6b6b;
  stroke-width: 1px;
  stroke-dasharray: 2px;
}

.dataPanel .slices text {
  font-size: 0.6em;
  text-anchor: middle;
  fill: #f7f7f7;
}
</style>
