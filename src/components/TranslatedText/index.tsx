import React from 'react'
import useI18n from 'hooks/useI18n'

export interface TranslatedTextProps {
  translationId: number
  children: string
}

const TranslatedText = ({ translationId, children }: TranslatedTextProps) => {
  const TranslateString = useI18n()
  return(
    <span>
    {TranslateString(translationId, children)}
  </span>
  )
}

export default TranslatedText
