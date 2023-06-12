import styled, { css } from 'styled-components'
import { Wrappers } from '@/common/styled'
import { Button } from 'antd'

export const CreateProposalWrapper = styled.div`
  ${Wrappers}
  .create-form {
    width: 100%;
    margin-top: 1.25rem;
    .display {
      display: flex;
      .titles {
        width: 8.13rem;
        text-align: end;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .ex-c {
      align-items: center;
      margin-top: 1.25rem;
    }
    .pr-d {
      margin-top: 0.94rem;
    }
    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border-radius: 0.25rem;
    }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      height: 2.88rem;
      display: flex;
      align-items: center;
      min-width: 6.25rem;
    }
    .quill-col {
      .ant-form-item-control-input-content {
        height: 29.13rem;
        #proposalContent {
          height: calc(100% - 5rem);
          .ql-container.ql-snow {
            border: none;
          }
          .ql-toolbar.ql-snow {
            border: none;
            border-bottom: 0.06rem dashed #c2c2c2;
          }
          .ql-editor.ql-blank::before {
            font-style: inherit;
          }
        }
      }
    }
    .center-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2.5rem 0 2.25rem;
      flex-direction: column;
      .tipss {
        font-family: 'NotoSansHans-Bold';
        font-weight: 700;
        font-size: 1rem;
        line-height: 2.19rem;
        text-align: center;
        color: #db6363;
        margin: 0.63rem 10% 0;
      }
    }
    .modal-create {
      min-width: 80%;
      min-height: 3.38rem;
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-size: 1rem;
      text-align: center;
      color: ${(p) => p.theme.black};
      border: none;
      background: linear-gradient(102.83deg, #f1a764 2.19%, #ffdbb2 81.87%);
      border-radius: 0.63rem;
    }
    .ant-btn[disabled],
    .ant-btn[disabled]:hover,
    .ant-btn[disabled]:focus,
    .ant-btn[disabled]:active {
      background: #cccccc;
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        border-top: 0.06rem solid #d9d9d9;
        .create-form {
          margin-top: 3.13rem;
          .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
            min-width: 12.5rem;
          }
          .pr-d {
            margin-top: 3.13rem;
          }
          .ex-c {
            align-items: center;
            margin-top: 2.5rem;
          }
          .center-btn {
            margin: 5.63rem 0;
            .tips {
              margin: 1.88rem 0 0;
            }
          }
          .modal-create {
            min-width: 65%;
            min-height: 4.38rem;
          }
        }
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        .create-form {
          .quill-col {
            .ant-form-item-control-input-content {
              height: 29.13rem;
              #proposalContent {
                height: calc(100% - 2.5rem);
              }
            }
          }
        }
      `,
    )}
`

export const CreateProposalTabbar = styled.div`
  margin: 0.13rem 0 0.63rem;
  display: flex;
  align-items: center;
  .anticon {
    margin: 0 0.31rem;
  }
  h3 {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    color: ${(p) => p.theme.black};
    cursor: pointer;
  }
  span {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    color: ${(p) => p.theme.black};
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin: 1.88rem 0 1.88rem 1.25rem;
      `,
    )}
`

export const CreateContent = styled.div`
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin: 0 5.2%;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        margin: 0 10.4%;
      `,
    )}
`

export const CreateProposalTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 2.69rem;
  color: ${(p) => p.theme.black};
  text-align: center;
  margin-bottom: 1.25rem;
  display: none;
  ${(p) => p.theme.mediaWidth.md`
    display: block;
  `}
`

export const CreateProposalTips = styled.div`
  background: ${(p) => p.theme.white};
  min-height: 14.75rem;
  padding: 0 0 0.94rem;
  border-bottom: 0.06rem dashed #c2c2c2;
  span {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: #db6363;
    margin-bottom: 0.69rem;
  }
  ul {
    padding-left: 5.33%;
    margin-top: 0.63rem;
    li {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
      color: #db6363;
      margin-bottom: 0.31rem;
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        padding: 1.88rem 2.19rem;
        border-bottom: none;
        border-radius: 0.63rem;
        box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
        ul {
          padding-left: 3.5rem;
          margin-top: 0.63rem;
          li {
            margin-bottom: 1.25rem;
          }
        }
      `,
    )}
