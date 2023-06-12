import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  gap: 0.94rem;
  width: calc(100% - 1.88rem);
  margin: 0 0.94rem;
  align-items: center;
  .anticon {
    cursor: pointer;
  }
`

export const Input = styled.input`
  font-family: 'NotoSansHans-Regular';
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2.69rem;
  color: ${(p) => p.theme.black};
  border: none;
  outline: none;
  width: 100%;
  text-align: center;
`
