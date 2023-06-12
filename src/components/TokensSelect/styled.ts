import styled from 'styled-components'

export const TokensSelectWrapper = styled.div`
  .ant-btn.ant-btn-primary {
    min-height: 3.25rem;
    background: ${(p) => p.theme.white};
    border-radius: 0.63rem;
    border: none;
    font-family: 'NotoSansHans-Bold';
    color: ${(p) => p.theme.black};
    box-shadow: none;
    text-shadow: none;
    font-weight: 700;
    font-size: 0.88rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0.63rem;
    .leftss {
      display: flex;
      align-items: center;
    }
    h5 {
      margin-left: 0.63rem;
    }
    &:hover,
    &:focus {
      border: none;
      color: ${(p) => p.theme.black};
      background: ${(p) => p.theme.white};
    }
  }
`

export const PopoverContent = styled.div`
  .info.active {
    h5 {
      font-weight: 700;
      color: ${(p) => p.theme.themeColor};
    }
  }
  .info {
    padding: 0 0.94rem;
    display: flex;
    align-items: center;
    width: 9.38rem;
    height: 2.5rem;
    .ions {
      width: 1.88rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h5 {
      margin-left: 0.63rem;
      font-size: 0.88rem;
      line-height: 1.31rem;
      color: #999999;
    }
    &:hover {
      h5 {
        font-weight: 700;
        color: ${(p) => p.theme.themeColor};
      }
      background: ${(p) => p.theme.themeColor}32;
    }
  }
`

export const SwapClickDiv = styled.div<{ isClick: boolean }>`
  cursor: ${({ isClick }) => (isClick ? 'not-allowed !important' : 'pointer !important')};
`
