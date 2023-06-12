import { useCallback } from 'react'
import { Modal } from 'antd'
import { modalLayout } from '@/common/antd.cus'
import { ProposalsListTyps, ForAgainstVotersTypes } from '@/hooks/useProposalsHooks'
import { ProposalsInfoForAgainstDiv, ForAgainstModalContent, ListInfoDiv } from '@/pages/ProposalsInfo/styled'

import BigNumber from 'bignumber.js'
import { formatStrAddress } from '@/utils'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'

import ProgressBar from './ProgressBar'
import { useBoolean } from 'ahooks'
import { useTranslation } from 'react-i18next'

interface Types {
  proposalsDetails: ProposalsListTyps
  titles: 'For' | 'Against'
}

const ProposalsInfoForAgainstDivs = ({ proposalsDetails, titles }: Types) => {
  const { windowSize } = useWindowSizeHooks()
  const { t } = useTranslation()

  const dataInit: DataTypes = useDataHooks()
  const { blockExplorerUrl } = dataInit.data

  const [show, setShow] = useBoolean(false)

  const ProgressBarWindows = useCallback(
    ({ num, color }: { num: number; color: string }) => <ProgressBar color={color} percent={num} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [windowSize.innerWidth, proposalsDetails],
  )

  const ListInfo = ({ item }: { item: ForAgainstVotersTypes }) => (
    <ListInfoDiv>
      <a href={`${blockExplorerUrl}/address/${item.voter}`} target="_blank" rel="noopener noreferrer">
        {formatStrAddress(6, 4, item.voter)}
      </a>
      <span>{Number(item.weight).toLocaleString('en-US', { maximumFractionDigits: 6, style: 'decimal' })}</span>
    </ListInfoDiv>
  )

  return (
    <ProposalsInfoForAgainstDiv>
      <div className="view-tabbar">
        <div className="title">
          <h3>{t(titles)}</h3>
          <h3>{titles === 'For' ? proposalsDetails.favorVotes : proposalsDetails.againstVotes}</h3>
        </div>
        <div className="progress-bar">
          <ProgressBarWindows
            num={Number(
              new BigNumber(titles === 'For' ? proposalsDetails.favorVotes : proposalsDetails.againstVotes)
                .div(new BigNumber(proposalsDetails.favorVotes).plus(proposalsDetails.againstVotes))
                .toFixed(4),
            )}
            color={titles === 'For' ? '#7CCFAC' : '#FF9F9F'}
          />
        </div>
      </div>
      <div className="top-voters-list">
        <div className="top-voters-title">{t('details.top.voters')}</div>
        {titles === 'For'
          ? proposalsDetails.forVoters?.filter((f, i) => i < 10).map((f, i) => <ListInfo key={i} item={f} />)
          : proposalsDetails.againstVoters?.filter((a, i) => i < 10).map((a, i) => <ListInfo key={i} item={a} />)}
      </div>
      <div className="view" onClick={() => void setShow.setTrue()}>
        {t('details.view.all')}
      </div>
      <Modal {...modalLayout} wrapClassName="common-modal proposals-info-modal" visible={show} onCancel={setShow.setFalse} closable={false}>
        <div className="h3" style={{ marginBottom: '1.5rem' }}>
          <span>{t(titles)}</span>
          <span>{titles === 'For' ? proposalsDetails.favorVotes : proposalsDetails.againstVotes}</span>
        </div>
        <ForAgainstModalContent>
          {titles === 'For'
            ? proposalsDetails.forVoters?.map((item, i) => <ListInfo key={i} item={item} />)
            : proposalsDetails.againstVoters?.map((item, i) => <ListInfo key={i} item={item} />)}
        </ForAgainstModalContent>
      </Modal>
    </ProposalsInfoForAgainstDiv>
  )
}

export default ProposalsInfoForAgainstDivs
