import { Button } from 'antd'
import styled, { css } from 'styled-components'
import { Row } from 'antd'

export const ConnectWalletWrapper = styled.div`
  .wallet-connect-btn-web-profile {
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
    border-radius: 0.63rem;
    min-width: 18rem;
    height: 3.13rem;
    text-shadow: none;
    box-shadow: none;
    border: none;
    font-family: 'NotoSansHans-Regular';
    font-weight: 700;
    font-size: 0.88rem;
    text-align: center;
    color: ${(p) => p.theme.white};
  }
  .wallet-connect-h5-div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wallet-connect-btn,
  .wallet-connect-btn-home-web {
    min-width: 9.81rem;
    height: 3rem;
    color: ${(p) => p.theme.themeColor};
    font-family: 'NotoSansHans-Regular';
    font-style: normal;
    font-weight: 700;
    font-size: 0.88rem;
    line-height: 1.31rem;
    text-shadow: none !important;
    border: 0.06rem solid ${(props) => props.theme.themeColor};
  }
  .wallet-connect-btn-home-web {
    background: transparent;
    border: 0.06rem solid ${(props) => props.theme.white};
    color: ${(props) => props.theme.white};
  }
  .wallet-connect-btn-h5 {
    min-width: 11rem;
    height: 2.81rem;
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
    border-radius: 0.25rem;
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    text-shadow: none !important;
    box-shadow: none;
  }
`

export const ModalTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin: 0.63rem 0;
`

export const AddressBtn = styled.div`
  position: relative;
  &:after {
    content: '';
    width: 100%;
    height: 3.13rem;
    position: absolute;
    bottom: 0;
    top: 3rem;
  }
  .address-logout {
    min-width: 6.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    position: absolute;
    bottom: -3rem;
    filter: drop-shadow(0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1));
    right: 0.94rem;
    background: ${(props) => props.theme.white};
    color: ${(props) => props.theme.black};
    font-family: 'NotoSansHans-Regular';
    font-style: normal;
    font-weight: 400;
    border: none;
    font-size: 0.88rem;
    z-index: 1;
    text-align: center;
    border-radius: 0.63rem;
    cursor: pointer;
    &::after {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      border-left: 0.75rem solid transparent;
      border-top: 0 solid transparent;
      border-right: 0.75rem solid transparent;
      border-bottom: 1rem solid ${(p) => p.theme.white};
      right: -4.16px;
      top: -0.5rem;
      z-index: -1;
      transform: rotate(-90deg);
    }
    &:hover {
      color: ${(p) => p.theme.themeColor};
    }
  }
`

export const AddressTitle = styled(Button)<{ isHomeTran: boolean }>`
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0.25rem 0.94rem;
  span {
    line-height: 3rem;
    font-family: 'NotoSansHans-Regular';
    font-style: normal;
    font-weight: 700;
    font-size: 0.88rem;
    color: ${({ theme, isHomeTran }) => (isHomeTran ? theme.white : theme.themeColor)};
  }
`

export const Leran = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 0.88rem;
  margin-bottom: 0.63rem;
  line-height: 1.31rem;
  color: ${(props) => props.theme.black};
  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        margin-bottom: 0;
      `,
    )}
`

export const LeranLink = styled.a`
  color: #3396ff;
  font-family: 'NotoSansHans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.31rem;
  &:hover {
    color: #3396ff;
  }
`

const btnCss = css`
  min-width: 5.38rem;
  min-height: 1.88rem;
  border-radius: 0.25rem;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  color: ${(props) => props.theme.white};
`

export const AddressBtnH5 = styled(Row)`
  .address-btn-h5-left {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    .text {
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-size: 0.88rem;
      padding-left: 0.88rem;
    }
  }
  .address-btn-h5-right {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 1.19rem;
    .right-details {
      ${btnCss}
      background: ${(props) => props.theme.themeColor};
      border: 0.06rem solid ${(props) => props.theme.themeColor};
    }
    .right-logout {
      ${btnCss}
      background: #C2C2C2;
      border: 0.06rem solid #c2c2c2;
    }
  }
`

export const AddressBtnWeb = styled(Row)`
  background: ${(props) => props.theme.themeColor};
  border-radius: 0.63rem;
  width: 100%;
  height: 5rem;
  margin: 1rem 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin: 1.88rem 0 1.44rem;
      `,
    )}
  .address-btn-web-left {
    padding-left: 1.53rem;
    display: flex;
    align-items: center;
    .text {
      font-family: 'NotoSansHans-Bold';
      font-style: normal;
      font-weight: 700;
      font-size: 0.88rem;
      margin-left: 0.81rem;
    }
  }
  .address-btn-web-right {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 1.53rem;
    .anticon {
      cursor: pointer;
    }
  }
`
