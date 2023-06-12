import styled, { css } from 'styled-components'
import { Button, Col } from 'antd'
import { Wrappers, VotingBtnCss } from '@/common/styled'

export const ProposalsInfoWrapper = styled.div`
  ${Wrappers}
  padding-top: 0.31rem;
  ${VotingBtnCss}
  .details-executioned {
    margin-bottom: 1.88rem;
    word-wrap: break-word;
    p {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
      color: ${(p) => p.theme.black};
    }
  }
  .proposer-link {
    color: #1b72c1;
    &:hover {
      color: ${(p) => p.theme.themeColor};
    }
  }
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

export const ProposalsInfoTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 2.69rem;
  color: ${(p) => p.theme.black};
`

export const ProposalsInfoTabbar = styled(Col)`
  display: flex;
  margin: 0.94rem 0 0 0;
  flex-direction: column;
  justify-content: space-between;
  .tabar-right {
    display: flex;
    margin-top: 0.94rem;
    justify-content: space-between;
  }
  .tabbar-left {
    span {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
      color: ${(p) => p.theme.black};
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        flex-direction: row;
        margin: 0.94rem 0;
        .tabar-right {
          display: flex;
          margin-top: 0;
          justify-content: flex-start;
        }
      `,
    )}
`

const Btn = css`
  border-radius: 0.63rem;
  color: ${(p) => p.theme.white};
  border: none;
  box-shadow: none;
  text-transform: uppercase;
  font-family: 'NotoSansHans-Regular';
  font-weight: 700;
  font-size: 0.88rem;
  border-radius: 0.25rem;
  min-width: 9.75rem;
  min-height: 2.25rem;
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        min-width: 7.88rem;
        min-height: 2.25rem;
        border-radius: 0.63rem;
      `,
    )}
`

export const FovorBtn = styled(Button)`
  background: #34b287;
  ${Btn}
  margin-right: 1rem;
  &:hover,
  &:focus {
    border: none;
    color: ${(p) => p.theme.white};
    background: #34b287;
  }
`

export const AgainstBtn = styled(Button)`
  background: #db6363;
  ${Btn}
  &:hover,
  &:focus {
    border: none;
    color: ${(p) => p.theme.white};
    background: #db6363;
  }
`

export const ProposalsInfoForAgainstDiv = styled.div`
  background: #f5f5f5;
  border-radius: 0.63rem;
  padding: 0.31rem 1.88rem 0.94rem;
  margin-top: 0.94rem;
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin-top: 0;
      `,
    )}
  .view-tabbar {
    .title {
      display: flex;
      justify-content: space-between;
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-size: 1rem;
      line-height: 2.19rem;
      color: ${(p) => p.theme.black};
    }
  }
  .top-voters-list {
    .top-voters-title {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
      color: #999999;
    }
  }
  .view {
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: #333333;
    text-align: center;
    margin-top: 0.63rem;
    cursor: pointer;
  }
`

export const ProposalsInfoDetails = styled(Col)`
  border-top: 0.06rem dashed #c2c2c2;
  border-bottom: 0.06rem dashed #c2c2c2;
  padding: 0.94rem 0 1.88rem;
  .htmls {
    word-wrap: break-word;
    width: 100%;
    img {
      width: 50%;
    }
  }
`

export const ForAgainstModalContent = styled.div`
  height: 17.5rem;
  overflow: hidden;
  overflow-y: scroll;
  padding: 0 0.94rem 0 1.56rem;
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        padding: 0 2.81rem;
      `,
    )}
`

export const ListInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.63rem;
  a,
  span {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${(p) => p.theme.black};
  }
  a:hover {
    color: ${(p) => p.theme.themeColor};
  }
`
