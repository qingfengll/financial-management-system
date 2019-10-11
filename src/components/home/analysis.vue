<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          <p class="total-income">月总收入<i class="el-icon-trophy icon"></i></p>
          <p class="total-income-value">￥12600</p>
          <p class="ratio">周同上月比<span class="ratio-value">12%</span></p>
          <hr color="#E0E0E0" />
          <p class="day-income">日均收入<span>￥12423</span></p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <p class="total-income">月总支出<i class="el-icon-trophy icon"></i></p>
          <p class="total-income-value">￥9600</p>
          <p class="ratio">员工工资<span class="ratio-value">3000</span></p>
          <hr color="#E0E0E0" />
          <p class="day-income">日均支出<span>￥400</span></p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <p class="total-income">月总材料进购<i class="el-icon-trophy icon"></i></p>
          <p class="total-income-value">￥8000</p>
          <p class="ratio">材料剩余<span class="ratio-value">3600</span></p>
          <hr color="#E0E0E0" />
          <p class="day-income">日均支出<span>￥1600</span></p>
        </el-card>
      </el-col>
    </el-row>
    <el-tabs type="border-card" v-model="tabValue" @tab-click="handleChange()" style="margin-top:20px">
      <el-tab-pane v-for="(item) in tabArray" :label="item.label" :key="item.name" :name="item.name">
        <div :id="item.name" style="width:1000px;height:400px;"></div>
      </el-tab-pane>
    </el-tabs>
    <el-row :gutter="12" class="charts">
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="chartsIncome" style="width:500px;height:400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="chartsOutput" style="width:500px;height:400px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data: function() {
    return {
      backgroundColor: '#003',
      tabValue: 'today',
      tabArray: [
        { label: '今日', name: 'today' },
        { label: '本周', name: 'week' },
        { label: '本月', name: 'month' },
        { label: '今年', name: 'year' }
      ]
    };
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      console.log(this.tabValue);
      let myChart = this.$echarts.init(document.getElementById(this.tabValue));
      // 指定图表的配置项和数据
      let option = {
        color: ['#3398DB'],
        title: {
          text: '销售额趋势'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 30, 15, 40, 40, 20, 11]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawEcharts() {
      let myChart = this.$echarts.init(
        document.getElementById('chartsIncome')
      );
      let myChart2 = this.$echarts.init(
        document.getElementById('chartsOutput')
      );
      let option = {
        title: {
          text: '收入具体占比',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['零件出售', '部件出售', '公司签约', '套装出售', '其他收入']
        },
        series: [
          {
            name: '收入来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '零件出售' },
              { value: 310, name: '部件出售' },
              { value: 234, name: '公司签约' },
              { value: 135, name: '套装出售' },
              { value: 1548, name: '搜索引其他收入擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      let option2 = {
        title: {
          text: '支出具体占比',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['员工工资', '水电支出', '材料进购', '物业支出', '其他支出']
        },
        series: [
          {
            name: '支出方式',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 100, name: '员工工资' },
              { value: 210, name: '水电支出' },
              { value: 1000, name: '材料进购' },
              { value: 100, name: '物业支出' },
              { value: 234, name: '其他支出' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
       myChart.setOption(option);
       myChart2.setOption(option2);
    },
    handleChange() {
      this.drawChart();
    }
  },
  mounted() {
    this.drawChart();
    this.drawEcharts();
  }
};
</script>

<style scoped>
.total-income {
  color: #909090;
  font-size: 14px;
}
.total-income-value {
  font-size: 30px;
  line-height: 60px;
}
.ratio {
  color: #909090;
  font-size: 14px;
  margin-bottom: 15px;
}
.ratio-value {
  color: #686868;
  margin-left: 10px;
  font-size: 16px;
}
.day-income {
  color: #909090;
  font-size: 14px;
  margin-top: 15px;
}
.day-income > span {
  margin-left: 10px;
  color: #585858;
  font-size: 16px;
}
.icon {
  float: right;
}
.charts {
  margin-top: 20px;
}
</style>
