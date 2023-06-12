import { MenuListType } from '@/common/data.d'
import moment from 'moment'
import Web3 from 'web3'
import axios from 'axios'
import { AbiMethodType, AbiMethodTypeInputs } from '@/common/type.d'
import { nanoid } from 'nanoid'
import BigNumber from 'bignumber.js'

export const fallbackImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=='

export const MenuListInit: MenuListType[] = [
  {
    key: 'home',
    index: 0,
    zhTW: '首頁',
    enUs: 'Home',
    url: '/home',
  },
  {
    key: 'finance',
    index: 1,
    zhTW: '理財',
    enUs: 'Finance',
    url: '/finance',
  },
  {
    key: 'swap',
    index: 2,
    zhTW: 'Swap',
    enUs: 'Swap',
    url: '/swap',
  },
  {
    key: 'dao',
    index: 3,
    zhTW: 'DAO',
    enUs: 'DAO',
    url: '/dao',
  },
  {
    key: 'market',
    index: 4,
    zhTW: '市場推廣',
    enUs: 'Marketing',
    url: '/market',
  },
]

export const oddEvent = (isActive: boolean, location: any, item: MenuListType) => {
  if (item.url === '' || !isActive) return false
  const url = !location.hash ? location.pathname : `${location.pathname}${location.hash}`
  if (url === '/dao/delegates' && item.url === '/dao') return true
  if (url === '/dao/pelegates' && item.url === '/dao') return true
  if (url.substring(0, 9) === '/finance/' && item.url === '/finance') return true
  return url === item.url
}

export const FooterList: { name: string; childer: { name: string; url: string; zh_url?: string }[] }[] = [
  {
    name: 'footer.about',
    childer: [
      {
        name: 'footer.whitepaper',
        url: 'https://gridminddao.4everland.store/gridminddao_whitepaper.pdf',
        zh_url: 'https://gridminddao.4everland.store/gridminddao_whitepaper_zh.pdf',
      },
      {
        name: 'footer.faqs',
        url: 'https://gridminddao.gitbook.io/document/v/english/common-problem',
        zh_url: 'https://gridminddao.gitbook.io/document/chang-jian-wen-ti',
      },
      { name: 'footer.brand.assets', url: 'https://gridminddao.4everland.store/material.zip' },
    ],
  },
  {
    name: 'footer.developers',
    childer: [
      {
        name: 'footer.documentation',
        url: 'https://gridminddao.gitbook.io/document/v/english/',
        zh_url: 'https://gridminddao.gitbook.io/document/',
      },
      { name: 'footer.gitHub', url: 'https://github.com/GridMindDAO-Labs' },
      { name: 'footer.audit.report', url: '' },
    ],
  },
  {
    name: 'footer.foundation',
    childer: [
      {
        name: 'footer.contact',
        url: 'https://gridminddao.gitbook.io/document/v/english/contact-us',
        zh_url: 'https://gridminddao.gitbook.io/document/lian-ji-fang-shi',
      },
    ],
  },
]

