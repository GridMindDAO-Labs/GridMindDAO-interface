import styled from 'styled-components'

export const SwitchLanguageWrapper = styled.div`
  cursor: pointer;
  .switch-btn {
    display: flex;
    align-items: center;
    font-family: 'NotoSansHans-Bold';
    font-weight: 700;
    font-size: 0.88rem;
    color: #333333;
  }
`

export const SwitchPopoverDiv = styled.div`
  margin-top: 1.56rem;
  p {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.31rem;
    color: #999999;
    padding: 0 0.63rem;
    margin-bottom: 1.56rem;
    cursor: pointer;
    text-align: start;
    &:hover {
      color: ${(p) => p.theme.themeColor};
      font-weight: 700;
    }
  }
  p.active {
    color: ${(p) => p.theme.themeColor};
    font-weight: 700;
  }
`
