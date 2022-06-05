import React from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import LinkExternal from "../../components/Link/LinkExternal";
import Flex from "../../components/Box/Flex";
import { Modal } from "../Modal";
import CopyToClipboard from "./CopyToClipboard";
import { localStorageKey,localStorageConnectorId } from "./config";
import styled from 'styled-components'
import { useActiveWeb3React } from '../../../hooks'
import {  getOkLinkLink } from '../../../utils'
import TranslatedText from '../../../components/TranslatedText'
import useI18n from 'hooks/useI18n'
import { metaMask } from '../../../connectors/metaMask'

interface Props {
  account: string;
  logout: () => void;
  onDismiss?: () => void;
}

const Logout = styled(Button)`
  width: 118px;
  height: 48px;
  background: rgba(229,82,104,0.1);
  border-radius: 15px;
  font-size: 20px;
  color: #e55268;
  line-height: 24px;
  border: none;
`

const LinkExternalWrap = styled(LinkExternal)`
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  color: #e55268;
`


const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null }) => {
  const { chainId } = useActiveWeb3React()
    const TranslateString = useI18n()

  return (
    <Modal title={TranslateString(1422, 'Your wallet')} onDismiss={onDismiss}>
      <Text
        fontSize="20px"
        style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "15px",color: '#25030A' }}
      >
        {account}
      </Text>
      <Flex mb="25px">
        <LinkExternalWrap small href={getOkLinkLink(chainId, account, 'address')} mr="16px">
          <TranslatedText translationId={772}>View on Oklink</TranslatedText>
        </LinkExternalWrap>
        <CopyToClipboard toCopy={account}><TranslatedText translationId={778}>Copy Address</TranslatedText></CopyToClipboard>
      </Flex>
      <Flex justifyContent="center">
        <Logout
          size="sm"
          variant="secondary"
          onClick={() => {
            // logout();
            // window.localStorage.removeItem(localStorageKey);
            // window.localStorage.removeItem(localStorageConnectorId);
            metaMask.deactivate()
            onDismiss();
            // window.location.reload();
          }}
        >

          <TranslatedText translationId={1254}>Logout</TranslatedText>
        </Logout>
      </Flex>
    </Modal>
  )
}

export default AccountModal