export const toolbarContainer = [
  // [{ size: ['small'] }], // ?custom dropdown
  // [{ font: [] }],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  // [{ align: [] }],
  [{ color: [] }, { background: [] }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction
  ['blockquote', 'code-block'],

  [{ list: 'ordered' }, { list: 'bullet' }],
  ['image', 'video', 'link'],

  ['clean'],
]

export const blockToTimestamp = async (web3: Web3, str: string): Promise<any> => {
  let timestampStart = (await web3.eth.getBlock(str))?.timestamp
  const currentBlock = (await web3.eth.getBlockNumber()) as number
  const submittedTimes = !timestampStart
    ? await blockNumberOfTimes({ currentBlock, endBlock: Number(str) })
    : moment.unix(timestampStart as any)
  return submittedTimes
}

export const blockToTimestampThree = async (web3: Web3, str: string): Promise<string | number> => {
  let timestampStart = (await web3.eth.getBlock(str))?.timestamp
  const currentBlock = (await web3.eth.getBlockNumber()) as number
  const submittedTimes = !timestampStart ? await blockToTimestampThrees({ currentBlock, endBlock: Number(str) }) : timestampStart
  return submittedTimes
}

export const blockToTimestampThrees = async ({ currentBlock, endBlock }: { currentBlock: number; endBlock: number }) => {
  try {
    const differenceBlockTimes = new BigNumber(endBlock).minus(currentBlock).multipliedBy(2)
    const timestampTimes = moment().add(Number(differenceBlockTimes), 'seconds').format('X')
    return await timestampTimes
  } catch (error) {
    return await '-'
  }
}

export const blockNumberOfTimes = async ({ currentBlock, endBlock }: { currentBlock: number; endBlock: number }) => {
  try {
    const differenceBlockTimes = new BigNumber(endBlock).minus(currentBlock).multipliedBy(2)
    const timestampTimes = moment().add(Number(differenceBlockTimes), 'seconds')
    return await timestampTimes
  } catch (error) {
    return await '-'
  }
}

/** 动态获取合约地址 -abi */
export const getAxiosAcquireContractAbi = async ({
  address,
  apiKey,
  apiUrl,
}: {
  address: string
  apiUrl: string
  apiKey: string
}): Promise<{
  result: string | undefined
  isSuccess: boolean
}> => {
  try {
    let data = await axios.get(`${apiUrl}/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`)
    if (data.status === 200) {
      if (data.data.result) {
        console.log('result', data.data.result)
        let result = data.data.result
        let result_array = JSON.parse(result)
        if (result_array !== undefined && result_array.length > 0)
          return await {
            result,
            isSuccess: true,
          }
        else
          return await {
            result,
            isSuccess: false,
          }
      } else
        return await {
          result: undefined,
          isSuccess: false,
        }
    } else
      return await {
        result: undefined,
        isSuccess: false,
      }
  } catch (error: any) {
    return await {
      result: undefined,
      isSuccess: false,
    }
  }
}

/** parsing abi , get Optioons */
export const setParsingAbi = async (
  abi: string,
): Promise<{
  options: AbiMethodType[]
  isSuccess: boolean
  tips: string
}> => {
  try {
    const JSON_CONTENT: any[] = JSON.parse(abi)
    if (!(JSON_CONTENT instanceof Array)) {
      return { isSuccess: false, options: [], tips: 'json_tips' }
    }
    if (JSON_CONTENT.length === 0) {
      return { isSuccess: false, options: [], tips: 'json_tips' }
    }
    let newOptions: AbiMethodType[] = []
    JSON_CONTENT.forEach((item, index) => {
      if (item.type === 'function' && item.stateMutability === 'nonpayable') {
        if (item.inputs !== undefined && item.inputs.length > 0) {
          let child: AbiMethodType = {
            name: item.name,
            inputs: [],
            key: index,
            jsonInterface: item,
            value: `${item.name}${index}`,
          }
          item.inputs.forEach((element: any) => {
            child.inputs.push({ name: element.name, type: element.type, value: '', id: nanoid(24) })
          })
          newOptions.push(child)
        } else {
          if (item.name) newOptions.push({ name: item.name, inputs: [], key: index, jsonInterface: item, value: `${item.name}${index}` })
        }
      }
    })
    newOptions.forEach((item, i) => (item.key = i))
    return { isSuccess: true, options: newOptions, tips: 'success' }
  } catch (error) {
    return { isSuccess: false, options: [], tips: 'json error' }
  }
}

/** 验证inputs参数是否完整填写并是否正确参数 */
export const setInputs = async ({
  inputs,
  web3,
}: {
  inputs: AbiMethodTypeInputs[]
  web3: Web3
}): Promise<{
  isSuccess: boolean
  tips: string
  values: any[]
}> => {
  let tips = ''
  let values = []
  for (let i = 0; i < inputs.length; i++) {
    const item = inputs[i]
    if (item.value && item.type === 'address') {
      if (item.value.length !== 42) tips = `${item.name} Wrong Address`
      else {
        let isAddress = await web3.utils.isAddress(item.value)
        if (isAddress) values.push(item.value)
        else tips = `${item.name} Wrong Address`
      }
    } else if (item.value) {
      values.push(item.value)
    }
  }
  if (values.length === inputs.length) return await { isSuccess: true, tips, values }
  else return await { isSuccess: false, tips, values: [] }
}

/** 获取 aws ipfs detail json */
export const getAwsIpfsDetailsJson = async ({
  url,
  str,
}: {
  url: string
  str: string
}): Promise<{
  isSuccess: boolean
  values: any
}> => {
  try {
    const { data } = await axios.get(`${url}/json/${str}`)
    return await { isSuccess: true, values: data }
  } catch (error) {
    return await { isSuccess: false, values: undefined }
  }
}

/** 数据取整处理 */
export const dataIntegerHandling = (amount: number | string): string => Math.floor(Number(amount)).toString()

/** 保留六位小数，直接去掉后面的值 */
export const dataIntegerHandling6 = (amount: string): string => {
  let num = Number(amount)
  return (Math.floor(num * 1000000) / 1000000).toString()
}
