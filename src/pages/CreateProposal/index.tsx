import { Form, Button, Row, Col, Select, Skeleton, message, Modal, Spin } from 'antd'
import Icon from '@ant-design/icons'
import { ArrowSvg, SelectSvg } from './icon'
import {
  CreateProposalWrapper,
  Inputs,
  FormTitle,
  CreateProposalTabbar,
  CreateProposalTitle,
  CreateContent,
  CreateProposalTips,
  FormMode,
  CreateModalInfo,
  CreateModalTitle,
  CreateModalBtn,
} from './styled'
import { modalLayout } from '@/common/antd.cus'
import { ContractListType, WaitImplementType } from '@/common/type.d'
import { toolbarContainer, setInputs } from '@/common'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useCreateProposalHook } from '@/hooks/useCreateProposalHook'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import type { AwsStorageClientTypes } from '@/contracts/aws'
import useAwsHooks from '@/hooks/useAwsHooks'

import Customization from './components/Customization'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { useBoolean } from 'ahooks'

interface IpfsFormType {
  proposalContent: string
  proposalTitle: string
  type: string
}

const modules = {
  toolbar: {
    container: toolbarContainer,
  },
}

const ContractListInit: ContractListType[] = [
  { id: 1, address: '', abi: '', abiMethod: [], currentMethod: undefined, isAddressAndAbiTrue: false },
]

