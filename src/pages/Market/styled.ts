import styled, { css } from 'styled-components'
import { WrapperOthers } from '@/common/styled'
import MARKET_TABBAR from '@/assets/market-tabbar.png'

export const MarketWrapper = styled.div`
  ${WrapperOthers}
  .market-lines {
    border-top: 0.06rem dashed #d9d9d9;
    padding-top: 1.25rem;
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        border-top: 0.06rem solid #d9d9d9;
        .market-footer {
          margin-top: 6.25rem;
        }
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        .market-lines {
          border-top: 0.06rem solid #d9d9d9;
          padding-top: 1.25rem;
        }
      `,
    )}
`

export const MarketTabbar = styled.div`
  margin-top: 0.94rem;
  margin-bottom: 1.32rem;
  position: relative;
  /* border-radius: 0.63rem; */
  width: 100%;
  height: 6.25rem;
  background: url(${MARKET_TABBAR}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h3 {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 1.5rem;
    color: ${(p) => p.theme.themeColor};
  }
  .ant-image {
    width: 4.69rem;
    height: auto;
  }
  ${(p) => p.theme.mediaWidth.md`
    height: 16.75rem;
    margin-top: 2.19rem;
    margin-bottom: 1.88rem;
    .ant-image {
      width: 11.56rem;
      height: auto;
    }
    h3 {
  font-size: 2rem;
    }
  `}
`

export const InvitationDetails = styled.div`
  .titles {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-bottom: 1.13rem;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    h4,
    .spans {
      max-width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    h4 {
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-weight: 700;
      font-size: 0.88rem;
      line-height: 1.88rem;
      text-align: center;
      color: #ffa43a;
    }
    .spans {
      color: #999999;
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
    }
  }
  .numbers {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${(p) => p.theme.black};
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        .titles {
          font-family: 'NotoSansHans-Bold';
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 2.25rem;
          margin-bottom: 1.69rem;
        }
      `,
    )}
`

export const InvitationDetailsInfo = styled.div`
  background: #ffffff;
  box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
  border-radius: 0.63rem;
  width: 100%;
  min-height: 3.75rem;
  padding: 0.94rem;
  margin-bottom: 0.94rem;
  .direct-info {
    margin-bottom: 0.94rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 30px;
      color: ${({ theme }) => theme.black};
      &:nth-child(1) {
        margin-left: 1em;
      }
      &:nth-child(2) {
        color: #999999;
      }
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        padding: 0.94rem 1.25rem;
        margin-bottom: 1.25rem;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        width: 90%;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xxl(
      () => css`
        width: 80%;
      `,
    )}
`

export const MarketTips = styled.div`
  font-size: 0.88rem;
  font-family: 'NotoSansHans-Bold';
  color: #db6363;
`

export const MarketContent = styled.div`
  .titles {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.88rem;
    text-align: center;
    margin-top: 1.25rem;
    margin-bottom: 0.94rem;
    color: ${(p) => p.theme.black};
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        .titles {
          font-family: 'NotoSansHans-Bold';
          font-weight: 700;
          font-size: 2rem;
          line-height: 3rem;
          text-align: start;
          margin-top: 0;
          margin-bottom: 0;
          color: ${(p) => p.theme.black};
        }
      `,
    )}
  .info {
    margin-bottom: 1.25rem;
    .info-title {
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-size: 1rem;
      line-height: 2.19rem;
      color: ${(p) => p.theme.black};
    }
    p {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 1rem;
      line-height: 2.19rem;
      color: ${(p) => p.theme.black};
    }
  }
`

export const MarketInvite = styled.div`
  margin: 1.25rem 0;
  .market-title {
    background: #f5f5f5;
    border-radius: 0.63rem;
    height: 3.75rem;
    padding: 0 0.63rem;
    justify-content: space-between;
    align-items: center;
    display: flex;
    width: 100%;
  }
  .spans {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${(p) => p.theme.black};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ibtn {
    display: flex;
    align-items: center;
  }
  .ssssibtn {
    display: none;
  }
  .ant-btn.ant-btn-text {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    color: #3396ff;
    &:hover {
      background: transparent;
    }
  }
  ${(p) =>
    p.theme.mediaWidth.xxl(
      () => css`
        width: 70%;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        .ssssibtn {
          display: block;
        }
        .market-title {
          padding: 0 1.25rem;
          height: 4.38rem;
        }
      `,
    )}
`

export const MarketModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .save {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.31rem;
    color: #999999;
    margin: 1.5rem 0;
    cursor: pointer;
  }
`

export const MarketGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.25rem;
  padding: 1.25rem 0 0;
  line-height: 35.04px;
  .gard-web {
    display: none;
  }
  .gard-h5 {
    display: block;
  }
  ${(p) => p.theme.mediaWidth.md`
    grid-template-columns: 1fr 2fr 1fr;
    .gard-web {
      display: block;
    }
    .gard-h5 {
      display:none ;
    }
  `}
`

export const MarketGridH3 = styled.h3`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${(props) => props.theme.black};
  font-family: 'NotoSansHans-Bold';
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const MarketGridH5 = styled.h5`
  font-size: 0.88rem;
  font-weight: 400;
  color: ${(props) => props.theme.black};
  font-family: 'NotoSansHans-Regular';
`

export const MarketGridButton = styled.div`
  button {
    font-size: 0.88rem;
    font-weight: 700;
    min-width: 9.56rem;
    height: 35.04px;
    max-width: 100%;
    color: ${(props) => props.theme.white};
    font-family: 'NotoSansHans-Bold';
    background-color: ${(props) => props.theme.themeColor};
    border-radius: 0.38rem;
    padding: 0.44rem 0.88rem;
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const TableWrapper = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.white};
  box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
  border-radius: 0.63rem;
  .table-no {
    padding-bottom: 0.625rem;
  }
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        width: 85%;
      `,
    )}
