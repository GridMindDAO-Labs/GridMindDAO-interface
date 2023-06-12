import styled, { css } from 'styled-components'
import { Wrappers } from '@/common/styled'
import { Button } from 'antd'
import HOMEDATA from '@/assets/home-data.png'
import HOME_USED1 from '@/assets/home-used1.png'
import HOME_USED2 from '@/assets/home-used2.png'
import HOME_USED3 from '@/assets/home-used3.png'
import HOME_USED4 from '@/assets/home-used4.png'
import BANLANCE from '@/assets/balance.png'
import BALANCE_H5 from '@/assets/balance-h5.png'

export const HomeWrapper = styled.div`
  ${Wrappers}
  .info-rights {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    span {
      text-align: end;
    }
  }
  .data-h5 {
    &::before {
      content: '';
      position: absolute;
      top: 6.88rem;
      right: 0.44rem;
      width: 13.44rem;
      height: 13.94rem;
      background: url(${HOMEDATA}) no-repeat;
      background-size: 100% 100%;
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        padding-top: 4.5rem;
      `,
    )}
`

export const HomeContent = styled.div`
  position: relative;
  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        padding: 0 5.2%;
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.lg(
      () => css`
        padding: 0 10.4%;
      `,
    )}
`

export const HomeButter = styled.div<{ isH5: boolean }>`
  width: 100%;
  height: 50.75rem;
  background: ${({ isH5 }) => (isH5 ? `url(${BALANCE_H5}) no-repeat` : `url(${BANLANCE}) no-repeat`)};
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  .butter-right {
    margin-top: calc(3.38rem + 3.25rem);
    text-align: center;
    .titles {
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-size: 2.5rem;
      line-height: 2.6rem;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient(102.83deg, #ebb62d 2.19%, #ffffff 81.87%),
        linear-gradient(252.97deg, #ffd33a 24.58%, #f9d8af 38.79%), linear-gradient(253.01deg, #ffffff 59.94%, #e7af6e 76.16%),
        linear-gradient(to right, #e9d4bc, rgba(0, 0, 0, 0));
      margin-bottom: 0.94rem;
    }
    p {
      width: 90%;
      margin-left: 5%;
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
      text-align: center;
      color: #edcea1;
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        height: 62.5rem;
        .butter-right {
          margin-top: calc(5rem + 3.25rem);
          .titles {
            font-family: 'NotoSansHans-Bold';
            font-weight: 700;
            font-size: 4.88rem;
            line-height: 6rem;
            margin-bottom: 1.37rem;
          }
          p {
            width: 80%;
            margin-left: 10%;
            font-family: 'NotoSansHans-Regular';
            font-weight: 400;
            font-size: 1rem;
            line-height: 2.19rem;
            text-align: center;
            color: #edcea1;
          }
        }
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        .butter-right {
          p {
            width: 60%;
            margin-left: 20%;
          }
        }
      `,
    )}
`

export const TradeNowBtn = styled(Button)`
  background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
  border-radius: 0.25rem;
  min-width: 12.38rem;
  min-height: 3.13rem;
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1rem;
  color: ${(p) => p.theme.white};
  border: none;
  &:hover,
  &:focus {
    border: none;
    background: linear-gradient(102.83deg, #ffa337 2.19%, #fab768 81.87%);
    color: ${(p) => p.theme.white};
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        border-radius: 1.25rem;
        min-width: 14.63rem;
        min-height: 4.06rem;
        font-family: 'NotoSansHans-Bold';
        font-weight: 700;
        font-size: 1rem;
      `,
    )}
`

export const HomeDataDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 1.25rem 1.56rem;
  .anticon {
    margin-top: 3.31rem;
    z-index: 2;
    position: relative;
    svg {
      width: 3.06rem;
      height: auto;
    }
  }
  .titles {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    text-align: center;
    color: ${(p) => p.theme.black};
    width: 100%;
    margin: 0.13rem 0 1rem;
  }
  a {
    font-family: 'NotoSansHans-Regular';
    font-weight: 700;
    font-size: 1rem;
    line-height: 2.19rem;
    text-align: center;
    color: #3396ff;
    &:hover {
      color: ${(p) => p.theme.themeColor};
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin: 0 2.5rem 1.56rem;
        .anticon {
          margin-top: 3.56rem;
          z-index: 2;
          position: relative;
          svg {
            width: 6.63rem;
            height: auto;
          }
        }
        &::after {
          content: '';
          width: 41rem;
          height: 42.19rem;
          background: url(${HOMEDATA}) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          right: 0;
          top: 2rem;
          z-index: 0;
        }
        .titles {
          font-family: 'NotoSansHans-Regular';
          font-weight: 400;
          font-size: 1.5rem;
          line-height: 3.25rem;
          text-align: center;
          color: ${(p) => p.theme.black};
          width: 65%;
          margin: 1.5rem 0 1.63rem;
        }
      `,
    )}
`

export const HomeDataList = styled.div`
  display: grid;
  width: 100%;
  margin-top: 1rem;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.63rem;
  .info {
    z-index: 2;
    width: 100%;
    min-height: 8.56rem;
    background: ${(p) => p.theme.white};
    box-shadow: 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.06);
    border-radius: 0.63rem;
    padding: 1.25rem 1.81rem;
    position: relative;
    .anticon {
      position: absolute;
      bottom: 1.25rem;
      right: 1.13rem;
      svg {
        width: 4.75rem;
        height: 4.75rem;
      }
    }
    h3 {
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 1.88rem;
      color: ${(p) => p.theme.black};
    }
    h4 {
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-size: 1rem;
      line-height: 1.5rem;
      color: #666666;
      margin: 0.63rem 0;
    }
    h5 {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.31rem;
      color: #999999;
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin-top: 2.81rem;
        grid-template-columns: repeat(3, 1fr);
        gap: 4.25rem;
        .info {
          z-index: 2;
          width: 100%;
          min-height: 16.63rem;
          background: ${(p) => p.theme.white};
          border-radius: 1.25rem;
          padding: 3rem 2.81rem 1.88rem 3.13rem;
          position: relative;
          .anticon {
            position: absolute;
            bottom: 1.5rem;
            right: 2.19rem;
          }
          h3 {
            font-family: 'NotoSansHans-Bold';
            font-weight: 700;
            font-size: 2rem;
            line-height: 3rem;
            color: ${(p) => p.theme.black};
          }
          h4 {
            font-family: 'NotoSansHans-Bold';
            font-weight: 700;
            font-size: 1.5rem;
            line-height: 2.25rem;
            color: #666666;
            margin: 0.25rem 0 0.38rem;
          }
          h5 {
            font-family: 'NotoSansHans-Regular';
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.5rem;
            color: #999999;
          }
        }
      `,
    )}
`

export const HomeTitel = styled.div`
  font-family: 'NotoSansHans-Bold';
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.88rem;
  text-align: center;
  color: ${(p) => p.theme.black};
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        font-size: 2.5rem;
        line-height: 3.75rem;
      `,
    )}
