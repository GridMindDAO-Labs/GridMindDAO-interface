import styled, { css } from 'styled-components'
import { WrapperOthers } from '@/common/styled'
import FINANCE_ONE from '@/assets/finance-one.png'
import FINANCE_TWO from '@/assets/finance-two.png'
import FINANCE_THREE from '@/assets/finance-three.png'
import FINANCE_FOUR from '@/assets/finance-four.png'
import FINANCE_RE from '@/assets/finance-re.png'
import { Button } from 'antd'

export const FinanceWrapper = styled.div`
  ${WrapperOthers}
  .receive-web {
    display: none;
  }
  .receive-h5 {
    display: block;
    width: 100%;
  }
  .aitoken {
    margin-top: 3.13rem;
    border-top: 1px dashed #c2c2c2;
    width: 100%;
    text-align: center;
    padding-top: 1.88rem;
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        border-top: 0.06rem solid #d9d9d9;
        .finance-footer {
          margin-top: 6.25rem;
        }
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        .receive-web {
          display: block;
        }
        .receive-h5 {
          display: none;
        }
      `,
    )}
`

export const FinanceTobbars = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-radio-group {
    background: #f5f5f5;
    .ant-radio-button-wrapper {
      background: #f5f5f5;
      border: none;
      height: 1.63rem;
      width: 4.25rem;
      line-height: 1.63rem;
      text-align: center;
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.75rem;
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
        margin: 0.63rem 0 1.25rem;
        .ant-radio-group {
          background: #f5f5f5;
          .ant-radio-button-wrapper {
            background: #f5f5f5;
            border: none;
            height: 3.13rem;
            width: 7.56rem;
            line-height: 3.13rem;
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
      `,
    )}
