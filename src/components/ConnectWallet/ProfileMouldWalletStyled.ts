import styled from 'styled-components'
import { Button } from 'antd'

export const ProfileMould = styled.div`
  background: #ffffff;
  min-height: 25.56rem;
  .wallets {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const ProfileTitle = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 700;
  font-size: 1rem;
  line-height: 2.19rem;
  text-align: center;
  color: ${(props) => props.theme.black};
`

export const ProfileMouldBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.44rem;
  flex-direction: column;
  .ant-row {
    width: 100%;
  }
`

export const InitiateProposalBtn = styled(Button)`
  width: calc(100% - 0.63rem);
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
  width: 100%;
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
