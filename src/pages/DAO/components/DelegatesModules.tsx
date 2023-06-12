import { Table, Space, Button, Skeleton, Empty, message } from 'antd'
import type { PaginationProps } from 'antd'
import { useBoolean } from 'ahooks'
import type { ColumnsType } from 'antd/es/table'
import Icon from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { DelegatesListTypes } from '@/hooks/useDAOHooks'
import { formatStrAddress, Adapth5 } from '@/utils'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { LeftSvg, RigthSvg } from '@/pages/DAO/icon'
import { RankAddressDiv, DelegatesModulesWrapper, PaginationBtn } from '@/pages/DAO/styled'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

interface Types {
  delegatesList: DelegatesListTypes[]
  loading: boolean
  returns: () => void
}

const DelegatesModules = ({ delegatesList, loading, returns }: Types) => {
  const { t } = useTranslation()
  let navigate = useNavigate()

  const { isActive, account } = useWeb3React()
  const dataInit: DataTypes = useDataHooks()
  const { blockExplorerUrl, constant } = dataInit.data
  const { windowSize } = useWindowSizeHooks()
  const [delegateLoading, setDelegateLoading] = useBoolean(false)
  const [currentDelegate, setCurrentDelegate] = useState<string | undefined>(undefined)

  const handleDelegateOwnClick = async (address: string | undefined) => {
    if (!address) return
    setCurrentDelegate(address)
    void setDelegateLoading.setTrue()
    try {
      constant.ContractLPToken.methods
        .delegate(address)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          message.success({
            content: t('message.dao.tips1'),
            className: 'message-global',
          })
          void setDelegateLoading.setFalse()
          setCurrentDelegate(undefined)
          returns()
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          void setDelegateLoading.setFalse()
          setCurrentDelegate(undefined)
        })
    } catch (error) {
      void setDelegateLoading.setFalse()
      setCurrentDelegate(undefined)
    }
  }

  const empty = {
    emptyText: isActive ? (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('description')} />
    ) : (
      <Skeleton className="dao-skeleton" active={true} paragraph={{ rows: 4 }} />
    ),
  }

  const columnsH5: ColumnsType<DelegatesListTypes> = [
    {
      title: t('dao.delegate.columns.title1'),
      dataIndex: 'rankAddress',
      key: 'rankAddress',
      render: (text, record) => (
        <RankAddressDiv
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <a href={`${blockExplorerUrl}/address/${text}`} target="_blank" rel="noopener noreferrer">
            {formatStrAddress(6, 4, text)}
          </a>
        </RankAddressDiv>
      ),
    },
    {
      title: t('dao.delegate.columns.title2'),
      key: 'totalVotes',
      align: 'right',
      render: (_, record) => (
        <Space size="middle" className="total-votes">
          <span>
            {Number(record.totalVotes).toLocaleString('en-US', { maximumFractionDigits: 6, style: 'decimal' })}&nbsp;
            {t('dao.delegate.votes')}
          </span>
        </Space>
      ),
    },
  ]

  const columns: ColumnsType<DelegatesListTypes> = [
    {
      title: t('dao.delegate.columns.title1'),
      dataIndex: 'rankAddress',
      key: 'rankAddress',
      width: 200,
      render: (text, record) => (
        <RankAddressDiv
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <span>{Number(record.key) + 1}</span>
          <a href={`${blockExplorerUrl}/address/${text}`} target="_blank" rel="noopener noreferrer">
            {formatStrAddress(6, 4, text)}
          </a>
        </RankAddressDiv>
      ),
    },
    {
      title: t('dao.delegate.columns.title3'),
      dataIndex: 'proposalsVoted',
      key: 'proposalsVoted',
      width: 150,
      align: 'right',
    },
    {
      title: t('dao.delegate.columns.title4'),
      dataIndex: 'voteWeight',
      key: 'voteWeight',
      width: 150,
      align: 'right',
      render: (text) => <>{text}%</>,
    },
    {
      title: t('dao.delegate.columns.title2'),
      key: 'totalVotes',
      align: 'right',
      width: windowSize.innerWidth > 1200 ? 370 : 290,
      fixed: windowSize.innerWidth > 1200 ? undefined : 'right',
      render: (_, record) => (
        <Space size="middle" className="total-votes">
          <Button
            type="primary"
            disabled={!record.isDelegates}
            onClick={(e) => {
              handleDelegateOwnClick(record.rankAddress)
              e.stopPropagation()
            }}
            loading={delegateLoading && currentDelegate === record.rankAddress}
          >
            {t('dao.delegate.btn')}
          </Button>
          <div className="total-votes">
            {Number(record.totalVotes).toLocaleString('en-US', { maximumFractionDigits: 6, style: 'decimal' })}&nbsp;
            {t('dao.delegate.votes')}
          </div>
        </Space>
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

  const handleOnRowClick = async (event: DelegatesListTypes) => {
    navigate(`/dao/delegate/${event.rankAddress}`)
  }

  return (
    <DelegatesModulesWrapper>
      <Table
        className="delegates-table"
        scroll={{ y: 'calc(100vh - 15rem - 6.25rem)', x: windowSize.innerWidth <= Adapth5 ? 'auto' : '100%' }}
        dataSource={delegatesList}
        loading={loading}
        columns={windowSize.innerWidth <= Adapth5 ? columnsH5 : columns}
        pagination={{
          position: ['bottomCenter'],
          simple: true,
          itemRender: windowSize.innerWidth <= Adapth5 ? handleItemRenderH5 : handleItemRender,
        }}
        onRow={(record, index) => {
          return {
            onClick: () => handleOnRowClick(record),
          }
        }}
        locale={empty}
      />
    </DelegatesModulesWrapper>
  )
}

export default DelegatesModules