`

export const FinanceTobbar = styled.div`
  margin: 0.63rem 0 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-radio-group {
    border-radius: 0.25rem;
    background: #f5f5f5;
    .ant-radio-button-wrapper {
      background: #f5f5f5;
      border: none;
      height: 3.13rem;
      width: 7.56rem;
      line-height: 3.13rem;
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
        margin: 3.13rem 0 1.88rem;
        .ant-radio-group {
          border-radius: 0.63rem;
          background: #f5f5f5;
          .ant-radio-button-wrapper {
            background: #f5f5f5;
            border: none;
            height: 4rem;
            width: 11.38rem;
            line-height: 4rem;
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

export const FinanceTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-size: 1.25rem;
  line-height: 1.88rem;
  color: ${(p) => p.theme.black};
  text-align: center;
  margin-bottom: 1.25rem;
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        font-size: 1.5rem;
        line-height: 2.25rem;
      `,
    )}
`

export const FinanceLines = styled.div`
  border-bottom: 0.06rem dashed #c2c2c2;
  margin: 0.94rem 0 1.25rem;
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        margin: 1.88rem 0 0.94rem;
      `,
    )}
`

export const FinanceSubtitle = styled.div`
  font-size: 0.88rem;
  text-align: center;
  line-height: 1.32rem;
  margin: 0.63rem 0 0.94rem;
  color: ${(p) => p.theme.black};
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        line-height: 1.88rem;
        margin: 0.63rem 0 1.88rem;
      `,
    )}
`

export const FinanceList = styled.div<{ isBlack: boolean }>`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  gap: 0.94rem;
  .ant-modal-mask {
    display: ${({ isBlack }) => (isBlack ? 'block' : 'none')};
  }
  ${(p) =>
    p.theme.mediaWidth.sm(
      () => css`
        grid-template-columns: 1fr;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        gap: 1.56rem;
        grid-template-columns: 1fr 1fr 1fr;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        gap: 1.88rem;
        grid-template-columns: 1fr 2fr 1fr;
      `,
    )}
  .info2 {
    background: url(${FINANCE_TWO}) no-repeat;
    background-size: 100% 100%;
  }
  .info3 {
    background: url(${FINANCE_THREE}) no-repeat;
    background-size: 100% 100%;
  }
  .info4 {
    background: url(${FINANCE_FOUR}) no-repeat;
    background-size: 100% 100%;
  }
  .info-ai-1 {
    box-shadow: none;
    background: linear-gradient(180deg, rgba(234, 240, 255, 0.4) 0%, rgba(207, 235, 233, 0.4) 100%);
  }
  .info-ai-2 {
    box-shadow: none;
    background: linear-gradient(180deg, #eaf4ff 0%, #e2cfeb 100%);
  }
  .info-ai-3 {
    box-shadow: none;
    background: linear-gradient(180deg, #eafff8 0%, #ebd9cf 100%);
  }
  .info-ai-4 {
    box-shadow: none;
    background: linear-gradient(180deg, #eafffe 0%, #cfd7eb 100%);
  }
`

export const FinanceInfo = styled.div`
  border-radius: 0.63rem;
  min-height: 34.5rem;
  box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
  background: url(${FINANCE_ONE}) no-repeat;
  background-size: 100% 100%;
  padding: 2.19rem 1.88rem 1.25rem;
  width: 100%;
  position: relative;
  .title {
    text-align: center;
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 1.13rem;
    line-height: 1.69rem;
    margin-bottom: 1.25rem;
  }
  ul {
    margin-left: 1.57rem;
    li {
      font-family: 'NotoSansHans-Regular';
      font-size: 0.88rem;
      line-height: 1.88rem;
      margin-bottom: 0.75rem;
      color: ${(p) => p.theme.black};
    }
  }
  .deposit {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1.31rem;
    margin: 1.25rem 0 0.63rem 0;
    color: ${(p) => p.theme.black};
  }
  .tips {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.63rem;
    color: #999999;
    margin: 0.88rem 0 0.75rem;
  }
  .tips-v {
    display: flex;
    justify-content: space-between;
    .tips-v-left {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
    }
    .tips-v-right {
      display: flex;
      align-items: center;
      .texts {
        font-family: 'NotoSansHans-Regular';
        font-weight: 400;
        font-size: 0.88rem;
        line-height: 1.88rem;
        margin-right: 0.63rem;
      }
      .anticon {
        cursor: pointer;
      }
    }
  }
  .submit {
    width: 100%;
    height: 3.44rem;
    margin-top: 0.94rem;
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
    border-radius: 0.26rem;
    box-shadow: none;
    font-size: 1rem;
    font-weight: 700;
    font-family: 'NotoSansHans-Bold';
    text-shadow: none;
    text-align: center;
    color: #ffffff;
  }
  .submit-wallet {
    margin-top: 0.94rem;
    width: 100%;
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin-top: 1.25rem;
        .submit {
          border-radius: 0.63rem;
        }
      `,
    )}
`

export const InfoInputDiv = styled.div`
  background: ${(p) => p.theme.white};
  border-radius: 0.63rem;
  display: flex;
  align-items: center;
  min-height: 4.38rem;
  padding: 0.63rem 0.56rem;
  .left,
  .right {
    width: 50%;
  }
  .left {
    input {
      width: 95%;
      outline: none;
      border: none;
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-size: 0.88rem;
      border-bottom: 0.06rem solid transparent;
      &:focus {
        border-color: #d9d9d9;
      }
    }
    .usds {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 1.63rem;
      color: #666666;
    }
  }
