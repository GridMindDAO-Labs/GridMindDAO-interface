/* eslint-disable */
// import { useState } from 'react'
// import { Radio, Skeleton } from 'antd'
// import { useWeb3React } from '@web3-react/core'
// import { SwapWrapper } from './styled'
// import { FinanceTobbar } from '@/pages/Finance/styled'

// import Footer from '@/components/Footer'
// import SwapMode from './components/SwapMode'
// import FluidityMode from './components/FluidityMode'
// import { useTranslation } from 'react-i18next'

// const SwapPage = () => {
// const { isActive } = useWeb3React()
// const { t } = useTranslation()

// const [type, setType] = useState<'Swap' | 'Fluidity'>('Swap')

// const handleRadioChange = (values: any) => setType(values)

// return (
// <SwapWrapper>
//   <SwapMode />
//   <FinanceTobbar>
//   <Radio.Group defaultValue={type} value={type} buttonStyle="solid" onChange={(e) => handleRadioChange(e.target.value)}>
//     <Radio.Button value="Swap">{t('swap.tabber.title1')}</Radio.Button>
//     <Radio.Button value="Fluidity">{t('swap.tabber.title2')}</Radio.Button>
//   </Radio.Group>
// </FinanceTobbar>
// {type === 'Swap' ? (
//   <SwapMode />
// ) : (
//   <>
//     {isActive ? (
//       <FluidityMode />
//     ) : (
//       <>
//         <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
//         <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
//       </>
//     )}
//   </>
// )}
//       <Footer />
//     </SwapWrapper>
//   )
// }

// export default SwapPage
