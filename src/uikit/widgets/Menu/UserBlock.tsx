import React, { useEffect ,useState} from "react";
import Button from "../../components/Button/Button";
import { useWalletModal } from "../WalletModal";
import { Login } from "../WalletModal/types";
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { injected,supportedChainIds } from 'connectors'
import useI18n from 'hooks/useI18n'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const { activate, active } = useWeb3ReactCore()
  const [tried, setTried] = useState(true)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  const TranslateString = useI18n()
  
  
  useEffect(() => {
    injected.getChainId().then(data=>{
      const isTried = supportedChainIds.includes(typeof data === 'string' ?  parseInt(data) : data)
      setTried(isTried)
    })
  }, [active,activate])
  
  return (
    <div>
      {account ? (
        <Button
          style={{borderRadius: '100px',padding: isMobile ? '0 15px' : '0 22px',height: '40px',backgroundColor: 'rgba(229, 82, 104, 0.08)'}}
          size="sm"
          variant="tertiary"
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        tried ?
        <WrapBtn
          size="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          {TranslateString(1256, 'Connect')}
        </WrapBtn> : <WrapBtn
          size="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
          style={{color:"#EBA32C",background:"#FFEED2"}}
        >
          Network Error
        </WrapBtn>
      )}
    </div>
  );
};

const WrapBtn = styled(Button)`
  height: 40px;
  box-shadow: none;
`



export default UserBlock;
