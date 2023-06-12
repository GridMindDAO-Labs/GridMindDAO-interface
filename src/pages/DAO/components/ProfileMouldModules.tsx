import { useBoolean } from 'ahooks'
import { useState } from 'react'
import { Col, Modal, Button, Form, message } from 'antd'
import {
  ProfileMould,
  ProfileTitle,
  ProfileTips,
  ProfileLists,
  ProfileInfo,
  InitiateProposalBtn,
  DelegatesBtn,
  ProfileMouldBtns,
  DelegatesModalCotnent,
  EntrustedAddress,
  EntrustedTitle,
  Othre,
  EntrustedInput,
} from '@/pages/DAO/styled'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import ConnectWallet from '@/components/ConnectWallet'
import { ProfileListTypes } from '@/hooks/useDAOHooks'
import { modalLayout } from '@/common/antd.cus'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { useTranslation } from 'react-i18next'

interface Types {
  profileList: ProfileListTypes[]
  returns: () => void
}

const ProfileMouldModules = ({ profileList, returns }: Types) => {
  const { t } = useTranslation()
  const { isActive, account } = useWeb3React()
  const dataInit: DataTypes = useDataHooks()
  const { web3, constant } = dataInit.data

  let navigate = useNavigate()

  const [form] = Form.useForm()

  const [delegatesShow, setDelegatesShow] = useBoolean(false)
  const [delegatesStep, setDelegatesStep] = useState<'ONE' | 'OTHER'>('ONE')
  const [loading, setLoading] = useBoolean(false)

  const handleDelegatesClickShow = async () => {
    void setDelegatesShow.setTrue()
    setDelegatesStep('ONE')
    form.resetFields()
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
      <ProfileTitle>{t('dao.profile.title')}</ProfileTitle>
      {!isActive && <ProfileTips>{t('dao.profile.wallet.tips')}</ProfileTips>}
      <div className="wallets">
        <ConnectWallet isPosition="ProfileMouldWeb" />
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
            <InitiateProposalBtn onClick={() => navigate('/create', { replace: true })}>{t('dao.profile.link.crate')}</InitiateProposalBtn>
            <DelegatesBtn onClick={handleDelegatesClickShow}>{t('dao.profile.delegates')}</DelegatesBtn>
          </ProfileMouldBtns>
        </>
      )}
      <Modal {...modalLayout} visible={delegatesShow} onCancel={setDelegatesShow.setFalse}>
        <h3 style={{ marginBottom: '1.5rem' }}>{t('dao.profile.delegates1')}</h3>
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

export default ProfileMouldModules
