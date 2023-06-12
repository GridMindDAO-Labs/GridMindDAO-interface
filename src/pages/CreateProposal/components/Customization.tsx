import { useEffect, useRef } from 'react'
import { ContractListType } from '@/common/type.d'
import { Col, message, Radio, Spin, Select } from 'antd'
import { useBoolean } from 'ahooks'
import Icon from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { isJSON } from '@/utils'
import { FormTitle, Textareas, Inputs, FormMode, CreateProposalContract } from '@/pages/CreateProposal/styled'
import useDataHooks from '@/hooks/useDataHooks'
import type { DataTypes } from '@/hooks/useDataHooks'
import { getAxiosAcquireContractAbi, setParsingAbi } from '@/common'
import { SelectSvg, ExecutionAddSvg, CloseSvg } from '@/pages/CreateProposal/icon'

interface Types {
  contractList: ContractListType[]
  setContractList: any
  type: number
  setType: any
}

const CustomizationPage = ({ setContractList, contractList, type, setType }: Types) => {
  const dataInputRef = useRef<any>(null)
  const dataInit: DataTypes = useDataHooks()
  const { web3, apiKey, apiUrl } = dataInit.data

  const { t } = useTranslation()

  const [addContractloading, setAddContractloading] = useBoolean(false)

  useEffect(() => {
    if (contractList) handleWatchContractList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractList])

  const handleContractListChange = async () => {
    void setAddContractloading.setTrue()
    setContractList((list: any) => {
      let newList = JSON.parse(JSON.stringify(list))
      newList.push({ id: list.length + 1, address: '', abi: '', abiMethod: [] })
      setTimeout(() => {
        void setAddContractloading.setFalse()
      }, 200)
      return newList
    })
  }

  const handleRadioChange = (values: any) => setType(values)

  const handleRadioClose = () => {
    void setAddContractloading.setTrue()
    let newList = JSON.parse(JSON.stringify(contractList))
    newList.pop()
    newList.forEach((item: any, index: any) => (item.id = index + 1))
    setContractList(newList)
    setType(1)
    setTimeout(() => {
      void setAddContractloading.setFalse()
    }, 200)
  }

  const handleWatchContractList = async () => {
    for (let i = 0; i < contractList.length; i++) {
      const item = contractList[i]
      if (item.id === type && !item.address && item.abi !== '') {
        void setAddContractloading.setTrue()
        setContractList((list: any) => {
          let newList = JSON.parse(JSON.stringify(list))
          newList.forEach((element: any) => {
            if (element.id === item.id) {
              element.abi = ''
              element.abiMethod = []
              element.isAddressAndAbiTrue = false
            }
          })
          return newList
        })
        setTimeout(() => {
          void setAddContractloading.setFalse()
        }, 200)
      }
      if (item.id === type && item.address && item.address.length === 42 && item.abi === '') {
        let isAddress = await web3.utils.isAddress(item.address)
        if (isAddress) {
          void setAddContractloading.setTrue()
          const { isSuccess, result } = await getAxiosAcquireContractAbi({ address: item.address, apiKey, apiUrl })
          if (isSuccess) {
            setContractList((list: any) => {
              let newList = JSON.parse(JSON.stringify(list))
              newList.forEach((element: any) => {
                if (element.id === item.id) element.abi = result
              })
              return newList
            })
          }
          setTimeout(() => {
            void setAddContractloading.setFalse()
          }, 200)
        } else {
          setContractList((list: any) => {
            let newList = JSON.parse(JSON.stringify(list))
            newList.forEach((element: any) => {
              if (element.id === item.id) element.address = ''
            })
            return newList
          })
          message.warning({
            content: t('message.create.tips5'),
            className: 'message-global',
          })
        }
      }
      if (item.id === type && item.address && item.address.length === 42 && item.abi && !item.isAddressAndAbiTrue) {
        let isTrue = isJSON(item.abi)
        if (isTrue) {
          void setAddContractloading.setTrue()
          const { isSuccess, options, tips } = await setParsingAbi(item.abi)
          // console.log(isSuccess, options, tips)
          if (isSuccess) {
            setContractList((list: any) => {
              let newList = JSON.parse(JSON.stringify(list))
              newList.forEach((element: any) => {
                if (element.id === item.id) {
                  element.abiMethod = options
                  element.isAddressAndAbiTrue = true
                }
              })
              return newList
            })
          } else {
            message.warning({
              content: tips,
              className: 'message-global',
            })
            setContractList((list: any) => {
              let newList = JSON.parse(JSON.stringify(list))
              newList.forEach((element: any) => {
                if (element.id === item.id) element.abi = ''
              })
              return newList
            })
          }
          setTimeout(() => {
            void setAddContractloading.setFalse()
          }, 200)
        } else
          message.warning({
            content: t('message.create.tips6'),
            className: 'message-global',
          })
      }
    }
  }

  return (
    <>
      <Col span={24} className="display" style={{ alignItems: 'center', paddingTop: '1.25rem' }}>
        <FormTitle>{t('dao.create.execution')}</FormTitle>
        <Icon style={{ cursor: 'pointer' }} component={ExecutionAddSvg} onClick={handleContractListChange} />
        {contractList.length > 1 && (
          <Icon component={CloseSvg} style={{ cursor: 'pointer', marginLeft: '0.63rem' }} onClick={() => handleRadioClose()} />
        )}
      </Col>
      {contractList.length > 1 && (
        <CreateProposalContract>
          <Radio.Group defaultValue={type} value={type} buttonStyle="solid" onChange={(e) => handleRadioChange(e.target.value)}>
            {contractList.map((ci, key) => (
              <Radio.Button value={ci.id} key={key}>
                {`${ci.id}`}
              </Radio.Button>
            ))}
          </Radio.Group>
        </CreateProposalContract>
      )}

      {contractList
        // .filter((item) => item.id === type)
        .map((ci, key) => (
          <div key={key} style={{ display: ci.id === type ? 'block' : 'none' }}>
            <Spin tip={t('app.loading')} spinning={addContractloading}>
              <Col span={24}>
                <FormMode>
                  <div className="titles">{t('dao.create.contract')}</div>
                  <Inputs
                    maxLength={42}
                    value={ci.address}
                    placeholder={t('dao.create.contract.enter')}
                    autoComplete="off"
                    onChange={(e) => {
                      // console.log(e.target.value)
                      setContractList((list: any) => {
                        let newList = JSON.parse(JSON.stringify(list))
                        newList.forEach((item: any) => {
                          if (item.id === ci.id) {
                            item.address = e.target.value
                            item.abi = ''
                            item.isAddressAndAbiTrue = false
                            item.abiMethod = []
                            item.currentMethod = false
                          }
                        })
                        return newList
                      })
                    }}
                  />
                </FormMode>
              </Col>
              <Col span={24}>
                <FormMode>
                  <div className="titles">{t('dao.create.abi')}</div>
                  <Textareas
                    value={ci.abi}
                    placeholder={t('dao.create.abi.placeholder')}
                    autoComplete="off"
                    onChange={(e) => {
                      setContractList((list: any) => {
                        let newList = JSON.parse(JSON.stringify(list))
                        newList.forEach((item: any) => {
                          if (item.id === ci.id) item.abi = e.target.value
                        })
                        return newList
                      })
                    }}
                  />
                </FormMode>
              </Col>
              <Col span={24} className="display ex-c">
                <FormTitle>{t('dao.create.method')}</FormTitle>
                <Select
                  options={ci.abiMethod}
                  placeholder={t('dao.create.method.placeholder')}
                  suffixIcon={<Icon component={SelectSvg} />}
                  value={ci.currentMethod}
                  fieldNames={{
                    label: 'name',
                    value: 'value',
                  }}
                  onChange={(value) => {
                    if (dataInputRef.current) {
                      for (let i = 0; i < dataInputRef.current.children.length; i++) {
                        const element = dataInputRef.current.children[i]
                        if (element.className === 'display') {
                          for (let j = 0; j < element.children.length; j++) {
                            const items = element.children[j]
                            if (items.localName === 'input') items.value = ''
                          }
                        }
                      }
                    }
                    setContractList((list: any) => {
                      let newList = JSON.parse(JSON.stringify(list))
                      newList.forEach((item: any) => {
                        if (item.id === ci.id) item.currentMethod = value
                      })
                      return newList
                    })
                  }}
                />
              </Col>
              <Col span={24}>
                {ci.abiMethod
                  .filter((item) => item.value === ci.currentMethod)
                  .map((item, ide) => (
                    <FormMode key={ide} style={{ paddingBottom: '1.25rem' }} ref={dataInputRef}>
                      <div className="titles">{item.name}</div>
                      {item.inputs.map((inputs, indss) => (
                        <div key={indss} className="display" style={{ marginTop: '1.25rem' }}>
                          <div className="titles">{inputs.name}</div>
                          <div style={{ width: '0.94rem' }}></div>
                          <Inputs placeholder={inputs.type} id={inputs.id} autoComplete="off" />
                        </div>
                      ))}
                    </FormMode>
                  ))}
              </Col>
            </Spin>
          </div>
        ))}
    </>
  )
}

export default CustomizationPage
