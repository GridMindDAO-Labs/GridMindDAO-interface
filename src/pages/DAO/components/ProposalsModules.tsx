import { Table, Skeleton, Empty } from 'antd'
import type { PaginationProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Icon from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { votingListState } from '@/hooks/useDAOHooks'
import { Adapth5 } from '@/utils'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { LeftSvg, RigthSvg } from '@/pages/DAO/icon'
import { useNavigate } from 'react-router-dom'
import { ProposalsDiv, DelegatesModulesWrapper, PaginationBtn, VotingBtn } from '@/pages/DAO/styled'
import { useTranslation } from 'react-i18next'
import { useProposalsHooks, ProposalsListTyps } from '@/hooks/useProposalsHooks'
import { useState } from 'react'

const ProposalsModules = () => {
  let navigate = useNavigate()
  const { t } = useTranslation()

  const { isActive } = useWeb3React()
  const { windowSize } = useWindowSizeHooks()

  const [page, setPage] = useState<number>(1)

  const { loading, proposalsList, proposalsListTotal } = useProposalsHooks({ isActive, page })

  const empty = {
    emptyText: isActive ? (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('description')} />
    ) : (
      <Skeleton className="dao-skeleton" active={true} paragraph={{ rows: 4 }} />
    ),
  }

  const columns: ColumnsType<ProposalsListTyps> = [
    {
      title: t('dao.proposals.columns.title1'),
      dataIndex: 'title',
      key: 'title',
      width: 340,
      render: (text, record) => (
        <ProposalsDiv>
          {windowSize.innerWidth >= 768 && <span>{record.id}</span>}
          <p>{text}</p>
        </ProposalsDiv>
      ),
    },
    {
      title: t('dao.proposals.columns.title2'),
      key: 'state',
      align: 'right',
      width: windowSize.innerWidth >= 768 ? 180 : 140,
      render: (_, record) => (
        <VotingBtn
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={`voting-btn-${record.state}`}
        >
          {t(votingListState.find((item, i) => i === record.state) || '')}
        </VotingBtn>
      ),
    },
  ]

  const handleItemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <PaginationBtn>{t('dao.delegate.prev')}</PaginationBtn>
    }
    if (type === 'next') {
      return <PaginationBtn>{t('dao.delegate.next')}</PaginationBtn>
    }
    return originalElement
  }

  const handleItemRenderH5: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <Icon component={LeftSvg} />
    }
    if (type === 'next') {
      return <Icon component={RigthSvg} />
    }
    return originalElement
  }

  const handleOnRowClick = async (event: ProposalsListTyps) => {
    navigate(`/dao/proposals/${event.ProposalsId}`)
  }

  const handlePaginationChange = (page: number, pageSize: number) => setPage(page)

  return (
    <DelegatesModulesWrapper>
      <Table
        className="delegates-table"
        scroll={{ y: 'calc(100vh - 15rem - 6.25rem)', x: windowSize.innerWidth <= Adapth5 ? 'auto' : '100%' }}
        dataSource={proposalsList}
        loading={loading}
        columns={columns}
        pagination={{
          position: ['bottomCenter'],
          simple: true,
          current: page,
          total: proposalsListTotal,
          onChange: handlePaginationChange,
          itemRender: windowSize.innerWidth <= Adapth5 ? handleItemRenderH5 : handleItemRender,
        }}
        locale={empty}
        onRow={(record, index) => {
          return {
            onClick: () => handleOnRowClick(record),
          }
        }}
      />
    </DelegatesModulesWrapper>
  )
}

export default ProposalsModules
