import styled, { css } from 'styled-components'
import { h5LayoutAdaptation } from '@/common/styled'

export const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.white};
`

export const LayoutContent = styled.div<{ isHome: boolean }>`
  min-height: 100vh;
  padding-top: ${({ isHome }) => (!isHome ? '3.38rem' : '0')};
  background: ${(props) => props.theme.white};
  ${({ theme, isHome }) =>
    theme.mediaWidth.md(
      () => css`
        padding-top: ${!isHome ? '5rem' : ''};
      `,
    )}
`

export const LayoutTopBar = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background: ${(props) => props.theme.white};
`

export const H5Wrappers = styled.div`
  height: 6rem;
`

export const H5Wrapper = styled.div`
  ${h5LayoutAdaptation}
  width: 100%;
  height: 5.63rem;
  position: relative;
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: calc(10.66% / 2);
`

export const H5Mask = styled.div`
  width: 100%;
  height: 5rem;
  left: 0;
  top: -0.25rem;
  position: absolute;
  z-index: -1;
  background: #f9f9f9;
  border-radius: 0.63rem 0.63rem 0rem 0rem;
`

export const Content = styled.div`
  background: ${(props) => props.theme.white};
  width: 100%;
  border-radius: 0.63rem 0.63rem 0rem 0rem;
  height: 5.63rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