`

export const AiTokenSelectDiv = styled.div`
  background: #f5f5f5;
  border-radius: 0.63rem;
  height: 3.25rem;
  width: 100%;
  display: flex;
  align-items: center;
  h5 {
    font-weight: 700;
    font-family: 'NotoSansHans-Bold';
    color: ${(p) => p.theme.black};
    font-size: 0.88rem;
    line-height: 1.88rem;
    margin-left: 0.31rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .anticon {
    margin-left: 0.63rem;
  }
`

export const EarningsInfoContent = styled.div`
  background: ${(p) => p.theme.white};
  box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
  border-radius: 1.25rem;
  margin-top: 3.13rem;
  padding: 1.25rem 0.63rem 1.5rem;
  .earn-bottom {
    margin-top: 1.25rem;
    align-items: flex-start;
    .earn-bottom-lefts {
      text-align: end;
      margin-bottom: 1.69rem;
    }
    .earn-bottom-rights {
      text-indent: 1.25rem;
      display: flex;
      margin-bottom: 1.69rem;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  .earnings-table {
    .ant-table-thead > tr > th {
      background: #fff;
      font-weight: 700;
    }
    .ant-table-thead
      > tr
      > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
      content: none !important;
    }
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td,
    .ant-table tfoot > tr > th,
    .ant-table tfoot > tr > td {
      padding: 0.56rem 1rem;
    }
    .ant-pagination {
      line-height: 2.25rem;
      .ant-pagination-simple .ant-pagination-prev,
      .ant-pagination-simple .ant-pagination-next {
        height: 2.25rem;
        line-height: 2.25rem;
      }
      .ant-pagination-simple-pager {
        margin: 0 1.75rem;
        font-family: 'NotoSansHans-Regular';
        font-weight: 400;
        font-size: 0.88rem;
        line-height: 0.88rem;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          pointer-events: none;
          margin-right: 0;
          padding: 0;
          border: none;
          border-radius: none;
          width: 0.63rem;
          color: ${(props) => props.theme.themeColor};
        }
        .ant-pagination-slash {
          margin: 0 0.19rem;
        }
      }
    }
  }

  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        padding: 2.25rem 7.57% 0.63rem;
        .ant-pagination {
          .ant-pagination-simple-pager {
            margin: 0 2.25rem;
            height: 2.25rem;
          }
        }
        .earn-bottom {
          align-items: center;
          .earn-bottom-lefts {
            text-align: end;
            margin-bottom: 1.69rem;
          }
          .earn-bottom-rights {
            text-indent: 1.25rem;
            display: flex;
            margin-bottom: 1.69rem;
            align-items: center;
            flex-direction: row;
          }
        }
      `,
    )}
`

export const RedeemBtnText = styled(Button)`
  min-height: 1.63rem;
  &:hover,
  &:focus {
    background: #f5f5f5;
  }
`

export const RedeemBtn = styled(Button)`
  min-height: 1.63rem;
  background: #34b287;
  border: none;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  border-radius: 0.38rem;
  color: ${(p) => p.theme.white};
  &:hover,
  &:focus {
    border: none;
    background: #34b287;
    color: ${(p) => p.theme.white};
  }
`

export const EarningsInfoBottonTitle = styled.div`
  font-weight: 700;
  font-family: 'NotoSansHans-Bold';
  font-size: 0.76rem;
  line-height: 1.19rem;
  color: ${(p) => p.theme.black};
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        line-height: 1.31rem;
        font-size: 0.88rem;
      `,
    )}
`

export const EarningsInfoBottonNum = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.81rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  color: ${(p) => p.theme.black};
  span {
    font-size: 0.75rem;
    line-height: 1.13rem;
    color: #999999;
    margin: 0;
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        line-height: 1.31rem;
        display: flex;
        flex-direction: row;
        span {
          margin: 0 0.63rem;
        }
      `,
    )}
