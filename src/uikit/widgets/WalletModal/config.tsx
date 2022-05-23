import React from 'react'
import Metamask from "./icons/Metamask";
import TokenPocket from "./icons/TokenPocket";
import ONTO from './icons/ONTO'
import HyperPay from './icons/HyperPay'
import BitKeep from "./icons/BitKeep";
import AoLink from "./icons/AoLink";
import Coinhub from './icons/Coinhub'

// 配置可用钱包
const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "Injected",
  },
  {
    title: "TokenPocket",
    icon: TokenPocket,
    connectorId: "Injected",
  },
  {
    title: "ONTO",
    icon: ONTO,
    connectorId: "Injected",
  },
  {
    title: "HyperPay",
    icon: HyperPay,
    connectorId: "Injected",
  },
  {
    title: "BitKeep",
    icon: BitKeep,
    connectorId: "Injected",
  },
  {
    title: "AoLink",
    icon: AoLink,
    connectorId: "Injected",
  },
  {
    title: 'Coinhub',
    icon: Coinhub,
    connectorId: "Injected",
  }
];

export default connectors;
export const localStorageKey = "accountStatus";
export const localStorageConnectorId = "connectorId";
