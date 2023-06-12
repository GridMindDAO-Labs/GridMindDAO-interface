import { TokensSelectWrapper, PopoverContent } from './styled'
import { Popover, Button } from 'antd'
import Icon from '@ant-design/icons'
import { useState } from 'react'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { ArrawSvg } from './icon'
import { TokenSelectOptionsType } from '@/common/type'

interface Types {
  color?: string
  returnClick: (s: string) => void
}

const TokensSelectPage = ({ color = '#fff', returnClick }: Types) => {
  const [move, setMoveSwitch] = useState(false)
  const dataInit: DataTypes = useDataHooks()
  const { tokenSelectOptions } = dataInit.data

  const [value, setValue] = useState<string>(tokenSelectOptions[0].value)

  const handleOptionsChange = (e: TokenSelectOptionsType) => {
    setValue(e.value)
    returnClick(e.address)
    setMoveSwitch(false)
  }

  const content = (
    <PopoverContent>
      {tokenSelectOptions.map((o, key) => (
        <div className={o.value === value ? 'info active' : 'info'} key={key} onClick={() => handleOptionsChange(o)}>
          <div className="ions">{o.icon}</div>
          <h5>{o.value}</h5>
        </div>
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
            {tokenSelectOptions.find((it) => it.value === value)?.icon}
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

export default TokensSelectPage