`
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 1.88rem 0 0;
  th {
    font-size: 0.75rem;
    font-weight: 400;
    color: #999;
    font-family: 'NotoSansHans-Regular';
    height: 3.81rem;
    text-align: left;
    padding-left: 0.63rem;
    &:nth-child(3) {
      padding-right: 0.63rem;
      text-align: end;
    }
  }

  td {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${(props) => props.theme.black};
    height: 3.75rem;
    font-family: 'NotoSansHans-Bold';
    padding-left: 0.63rem;
    span {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      margin-left: 0.19rem;
      color: #999;
    }
    &:nth-child(3) {
      padding-right: 0.63rem;
      text-align: end;
    }
  }
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        width: calc(100% - 1.38rem - 1.38rem);
        margin: 1.88rem 1.38rem 0;
        td,
        th {
          width: 33%;
          padding-left: 1rem;
          text-align: start;
          &:nth-child(3) {
            text-align: start;
            padding-right: 1rem;
          }
        }
        th {
          font-size: 0.88rem;
        }
        td {
          font-size: 1rem;
          span {
            margin-left: 0.38rem;
          }
        }
      `,
    )}
`

export const LeaderBoardWrapper = styled.div``

export const LeaderBoardH5Title = styled.div`
  display: flex;
  align-items: center;
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 0.88rem;
  line-height: 1.88rem;
  color: ${({ theme }) => theme.black};
  span {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
  }
  .anticon {
    margin: 0 0.32rem;
  }
`

export const LeaderBoardWebTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 2.81rem;
  border-bottom: 0.06rem solid #d9d9d9;
  text-align: center;
`

export const LeaderBoardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${({ theme }) =>
    theme.mediaWidth.md(
      () => css`
        grid-template-columns: 2fr 5fr;
      `,
    )}
`

export const SelectDiv = styled.div`
  padding: 1.44rem 0;
  .times {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: #666666;
    margin-bottom: 1.88rem;
  }
  .total {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${({ theme }) => theme.black};
    margin-bottom: 1.88rem;
  }
  ${({ theme }) =>
    theme.mediaWidth.md(
      () => css`
        padding: 1.44rem 1.25rem;
        border-right: 0.06rem solid #d9d9d9;
      `,
    )}
`

export const LeaderBoardGrid = styled.div`
  padding: 1.44rem 0;
  .leader-table {
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
      padding: 0.56rem 0.51rem;
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
  .tabbars {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.94rem;
    .ant-btn {
      border: 0.06rem solid #999999;
      border-radius: 0.63rem;
      color: #999999;
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      min-width: 6.56rem;
      min-height: 2.25rem;
      &:hover {
        color: ${({ theme }) => theme.themeColor};
        border: 0.06rem solid ${({ theme }) => theme.themeColor};
      }
    }
    .ant-btn.active {
      border-color: ${({ theme }) => theme.themeColor};
      background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
      color: ${({ theme }) => theme.white};
    }
  }
  ${({ theme }) =>
    theme.mediaWidth.md(
      () => css`
        padding: 1.44rem 2.38rem;
        .tabbars {
          justify-content: flex-start;
          margin-bottom: 1.25rem;
          .ant-btn {
            margin-right: 1.88rem;
          }
        }
      `,
    )}
`

export const SelectTitle = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.31rem;
  margin-bottom: 0.63rem;
  span {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
  }
`

export const SelectGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 0.63rem;
  margin-bottom: 2.25rem;
`
