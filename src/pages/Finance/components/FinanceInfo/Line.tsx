import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { useCallback } from 'react'

interface Types {
  data: any[]
  widths: any
}

const LinePage = ({ data, widths }: Types) => {
  const option: any = {
    color: '#FBB665',
    xAxis: {
      type: 'category',
      data: data.flatMap((x) => x.times),
    },
    grid: {
      left: '10',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} %',
      },
    },
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%']
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(255, 237, 218, 0.4)',
        },
      },
      formatter: '{c} %',
    },
    series: [
      {
        data: data.flatMap((x) => x.value),
        type: 'line',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 237, 218, 0.5)',
            },
            {
              offset: 1,
              color: 'rgba(255, 237, 218, 0.7)',
            },
          ]),
        },
      },
    ],
  }

  const ReactEchartsData = useCallback(() => {
    return <ReactEcharts option={option} style={{ width: widths === 0 ? '100%' : widths - 40, height: '18.75rem' }} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, option, widths])

  return <ReactEchartsData />
}

export default LinePage
