import React from 'react'
import { Modal } from 'uikit'
import SlippageToleranceSetting from './SlippageToleranceSetting'
import TransactionDeadlineSetting from './TransactionDeadlineSetting'
import TranslatedText from '../TranslatedText'
import useI18n from 'hooks/useI18n'

type SettingsModalProps = {
  onDismiss?: () => void
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SettingsModal = ({ onDismiss = defaultOnDismiss }: SettingsModalProps) => {
  const TranslateString = useI18n()

  return (
    <Modal title={TranslateString(944,'Settings')} onDismiss={onDismiss}>
      <SlippageToleranceSetting />
      <TransactionDeadlineSetting />
    </Modal>
  )
}

export default SettingsModal