`

export const ReceiveEarningsBtn = styled(Button)`
  background: ${(p) => p.theme.themeColor};
  border-radius: 0.38rem;
  min-height: 1.63rem;
  font-size: 0.88rem;
  color: ${(p) => p.theme.white};
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  border: none;
  &:hover,
  &:focus {
    border: none;
    background: ${(p) => p.theme.themeColor};
    color: ${(p) => p.theme.white};
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin-top: 0rem;
      `,
    )}
`

export const EarningsInfoTableH5 = styled.div`
  margin: 0.94rem 0.63rem 0;
  .h5-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.94rem;
  }
  .ant-pagination {
    display: flex;
    line-height: 2.25rem;
    .ant-pagination-simple .ant-pagination-prev,
    .ant-pagination-simple .ant-pagination-next {
      height: 2.25rem;
      line-height: 2.25rem;
    }
    .ant-pagination-simple-pager {
      margin: 0 1.75rem;
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 0.88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        pointer-events: none;
        margin-right: 0;
        padding: 0;
        border: none;
        border-radius: none;
        width: 0.63rem;
        color: ${(props) => props.theme.themeColor};
      }
      .ant-pagination-slash {
        margin: 0 0.19rem;
      }
    }
  }
`

export const EarningsInfoTableH5Info = styled.div`
  border-bottom: 0.06rem solid #f9f9f9;
  padding-top: 0.94rem;
  display: grid;
  line-height: 1.88rem;
  grid-template-columns: 2fr 2fr;
  &:first-child {
    border-top: 0.06rem solid #f9f9f9;
  }
  .item {
    h4 {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.75rem;
      color: ${(p) => p.theme.black};
      margin-bottom: 0.25rem;
    }
    p {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      margin-bottom: 0.63rem;
      color: #666666;
    }
    &:first-child {
      h4 {
        display: flex;
        p {
          font-weight: 400;
          margin-left: 0.31rem;
        }
      }
    }
    &:nth-child(2n - 1) {
      h4 {
        font-weight: 700;
        font-family: 'NotoSansHans-Bold';
      }
    }
    &:nth-child(2) {
      text-align: end;
    }
  }
`

export const EarningsInfoTableH5No = styled.div`
  border-top: 0.06rem solid #f9f9f9;
  height: 5.63rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.63rem;
    line-height: 0.94rem;
    color: #999999;
  }
  a {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.63rem;
    line-height: 0.94rem;
    color: #3396ff;
    margin-top: 0.75rem;
    &:hover {
      color: ${(p) => p.theme.themeColor};
    }
  }
`

export const EarningH5Spin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ReceiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 1.06rem;
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        margin-top: 0;
      `,
    )}
`

export const ReceiveHeading4 = styled.h4`
  font-size: 0.88rem;
  font-weight: 400;
  font-family: 'NotoSansHans-Regular';
  color: #999;
  line-height: 1.88rem;
  text-align: center;
  margin-bottom: 0.75rem;
`

export const ReceiveHeading5 = styled.h5`
  font-size: 0.88rem;
  font-family: 'NotoSansHans-Bold';
  font-weight: 400;
  font-family: 'NotoSansHans-Regular';
  color: #999;
  line-height: 1.31rem;
  margin-bottom: 0.44rem;
`

export const ReceiveText = styled.div`
  font-size: 1.25rem;
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  color: ${(p) => p.theme.black};
  line-height: 1.88rem;
`

export const ReceiveSubText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.06rem;
  position: relative;
  width: 22.81rem;
  height: 23.44rem;
  background: url(${FINANCE_RE}) no-repeat;
  background-size: 100% 100%;
  h3 {
    font-size: 2rem;
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    color: ${(p) => p.theme.black};
    line-height: 3rem;
    margin-bottom: 0rem;
    position: relative;
    z-index: 1;
  }
  ${(p) =>
    p.theme.mediaWidth.xs(
      () => css`
        width: 100%;
        height: 21.57rem;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        width: 100%;
        height: 18.44rem;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        width: 22.81rem;
        height: 23.44rem;
      `,
    )}
`

export const ReceiveSubTitle = styled.div`
  font-size: 0.88rem;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  color: #999;
  line-height: 1.31rem;
  margin-top: 32%;
  margin-bottom: 1.06rem;
  position: relative;
  z-index: 1;
`

export const ReceiveEarnings = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: 'NotoSansHans-Bold';
  color: ${(p) => p.theme.black};
  line-height: 1.88rem;
  margin-bottom: 0.44rem;
`

export const ReceiveButton = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 1.25rem;
  width: calc(100% - 42.73%);
  height: 3.19rem;
`

export const ReceiveButtonContainer = styled(Button)`
  width: 100%;
  height: 3.19rem;
  border-radius: 0.38rem;
  background-color: ${(p) => p.theme.themeColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'NotoSansHans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 0.88rem;
  line-height: 1.31rem;
  color: ${(p) => p.theme.white};
  border: none;
  box-shadow: none;
  text-shadow: none;
  &:hover {
    background: ${(p) => p.theme.themeColor};
    border: none;
    box-shadow: none;
  }
`

export const LiquidityTitle = styled.li`
  span {
    color: ${({ theme }) => theme.themeColor};
  }
  a,
  .a {
    cursor: pointer;
    margin-left: 0.31rem;
    color: #3396ff;
    &:hover {
      color: ${({ theme }) => theme.themeColor};
    }
  }
`

export const GMDModalTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1.13rem;
  line-height: 1.69rem;
  text-align: center;
  margin-bottom: 1.88rem;
  text-transform: capitalize;
  color: ${({ theme }) => theme.black};
  padding: 0 0.63rem;
`

export const GMDInfos = styled.div<{ isActive: boolean; afterT: string; beforeT: string }>`
  position: relative;
  .info-icon {
    position: absolute;
    top: 0.44rem;
    left: 0.63rem;
    svg {
      width: 2rem;
    }
  }
  margin: 1.25rem 1.88rem;
  &::after {
    content: '${({ afterT }) => afterT}';
    position: absolute;
    top: 1.88rem;
    font-family: 'NotoSansHans-Regular';
    left: ${({ isActive }) => (isActive ? '0' : '-0.19rem')};
    text-align: center;
    font-size: 7px;
    transform: scale(0.7);
    color: white;
    font-weight: 300;
    writing-mode: vertical-rl;
    height: 90%;
    opacity: 0.8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &::before {
    height: 90%;
    content: '${({ beforeT }) => beforeT}';
    position: absolute;
    bottom: 1.88rem;
    font-family: 'NotoSansHans-Regular';
    right: ${({ isActive }) => (isActive ? '0' : '-0.19rem')};
    text-align: center;
    font-size: 7px;
    transform: scale(0.7);
    color: white;
    opacity: 0.8;
    font-weight: 300;
    writing-mode: vertical-rl;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img {
    width: auto;
    height: 24.25rem;
    cursor: pointer;
    border-radius: 1.38rem;
    box-shadow: 0px 0.25rem 0.88rem rgba(0, 0, 0, 0.4);
  }
  img.active {
    border: 0.19rem solid #34b287;
    border-radius: 1.38rem;
    box-shadow: 0px 0.25rem 0.88rem ${(p) => `${p.theme.themeColor}32`};
  }
  h3,
  h4 {
    position: absolute;
    margin-bottom: 0;
    margin-left: 1.88rem;
  }
  h3 {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2.25rem;
    margin-top: 2.31rem;
  }
  h4 {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 2.25rem;
    margin-top: 4.87rem;
  }
  .info-infos {
    position: absolute;
    bottom: 1.63rem;
    margin-left: 1.88rem;
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.white};
    line-height: 1.13rem;
    div {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 0.25rem;
      margin-bottom: 0.31rem;
      padding: 0.25rem 0.38rem;
      width: fit-content;
    }
  }
`

export const GMDModalList = styled.div<{ isNFTLength: boolean }>`
  ${({ isNFTLength }) =>
    isNFTLength
      ? `
    overflow: hidden;
    overflow-x: scroll;
    white-space: nowrap;
  `
      : `
      flex-wrap: wrap;
  justify-content:center;
  align-items: center;
  `}
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 1.88rem;
`

export const CMDModalBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1.88rem;
  cursor: pointer;
`
export const AiReceiveButton = styled(Button)`
  background: ${({ theme }) => theme.themeColor};
  border-radius: 0.38rem;
  min-height: 35px;
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 0.88rem;
  margin-left: 1.25rem;
  color: ${({ theme }) => theme.white} !important;
  span {
    margin: 0 !important;
    color: ${({ theme }) => theme.white} !important;
  }
`

export const RenewalBtn = styled(Button)`
  background: #db6363;
  border-radius: 0.38rem;
  color: ${({ theme }) => theme.white};
  &:hover,
  &:focus {
    background: #db6363;
    color: ${({ theme }) => theme.white};
  }
`

export const ReceiveModalContent = styled.div`
  background: #fafafa;
  border-radius: 0.63rem;
  padding: 0.37rem 0.94rem;
  margin: 0 1.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  span,
  h5 {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    text-align: right;

    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .span,
  .spans {
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${({ theme }) => theme.black};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .spans,
  h5 {
    margin: 1rem 0 1.56rem;
    font-size: 1rem;
    line-height: 2.19rem;
    color: ${({ theme }) => theme.themeColor};
  }
  ${({ theme }) =>
    theme.mediaWidth.md(
      () => css`
        padding: 0.81rem 1.69rem;
        margin: 0 2.5rem;
      `,
    )}
`
