import styled, { css } from 'styled-components'
import { Button, Col, Row } from 'antd'
import { WrapperOthers } from '@/common/styled'

export const SwapWrapper = styled.div`
  ${WrapperOthers}
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        border-top: 0.06rem solid #d9d9d9;
      `,
    )}
`

export const SwapContent = styled.div`
  background: ${(p) => p.theme.white};
  border-radius: 0.63rem;
  margin: 0;
  padding: 0.63rem 0 4.69rem;
  .modal-swap,
  .modal-swap-disabled {
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
    border-radius: 0.63rem;
    margin-top: 1.88rem;
    border: none;
    width: 100%;
    min-height: 4rem;
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 1rem;
    color: ${(p) => p.theme.white};
  }
  .modal-swap-disabled {
    background: #f5f5f5;
    border-color: #f5f5f5;
    color: rgba(0, 0, 0, 0.25);
  }
  .submit-wallet {
    margin-top: 1.88rem;
  }
  .swap-tips {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    color: #999999;
    margin-top: 0.94rem;
    text-align: end;
  }
  ${(p) =>
    p.theme.mediaWidth.sm(
      () => css`
        padding: 1.88rem 1.56rem 1.88rem;
        box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        padding: 3.88rem 2.75rem;
        margin: 3.13rem 5% 9.63rem;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        padding: 3.88rem 9rem;
        margin: 3.13rem 10% 9.63rem;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        margin: 3.13rem 20% 9.63rem;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xxl(
      () => css`
        margin: 3.13rem 25% 9.63rem;
      `,
    )}
`

export const SwapTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 2.69rem;
  text-align: center;
  margin-bottom: 1.88rem;
  margin-top: 2.5rem;
  color: ${(p) => p.theme.black};
`

export const SwapInputDiv = styled(Row)`
  background: #f5f5f5;
  border-radius: 0.63rem;
  padding: 1rem 0.94rem;
  display: flex;
  align-items: center;

  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        padding: 1rem 1.88rem;
      `,
    )}
`

export const SwapInput = styled.input`
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

export const SwapTokensAiDiv = styled.div`
  background: #ffffff;
  border-radius: 0.63rem;
  display: flex;
  height: 3.25rem;
  align-items: center;
  .anticon {
    margin-left: 0.63rem;
    margin-right: 0.31rem;
  }
  .spans {
    font-weight: 700;
    font-family: 'NotoSansHans-Bold';
    font-size: 0.88rem;
    color: ${(p) => p.theme.black};
  }
`

export const SwapChangeIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.25rem 0;
  .anticon {
    cursor: pointer;
  }
`

export const SwapBalanceDiv = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.88rem;
  color: #999999;
`

export const FluidityWrapper = styled.div`
  background: #ffffff;
  border-radius: 0.63rem;
  min-height: 52.5rem;
  margin: 3.13rem 0 9.63rem;
  ${(p) =>
    p.theme.mediaWidth.sm(
      () => css`
        padding: 0 4.69rem 4.38rem;
        box-shadow: 0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1);
      `,
    )}
`

export const FluidityTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1.25rem;
  text-align: center;
  text-transform: capitalize;
  color: ${(p) => p.theme.black};
  height: 6.06rem;
  line-height: 6.06rem;
  text-align: center;
  border-bottom: 0.06rem solid #d9d9d9;
`

export const FluidityContent = styled(Row)`
  margin-top: 2.5rem;
`

export const CurrentTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1.25rem;
  text-transform: capitalize;
  color: ${(p) => p.theme.black};
  margin-bottom: 0.94rem;
`

export const CurrentTokenDiv = styled(Row)`
  background: #f5f5f5;
  border-radius: 0.63rem;
  padding: 1rem 1.13rem;
`

export const FluidityToken = styled(Col)`
  background-color: white;
  border-radius: 0.63rem;
  padding: 0 0.81rem;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .span {
    margin-left: 0.81rem;
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    text-align: center;
    color: ${(p) => p.theme.black};
  }
`

export const FluidityLevel = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.88rem;
  color: ${(p) => p.theme.black};
  margin-top: 0.63rem;
`

export const FluidityChoose = styled.div`
  padding: 0 0.81rem;
  border-radius: 0.38rem;
  background: #f5f5f5;
  height: 1.88rem;
  width: 9rem;
  line-height: 1.88rem;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  text-align: center;
  color: ${(p) => p.theme.black};
  margin: 0.38rem 0 2rem;
  ${(p) =>
    p.theme.mediaWidth.xxl(
      () => css`
        width: 7.5rem;
      `,
    )}
`

export const AmountInputDiv = styled.div`
  background: #f5f5f5;
  border-radius: 0.63rem;
  min-height: 7.25rem;
  padding: 1.06rem 1.13rem;
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 1.25rem;
  margin-bottom: 0.88rem;
  ${(p) =>
    p.theme.mediaWidth.mxl(
      () => css`
        grid-template-columns: 3fr 2fr;
      `,
    )}
`

export const AmountInput = styled.input`
  width: 100%;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2.69rem;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 0.06rem solid #d9d9d9;
  &:focus {
    border-color: #d9d9d9;
  }
`

export const AmountTitles = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.88rem;
  color: ${(p) => p.theme.black};
  height: 3rem;
  display: flex;
  align-items: center;
`

export const AmountMax = styled.div`
  display: flex;
  align-items: center;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.88rem;
  color: ${(p) => p.theme.black};
  height: 3rem;
  span {
    max-width: calc(50% - 0.75rem);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .max {
    max-width: calc(50% + 0.75rem);
    background: #f1c8c8;
    border-radius: 0.63rem;
    padding: 0 0.63rem;
    margin-left: 0.75rem;
    color: #db6363;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const CurrentSubtitle = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.88rem;
  color: ${(p) => p.theme.black};
  margin-bottom: 0.94rem;
`

export const ExchgangeRateDiv = styled.div<{ isBool: boolean }>`
  border: 0.06rem solid ${({ isBool, theme }) => (isBool ? theme.themeColor : '#d9d9d9')};
  border-radius: 0.63rem;
  min-height: 8.63rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    text-transform: capitalize;
    margin: 0.94rem 0 0.38rem;
    color: #999999;
  }
`

export const ExchgangeRate = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.94rem;
  width: 100%;
  margin-bottom: 0.94rem;
`

export const FullRangeBtn = styled(Button)`
  width: 100%;
  border: 0.06rem solid #d9d9d9;
  border-radius: 0.63rem;
  height: 3.13rem;
  margin-bottom: 0.94rem;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  text-align: center;
  text-transform: capitalize;
  color: ${(p) => p.theme.black};
`

export const ExchangeSubmitBtn = styled(Button)`
  width: 100%;
  height: 4rem;
  border: none;
  background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
  border-radius: 0.63rem;
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  color: ${(p) => p.theme.white};
  &:hover,
  &:focus {
    border: none;
    color: ${(p) => p.theme.white};
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
  }
`
