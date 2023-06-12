import styled, { css } from 'styled-components'
import { h5LayoutAdaptation, flatLayoutAdaptation, webLayoutAdaptation, webLayoutAdaptationMax } from '@/common/styled'

export const TopBarWrapper = styled.div`
  ${h5LayoutAdaptation}
  height: 3.38rem;
  .topbar-ant-row {
    width: 100%;
    height: 3.38rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    .tabbar-right {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }
  }
  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        ${flatLayoutAdaptation}
        height: 5rem;
        .topbar-ant-row {
          height: 5rem;
        }
      `,
    )}
  ${(props) =>
    props.theme.mediaWidth.mxl(
      () => css`
        ${webLayoutAdaptation}
      `,
    )}
  ${(props) =>
    props.theme.mediaWidth.maxl(
      () => css`
        ${webLayoutAdaptationMax}
      `,
    )}
`

export const TopBarTitle = styled.span`
  font-family: 'NotoSansHans-Regular';
  font-style: normal;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.5rem;
  margin-left: 0.88rem;
  color: ${(props) => props.theme.black};
  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        font-size: 1rem;
        line-height: 1.5rem;
      `,
    )}
`
