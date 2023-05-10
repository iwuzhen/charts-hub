import * as echarts from 'echarts'

import _ from 'lodash'

const theme_config = {
  color: [
    '#c12e34',
    '#e6b600',
    '#0098d9',
    '#2b821d',
    '#005eaa',
    '#339ca8',
    '#cda819',
    '#32a487',
    '#333333',
    '#ac2828',
  ],
  backgroundColor: 'rgba(0,0,0,0)',
  textStyle: {},
  title: {
    textStyle: {
      color: '#333333',
    },
    subtextStyle: {
      color: '#aaaaaa',
    },
  },
  line: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false,
  },
  radar: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#ccc',
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  candlestick: {
    itemStyle: {
      color: '#c12e34',
      color0: '#2b821d',
      borderColor: '#c12e34',
      borderColor0: '#2b821d',
      borderWidth: 1,
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
    lineStyle: {
      width: 1,
      color: '#aaaaaa',
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false,
    color: [
      '#c12e34',
      '#e6b600',
      '#0098d9',
      '#2b821d',
      '#005eaa',
      '#339ca8',
      '#cda819',
      '#32a487',
      '#333333',
      '#ac2828',
    ],
    label: {
      color: '#eeeeee',
    },
  },
  map: {
    itemStyle: {
      areaColor: '#ddd',
      borderColor: '#eee',
      borderWidth: 0.5,
    },
    label: {
      color: '#c12e34',
    },
    emphasis: {
      itemStyle: {
        areaColor: '#e6b600',
        borderColor: '#ddd',
        borderWidth: 1,
      },
      label: {
        color: '#c12e34',
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: '#ddd',
      borderColor: '#eee',
      borderWidth: 0.5,
    },
    label: {
      color: '#c12e34',
    },
    emphasis: {
      itemStyle: {
        areaColor: '#e6b600',
        borderColor: '#ddd',
        borderWidth: 1,
      },
      label: {
        color: '#c12e34',
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#333',
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: [
          '#ccc',
        ],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)',
        ],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#333',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [
          '#ccc',
        ],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)',
        ],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#333',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [
          '#ccc',
        ],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)',
        ],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#333',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [
          '#ccc',
        ],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)',
        ],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: '#06467c',
    },
    emphasis: {
      iconStyle: {
        borderColor: '#4187c2',
      },
    },
  },
  legend: {
    textStyle: {
      color: '#333333',
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1,
      },
      crossStyle: {
        color: '#cccccc',
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: '#005eaa',
      width: 1,
    },
    itemStyle: {
      color: '#005eaa',
      borderWidth: 1,
    },
    controlStyle: {
      color: '#005eaa',
      borderColor: '#005eaa',
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: '#005eaa',
      borderColor: '#316bc2',
    },
    label: {
      color: '#005eaa',
    },
    emphasis: {
      itemStyle: {
        color: '#005eaa',
      },
      controlStyle: {
        color: '#005eaa',
        borderColor: '#005eaa',
        borderWidth: 0.5,
      },
      label: {
        color: '#005eaa',
      },
    },
  },
  visualMap: {
    color: [
      '#1790cf',
      '#a2d4e6',
    ],
  },
  dataZoom: {
    backgroundColor: 'rgba(47,69,84,0)',
    dataBackgroundColor: 'rgba(47,69,84,0.3)',
    fillerColor: 'rgba(167,183,204,0.4)',
    handleColor: '#a7b7cc',
    handleSize: '100%',
    textStyle: {
      color: '#333333',
    },
  },
  markPoint: {
    label: {
      color: '#eeeeee',
    },
    emphasis: {
      label: {
        color: '#eeeeee',
      },
    },
  },
}

const user_config = {
  // color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#003399', '#333366', '#663366', '#CC0099'],
  title: {
    left: 'center',
  },
  yAxis: {
    axisLine: {
      show: true,
    },
    axisLabel: {
      show: true,
      formatter: (value: any) => {
        return value
      },
    },
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
      align: 'left',
    },
    axisPointer: {
      type: 'cross',
      animation: true,
      label: {
        backgroundColor: '#505765',
      },
    },
    // formatter(params: any, ticket: string) {
    //   params.sort((x: { data: number }, y: { data: number | undefined }) => {
    //     if (y.data === undefined)
    //       return -1

    //     return y.data - x.data
    //   })
    //   let showHtm = ` ${params[0].name}<br>`
    //   for (let i = 0; i < params.length; i++) {
    //     if (params[i].data === undefined)
    //       continue

    //     const _text = params[i].seriesName
    //     const _data = params[i].data
    //     const _marker = params[i].marker
    //     showHtm += `${_marker}${_text}：${_data}<br>`
    //   }
    //   return showHtm
    // },
  },
  legend: {
    type: 'scroll',
    left: '82%',
    right: 'left',
    top: 'middle',
    textStyle: {
      fontSize: 13,
    },
    orient: 'vertical',
  },
  grid: {
    left: '2%',
    right: '20%',
    bottom: '5%',
    containLabel: true,
  },
  toolbox: {
    right: 0,
    top: 0,
    orient: 'vertical',
    feature: {
      saveAsImage: {},
      dataZoom: {
        yAxisIndex: 'none',
      },
      dataView: { readOnly: false },
      // magicType: { type: ['line', 'bar'] },
      restore: {},
    },
  },
}

// const obj = JSON.parse(data)
echarts.registerTheme('myTheme_1', _.merge(theme_config, user_config))