`

export const Textareas = styled.textarea`
  width: 100%;
  height: 11.25rem;
  border: none;
  margin: 0;
  margin-top: 0.63rem;
  resize: none;
  outline: none;
  background: transparent;
`

export const Inputs = styled.input`
  width: 100%;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 2.06rem;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 0.06rem solid transparent;
  &:focus {
    border-color: #d9d9d9;
  }
`

export const FormTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1rem;
  line-height: 2.19rem;
  color: ${(p) => p.theme.black};
  margin-right: 1rem;
`

export const FormMode = styled.div`
  margin-top: 0.94rem;
  background: #f5f5f5;
  border-radius: 0.63rem;
  padding: 0.94rem 1.25rem;
  margin-right: 1rem;
  width: 100%;
  .titles {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${(p) => p.theme.black};
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        padding: 0.94rem 2.19rem;
      `,
    )}
`

export const CreateProposalContract = styled.div`
  padding: 1.25rem 0;
  .ant-radio-group {
    border-radius: 0.25rem;
    background: #f5f5f5;
    .ant-radio-button-wrapper {
      background: #f5f5f5;
      border: none;
      height: 2.13rem;
      width: 3.13rem;
      line-height: 2.13rem;
      text-align: center;
      font-family: 'NotoSansHans-Regular';
      font-weight: 700;
      font-size: 0.88rem;
      color: #999999;
    }
    .ant-radio-button-wrapper-checked {
      border-radius: 0.25rem;
      color: white;
      background: ${(p) => p.theme.themeColor};
      &:hover {
        background: ${(p) => p.theme.themeColor};
      }
    }
    .ant-radio-button-wrapper:not(:first-child)::before {
      background-color: rgba(0, 0, 0, 0);
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        .ant-radio-group {
          border-radius: 0.63rem;
          background: #f5f5f5;
          .ant-radio-button-wrapper {
            background: #f5f5f5;
            border: none;
            height: 3.38rem;
            line-height: 3.38rem;
            width: 5.63rem;
            text-align: center;
            font-family: 'NotoSansHans-Regular';
            font-weight: 700;
            font-size: 1rem;
            color: #999999;
          }
          .ant-radio-button-wrapper-checked {
            border-radius: 0.63rem;
            color: white;
            background: ${(p) => p.theme.themeColor};
            &:hover {
              background: ${(p) => p.theme.themeColor};
            }
          }
          .ant-radio-button-wrapper:not(:first-child)::before {
            background-color: rgba(0, 0, 0, 0);
          }
        }
      `,
    )}
`

export const CreateModalInfo = styled.div`
  h4 {
    font-size: 1rem;
    line-height: 2.19rem;
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
  }
`

export const CreateModalTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.88rem;
  color: ${(p) => p.theme.black};
  text-align: start;
  margin-top: 0 1.31rem 0 0.75rem;
  margin-bottom: 2.81rem;
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        font-family: 'NotoSansHans-Bold';
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 1.88rem;
        color: ${(p) => p.theme.black};
        text-align: center;
      `,
    )}
`

export const CreateModalBtn = styled(Button)`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  color: #333;
  margin-top: 1.88rem;
  border: none;
  background: linear-gradient(102.83deg, #f1a764 2.19%, #ffdbb2 81.87%);
  border-radius: 0.63rem;
  min-width: 100%;
  min-height: 3.38rem;
  &:hover,
  &:focus {
    color: #333;
    background: linear-gradient(102.83deg, #f1a764 2.19%, #ffdbb2 81.87%);
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        min-width: 100%;
        min-height: 4.38rem;
      `,
    )}
`
