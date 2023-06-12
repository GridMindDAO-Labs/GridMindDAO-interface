import { useState } from 'react'
import { Col } from 'antd'
import Icon from '@ant-design/icons'
import { AiTokenSvg } from '@/pages/Swap/icon'
import { EthIconSvg } from '@/contracts/icon'
import {
  FluidityWrapper,
  FluidityTitle,
  CurrentTitle,
  FluidityContent,
  CurrentTokenDiv,
  FluidityToken,
  FluidityLevel,
  FluidityChoose,
  AmountInput,
  AmountInputDiv,
  AmountTitles,
  AmountMax,
  CurrentSubtitle,
  ExchgangeRate,
  FullRangeBtn,
  ExchangeSubmitBtn,
} from '@/pages/Swap/styled'

import ExchgangeRatePage from './ExchgangeRate'
import ChartRange from '@/components/LiquidityChartRangeInput'

const FluidityModePages = () => {
  const [minAmount, setMinAmount] = useState<number | undefined>(undefined)
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined)
  const [hour, setHour] = useState<boolean[]>([false, false])

  return (
    <FluidityWrapper>
      <FluidityTitle>Add Liquidity</FluidityTitle>
      <FluidityContent>
        <Col span={24} lg={{ span: 10 }} xl={{ span: 9 }}>
          <CurrentTitle>Select currency pair</CurrentTitle>
          <CurrentTokenDiv>
            <FluidityToken span={11}>
              <Icon component={AiTokenSvg} />
              <div className="span">GMD</div>
            </FluidityToken>
            <Col span={2}></Col>
            <FluidityToken span={11}>
              <Icon component={EthIconSvg} />
              <div className="span">ETH</div>
            </FluidityToken>
          </CurrentTokenDiv>
          <FluidityLevel>0.03% commission level</FluidityLevel>
          <FluidityChoose>choose 72%</FluidityChoose>
          <CurrentTitle>Recharge Amount</CurrentTitle>
          <AmountInputDiv>
            <AmountInput placeholder="0" />
            <FluidityToken>
              <Icon component={AiTokenSvg} />
              <div className="span">GMD</div>
            </FluidityToken>
            <AmountTitles>$ 4.68</AmountTitles>
            <AmountMax>
              <span>余额：0</span>
              <div className="max">最大值</div>
            </AmountMax>
          </AmountInputDiv>
          <AmountInputDiv>
            <AmountInput placeholder="0" />
            <FluidityToken>
              <Icon component={EthIconSvg} />
              <div className="span">ETH</div>
            </FluidityToken>
            <AmountTitles>$ 999.68</AmountTitles>
            <AmountMax>
              <span>余额：0</span>
              <div className="max">最大值</div>
            </AmountMax>
          </AmountInputDiv>
        </Col>
        <Col span={0} lg={{ span: 2 }} xl={{ span: 3 }}></Col>
        <Col span={24} lg={{ span: 12 }} xl={{ span: 12 }}>
          <CurrentTitle>Set exchange rate range</CurrentTitle>
          <CurrentSubtitle>Current exchange rate: 1637.08 DAI per ETH</CurrentSubtitle>
          <ChartRange />
          <ExchgangeRate>
            <ExchgangeRatePage
              isMaxMin={true}
              hour={hour[0]}
              setHour={(s1) =>
                setHour((s) => {
                  let newHour = [...s]
                  newHour[0] = s1
                  return newHour
                })
              }
              amount={minAmount}
              setAmount={(amount) => setMinAmount(amount)}
            />
            <ExchgangeRatePage
              isMaxMin={false}
              hour={hour[1]}
              setHour={(s1) =>
                setHour((s) => {
                  let newHour = [...s]
                  newHour[1] = s1
                  return newHour
                })
              }
              amount={maxAmount}
              setAmount={(amount) => setMaxAmount(amount)}
            />
          </ExchgangeRate>
          <FullRangeBtn>Full Range</FullRangeBtn>
          <ExchangeSubmitBtn>Smbmit</ExchangeSubmitBtn>
        </Col>
      </FluidityContent>
    </FluidityWrapper>
  )
}

export default FluidityModePages
