import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { nanoid } from 'nanoid'

interface StoreFilesTypes {
  file: any
  bucket: string
  s3: any
  type: 'assets' | 'json'
}

export interface AwsStorageClientTypes {
  s3: any
  bucket: string
  everlandUrl: string
  storeFilesUpload: (data: StoreFilesTypes) => Promise<{ data: any; url: string; key: string }>
  makeFileObjects: (obj: object) => void
}

class AwsStorageClient {
  s3: any
  bucket: string
  everlandUrl: string
  constructor() {
    this.s3 = new S3({
      endpoint: 'https://endpoint.4everland.co',
      credentials: {
        accessKeyId: process.env.REACT_APP_ACCESSKEYID as string,
        secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY as string,
      },
      region: 'us-west-2',
    })
    this.bucket = process.env.REACT_APP_BUCKET as string
    this.everlandUrl = `https://${this.bucket}.4everland.store`
  }

  async storeFilesUpload({ file, s3, bucket, type }: StoreFilesTypes): Promise<{ data: any; url: string; key: string }> {
    console.log('bucket', bucket)
    const keyUuid = `${nanoid(24)}.${file.name.split('.')[1]}`
    const Key = `${type}/${keyUuid}`
    try {
      const params = {
        Bucket: bucket,
        Key,
        Body: file,
        ContentType: file.type,
      }
      const task = new Upload({
        client: s3,
        params,
      })
      await task.done()
      const data = await s3.headObject({ Bucket: bucket, Key })
      return await { data, url: `/${Key}`, key: keyUuid }
    } catch (error: any) {
      console.log(error.message)
      return { data: undefined, url: '', key: '' }
    }
  }

  makeFileObjects(obj: object) {
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    const files = new File([blob], 'qqnft.json')
    return files
  }
}

export default AwsStorageClient
