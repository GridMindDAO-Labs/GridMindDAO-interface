import routers from '@/router'
import Web3Provider from '@/components/Web3Provider'
import { useRoutes } from 'react-router-dom'

const App = () => <Web3Provider>{useRoutes(routers)}</Web3Provider>

export default App
