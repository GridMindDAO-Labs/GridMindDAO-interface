import styled from 'styled-components'

export const SideMenuWrapper = styled.div<{ isHome: boolean }>`
  display: flex;
  .fours {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    a {
      width: 50%;
      text-align: center;
    }
  }
  ${({ isHome }) =>
    isHome &&
    `
    .ant-menu {
      color: white;
    }
  `}

  .menu-item-cus {
    .navlink-active {
      color: ${(props) => props.theme.themeColor} !important;
      font-size: 0.88rem;
      font-weight: 600;
      font-family: 'NotoSansHans-Regular';
    }
    .navlink-default,
    .navlink-default-black {
      color: #999999 !important;
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      &:hover {
        content: '';
        font-weight: 600;
        color: ${(props) => props.theme.themeColor} !important;
      }
    }
    .navlink-child-title {
      padding: 0 0.63rem;
    }
    .navlink-default-black {
      color: #fff !important;
    }
  }
`
