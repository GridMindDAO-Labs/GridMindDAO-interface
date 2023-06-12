import { useBoolean } from 'ahooks'
import { useState } from 'react'
import { Col, Modal, Button, Form, message, Row } from 'antd'
import { ProfileMould, ProfileTitle, ProfileMouldBtns, InitiateProposalBtn, DelegatesBtn } from './ProfileMouldWalletStyled'
import {
  ProfileLists,
  ProfileInfo,
  DelegatesModalCotnent,
  EntrustedAddress,
  EntrustedTitle,
  Othre,
  EntrustedInput,
} from '@/pages/DAO/styled'
import { useWeb3React } from '@web3-react/core'
import { ProfileListTypes } from '@/hooks/useDAOHooks'
import { modalLayout } from '@/common/antd.cus'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'

import Icon from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { UserSvg, LogoutSvg } from '@/components/ConnectWallet/icon'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { AddressBtnWeb } from './styled'
import { formatStrAddress } from '@/utils'
import { useDispatch } from 'react-redux'
import { SaveIsLogin, SaveWallet } from '@/store/wallet'
import { SaveAddress } from '@/store/user'
import { useTranslation } from 'react-i18next'

const UsreIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={UserSvg} {...props} />

interface Types {
  profileList: ProfileListTypes[]
  returns: () => void
}

const ProfileMouldWallet = ({ profileList, returns }: Types) => {
  let navigate = useNavigate()

  const { t } = useTranslation()

  const { isActive, account, connector } = useWeb3React()
  const dataInit: DataTypes = useDataHooks()
  const { web3, constant } = dataInit.data
  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const [delegatesShow, setDelegatesShow] = useBoolean(false)
  const [delegatesStep, setDelegatesStep] = useState<'ONE' | 'OTHER'>('ONE')
  const [loading, setLoading] = useBoolean(false)

  const handleDelegatesClickShow = async () => {
    void setDelegatesShow.setTrue()
    setDelegatesStep('ONE')
    form.resetFields()
  }

  const loginOut = async () => {
    void connector.deactivate()
    dispatch(SaveIsLogin(false))
    dispatch(SaveAddress(''))
    dispatch(SaveWallet('NetWork'))
    localStorage.removeItem('isLogin')
    localStorage.removeItem('wallet')
    message.info({
      content: t('wallet.logout.title'),
      className: 'message-global',
    })
    returns()
  }

  const handleDelegatesAddress = async (values: any) => handleDelegateOwnClick(values.delegatesAddress)

  const handleDelegateOwnClick = async (address: string | undefined) => {
    if (!address) return
    void setLoading.setTrue()
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
          void setDelegatesShow.setFalse()
          setDelegatesStep('ONE')
          form.resetFields()
          void setLoading.setFalse()
          returns()
        })
        .on('error', function (error: any, receipt: any) {
          message.error({
            content: error.message,
            className: 'message-global',
          })
          void setDelegatesShow.setFalse()
          setDelegatesStep('ONE')
          form.resetFields()
          void setLoading.setFalse()
        })
    } catch (error) {
      void setLoading.setFalse()
    }
  }

  return (
    <ProfileMould>
      <ProfileTitle>{t('wallet.profile.title')}</ProfileTitle>
      <div className="wallets">
        <AddressBtnWeb>
          <Col span={18} className="address-btn-web-left">
            <UsreIcon />
            <span className="text">{formatStrAddress(6, 4, account || '')}</span>
          </Col>
          <Col span={6} className="address-btn-web-right">
            <Icon component={LogoutSvg} onClick={loginOut} />
          </Col>
        </AddressBtnWeb>
      </div>
      {isActive && (
        <>
          <ProfileLists>
            {profileList.map((item, key) => (
              <ProfileInfo key={key}>
                <Col span={18} className={key > 1 ? 'list-title list-title-active' : 'list-title'}>
                  {t(item.label)}
                </Col>
                <Col span={6} className="list-values">
                  {item.value}
                  {key === 3 && '%'}
                </Col>
              </ProfileInfo>
            ))}
          </ProfileLists>
          <ProfileMouldBtns>
            <Row>
              <Col span={16}>
                <InitiateProposalBtn
                  onClick={() => {
                    navigate('/create', { replace: true })

                    returns()
                  }}
                >
                  {t('dao.create.initiate')}
                </InitiateProposalBtn>
              </Col>
              <Col span={8}>
                <DelegatesBtn onClick={handleDelegatesClickShow}>{t('dao.delegate.btn')}</DelegatesBtn>
              </Col>
            </Row>
          </ProfileMouldBtns>
        </>
      )}
      <Modal {...modalLayout} wrapClassName="common-modal" visible={delegatesShow} onCancel={setDelegatesShow.setFalse}>
        <h3 style={{ marginBottom: '1.5rem' }}>{t('dao.profile.delegates')}</h3>
        <DelegatesModalCotnent>
          <p>{t('dao.profile.delegates.tips')}</p>
          {delegatesStep === 'OTHER' ? (
            <Form form={form} onFinish={handleDelegatesAddress} className="del-form">
              <EntrustedAddress>
                <EntrustedTitle>{t('dao.profile.entrusted')}</EntrustedTitle>
                <Form.Item
                  name="delegatesAddress"
                  rules={[
                    { required: true, message: t('dao.profile.form.rule.tips') },
                    {
                      validator: async (_, value) => {
                        if (value !== '' && value) {
                          let isAddress = await web3.utils.isAddress(value)
                          if (!isAddress) throw new Error(t('dao.profile.form.address.wrong'))
                        }
                      },
                    },
                  ]}
                >
                  <EntrustedInput placeholder={t('dao.profile.form.address.placeholder')} autoComplete="off" />
                </Form.Item>
              </EntrustedAddress>
              <Button loading={loading} className="modal-delegate" htmlType="submit">
                {t('dao.profile.delegate.btn')}
              </Button>
            </Form>
          ) : (
            <>
              <Button loading={loading} className="modal-delegate" onClick={() => handleDelegateOwnClick(account)}>
                {t('dao.profile.delegate.btn1')}
              </Button>
              <Othre
                onClick={() => {
                  setDelegatesStep('OTHER')
                  form.resetFields()
                }}
              >
                {t('dao.profile.change.delegate')}
              </Othre>
            </>
          )}
        </DelegatesModalCotnent>
      </Modal>
    </ProfileMould>
  )
}

export default ProfileMouldWallet
