import { TokensSelectWrapper, PopoverContent, SwapClickDiv } from './styled'
import { Popover, Button } from 'antd'
import Icon from '@ant-design/icons'
import { useEffect, useState } from 'react'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { ArrawSvg } from './icon'
import { TokenSelectOptionsType } from '@/common/type'

interface Types {
  color?: string
  values?: string
  disabled: string
  returnClick: (s: string) => void
}

const SwapTokensSelectPage = ({ color = '#fff', returnClick, values, disabled }: Types) => {
  const [move, setMoveSwitch] = useState(false)
  const dataInit: DataTypes = useDataHooks()
  const { SwapSelectOptions } = dataInit.data

  const [value, setValue] = useState<string>(() => {
    if (values) {
      let s = SwapSelectOptions.filter((item) => item.address.toLowerCase() === values.toLowerCase())
      console.log(s)
      return s.length > 0 ? s[0].value : SwapSelectOptions[0].value
    }
    return SwapSelectOptions[0].value
  })

  const handleOptionsChange = (e: TokenSelectOptionsType) => {
    setValue(e.value)
    returnClick(e.address)
    setMoveSwitch(false)
  }

  useEffect(() => {
    if (values) handleWatchValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const handleWatchValues = async () => {
    if (values) {
      let s = SwapSelectOptions.filter((item) => item.address.toLowerCase() === values.toLowerCase())
      console.log(s)
      setValue(s.length > 0 ? s[0].value : SwapSelectOptions[0].value)
    }
  }

  const content = (
    <PopoverContent>
      {SwapSelectOptions.map((o, key) => (
        <SwapClickDiv
          isClick={disabled.toLowerCase() === o.address.toLowerCase()}
          className={o.value === value ? 'info active' : 'info'}
          key={key}
          onClick={() => {
            if (disabled.toLowerCase() === o.address.toLowerCase()) return
            handleOptionsChange(o)
          }}
        >
          <div className="ions">{o.icon}</div>
          <h5>{o.value}</h5>
        </SwapClickDiv>
      ))}
    </PopoverContent>
  )

  return (
    <TokensSelectWrapper>
      <Popover
        overlayClassName="tokens-popover"
        visible={move}
        onVisibleChange={(v) => setMoveSwitch(v)}
        content={content}
        placement="bottom"
      >
        <Button type="primary" style={{ background: color }}>
          <div className="leftss">
            {SwapSelectOptions.find((it) => it.value === value)?.icon}
            <h5>{value}</h5>
          </div>
          <div className="rightss">
            <Icon component={ArrawSvg} />
          </div>
        </Button>
      </Popover>
    </TokensSelectWrapper>
  )
}

export default SwapTokensSelectPage
