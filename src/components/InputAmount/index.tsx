import { Container, Input } from './styled'
import Icon from '@ant-design/icons'
import { LeftIcon, RightIcon } from './icon'
import BigNumber from 'bignumber.js'
import { useBoolean } from 'ahooks'
import { useEffect } from 'react'

type Types = {
  amount: number | undefined
  setHour: (hour: boolean) => void
  setAmount: (amount: number | undefined) => void
}

const InputAmountPages = ({ amount, setAmount, setHour }: Types) => {
  const [isHour, setIsHour] = useBoolean(false)

  useEffect(() => {
    setHour(isHour)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHour])

  return (
    <Container>
      <Icon
        component={LeftIcon}
        onClick={() => {
          let number = amount === undefined ? 1 : new BigNumber(amount).minus(1).toNumber()
          setAmount(number)
        }}
      />
      <Input
        type="number"
        step="0.01"
        onBlur={() => void setIsHour.setFalse()}
        onFocus={() => void setIsHour.setTrue()}
        value={amount}
        placeholder="0"
        onChange={(e: any) => {
          let number = e.target.value ? Number(e.target.value) : undefined
          setAmount(number ? Number(Number(number).toFixed(6)) : undefined)
        }}
      />
      <Icon
        component={RightIcon}
        onClick={() => {
          let number = amount === undefined ? 1 : new BigNumber(amount).plus(1).toNumber()
          setAmount(number)
        }}
      />
    </Container>
  )
}

export default InputAmountPages
