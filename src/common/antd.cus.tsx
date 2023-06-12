import { ModalProps } from 'antd/lib/modal/Modal'
import Icon from '@ant-design/icons'
import { DrawerProps } from 'antd'
import { CloseSvg } from './icon'

export const modalLayout: ModalProps = {
  footer: null,
  closeIcon: <Icon component={CloseSvg} />,
  wrapClassName: 'common-modal',
  width: '33.88rem',
  centered: true,
}

export const drawerLayout: DrawerProps = {
  placement: 'bottom',
  height: '60%',
  closeIcon: <Icon component={CloseSvg} />,
  className: 'common-drawer',
}
