import { useState } from 'react'
import { message, Popover, Button } from 'antd'
import { SwitchLanguageWrapper, SwitchPopoverDiv } from './styled'
import { useTranslation } from 'react-i18next'
import Icon from '@ant-design/icons'
import { LanguageSvg } from '@/common/icon'
import { languageList } from '@/utils/i18n'

const SwitchLanguagePage = () => {
  const { i18n, t } = useTranslation()
  const [move, setMoveSwitch] = useState(false)

  const languageChange = (str: string) => i18n.changeLanguage(str)

  const languageChangeSwitch = (str: string) => {
    languageChange(str)
    message.info({
      content: t('app.switch.language.tips', { msg: languageList.find((l) => l.locale === str)?.value }),
      className: 'message-global',
    })
    setMoveSwitch(false)
  }

  const SwitchPopover = () => (
    <SwitchPopoverDiv>
      {languageList.map((l, i) => (
        <p onClick={() => languageChangeSwitch(l.locale)} key={i} className={l.locale === i18n.language ? 'active' : ''}>
          {l.value}
        </p>
      ))}
    </SwitchPopoverDiv>
  )

  return (
    <SwitchLanguageWrapper>
      <Popover content={SwitchPopover} visible={move} onVisibleChange={(v) => setMoveSwitch(v)}>
        <Button type="text" className="switch-btn">
          <Icon component={LanguageSvg} />
          <span>{languageList.find((item: any) => item.locale === i18n.language)?.value}</span>
        </Button>
      </Popover>
    </SwitchLanguageWrapper>
  )
}

export default SwitchLanguagePage
