import styled, { css } from 'styled-components'
import { Row } from 'antd'

export const ModalContentRow = styled(Row)<{ isTrue: boolean }>`
  ${({ isTrue }) =>
    !isTrue &&
    css`
      justify-content: center !important;
    `}
`

export const webLayoutAdaptationMax = css`
  max-width: min(112.5rem, 120rem - 7.5rem);
  margin: 0 auto;
`

export const webLayoutAdaptation = css`
  max-width: min(93.75%, 100% - 6.25%);
  margin: 0 auto;
`

export const flatLayoutAdaptation = css`
  max-width: min(92.51%, 100% - 7.49%);
  margin: 0 auto;
`

export const h5LayoutAdaptation = css`
  max-width: min(89.34%, 100% - 10.66%);
  margin: 0 auto;
`

export const Wrappers = css`
  ${h5LayoutAdaptation}
  min-height: calc(100vh - 3.38rem - 6.25rem);
  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        ${flatLayoutAdaptation}
        min-height: calc(100vh - 5rem);
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

export const WrapperOthers = css`
  ${h5LayoutAdaptation}
  min-height: calc(100vh - 3.38rem - 6.25rem);
  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        ${flatLayoutAdaptation}
        padding: 0 5.2%;
        min-height: calc(100vh - 5rem);
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        padding: 0 10.4%;
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

export const VotingBtnCss = css`
  .voting-btn-0 {
    color: #de8350;
    background: #fffff0;
    &:hover,
    &:focus {
      color: #de8350;
      background: #fffff0;
    }
  }
  .voting-btn-1 {
    color: #508bde;
    background: #f0f6ff;
    &:hover,
    &:focus {
      color: #508bde;
      background: #f0f6ff;
    }
  }
  .voting-btn-2 {
    color: #a1a1a1;
    background: #f4f4f4;
    &:hover,
    &:focus {
      color: #a1a1a1;
      background: #f4f4f4;
    }
  }
  .voting-btn-3 {
    color: #db6363;
    background: #f5dbdb;
    &:hover,
    &:focus {
      color: #db6363;
      background: #f5dbdb;
    }
  }
  .voting-btn-4 {
    color: #af7feb;
    background: #f6ecfb;
    &:hover,
    &:focus {
      color: #af7feb;
      background: #f6ecfb;
    }
  }
  .voting-btn-5 {
    color: #add146;
    background: #f8fff0;
    &:hover,
    &:focus {
      color: #add146;
      background: #f8fff0;
    }
  }
  .voting-btn-6 {
    color: #a8968c;
    background: #ece7e4;
    &:hover,
    &:focus {
      color: #a8968c;
      background: #ece7e4;
    }
  }
  .voting-btn-7 {
    color: #34b287;
    background: #dbf5ec;
    &:hover,
    &:focus {
      color: #34b287;
      background: #dbf5ec;
    }
  }
`
