import styled from 'styled-components'
import { Button } from 'antd'

export const SwapBanlanceTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.94rem 0 0.31rem;
  .span {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: ${({ theme }) => theme.black};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ant-btn[disabled],
  .ant-btn[disabled]:hover,
  .ant-btn[disabled]:focus,
  .ant-btn[disabled]:active {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    color: ${({ theme }) => theme.black} !important;
    border-color: none !important;
    background: linear-gradient(266.75deg, rgba(98, 57, 197, 0.2) 5.04%, rgba(48, 83, 183, 0.2) 94.96%) !important;
    text-shadow: none;
    box-shadow: none;
    &:hover,
    &:focus {
      border: none !important;
      color: ${(p) => p.theme.black} !important;
      background: linear-gradient(93.25deg, rgba(98, 57, 197, 0.2) 5.04%, rgba(48, 83, 183, 0.2) 94.96%) !important;
    }
  }
`

export const ButtonMax = styled(Button)`
  background: linear-gradient(266.75deg, #6239c5 5.04%, #3053b7 94.96%);
  border-radius: 0.64rem;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.76rem;
  margin-left: 0.63rem;
  border: none;
  zoom: 0.8;
  padding: 0 1.01rem;
  color: ${({ theme }) => theme.white} !important;
  &:hover,
  &:focus {
    border: none !important;
    color: ${(p) => p.theme.white} !important;
    background: linear-gradient(93.25deg, #6239c5 5.04%, #3053b7 94.96%) !important;
  }
`