`

export const HomeUsedDiv = styled.div`
  margin-top: 3.13rem;
  .used-list2 {
    grid-template-columns: 1fr;
    .info {
      &:nth-child(1) {
        .info-h5-img {
          position: absolute;
          bottom: 1.81rem;
          right: 0.75rem;
        }
      }
      &:nth-child(2) {
        .info-h5-img {
          position: absolute;
          bottom: 1.06rem;
          left: 0.81rem;
        }
      }
    }
  }
  .used-title {
    margin-bottom: 1.19rem;
  }
  .info-other {
    background: #f1f4f9 !important;
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin-top: 10.63rem;
        .used-title {
          margin-bottom: 4.5rem;
        }
        .used-list2 {
          grid-template-columns: 5fr 4fr;
          .info {
            &::after {
              content: '';
              position: absolute;
              z-index: 0;
              right: 3.75rem;
              bottom: 3.25rem;
              width: 7rem;
              height: 5.6rem;
              background: url(${HOME_USED3}) no-repeat;
              background-size: 100% 100%;
            }
            &:nth-child(2) {
              &::after {
                content: '';
                position: absolute;
                z-index: 0;
                right: 3.5rem;
                bottom: 2rem;
                width: 6.28rem;
                height: 7.405rem;
                background: url(${HOME_USED4}) no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        .used-list2 {
          .info {
            &::after {
              content: '';
              position: absolute;
              z-index: 0;
              right: 3.75rem;
              bottom: 3.25rem;
              width: 14rem;
              height: 11.19rem;
              background: url(${HOME_USED3}) no-repeat;
              background-size: 100% 100%;
            }
            &:nth-child(2) {
              &::after {
                content: '';
                position: absolute;
                z-index: 0;
                right: 3.5rem;
                bottom: 2rem;
                width: 12.56rem;
                height: 14.81rem;
                background: url(${HOME_USED4}) no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      `,
    )}
`

export const HomeUsedList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.63rem;
  margin-bottom: 0.63rem;
  .info {
    min-height: 9.81rem;
    background: #ffeed5;
    border-radius: 0.63rem;
    display: flex;
    flex-direction: column;
    padding: 1.25rem 1.94rem;
    position: relative;
    z-index: 2;
    &:nth-child(1) {
      .info-h5-img {
        position: absolute;
        bottom: 1rem;
        right: 1.44rem;
      }
    }
    &:nth-child(2) {
      .info-h5-img {
        position: absolute;
        bottom: 0.94rem;
        left: 0.25rem;
      }
    }
    h4 {
      font-family: 'NotoSansHans-Bold';
      font-weight: 700;
      font-size: 1rem;
      line-height: 1.5rem;
      color: ${(p) => p.theme.black};
    }
    span {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      margin: 0.38rem 0 0.44rem;
      font-size: 0.75rem;
      line-height: 1.63rem;
      width: 60%;
      color: ${(p) => p.theme.black};
    }
    a {
      font-family: 'NotoSansHans-Regular';
      font-weight: 400;
      font-size: 0.88rem;
      line-height: 1.88rem;
      color: #3396ff;
      &:hover {
        color: ${(p) => p.theme.themeColor};
      }
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        grid-template-columns: 4fr 5fr;
        gap: 3.63rem;
        margin-bottom: 3.19rem;
        .info {
          min-height: 18.94rem;
          background: #ffeed5;
          padding: 2.5rem 3.81rem;
          h4 {
            font-family: 'NotoSansHans-Bold';
            font-weight: 700;
            font-size: 2rem;
            line-height: 3rem;
            color: ${(p) => p.theme.black};
          }
          span {
            font-family: 'NotoSansHans-Regular';
            font-weight: 400;
            margin: 0.75rem 0 0.88rem;
            font-size: 1rem;
            line-height: 2.19rem;
            width: 50%;
            color: ${(p) => p.theme.black};
          }
          a {
            font-family: 'NotoSansHans-Regular';
            font-weight: 400;
            font-size: 0.88rem;
            line-height: 2.19rem;
            color: #3396ff;
            &:hover {
              color: ${(p) => p.theme.themeColor};
            }
          }
          &::after {
            content: '';
            position: absolute;
            z-index: 0;
            right: 1.19rem;
            bottom: 1.31rem;
            width: 7.19rem;
            height: 7.19rem;
            background: url(${HOME_USED1}) no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(2) {
            &::after {
              content: '';
              position: absolute;
              z-index: 0;
              right: 2.06rem;
              bottom: 2.01rem;
              width: 8.6rem;
              height: 7.44rem;
              background: url(${HOME_USED2}) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      `,
    )}
  ${(p) =>
    p.theme.mediaWidth.xl(
      () => css`
        .info {
          &::after {
            content: '';
            position: absolute;
            z-index: 0;
            right: 1.19rem;
            bottom: 1.31rem;
            width: 13.63rem;
            height: 13.63rem;
            background: url(${HOME_USED1}) no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(2) {
            &::after {
              content: '';
              position: absolute;
              z-index: 0;
              right: 2.06rem;
              bottom: 2.01rem;
              width: 17.31rem;
              height: 14.88rem;
              background: url(${HOME_USED2}) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      `,
    )}
`

export const HomeGovernanceDiv = styled.div`
  margin-top: 1.88rem;
  margin-bottom: 2.5rem;
  .title {
    font-family: 'NotoSansHans-Regular';
    font-weight: 400;
    font-size: 0.88rem;
    line-height: 1.88rem;
    text-align: center;
    color: #666666;
    margin-bottom: 1.44rem;
  }
  .list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.06rem;
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        font-family: 'NotoSansHans-Bold';
        font-weight: 700;
        font-size: 0.88rem;
        line-height: 1.31rem;
        color: ${(p) => p.theme.black};
      }
      p {
        font-family: 'NotoSansHans-Regular';
        font-weight: 400;
        font-size: 0.88rem;
        line-height: 1.88rem;
        color: #666666;
        margin: 0.5rem 0;
        text-align: center;
      }
      a {
        font-family: 'NotoSansHans-Regular';
        font-weight: 400;
        font-size: 0.88rem;
        line-height: 2.19rem;
        color: #3396ff;
        &:hover {
          color: ${(p) => p.theme.themeColor};
        }
      }
      .info-icon {
        .anticon {
          margin-right: 0.63rem;
        }
      }
    }
  }
  ${(p) =>
    p.theme.mediaWidth.md(
      () => css`
        margin-top: 3.13rem;
        margin-bottom: 8.13rem;
        .title {
          font-family: 'NotoSansHans-Regular';
          font-weight: 400;
          font-size: 1rem;
          line-height: 2.19rem;
          text-align: center;
          color: #666666;
          margin-bottom: 2.88rem;
        }
        .list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7.78%;
          .info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            h3 {
              font-family: 'NotoSansHans-Bold';
              font-weight: 700;
              font-size: 1.5rem;
              line-height: 2.25rem;
            }
            p {
              font-family: 'NotoSansHans-Regular';
              font-weight: 400;
              font-size: 1rem;
              line-height: 2.19rem;
              color: #666666;
              margin: 0.63rem 0;
              text-align: start;
            }
          }
        }
      `,
    )}
`
