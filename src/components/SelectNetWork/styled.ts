import styled, { css } from 'styled-components'

export const NoChainIdTips = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  width: 100%;
  z-index: 0;
  line-height: 3.38rem;
  height: 4.38rem;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  align-items: center;
  line-height: initial;
  padding: 0 0.63rem;
  background: ${(props) => props.theme.themeColor};
  color: ${(props) => props.theme.white};
  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        height: 4.38rem;
        padding: 0;
        line-height: 1;
      `,
    )}
  .no-network-btns {
    font-weight: 500;
    margin-left: 1.25rem;
    color: ${(props) => props.theme.black};
    border-color: ${(props) => props.theme.white};
    &:hover,
    &:focus {
      border-color: ${(props) => props.theme.white};
      color: ${(props) => props.theme.black};
      background: ${(props) => props.theme.white};
    }
  }
`

export const SelectNetWorkWrapper = styled.div`
  padding: 0.75rem 1rem;
  float: right;
  .css-1okebmr-indicatorSeparator {
    display: none;
  }
  .wallet-btn-active-img {
    height: 24px;
    border-radius: 100%;
  }
`

export const customStyles = {
  placeholder: (provided: any) => ({
    ...provided,
    color: '#fff',
    fontWeight: 400,
    fontSize: '0.88rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    minWidth: '10.88rem',
    minHeight: 'auto',
    color: '#293543',
    // textIndent: '2em',
    textAlign: 'center',
    border: '0.9px solid transparent',
    borderRadius: '0.31rem',
    display: 'flex',
    background: 'transparent',
    borderColor: 'transparent',
    boxShadow: '1px solid transparent',
    '&:hover': {
      borderColor: 'transparent',
    },
    '@media screen and (max-width: 768px)': {
      height: '3.38rem',
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: 'none',
    color: state.isSelected ? '#33CCAE' : '#293543',
    background: '#ffffff',
    textAlign: 'center',
    fontSize: '14px',
    margin: 0,
    ':active': {
      backgroundColor: '#EFEEFD',
    },
    ':hover': {
      color: '#33CCAE',
      backgroundColor: '#EFEEFD',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    boxShadow: 'none',
    borderRadius: '0.31rem',
    // marginTop: '1.5rem',
    backgroundColor: '#ffffff',
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: '0.31rem',
    padding: '0.5rem 0',
    boxShadow: '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)',
  }),
  singleValue: (provided: any, state: any) => {
    const transition = 'opacity 300ms'
    return { ...provided, transition, color: '#fff', fontSize: '0.88rem' }
  },
}

export const MenusList = styled.div`
  height: 3.69rem;
  cursor: pointer;
  font-size: 0.88rem;
  color: #1e1e1e;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  :hover {
    /* color: ${({ theme }) => theme.themeColor}; */
    background-color: #efeefd;
    /* h3 {
    color: ${({ theme }) => theme.themeColor};
  } */
  }
  img {
    width: 1.75rem;
    height: 1.75rem;
    margin-right: 0.81rem;
    margin-left: 0.69rem;
  }
  .span {
    font-size: 0.75rem;
    font-weight: 400;
    color: #5f6469;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  h3 {
    font-size: 0.88rem;
    font-weight: 600;
    margin-bottom: 0;
  }
  .network-content {
    width: calc(100% - 1.5rem - 1.75rem - 0.69rem);
  }
`

export const DrawerListInfo = styled.div`
  display: flex;
  height: 64px;
  font-size: 14px;
  align-items: center;
  padding: 16px 24px;
  :hover {
    background: #f8f8f8;
    color: ${({ theme }) => theme.themeColor};
    h3 {
      color: ${({ theme }) => theme.themeColor};
    }
  }
  .ant-image {
    margin-right: 1.25rem;
    width: 44px;
    height: 44px;
  }
  .span {
    width: calc(100% - 40px - 24px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  h3 {
    font-weight: 600;
    margin-bottom: 0;
  }
  .network-content {
    width: calc(100% - 4rem);
    line-height: 2.25rem;
  }
`
