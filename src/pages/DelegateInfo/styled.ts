import styled, { css } from 'styled-components'
import { Wrappers, VotingBtnCss } from '@/common/styled'

export const DelegateInfoWrapper = styled.div`
  ${Wrappers}
  padding-top: 0.31rem;
  ${VotingBtnCss}
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        padding-top: 1.88rem;
        border-top: 0.06rem solid #d9d9d9;
        .dao-content {
          margin-left: 1.56rem;
        }
      `,
    )}
`

export const DelegateInfoTabbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tannrs {
    display: flex;
    align-items: center;
    width: 60%;
  }
  h3 {
    cursor: pointer;
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${(p) => p.theme.black};
  }
  .span {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${(p) => p.theme.black};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .anticon {
    margin: 0 0.31rem;
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        justify-content: flex-start;
        .tannrs {
          width: auto;
        }
      `,
    )}
`
const InfoMode = css`
  background: #f5f5f5;
  border-radius: 0.63rem;
  height: 7.13rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.38rem;
  margin-top: 0.94rem;
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        background: ${(p) => p.theme.white};
        margin-top: 1.88rem;
        box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
      `,
    )}
`

export const DelegateInfoUsers = styled.div`
  ${InfoMode}
  margin-right: 0;
  padding: 0 0.94rem;
  .info-users {
    display: flex;
    align-items: center;
    .info-users-address {
      font-family: 'NotoSansHans-Regular';
      font-weight: 700;
      font-size: 0.88rem;
      margin: 0 0.63rem 0 0.75rem;
      line-height: 1.88rem;
      color: ${(p) => p.theme.themeColor};
    }
    .icon-copys {
      cursor: pointer;
    }
  }
  .users-delegate {
    min-height: 2.25rem;
    min-width: 7rem;
    border-radius: 0.25rem;
    color: ${(p) => p.theme.white};
    background: ${(p) => p.theme.themeColor};
    border: none;
  }
  .users-delegate-disabled {
    border: none;
    background: #ededed;
    color: #ababab;
    border-radius: 0.25rem;
  }

  ${(p) => p.theme.mediaWidth.xl`
    margin-right: 1.25rem;
    padding: 0 2.38rem;
    .users-delegate,.users-delegate-disabled {
      border-radius: 0.63rem;
    }
  `}
`

export const DelegateInfoNums = styled.div`
  background: #f5f5f5;
  border-radius: 0.63rem;
  min-height: 7.13rem;
  display: flex;
  flex-direction: column;
  padding: 1.13rem 0.94rem 0;
  margin-top: 0.63rem;
  .nums {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
      color: #999999;
      width: 60%;
      margin-bottom: 1.25rem;
    }
    h4 {
      width: 40%;
      text-align: end;
      font-family: 'NotoSansHans-Regular';
      font-weight: 700;
      font-size: 1rem;
      line-height: 2.19rem;
      color: ${(p) => p.theme.black};
    }
  }
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 2.38rem;
        margin-top: 1.88rem;
        background: ${(p) => p.theme.white};
        box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
        .nums {
          flex-direction: column;
          span,
          h4 {
            text-align: start;
            width: 100%;
          }
          span {
            margin-bottom: 0.75rem;
          }
        }
      `,
    )}
`

export const DelegateInfoVotingHistoryTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 0.88rem;
  line-height: 2.19rem;
  color: ${(p) => p.theme.black};
  padding: 0.94rem 0 0.32rem;
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        font-size: 1rem;
        padding: 1.88rem 0 0.94rem;
      `,
    )}
`

export const DelegateInfoVotingHistoryInfo = styled.div`
  border-top: 0.06rem solid #d9d9d9;
  padding: 0.94rem 0;
  display: flex;
  justify-content: space-between;
  .info-left {
    width: 50%;
    p {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
      color: ${(p) => p.theme.black};
      margin-bottom: 0.63rem;
      word-wrap: break-word;
    }
  }
  .info-right {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    .span {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
      color: ${(p) => p.theme.black};
    }
    .against {
      color: #f66363;
      margin-left: 0.31rem;
    }
    .favor {
      color: #34b287;
      margin-left: 0.31rem;
    }
    .anticon {
      display: none;
      margin-left: 0.31rem;
      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        .info-left {
          width: 70%;
        }
        .info-right {
          width: 30%;
          .anticon {
            display: block;
          }
        }
      `,
    )}
`
