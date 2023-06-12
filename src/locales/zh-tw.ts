import footer from './zh-tw/footer'
import home from './zh-tw/home'
import wallet from './zh-tw/wallet'
import finance from './zh-tw/finance'
import swap from './zh-tw/swap'
import market from './zh-tw/market'
import dao from './zh-tw/dao'
import details from './zh-tw/details'
import message from './zh-tw/message'
import invite from './zh-tw/invite'

const zh = {
  'app.link.btn': '錢包登入',
  'app.no.chainid.tips': '請將錢包切換到所支持的網絡',
  'app.no.chainid.btn': '更換網絡',
  'app.chainid.drawer.title': '選擇網絡',
  'app.switch.language.tips': '切換{{msg}}成功',
  'app.404.title': '未找到請求的 URL',
  'app.404.btn': '返回首頁',
  'app.loading': '加載中...',
  'app.account.balance.title': '賬戶餘額為0',
  description: '暫無數據',
  ...footer,
  ...home,
  ...wallet,
  ...finance,
  ...swap,
  ...market,
  ...dao,
  ...details,
  ...message,
  ...invite,
}
export default zh
