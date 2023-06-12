import Home from '@/pages/Home'
import Finance from '@/pages/Finance'
import Swap from '@/pages/Swap'
import Dao from '@/pages/DAO'
import Market from '@/pages/Market'
import Invite from '@/pages/Invite'
import No404 from '@/pages/404'
import Layout from '@/layout'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import DelegateInfo from '@/pages/DelegateInfo'
import ProposalsInfo from '@/pages/ProposalsInfo'
import CreateProposal from '@/pages/CreateProposal'

const Router: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/finance',
        element: <Finance />,
      },
      {
        path: '/finance/:invitationAddress',
        element: <Finance />,
      },
      {
        path: '/swap',
        element: <Swap />,
      },
      {
        path: '/dao',
        element: <Dao />,
      },
      {
        path: '/dao/:type',
        element: <Dao />,
      },
      {
        path: '/market',
        element: <Market />,
      },
      {
        path: '/market/:weekId',
        element: <Market />,
      },
      {
        path: '/market/:weekId/:currentWeekId',
        element: <Market />,
      },
      {
        path: '/dao/delegate/:address',
        element: <DelegateInfo />,
      },
      {
        path: '/dao/proposals/:id',
        element: <ProposalsInfo />,
      },
      {
        path: '/create',
        element: <CreateProposal />,
      },
      {
        path: '/invite',
        element: <Invite />,
      },
      {
        path: '/invite/:address',
        element: <Invite />,
      },
      {
        path: '/404',
        element: <No404 />,
      },
      {
        path: '*',
        element: <No404 />,
      },
    ],
  },
  {
    path: '/404',
    element: <No404 />,
  },
  {
    path: '*',
    element: <No404 />,
  },
]

export default Router
