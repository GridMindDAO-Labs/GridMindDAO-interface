import { Progress } from '@ant-design/plots'

interface Types {
  percent: number
  color: string
}

const ProgressPages = ({ percent, color }: Types) => {
  const config = {
    height: 15,
    autoFit: false,
    percent,
    barWidthRatio: 0.33,
    color: [color, '#EBEBEB'],
  }
  return <Progress {...config} />
}

export default ProgressPages
