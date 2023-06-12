import styled, { css } from 'styled-components'

const h5DrawerMenuCss = css`
  height: 2.69rem;
  line-height: 2.69rem;
  text-align: end;
`

export const SideMenuH5Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: relative;
  .tabbar-right {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .side-menu-h5-icon {
    color: ${(props) => props.theme.black};
    font-size: 1.25rem;
    margin-left: 0.75rem;
  }

  .mask-mask {
    width: 100%;
    height: calc(100vh - 2.69rem);
    background: transparent;
    position: fixed;
    top: 2.69rem;
    left: 0;
    z-index: 1;
  }
`

export const SideMenuH5Title = styled.div<{ isHomeTran: boolean }>`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.13rem;
  color: ${({ isHomeTran, theme }) => (isHomeTran ? theme.white : theme.black)};
`

export const SideMenuH5Mask = styled.div`
  position: absolute;
  top: 3rem;
  z-index: 2;
  right: 0;
  width: 8.56rem;
  height: auto;
  border-radius: 0.25rem;
  padding: 1.31rem 1.38rem;
  background: #ffffff;
  filter: drop-shadow(0rem 0.13rem 0.88rem rgba(0, 0, 0, 0.1));
  &::after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    border-left: 0.75rem solid transparent;
    border-top: 0 solid transparent;
    border-right: 0.75rem solid transparent;
    border-bottom: 1rem solid ${(props) => props.theme.white};
    right: 0;
    top: -0.5rem;
    z-index: -1;
    transform: rotate(0deg);
  }
  display: flex;
  flex-direction: column;
  .navlink-active {
    ${h5DrawerMenuCss}
    color: ${(props) => props.theme.themeColor} !important;
    font-size: 0.88rem;
    font-family: 'NotoSansHans-Regular';
    font-weight: 600;
  }
  .navlink-default {
    ${h5DrawerMenuCss}
    color: ${(props) => props.theme.black} !important;
    font-size: 0.88rem;
    font-weight: 400;
    font-family: 'NotoSansHans-Regular';
    &:hover {
      content: '';
      font-weight: 600;
      color: ${(props) => props.theme.themeColor} !important;
    }
  }
`
