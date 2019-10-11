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
    return {
      currCircleR: 20
    };
  },
  methods: {
    _getSvgInfo: function(d3, selector) {},

    //轨道图
    flowChart(selector) {
      var self = this;
      const d3 = this.$d3;
      const width = 800;
      const height = 500;
      var marge = { top: 50, bottom: 0, left: 10, right: 0 };
      //创建svg
      this.svg = d3
        .select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      var g = this.svg
        .append("g")
        .attr("id", "svg-g-root")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

      let marker = g
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", "10")
        .attr("refY", "5")
        .attr("markerWidth", "5")
        .attr("markerHeight", "4")
        .attr("orient", "auto");
      marker
        .append("path")
        .attr("stroke", "rgb(18, 150, 219)")
        .attr("stroke-width", "2")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("fill", "rgb(18, 150, 219)")
        .attr("d", "M 0 0 L 10 5 L 0 10");
      var nodeList = this.getDataTestByNode();
      var linkList = this.getDataTestByLink();

      var svgNodeList = [];
      nodeList.forEach(function(item) {
        var tempNode = self.getNode(
          g,
          item.nodID,
          item.nodNam,
          item.dx,
          item.dy
        );
        svgNodeList.push(tempNode);
      });

      linkList.forEach(function(item) {
        var nodeA = svgNodeList.find(function(itemA) {
          if (itemA.id === item.AnodeId) {
            return itemA;
          }
          return null;
        });
        var nodeZ = svgNodeList.find(function(itemZ) {
          if (itemZ.id === item.ZnodeId) {
            return itemZ;
          }
          return null;
        });
        if (nodeA && nodeZ) {
          self.getLine(g, nodeA, nodeZ);
        }
      });
    },

    //创建节点
    getNode: function(nodeRoot, id, name, x, y) {
      var uiId = "node_" + id;
      var node = nodeRoot
        .append("g")
        .attr("id", uiId)
        .attr("transform", function(d) {
          return "translate(" + x + "," + y + ")";
        });
      node
        .append("circle") // 绘制圆圈
        .attr("r", this.currCircleR)
        .attr("style", "fill: rgb(18, 150, 219)")
        .attr("class", "node-circle-doing");
      node
        .append("image") //增加图片标签
        .attr("width", 30)
        .attr("height", 30)
        .attr("xlink:href", "static/gcss_general_view/u296.png")
        .attr("src", "static/gcss_general_view/u296.png")
        .attr("x", -15)
        .attr("y", -15);
      node
        .append("text") // 绘制文本
        .attr("dx", 20)
        .attr("dy", 30)
        .style("text-anchor", "middle")
        .style("fill", "red")
        .style("font-size", "12px")
        .text(name);
      node.dx = x;
      node.dy = y;
      node.id = id;
      return node;
    },

    //创建连线
    getLine: function(nodeRoot, nodeA, nodeB) {
      let space = 50;
      let tempR = this.currCircleR;
      var tempLinkId = "link_" + nodeA.id + "to" + nodeB.id;
      let link = nodeRoot
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", "1.5px")
        .attr("id", tempLinkId)
        .attr("d", function(d) {
          return (
            "M" +
            nodeA.dx +
            " " +
            (nodeA.dy + tempR) +
            "L" +
            nodeA.dx +
            " " +
            (nodeA.dy + space) +
            "L" +
            nodeB.dx +
            " " +
            (nodeA.dy + space) +
            "L" +
            nodeB.dx +
            " " +
            (nodeB.dy - tempR)
          );
        })
        .attr("style", function() {
          return "stroke: rgb(18, 150, 219)";
        })
        .attr("marker-end", "url(#arrow)");
      return link;
    },

    //获取节点
    getDataTestByNode: function() {
      var tempNodeList = [];
      tempNodeList.push({
        nodID: "0001",
        nodNam: "计算机",
        dx: 300,
        dy: 50
      });
      tempNodeList.push({
        nodID: "0002",
        nodNam: "CPU",
        dx: 100,
        dy: 150
      });
      tempNodeList.push({
        nodID: "0003",
        nodNam: "内存",
        dx: 300,
        dy: 150
      });
      tempNodeList.push({
        nodID: "0004",
        nodNam: "电源",
        dx: 500,
        dy: 150
      });
      tempNodeList.push({
        nodID: "0005",
        nodNam: "结束",
        dx: 300,
        dy: 250
      });
      return tempNodeList;
    },

    getDataTestByLink: function() {
      var tempLinkList = [];
      tempLinkList.push({
        AnodeId: "0001",
        ZnodeId: "0002"
      });
      tempLinkList.push({
        AnodeId: "0001",
        ZnodeId: "0003"
      });
      tempLinkList.push({
        AnodeId: "0001",
        ZnodeId: "0004"
      });
      tempLinkList.push({
        AnodeId: "0002",
        ZnodeId: "0005"
      });
      tempLinkList.push({
        AnodeId: "0003",
        ZnodeId: "0005"
      });
      tempLinkList.push({
        AnodeId: "0004",
        ZnodeId: "0005"
      });
      return tempLinkList;
    }
  },

  computed: {},

  watch: {},

  mounted: function() {
    //数据模拟
    this.flowChart("#flowChart");
  }
};
</script>


<style>
.node {
  font: 12px sans-serif;
  width: 53px;
  height: 53px;
}
.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}

.link--doing {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
  animation: bounce 3s infinite;
}

.node-circle-doing {
  animation: bounce 3s infinite;
}

.cardInfo {
  width: 240px;
  height: 140px;
  position: absolute;
  font: 0.7em Segoe UI, Microsoft YaHei;
  background-color: #efefef;
  color: #b57474;
  z-index: 10;
}

.cardInfo .el-row {
  margin-bottom: 10px;
}
</style>