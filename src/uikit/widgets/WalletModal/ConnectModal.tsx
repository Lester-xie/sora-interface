import React from "react";
import styled from "styled-components";
import { Link } from "../../components/Link";
import { HelpIcon } from "../../components/Svg";
import { Modal } from "../Modal";
import WalletCard from "./WalletCard";
import config from "./config";
import { Login } from "./types";
import useI18n from 'hooks/useI18n'

interface Props {
  login: Login;
  onDismiss?: () => void;
}

const HelpLink = styled(Link)`
  display: flex;
  align-self: center;
  align-items: center;
  margin-top: 24px;
`;

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => {
  const TranslateString = useI18n()

  return (
    <Modal title={TranslateString(682,'Connect to a wallet')} onDismiss={onDismiss}>
      {config.map((entry, index) => (
        <WalletCard
          key={entry.title}
          login={login}
          walletConfig={entry}
          onDismiss={onDismiss}
          mb={index < config.length - 1 ? "8px" : "0"}
        />
      ))}
      <HelpLink
        href="https://docs.cherryswap.net/cherryswap-tutorial-beta-version/connet-wallet"
        external
      >
        <HelpIcon color="primary" mr="6px" />
        {TranslateString(1482, 'Learn how to connect')}
      </HelpLink>
    </Modal>
  )
}

export default ConnectModal;
