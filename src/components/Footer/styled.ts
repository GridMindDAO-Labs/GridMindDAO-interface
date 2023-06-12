import styled, { css } from 'styled-components'

export const FooterWrapper = styled.div`
  padding: 1.88rem 0;
  .footer-icons {
    height: 3.13rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row-reverse;
    border-top: 0.06rem solid #f9f9f9;
    .anticon {
      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
      margin-right: 1rem;
      &:first-child {
        margin-right: 0;
      }
    }
  }
  .footer-collapse {
    .ant-collapse-header {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      color: #999999;
      border-top: 0.06rem solid #f9f9f9;
    }
  }
  .footer-menu-info {
    display: flex;
    align-items: center;
    .arrow-info {
      margin: 0 0.19rem 0 0.63rem;
    }
  }
  .footer-menu {
    height: 3.56rem;
    border-top: 0.06rem solid #f9f9f9;
    .footer-menu-language {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .lists {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .footer-right-xl {
    display: flex;
    align-items: center;
  }
  .footer-right {
    .footer-right-icon {
      display: flex;
      width: 100%;
      flex-direction: row-reverse;
      position: relative;
      .anticon {
        width: 2.69rem;
        height: auto;
      }
      a {
        margin-right: 1.25rem;
        &:first-child {
          margin-right: 0;
        }
      }
      .footer-language {
        position: relative;
        .footer-switch {
          position: absolute;
          left: -0.94rem;
          bottom: calc(-2.5rem - 1.25rem);
        }
      }
    }
  }

  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        padding: 3.13rem 1.56rem;
      `,
    )}
`

export const FooterLeftList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  a {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.31rem;
    margin-top: 0.94rem;
    color: ${(p) => p.theme.black};
    &:hover {
      color: ${(p) => p.theme.themeColor};
    }
  }
`

export const LeftListTitle = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${(p) => p.theme.black};
  margin-bottom: 0.31rem;
`

export const MenuTitle = styled.div`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.88rem;
  color: #999999;
`

export const CollapseH5A = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 0.88rem;
  line-height: 1.31rem;
  margin-left: 1.25rem;
  a {
    color: #999;
    margin-bottom: 0.94rem;
    &:hover {
      color: ${(p) => p.theme.themeColor};
    }
  }
`
