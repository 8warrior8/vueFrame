<template>
  <div class="ln-mobile-alarm">
    <div id="main"></div>
    <transition name="el-zoom-in-top">
      <el-card
        shadow="always"
        class="cardInfo"
        v-show="cardInfo.show"
        :body-style="{ padding: '0' }"
        v-bind:style="{top:getCardTop,left:getCardLeft}"
      >
        <div>
          <div>故障诊断</div>
          <div><img src="../../static/ln_mobile_alarm/arrow_l_1.png" /></div>
          <div>处理方案</div>
          <div><img src="../../static/ln_mobile_alarm/arrow_l_1.png" /></div>
          <div>诊断</div>
          <div><img src="../../static/ln_mobile_alarm/arrow_l_1.png" /></div>
          <div>自愈</div>
        </div>
        <div>
          <div>CPU超阈值告警</div>
          <div></div>
          <div>应急切换</div>
        </div>
      </el-card>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        screenWidth: 800,
        screenHeight: 600,
        curSVGg:null,
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
        if (this.cardInfo.top + 80 + 20 > top) {
          return this.cardInfo.top - 160 + 40 + "px";
        }
        return this.cardInfo.top - 30 + "px";
      },
      getCardLeft() {
        let left = this.screenWidth * 0.95;
        if (this.cardInfo.left + 130 + 20 > left) {
          return this.cardInfo.left - 260 - 40 + "px";
        }
        return this.cardInfo.left + 30 + "px";
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
        this.curSVGg=svg.append("g").attr("transform", "translate(0,50)");
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
          .attr("fill", "rgb(132, 194, 147)")
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
              (d.parent.y+circleR)+
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
            return "stroke: rgb(132, 194, 147)";
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
          .attr("style", "fill: rgb(0, 47, 183)")
          .attr("stroke", "rgb(255, 255, 255)")
          .attr("stroke-width", "2")
//          .attr("class", d => {
//            return "node-circle-doing";
//          });
        node
          .append("image") //增加图片标签
          .attr("width", 30)
          .attr("height", 30)
          .attr("xlink:href",function(d, index) {
            if (d && d.data && d.data.src) {
              return "static/ln_mobile_alarm/" + d.data.src.toString();
            }
          })
          .attr("src", function(d, index) {
            if (d && d.data && d.data.src) {
              return "static/ln_mobile_alarm/" + d.data.src.toString();
            }
          })
          .attr("x", -15)
          .attr("y", -15);
        node
          .append("text") // 绘制文本
          .attr("dx", function(d) {
            if (d && d.data && d.data.src) {
              return 30;
            }else{
              return 0;
            }
          })
          .attr("dy", function(d, index) {
            if (d && d.data && d.data.src) {
              return 30;
            }else{
              return 5;
            }
          })
          .style("text-anchor", function(d) {
            return "middle";
          })
          .style("fill", "#fff")
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
          this.cardInfo.top = d.y;
          this.cardInfo.left = d.x;
//          this.cardInfo.top = d3.event.offsetY;
//          this.cardInfo.left = d3.event.offsetX;
        }
        d3.event.stopPropagation();
      },

      setTimerShowUi: function() {
        var self = this;
        var i=0;
        var nodelist=['node_100001','node_100001001','node_100001001001','node_100001001001001','node_100001001002','node_100001001002001','node_100001001003','node_100001001003001','node_100001001004'];
        var linelist=['path_100001to100','path_100001001to100001','path_100001001001to100001001','path_100001001001001to100001001001','path_100001001002to100001001','path_100001001002001to100001001002','path_100001001003to100001001','path_100001001003001to100001001003','path_100001001004to100001001'];
        setInterval(function() {
          if(i>=nodelist.length){
            return;
          }
          var tempNode = document.querySelector("#"+nodelist[i]);
          if(i!==0){
            var lastNode = document.querySelector("#"+nodelist[i-1]);
          }
          var tempLine = document.querySelector("#"+linelist[i]);
          if(i!==0){
            lastNode.firstChild.classList.value="";
          }
          tempNode.firstChild.classList.value="node-circle-doing";
//        tempLine.classList.value="link link--doing";
          self.curSVGg.select("path").remove();
          self.curSVGg.append("path")
            .attr("id", 'A001')
            .attr("class", "link link--doing")
            .attr("d",tempLine.attributes.d.value.toString())
            .attr("style", function() {
              return "stroke: rgb(132, 194, 147)";
            });
          if(i==nodelist.length-1){
            if (tempNode) {
              var tempRect = tempNode.getBoundingClientRect();
              self.cardInfo.show = !self.cardInfo.show;
              if (self.cardInfo.show == true) {
                self.cardInfo.top = tempRect.top-Math.round(tempRect.height/2);
                self.cardInfo.left = tempRect.left+Math.round(tempRect.width/2);
              }
            }
          }
          i++;
        }, 3000);
      },

      getTestData: function() {
        var testData = {
          name: "BOMC",
          id: "100",
          src:"right_ico_2.png",
          children: [
            {
              name: "AutoOps",
              id: "100001",
              src:"right_ico_1.png",
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
              src:"right_ico_2.png",
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
              src:"right_ico_4.png",
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
              src:"right_ico_3.png",
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
              src:"right_ico_4.png",
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
              src:"right_ico_1.png",
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
  @keyframes regionLineAnimation {
    0% {
      stroke-dashoffset: 100;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes fade {
    from {
      opacity: 1.0;
    }
    50% {
      opacity: 0.5;
    }
    to {
      opacity: 1.0;
    }
  }
  @keyframes bounce {
    0% {
      /*stroke: #C63500;*/
      /*stroke-width: 0;*/
      fill: #C63500;
      /*transform: scale(0.8);*/
    }
    50% {
      /*stroke: #D91C12;*/
      /*stroke-width: 0.2em;*/
      fill: transparent;
      /*transform: scale(1.1);*/
    }
    to {
      /*stroke: #C63500;*/
      /*stroke-width: 0;*/
      fill: #C63500;
      /*transform: scale(0.8);*/
    }
  }
  .ln-mobile-alarm{
    width:100%;
    height:100%;
  }
  .ln-mobile-alarm #main{
    background: #000829;
  }
  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }

  .link--doing {
    /*animation: fade 2s ease-in-out infinite;*/
    stroke: red !important;
    stroke-miterlimit: 10;
    stroke-dasharray: 8, 8;
    stroke-dashoffset: 100;
    animation:regionLineAnimation 4s linear forwards infinite;
  }
  .node {
    width: 53px;
    height: 53px;
  }
  .node-circle-doing {
    animation: bounce 2s ease-in-out infinite;
  }

  .cardInfo {
    width: 260px;
    height: 160px;
    position: absolute;
    font-family:Microsoft YaHei;
    font-size: 14px;
    background-color: transparent;
    border:1px solid #023DCB;
    color: #fff;
    z-index: 10;
  }
  .cardInfo>div{
    width:100%;
    height:100%;
    display:flex;
  }
  .cardInfo>div>div{
    height:calc(100% - 20px);
    padding:10px;
    display:flex;
    flex-direction: column;
  }
  .cardInfo>div>div:nth-of-type(1){
    width:40%;
    justify-content: space-between;
    align-items: center;
    background: #020C33;
  }
  .cardInfo>div>div:nth-of-type(1) img{
    width:18px;
    height:18px;
  }
  .cardInfo>div>div:nth-of-type(1)>div:nth-of-type(1),.cardInfo>div>div:nth-of-type(1)>div:nth-of-type(3){
    color:#38FF33;
  }
  .cardInfo>div>div:nth-of-type(1)>div:nth-of-type(5),.cardInfo>div>div:nth-of-type(1)>div:nth-of-type(7){
    color:#00F6FF;
  }
  .cardInfo>div>div:nth-of-type(2){
    width:60%;
    background:rgba(7,27,115,0.6);
  }
  .cardInfo>div>div:nth-of-type(2)>div{
    height: 20px;
  }
</style>
