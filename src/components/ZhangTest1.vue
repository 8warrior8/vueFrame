<template>
  <div>
    <div id="main" style="width: 100%; height: 500px"></div>
    <transition name="el-zoom-in-top">
      <el-card
        shadow="always"
        class="cardInfo"
        v-show="cardInfo.show"
        :body-style="{ padding: '10px' }"
        v-bind:style="{top:getCardTop,left:getCardLeft}"
      >
        <span>弹出窗口测试1</span>
        <span>弹出窗口测试1</span>
        <span>弹出窗口测试1</span>
      </el-card>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: 800,
      screenHeight: 600,
      cardInfo: {
        show: false,
        type: 0,
        top: 0,
        left: 0
      }
    };
  },

  computed: {
    getCardTop() {
      let top = this.screenHeight * 0.95;
      if (this.cardInfo.top + 140 + 10 > top) {
        return this.cardInfo.top - 140 - 40 + "px";
      }
      return this.cardInfo.top - 40 + "px";
    },
    getCardLeft() {
      let left = this.screenWidth * 0.95;
      if (this.cardInfo.left + 240 + 10 > left) {
        return this.cardInfo.left - 240 + 20 + "px";
      }
      return this.cardInfo.left + 20 + "px";
    }
  },

  methods: {
    /* 绘制图表 */
    drawChart() {
      var circleR = 20; //圆形R对应的半径
      //this.screenWidth = document.getElementById("main").offsetWidth; // 获取 DOM 宽度
      //this.screenHeight = document.getElementById("main").offsetHeight; // 获取 DOM 高度

      this.screenWidth = 1020; // 获取 DOM 宽度
      this.screenHeight = 1020; // 获取 DOM 高度

      let svg = this.$d3
        .select("#main") // 选择 ID 为 main 的元素
        .append("svg") // 定义 svg
        .attr("width", this.screenWidth) // 设置 svg 宽度
        .attr("height", this.screenHeight) // 设置 svg 高度
        .on("click", this.svgBackGroundClick);

      // svg 的 g 元素类似于 div，加入的元素都放在 g 里面，g 可以设置统一的 css，里面的子元素会继承可继承css属性
      let g = svg.append("g").attr("transform", "translate(0,50)");

      let tree = this.$d3
        .tree() // 定义集群图布局
        .size([this.screenWidth, this.screenHeight - 100]); // 设定尺寸，即转换后的各节点的坐标在哪一个范围内

      var data = this.getTestData();
      let root = this.$d3.hierarchy(data); // 构建一个具有根节点的新的层级结构数据
      let space = ((this.screenHeight - 150) / root.height) * 0.8; // 设置上下层间隔
      tree(root); // 根据指定的根节点代表的hierarchy数据生成一个树状布局数据
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

      let link = g
        .selectAll(".link") // 生成边，利用 svg 的 path
        .data(root.descendants().slice(1))
        .enter()
        .append("path")
        .attr("id", function(d, index) {
          if (d && d.data &&  d.data.id  && d.parent && d.parent.data &&  d.parent.data.id) {
            return "path_" + d.data.id.toString() + "to" + d.parent.data.id.toString();
          }
          return "path_" + index.toString();
        })
        .attr("class", "link")
        .attr("d", function(d) {
          return (
            "M" +
            d.parent.x +
            " " +
            d.parent.y +
            "L" +
            d.parent.x +
            " " +
            (d.parent.y + space) +
            "L" +
            d.x +
            " " +
            (d.parent.y + space) +
            "L" +
            d.x +
            " " +
            (d.y - circleR)
          );
        })
        .attr("style", function() {
          return "stroke: rgb(18, 150, 219)";
        })
        .attr("marker-end", "url(#arrow)");

      let node = g
        .selectAll(".node") // 生成节点
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("id", function(d, index) {
          if (d && d.data && d.data.id) {
            return "node_" + d.data.id.toString();
          }
          return "node_" + index.toString();
        })
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .on("click", this.svgNodeClick);
      node
        .append("circle") // 绘制圆圈
        .attr("r", circleR)
        .attr("style", "fill: rgb(18, 150, 219)")
        .attr("class", d => {
          return "node-circle-doing";
        });
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
        .attr("dx", function(d) {
          return 20;
        })
        .attr("dy", 30)
        .style("text-anchor", function(d) {
          return "middle";
        })
        .style("fill", "red")
        .style("font-size", "12px")
        .text(function(d) {
          return d.data.name;
        });
    },

    //SVG背景单击事件
    svgBackGroundClick: function() {
      if (this.cardInfo.show === true) {
        this.cardInfo.show = false;
      }
    },

    //svg节点单击事件
    svgNodeClick: function(d) {
      const d3 = this.$d3;
      this.cardInfo.show = !this.cardInfo.show;
      if (this.cardInfo.show == true) {
        this.cardInfo.top = d3.event.offsetY;
        this.cardInfo.left = d3.event.offsetX;
      }
      d3.event.stopPropagation();
    },

    setTimerShowUi: function() {
      var self = this;
      setTimeout(function() {
        var tempNode = document.querySelector("#node_100001001004");
        if (tempNode) {
          var tempRect = tempNode.getBoundingClientRect();
          self.cardInfo.show = !self.cardInfo.show;
          if (self.cardInfo.show == true) {
            self.cardInfo.top = tempRect.top;
            self.cardInfo.left = tempRect.left;
          }
        }
      }, 1000);
    },

    getTestData: function() {
      var testData = {
        name: "BOMC",
        id: "100",
        children: [
          {
            name: "AutoOps",
            id: "100001",
            children: [
              {
                name: "MQBridg",
                id: "100001001",
                children: [
                  {
                    name: "B域",
                    id: "100001001001",
                    children: [
                      {
                        name: "B域",
                        id: "100001001001001"
                      }
                    ]
                  },
                  {
                    name: "O域",
                    id: "100001001002",
                    children: [
                      {
                        name: "O域",
                        id: "100001001002001"
                      }
                    ]
                  },
                  {
                    name: "M域",
                    id: "100001001003",
                    children: [
                      {
                        name: "M域",
                        id: "100001001003001"
                      }
                    ]
                  },
                  {
                    name: "D域",
                    id: "100001001004",
                    children: [
                      {
                        name: "D域",
                        id: "100001001004001"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "流程",
            id: "100002",
            children: [
              {
                name: "流程引擎",
                id: "100002001",
                children: [
                  {
                    name: "接口",
                    id: "100002001001"
                  }
                ]
              }
            ]
          },
          {
            name: "报表",
            id: "100003",
            children: [
              {
                name: "ORACLE",
                id: "100003001"
              }
            ]
          },
          {
            name: "资源",
            id: "100004",
            children: [
              {
                name: "MongoDB",
                id: "100004001",
                children: [
                  {
                    name: "流程引擎",
                    id: "100004001001"
                  },
                  {
                    name: "接口",
                    id: "100004001002"
                  }
                ]
              }
            ]
          },
          {
            name: "监控",
            id: "100005",
            children: [
              {
                name: "服务",
                id: "100005001",
                children: [
                  {
                    name: "MySql",
                    id: "100005001001"
                  },
                  {
                    name: "DC",
                    id: "100005001002",
                    children: [
                      {
                        name: "PMMSC",
                        id: "100005001002001",
                        children: [
                          {
                            name: "GPAS",
                            id: "100005001002001001",
                            children: [
                              {
                                name: "STORM",
                                id: "100005001002001001001",
                                children: [
                                  {
                                    name: "ORACLE",
                                    id: "100005001002001001001001"
                                  },
                                  {
                                    name: "GEVT",
                                    id: "100005001002001001001002",
                                    children: [
                                      {
                                        name: "告警",
                                        id: "100005001002001001001002001"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        name: "STORM",
                        id: "100005001002002",
                        children: [
                          {
                            name: "GEVT",
                            id: "100005001002002001",
                            children: [
                              {
                                name: "告警",
                                id: "100005001002002001001"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "采集",
            id: "100006",
            children: [
              {
                name: "服务",
                id: "100006001",
                children: [
                  {
                    name: "MySql",
                    id: "100006001001"
                  },
                  {
                    name: "DC",
                    id: "100006001002",
                    children: [
                      {
                        name: "PMMSC",
                        id: "100006001002001",
                        children: [
                          {
                            name: "GPAS",
                            id: "100006001002001001",
                            children: [
                              {
                                name: "STORM",
                                id: "100006001002001001001",
                                children: [
                                  {
                                    name: "ORACLE",
                                    id: "100006001002001001001001"
                                  },
                                  {
                                    name: "GEVT",
                                    id: "100006001002001001001002",
                                    children: [
                                      {
                                        name: "告警",
                                        id: "100006001002001001001002001"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        name: "STORM",
                        id: "100005001002002",
                        children: [
                          {
                            name: "GEVT",
                            id: "100005001002002001",
                            children: [
                              {
                                name: "告警",
                                id: "100005001002002001001"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
      return testData;
    }
  },
  mounted() {
    this.drawChart();
    this.setTimerShowUi();
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