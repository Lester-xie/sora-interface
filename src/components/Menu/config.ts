import { MenuEntry } from '../../uikit'
const origin: string = window.location.origin || 'https://www.cherryswap.net'
const merge = process.env.REACT_APP_MERGE || 'pe'


const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: origin + '/home',
    stringId: '1404'
  },
  {
    label: 'Exchange',
    icon: 'ExchangeIcon',
    href: '/swap',
    stringId: '688'
  },
  {
    label: 'Liquidity',
    icon: 'LiquidityIcon',
    href: '/pool',
    stringId: '862'
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: origin + '/farms',
    stringId: '1416'
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: origin + '/pools',
    stringId: '1418'
  },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: origin + '/ifo'
  // },
  // {
  //   label: 'Airdrop list',
  //   icon: 'KtIcon',
  //   calloutClass: 'rainbow',
  //   stringId: '1408',
  //   items: [
  //     {
  //       label: 'airdrop 1 (the joint beta)',
  //       href: '/airdrop1',
  //       stringId: '1410'
  //     },
  //     {
  //       label: 'airdrop 2',
  //       href: '/airdrop2',
  //       stringId: '1412'
  //     },
  //     {
  //       label: 'airdrop 3',
  //       href: '/airdrop3',
  //       stringId: '1414'
  //     },
  //   ]
  // },
  //
  //
  // {
  //   label: 'Get OKT (testnet)',
  //   icon: 'TestnetIcon',
  //   target: '_blank',
  //   href: 'https://discord.gg/B5nMs6qK5F',
  //   stringId: '1406'
  // },






  // {
  //   label: 'Info',
  //   icon: 'PdfIcon',
  //   target: '_blank',
  //   href: 'https://docs.cherryswap.net'
  // },
  // {
  //   label: 'Medium',
  //   icon: 'MediumIcon',
  //   target: '_blank',
  //   href: 'https://cherryswapnet.medium.com/'
  // },
  // {
  //   label: 'Twitter',
  //   icon: 'TwitterIcon',
  //   target: '_blank',
  //   href: 'https://twitter.com/CherryswapNet'
  // },
  // {
  //   label: 'Telegram-CN',
  //   icon: 'TelegramCNIcon',
  //   target: '_blank',
  //   href: 'https://t.me/cherryswap_3st'
  // },
  // {
  //   label: 'Telegram-EN',
  //   icon: 'TelegramENIcon',
  //   target: '_blank',
  //   href: 'https://t.me/cherryswap_1st'
  // },
  // {
  //   label: 'Get OKT (testnet)',
  //   icon: 'TestnetIcon',
  //   target: '_blank',
  //   href: 'https://discord.gg/B5nMs6qK5F'
  // }

  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: 'http://cherryswap.net/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: 'http://cherryswap.net/nft',
  // },
  // {
  //   label: 'Teams & Profile',
  //   icon: 'GroupsIcon',
  //   calloutClass: 'rainbow',
  //   items: [
  //     {
  //       label: 'Leaderboard',
  //       href: 'http://cherryswap.net/teams',
  //     },
  //     {
  //       label: 'Task Center',
  //       href: 'http://cherryswap.net/profile/tasks',
  //     },
  //     {
  //       label: 'Your Profile',
  //       href: 'http://cherryswap.net/profile',
  //     },
  //   ],
  // },
  // {
  //   label: 'Info',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'Overview',
  //       href: 'https://cherryswap.info',
  //     },
  //     {
  //       label: 'Tokens',
  //       href: 'https://cherryswap.info/tokens',
  //     },
  //     {
  //       label: 'Pairs',
  //       href: 'https://cherryswap.info/pairs',
  //     },
  //     {
  //       label: 'Accounts',
  //       href: 'https://cherryswap.info/accounts',
  //     },
  //   ],
  // },
  // {
  //   label: 'More',
  //   icon: 'MoreIcon',
  //   items: [
  //     {
  //       label: 'Voting',
  //       href: 'https://voting.cherryswap.finance',
  //     },
  //     {
  //       label: 'Github',
  //       href: 'https://github.com/cherryswap',
  //     },
  //     {
  //       label: 'Docs',
  //       href: 'https://docs.cherryswap.finance',
  //     },
  //     {
  //       label: 'Blog',
  //       href: 'https://cherryswap.medium.com',
  //     },
  //   ],
  // },
]

export default config
