import styled, { css } from 'styled-components'
import { Wrappers, VotingBtnCss } from '@/common/styled'
import { Row, Button } from 'antd'

export const DaoWrapper = styled.div`
  ${Wrappers}
  padding-top: 1.88rem;
  .btn-one {
    margin-right: 2.5rem;
  }
  .tabbar-s {
    margin-bottom: 2.25rem;
  }
  .btn-actives {
    border: none !important;
    color: ${(p) => p.theme.white} !important;
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
    &:hover,
    &:focus {
      border: none !important;
      color: ${(p) => p.theme.white};
      background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
    }
  }
  .btn-actives-h5 {
    color: ${(p) => p.theme.white};
    border-color: transparent;
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        border-top: 0.06rem solid #d9d9d9;
        .dao-content {
          margin-left: 1.56rem;
        }
      `,
    )}
`

export const ProfileMould = styled.div`
  background: #ffffff;
  box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
  border-radius: 0.63rem;
  min-height: calc(100vh - 6.88rem - 4.38rem);
  padding: 2.19rem 1.44rem;
  margin-right: 1.56rem;
  .wallets {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const ProfileTitle = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 2.69rem;
  text-align: center;
  color: ${(props) => props.theme.black};
`

export const ProfileTips = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.88rem;
  margin: 1.31rem 0 1.81rem;
  text-align: center;
  color: ${(props) => props.theme.themeColor};
`

export const ProfileLists = styled.div`
  width: 100%;
  min-height: 17.31rem;
  background: #f5f5f5;
  border-radius: 0.63rem;
  padding: 1.56rem 1.44rem 0.13rem 1.56rem;
`

export const ProfileInfo = styled(Row)`
  margin-bottom: 2rem;
  .list-title {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${(props) => props.theme.black};
  }
  .list-title-active {
    color: ${(p) => p.theme.themeColor};
    font-weight: 700;
  }
  .list-values {
    font-family: 'NotoSansHans-Regular';
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1.88rem;
    text-align: right;
    color: ${(p) => p.theme.themeColor};
  }
`

export const ProfileMouldBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  flex-direction: column;
`

export const InitiateProposalBtn = styled(Button)`
  width: calc(100% - 5rem);
  height: 3.13rem;
  margin-bottom: 0.94rem;
  background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
  border-radius: 0.63rem;
  box-shadow: none;
  text-shadow: none;
  border: none;
  font-family: 'NotoSansHans-Regular';
  font-weight: 700;
  font-size: 0.88rem;
  text-align: center;
  color: ${(p) => p.theme.white};
  &:hover,
  &:focus {
    border: none !important;
    color: ${(p) => p.theme.white} !important;
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%) !important;
  }
`

export const DelegatesBtn = styled(Button)`
  width: calc(100% - 5rem);
  height: 3.13rem;
  margin-bottom: 0.94rem;
  background: ${(p) => p.theme.white};
  border-radius: 0.63rem;
  box-shadow: none;
  text-shadow: none;
  border: 0.06rem solid ${(p) => p.theme.themeColor};
  font-family: 'NotoSansHans-Regular';
  font-weight: 700;
  font-size: 0.88rem;
  text-align: center;
  color: ${(p) => p.theme.themeColor};
  &:hover,
  &:focus {
    border: 0.06rem solid ${(p) => p.theme.themeColor} !important;
    color: ${(p) => p.theme.themeColor} !important;
    background: ${(p) => p.theme.white} !important;
  }
`

export const DaoTarBarBtn = styled(Button)`
  min-width: 11.5rem;
  height: 3.13rem;
  border: 0.06rem solid #999999;
  border-radius: 0.63rem;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  text-align: center;
  color: #999999;
  &:hover,
  &:focus {
    border: 0.06rem solid #999999;
    color: #999999;
    background: #fff;
  }
`

export const DaoTarBarBtnH5 = styled(Button)`
  min-width: 8.31rem;
  height: 2.38rem;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  text-align: center;
  color: #999999;
  border-radius: 0.25rem;
  margin-bottom: 0.94rem;
`

export const RankAddressDiv = styled.div`
  span {
    font-family: 'NotoSansHans-Regular';
    font-style: normal;
    font-weight: 700;
    font-size: 0.88rem;
    margin-right: 1.5rem;
  }
  a {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    color: ${(p) => p.theme.black};
    &:hover {
      color: ${(p) => p.theme.themeColor};
    }
  }
