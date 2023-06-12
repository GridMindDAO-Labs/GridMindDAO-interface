import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Wrapper } from './styled'
import { toolbarContainer } from '@/common'

const ReactQuillPage = () => {
  const [value, setValue] = useState('')

  const modules = {
    toolbar: {
      container: toolbarContainer,
    },
  }

  return (
    <Wrapper>
      <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} />
    </Wrapper>
  )
}

export default ReactQuillPage
