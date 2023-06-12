import { SwapWrapper, SwapTitle } from './styled'

import Footer from '@/components/Footer'
import SwapMode from './components/SwapMode'
import { useTranslation } from 'react-i18next'

const SwapPage = () => {
  const { t } = useTranslation()
  return (
    <SwapWrapper>
      <SwapTitle>{t('swap.tabber.title1')}</SwapTitle>
      <SwapMode />
      <Footer />
    </SwapWrapper>
  )
}

export default SwapPage