`

export const ProposalsDiv = styled.div`
  display: flex;
  span {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    color: ${(p) => p.theme.black};
    margin-right: 1.56rem;
  }
  p {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    color: ${(p) => p.theme.black};
  }
`

export const DelegatesModulesWrapper = styled.div`
  .total-votes {
    .total-votes {
      width: 7.5rem;
    }
    .ant-btn.ant-btn-primary {
      text-shadow: none;
      box-shadow: none;
      border-radius: 0.63rem;
      border: none;
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      color: ${(p) => p.theme.white};
      min-width: 7rem;
      min-height: 2.25rem;
    }
    .ant-btn-primary[disabled],
    .ant-btn-primary[disabled]:hover,
    .ant-btn-primary[disabled]:focus,
    .ant-btn-primary[disabled]:active {
      color: ${(p) => p.theme.black};
    }
  }
  .delegates-table {
    .ant-table-thead > tr > th {
      background: ${(p) => p.theme.white};
      color: #999999;
      font-weight: 400;
    }
    .ant-table-thead
      > tr
      > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
      content: none !important;
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
    ${(props) =>
      props.theme.mediaWidth.md(
        () => css`
          .ant-pagination {
            .ant-pagination-simple-pager {
              margin: 0 2.25rem;
              height: 2.25rem;
            }
          }
        `,
      )}
    .ant-table-thead {
      .ant-table-cell {
        height: 4.5rem;
      }
    }
    .ant-table-thead > tr > th {
      border-bottom: none;
    }
    .ant-table-tbody > tr > td {
      border-bottom: none;
    }
    .ant-table-tbody {
      .ant-table-cell {
        border-top: 0.06rem solid #d9d9d9;
      }
      .ant-table-row {
        height: 5.5rem;
        cursor: pointer;
      }
    }
    .ant-table-row:hover {
      border-radius: 0.63rem;
      box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
      + .ant-table-row {
        td {
          border-top: 0.06rem solid transparent !important;
        }
        td + td {
          border-top: 0.06rem solid transparent !important;
        }
      }
    }
    .ant-table-tbody > tr.ant-table-row:hover > td,
    .ant-table-tbody > tr > td.ant-table-cell-row-hover {
      background: #fff;
      border-top: 0.06rem solid transparent;
      &:first-child {
        border-radius: 0.63rem 0 0 0.63rem;
      }
      &:last-child {
        border-radius: 0 0.63rem 0.63rem 0;
      }
    }
  }
  ${VotingBtnCss}
`

export const PaginationBtn = styled(Button)`
  min-width: 5.25rem;
  height: 2.25rem;
  border: 0.06rem solid #a6a6a6;
  border-radius: 0.63rem;
  font-size: 0.88rem;
  text-align: center;
  color: ${(p) => p.theme.black};
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  box-shadow: none;
  text-shadow: none;
`

export const VotingBtn = styled(Button)`
  min-width: 5.5rem;
  height: 2.25rem;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  color: #508bde;
  background: #f0f6ff;
  border-radius: 0.63rem;
  border: none;
  text-transform: uppercase;
  &:hover,
  &:focus {
    border: none;
    color: #508bde;
    background: #f0f6ff;
  }
`

export const DelegatesModalCotnent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.31rem;
    margin-bottom: 1.5rem;
  }
  .modal-delegate {
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
    border-radius: 0.63rem;
    margin-top: 1.56rem;
    border: none;
    min-width: 18rem;

    max-width: calc(100% - 11.25rem);
    min-height: 3.13rem;

    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    color: ${(p) => p.theme.white};
  }
  .del-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const EntrustedAddress = styled.div`
  background: #f5f5f5;
  border-radius: 0.63rem;
  padding: 0.94rem 1.69rem 0;
  width: 100%;
`

export const EntrustedTitle = styled.h5`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 0.88rem;
  line-height: 2.06rem;
  margin-bottom: 0.63rem;
`

export const EntrustedInput = styled.input`
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

export const Othre = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.31rem;
  text-align: center;
  color: #3396ff;
  margin-top: 1.38rem;
  cursor: pointer;
`
