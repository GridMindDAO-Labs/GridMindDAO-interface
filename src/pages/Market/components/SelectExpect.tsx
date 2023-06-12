import { useState } from 'react'
import Icon from '@ant-design/icons'
import styled, { css } from 'styled-components'
import { Popover, Button, Empty } from 'antd'
import { ArrawSvg } from '@/components/TokensSelect/icon'
import type { ScopePeriodTypes } from '@/hooks/useLeaderBoardHooks'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  .ant-btn.ant-btn-primary {
    min-height: 2.5rem;
    background: ${(p) => p.theme.white};
    border-radius: 0.26rem;
    border: none;
    font-family: 'NotoSansHans-Regular';
    color: ${(p) => p.theme.black};
    box-shadow: none;
    text-shadow: none;
    font-weight: 400;
    font-size: 0.88rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0.63rem;
    .leftss {
      display: flex;
      align-items: center;
    }
    h5 {
      margin-left: 0.63rem;
    }
    &:hover,
    &:focus {
      border: none;
      color: ${(p) => p.theme.black};
      background: ${(p) => p.theme.white};
    }
  }
`

const PopoverGrid = styled.div<{ isType: boolean; listActive: boolean }>`
  padding: 0.88rem 0.94rem;
  min-width: 6.75rem;
  max-height: 18.75rem;
  overflow: hidden;
  overflow-y: scroll;
  ${({ isType }) =>
    !isType &&
    css`
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0.63rem;
    `}
  ${({ listActive }) =>
    listActive &&
    css`
      display: block;
    `}
  .info,.infos {
    font-family: 'NotoSansHans-Regular';
    font-size: 0.88rem;
    color: #999999;
    padding: 0 0 0.94rem;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.themeColor};
    }
  }
  .info.active {
    color: ${({ theme }) => theme.themeColor};
  }
  .infos {
    padding: 0.63rem 0;
    width: 3.06rem;
    height: 2.19rem;
    background: #f5f5f5;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .infos.active {
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.themeColor};
  }
`

type Types = { list: ScopePeriodTypes[]; value: string | undefined; type: 'Period' | 'Community'; returnClick: (v: string) => void }

const SelectExpect = ({ list, value, type, returnClick }: Types) => {
  const { t } = useTranslation()
  const [move, setMoveSwitch] = useState(false)

  const handleClick = (values: string) => {
    returnClick(values)
    setMoveSwitch(false)
  }

  const content = () => (
    <PopoverGrid isType={type === 'Period'} listActive={list.length === 0}>
      {type === 'Period' && (
        <>
          {list.map((item, index) => (
            <div className={item.value === value ? 'info active' : 'info'} key={index} onClick={() => handleClick(item.value)}>
              <span>{t('market.leaderboard.period.tips1', { min: item.min, max: item.max })}</span>
            </div>
          ))}
        </>
      )}
      {type === 'Community' && (
        <>
          {list.map((item, index) => (
            <div className={item.value === value ? 'infos active' : 'infos'} key={index} onClick={() => handleClick(item.value)}>
              <span>{t('market.leaderboard.period.tips2', { msg: item.max })}</span>
            </div>
          ))}
        </>
      )}
      {list.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('description')} />}
    </PopoverGrid>
  )
  return (
    <Wrapper>
      <Popover
        overlayClassName="tokens-popover"
        visible={move}
        onVisibleChange={(v) => setMoveSwitch(v)}
        content={content}
        placement="bottom"
      >
        <Button type="primary" style={{ background: '#F5F5F5' }}>
          <div className="leftss">
            {type === 'Period' && (
              <>
                {value
                  ? t('market.leaderboard.period.tips1', {
                      min: list.find((item) => item.value === value)?.min,
                      max: list.find((item) => item.value === value)?.max,
                    })
                  : t('market.leaderboard.period.tips.placeholder')}
              </>
            )}
            {type === 'Community' && (
              <>
                {value
                  ? t('market.leaderboard.period.tips2', { msg: list.find((item) => item.value === value)?.max })
                  : t('market.leaderboard.period.tips.placeholder')}
              </>
            )}
          </div>
          <div className="rightss">
            <Icon component={ArrawSvg} />
          </div>
        </Button>
      </Popover>
    </Wrapper>
  )
}

export default SelectExpect
