import { ExchgangeRateDiv } from '@/pages/Swap/styled'
import InputAmount from '@/components/InputAmount'

type Types = {
  isMaxMin: boolean
  hour: boolean
  setHour: (hour: boolean) => void
  amount: number | undefined
  setAmount: (amount: number | undefined) => void
}

const ExchgangeRatePage = ({ isMaxMin, hour, setHour, amount, setAmount }: Types) => {
  return (
    <ExchgangeRateDiv isBool={hour}>
      <div className="title">{isMaxMin ? 'Minimum Exchange Rate' : 'Highest Exchange Rate'}</div>
      <InputAmount setHour={setHour} amount={amount} setAmount={setAmount}></InputAmount>
      <div className="title" style={{ margin: '0.19rem 0 0.75rem' }}>
        CMD per ETH
      </div>
    </ExchgangeRateDiv>
  )
}

export default ExchgangeRatePage
