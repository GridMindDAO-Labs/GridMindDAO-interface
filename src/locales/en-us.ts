import footer from './en-us/footer'
import home from './en-us/home'
import wallet from './en-us/wallet'
import finance from './en-us/finance'
import swap from './en-us/swap'
import market from './en-us/market'
import dao from './en-us/dao'
import details from './en-us/details'
import message from './en-us/message'
import invite from './en-us/invite'

const en = {
  'app.link.btn': 'Wallet Connect',
  'app.no.chainid.tips': 'Please switch your wallet to a supported network',
  'app.no.chainid.btn': 'Change Network',
  'app.chainid.drawer.title': 'Select network',
  'app.switch.language.tips': 'Switch {{msg}} Success',
  'app.404.title': 'The requested URL was not found',
  'app.404.btn': 'Back to Homepage',
  'app.loading': 'Loading...',
  'app.account.balance.title': 'Account balance is 0',
  description: 'No Data',
  ...footer,
  ...home,
  ...wallet,
  ...finance,
  ...swap,
  ...dao,
  ...market,
  ...details,
  ...message,
  ...invite,
}

export default en