const CreateProposalPage = () => {
  const dataInit: DataTypes = useDataHooks()
  const { web3, constant } = dataInit.data

  const { t } = useTranslation()
  const { isActive, account } = useWeb3React()

  let navigate = useNavigate()

  const awsStore: AwsStorageClientTypes = useAwsHooks()
  const { s3, bucket, storeFilesUpload, makeFileObjects } = awsStore

  const [type, setType] = useState<number>(1)
  const [contractList, setContractList] = useState<ContractListType[]>(ContractListInit)
  const [waitImplement, setWaitImplement] = useState<WaitImplementType[]>([])

  const [form] = Form.useForm()
  const [ipfsForm, setIpfsFormData] = useState<IpfsFormType>({ proposalContent: '', proposalTitle: '', type: '' })
  const [onShow, setOnShow] = useBoolean(false)
  const [createLoding, setCreateLoading] = useBoolean(false)
  const { isSubmitProposal, proposalMinVotes, getOnShowSubmitProposal, currentProposalVotes } = useCreateProposalHook({ account })

  useEffect(() => {
    console.log('waitImplement', waitImplement)
  }, [waitImplement])

  const handleOnFinish = async (values: any) => {
    let contractDataList = contractList.filter((item) => item.isAddressAndAbiTrue && item.currentMethod)
    console.log('contractDataList', contractDataList)
    if (contractDataList.length === 0) {
      message.warning({
        content: t('message.create.tips1'),
        className: 'message-global',
      })
      return false
    }
    let params: WaitImplementType[] = []
    let isTrue = false
    for (let i = 0; i < contractDataList.length; i++) {
      const element = contractDataList[i]
      let currentMethodOptions = element.abiMethod.filter((item) => item.value === element.currentMethod)
      currentMethodOptions.forEach((items) => {
        items.inputs.forEach((inputs) => {
          let value = document.getElementById(`${inputs.id}`) ? (document.getElementById(`${inputs.id}`) as any).value : ''
          inputs.value = value
        })
      })
      console.log('currentMethodOptions', currentMethodOptions)
      for (let j = 0; j < currentMethodOptions.length; j++) {
        const items = currentMethodOptions[j]
        const { isSuccess, tips, values } = await setInputs({ inputs: items.inputs, web3 })
        if (isSuccess) {
          params.push({
            contractAddress: element.address,
            jsonInterface: items.jsonInterface,
            parameters: values,
            name: items.name,
          })
          isTrue = true
        } else {
          isTrue = false
          message.warning({
            content: tips || t('message.create.tips1'),
            className: 'message-global',
          })
        }
      }
    }
    let getVotesData = await getOnShowSubmitProposal()
    if (!getVotesData) {
      message.warning({
        content: t('message.create.tips2', { proposalMinVotes: proposalMinVotes, currentProposalVotes: currentProposalVotes }),
        className: 'message-global',
      })
      return false
    }
    if (params.length > 0 && isTrue && contractDataList.length === params.length && getVotesData) {
      setWaitImplement(params)
      setIpfsFormData(values)
      void setCreateLoading.setFalse()
      void setOnShow.setTrue()
      console.log('params', params, values)
    }
  }

  const handleSubmit = async () => {
    try {
      void setCreateLoading.setTrue()
      let tips = []
      for (let i = 0; i < waitImplement.length; i++) {
        const element = waitImplement[i]
        let parametersTips = element.parameters.map((item) => item)
        tips.push(`${element.contractAddress}.${element.name}(${parametersTips.toString()})`)
      }
      let files = makeFileObjects({
        ...ipfsForm,
        tips: tips,
      })
      const { data, key } = await storeFilesUpload({ s3, bucket, file: files, type: 'json' })
      if (!data) {
        void setCreateLoading.setFalse()
        return false
      }
      let params: {
        targets: string[]
        calldatas: string[]
        description: string
        values: number[]
      } = {
        targets: [],
        calldatas: [],
        description: key,
        values: [],
      }
      for (let i = 0; i < waitImplement.length; i++) {
        const element: any = waitImplement[i]
        params.targets.push(element.contractAddress)
        let DATA_HEX = web3.eth.abi.encodeFunctionCall(element.jsonInterface, element.parameters)
        params.calldatas.push(DATA_HEX)
        params.values.push(0)
      }
      console.log('ipfs cid', data.Metadata['ipfs-hash'], key)
      console.log('params', params)
      constant.ContractGovernance.methods
        .propose(params.targets, params.values, params.calldatas, params.description)
        .send({
          from: account,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', function (receipt: any) {
          message.success({
            content: t('message.create.tips3'),
            className: 'message-global',
          })
          handleResetting()
          void setOnShow.setFalse()
          void setCreateLoading.setFalse()
        })
        .on('error', function (error: any, receipt: any) {
          console.log(receipt)
          message.error({
            content: t('message.create.tips4'),
            className: 'message-global',
          })
          handleResetting()
          void setOnShow.setFalse()
          void setCreateLoading.setFalse()
        })
    } catch (error) {
      void setCreateLoading.setFalse()
    }
  }

  const handleResetting = () => {
    setWaitImplement([])
    setIpfsFormData({ proposalContent: '', proposalTitle: '', type: '' })
    form.resetFields()
    setContractList(ContractListInit)
  }

  return (
    <CreateProposalWrapper>
      <CreateProposalTabbar>
        <h3
          onClick={() => {
            navigate('/dao', { replace: true })
          }}
        >
          {t('dao.create.title')}
        </h3>
        <Icon component={ArrowSvg} />
        <span>{t('dao.create.initiate')}</span>
      </CreateProposalTabbar>
      {isActive && (
        <CreateContent>
          <CreateProposalTitle>{t('dao.create.initiate')}</CreateProposalTitle>
          <CreateProposalTips>
            <span>{t('dao.create.tips')}</span>
            <ul>
              <li>{t('dao.create.content1')}</li>
              <li>{t('dao.create.content2')}</li>
              <li>{t('dao.create.content3')}</li>
            </ul>
          </CreateProposalTips>
          <Row>
            <Form
              form={form}
              onFinish={handleOnFinish}
              className="create-form"
              initialValues={{
                type: 'custom',
              }}
            >
              <Col span={24} className="display">
                <FormTitle>{t('dao.create.proposal.type')}</FormTitle>
                <Form.Item name="type" rules={[{ required: true, message: t('dao.create.proposal.rules') }]}>
                  <Select
                    options={[
                      { value: 'custom', label: t('dao.create.proposal.types1') },
                      // { value: 'aitoken', label: t('dao.create.proposal.types2') },
                    ]}
                    style={{ width: '12.5rem' }}
                    placeholder={t('dao.create.proposal.rules')}
                    suffixIcon={<Icon component={SelectSvg} />}
                  />
                </Form.Item>
              </Col>
              <Customization setType={setType} type={type} contractList={contractList} setContractList={setContractList} />

              <FormTitle className="pr-d">{t('dao.create.proposal')}</FormTitle>
              <Col span={24}>
                <FormMode>
                  <Form.Item name="proposalTitle" rules={[{ required: true, message: t('dao.create.contract.rules') }]}>
                    <Inputs placeholder={t('dao.create.proposalws')} autoComplete="off" />
                  </Form.Item>
                </FormMode>
              </Col>
              <Col span={24} className="quill-col">
                <FormMode>
                  <Form.Item name="proposalContent" rules={[{ required: true, message: t('dao.create.contract.rules') }]}>
                    <ReactQuill placeholder={t('dao.create.proposal.details')} modules={modules} theme="snow" />
                  </Form.Item>
                </FormMode>
              </Col>
              <div className="center-btn">
                <Button className="modal-create" htmlType="submit" disabled={!isSubmitProposal}>
                  {t('dao.create.btn')}
                </Button>
                {!isSubmitProposal && <div className="tipss">{t('dao.create.btn.tips', { msg: proposalMinVotes })}</div>}
              </div>
            </Form>
          </Row>
        </CreateContent>
      )}
      {!isActive && (
        <CreateContent>
          <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
          <Skeleton className="dao-skeleton" paragraph={{ rows: 2 }} />
        </CreateContent>
      )}
      <Modal {...modalLayout} visible={onShow} onCancel={setOnShow.setFalse}>
        <Spin tip={t('app.loading')} spinning={createLoding}>
          <CreateModalTitle>{t('message.create.tips7')}</CreateModalTitle>
          <CreateModalInfo>
            <h4>{t('message.create.tips8')}</h4>
            <span>{ipfsForm.proposalTitle}</span>
            <h4>{t('message.create.tips9')}</h4>
            <ul>
              {waitImplement.map((item, index) => (
                <li key={index}>
                  {`${item.contractAddress}.${item.name}(`}
                  {item.parameters.map((ite, indexs) => (
                    <span key={indexs}>
                      {ite}
                      {item.parameters.length - 1 !== indexs && ','}
                    </span>
                  ))}
                  {')'}
                </li>
              ))}
            </ul>
            <CreateModalBtn onClick={() => handleSubmit()}>{t('message.create.tips10')}</CreateModalBtn>
          </CreateModalInfo>
        </Spin>
      </Modal>
    </CreateProposalWrapper>
  )
}

export default CreateProposalPage
