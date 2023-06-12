import { SideMenuWrapper } from './styled'
import { NavLink, useLocation } from 'react-router-dom'
import { MenuListInit, oddEvent } from '@/common'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { localeList } from '@/utils/i18n'
import { useScrollTransparent } from '@/hooks/useScrollTransparent'

const styleMenu = {
  width: '100%',
  background: 'transparent',
  borderBottom: 'none',
}

const SideMenuPage = () => {
  const { i18n } = useTranslation()

  let location = useLocation()

  const transparent = useScrollTransparent()

  return (
    <SideMenuWrapper isHome={location.pathname === '/home' && transparent < 1}>
      <Menu mode="horizontal" style={styleMenu}>
        {MenuListInit.map((item: any) => (
          <Menu.Item key={item.key} className="menu-item-cus">
            <NavLink
              to={item.url === '' ? {} : item.url}
              caseSensitive
              className={({ isActive }) =>
                oddEvent(isActive, location, item)
                  ? 'navlink-active'
                  : location.pathname === '/home' && transparent < 1
                  ? 'navlink-default-black'
                  : 'navlink-default'
              }
            >
              <div className="navlink-child-title">{item[localeList.find((it) => it.locale === i18n.language)?.value || 'enUs']}</div>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </SideMenuWrapper>
  )
}

export default SideMenuPage
