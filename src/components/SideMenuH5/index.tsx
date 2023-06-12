import Icon from '@ant-design/icons'
import { SideMenuH5Wrapper, SideMenuH5Title, SideMenuH5Mask } from './styled'
import { MenuListInit } from '@/common'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'ahooks'
import { oddEvent } from '@/common'
import { NavLink, useLocation } from 'react-router-dom'
import { MenuSvg, MenuSvgWhite } from '@/components/SideMenuH5/icon'
import { localeList } from '@/utils/i18n'
import { useScrollTransparent } from '@/hooks/useScrollTransparent'

const SideMenuH5Page = () => {
  const { i18n } = useTranslation()
  let location = useLocation()

  const transparent = useScrollTransparent()

  const [isMenuShow, setIsMenuShow] = useBoolean(false)

  return (
    <SideMenuH5Wrapper>
      <Icon
        className="side-menu-h5-icon"
        component={location.pathname === '/home' && transparent < 1 ? MenuSvgWhite : MenuSvg}
        onClick={setIsMenuShow.setTrue}
      />
      <SideMenuH5Title isHomeTran={location.pathname === '/home' && transparent < 1}>
        {MenuListInit.filter((it) => it.url === location.pathname).map(
          (item: any) => item[localeList.find((c) => c.locale === i18n.language)?.value || 'enUs'],
        )}
        {(location.pathname.substring(0, 5) === '/dao/' || location.pathname === '/create') && (
          <>
            {MenuListInit.filter((it) => it.url === '/dao').map(
              (item: any) => item[localeList.find((c) => c.locale === i18n.language)?.value || 'enUs'],
            )}
          </>
        )}
        {location.pathname.substring(0, 9) === '/finance/' && (
          <>
            {MenuListInit.filter((it) => it.url === '/finance').map(
              (item: any) => item[localeList.find((c) => c.locale === i18n.language)?.value || 'enUs'],
            )}
          </>
        )}
      </SideMenuH5Title>
      {isMenuShow && (
        <>
          <SideMenuH5Mask>
            {MenuListInit.map((item: any, index) => (
              <NavLink
                key={index}
                to={item.url === '' ? {} : item.url}
                onClick={() => void setIsMenuShow.setFalse()}
                className={({ isActive }) => (oddEvent(isActive, location, item) ? 'navlink-active' : 'navlink-default')}
              >
                <div className="navlink-child-title">{item[localeList.find((it) => it.locale === i18n.language)?.value || 'enUs']}</div>
              </NavLink>
            ))}
          </SideMenuH5Mask>
          <div className="mask-mask" onClick={() => void setIsMenuShow.setFalse()}></div>
        </>
      )}
    </SideMenuH5Wrapper>
  )
}

export default SideMenuH5Page
