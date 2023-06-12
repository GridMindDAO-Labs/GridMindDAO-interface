import axios from 'axios'
import { notification } from 'antd'
import { baseURL } from '@/utils'

/** Create Axios instance */
const service = axios.create({
  timeout: 10000,
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

/** request Interceptor */
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error: any) => {
    Promise.reject(error)
  },
)

/** Response interceptor */
service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    notification.error({
      message: 'Error',
      description: `${error.message}.Please refresh the page and try again`,
    })
    return Promise.reject(error)
  },
)

export default service
