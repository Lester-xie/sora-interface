import { getAddress } from '../utils/addressHelpers'

export const MERGE = process.env.REACT_APP_MERGE || 'pe'

/**
 *  ************** 有改动请 interface 和 frontend 保持同步 ******************
 */
const globalCoin = {
  tada:{200101:'0x2219845942d28716c0f7c605765fabdca1a7d9e0'},
  // tusdt:{200101:'0x1360ea441A3E7DE927Efa3bA1448AdAa52DBCdC0'},
  // tusdc:{200101:'0x68AFe3c6Fe6e9A2145b4c32BB97DAF7f44A1166e'},
}
const nodeConfiguration: object = {
  t1: {
    ...globalCoin,
    che: '0xE80D8BE2D4d811f418F3753FAE076764dE8EC22D',
    init_code_hash: '0x07edbbe2567817565adf3da2e1682b0cf002088eeb06aa77abef51183ba605ac',
    factory: '0x3f65323e8FE950eD6b00c9ade89E32552e5A2b82',
    router02: '0xE37dbcf6FF72Dd8AcB3573e616FE14788AbDc1c4',
    syrup: {
      200101: '0x69E0B474a24a3F28057B64Fb5be1d3472Adc2CA5',
    }
  },
  // 主网合约
  pe: {
    ...globalCoin,
    che: '0xD7A07aB45D2832D77A9Bde5D1f437A60292c5d7F',
    init_code_hash: '0x8f97d0c5056e8ae78fb3dda0c8c1b6053283f3402778c1e15dbeb0566539322e',
    factory: '0xDd60E23b8170a16c6306a4Bfdd9Fc5554C503353',
    router02: '0xf7b89A3F94E613053B2F4b54Db9104Eb79a7085a',
    che_cash_okt: {
      65: '0x503b59dd0a8cba838c868b15f39c40d762574cc8',
      64: '0x503b59dd0a8cba838c868b15f39c40d762574cc8'
    },
    che_cash_usdt: {
      65: '0x3e94409fe0b6feaacaf145b7859a76a4b33d793f',
      64: '0x3e94409fe0b6feaacaf145b7859a76a4b33d793f'
    },
    okt_cash_usdt: {
      65: '0x5002df6038d3beca87abffc236bc4342b1b8a483',
      64: '0x5002df6038d3beca87abffc236bc4342b1b8a483'
    },
    masterchef: {
      65: '0x62aB9E3Fa437c39D959AA56D403440AD3233B365',
      64: '0x62aB9E3Fa437c39D959AA56D403440AD3233B365'
    },
    syrup: {
      65: '0x67762b58f07a1f99b5054794a351Bc30f398f7E3',
      64: '0x67762b58f07a1f99b5054794a351Bc30f398f7E3'
    },
    // pools
    CHE_CHE_contractaddress: {
      64: '0x1C2561d6AD8a24CEA5F9d99696B9018fFd607f97',
      65: '0x1C2561d6AD8a24CEA5F9d99696B9018fFd607f97',
    },
    USDT_CHE_contractaddress: {
      64: '0xfCA4f56F17Fea9Bf31c576416Feb36f7a573d518',
      65: '0xfCA4f56F17Fea9Bf31c576416Feb36f7a573d518',
    },
    BTCK_CHE_contractaddress: {
      64: '0x2C0f2539C8D26Fa0E6552ab5af3D1C12683837A0',
      65: '0x2C0f2539C8D26Fa0E6552ab5af3D1C12683837A0',
    },
    ETHK_CHE_contractaddress: {
      64: '0x787773aA941213d4B4d7A6293A4E1B78CEA95104',
      65: '0x787773aA941213d4B4d7A6293A4E1B78CEA95104',
    },
    CHE_JEC_contractaddress: {
      64: '0xB01D4B2fA9883762F311020c9AC78AF24A420964',
      65: '0xB01D4B2fA9883762F311020c9AC78AF24A420964',
    }
  },
}

if (MERGE !== 'pe') {
  console.log('当前合约环境：', MERGE)
  console.log('当前合约信息：', nodeConfiguration[MERGE])
}

let config = nodeConfiguration[MERGE]
for (let z in config){
  config[z] = getAddress(config[z])
}
console.log('config: ', config)

export default config
