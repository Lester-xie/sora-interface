// import React, { createContext } from 'react'
//
// interface TranslationState {
//   translations: Array<any>
//   setTranslations: React.Dispatch<React.SetStateAction<Array<any>>>
// }
//
// const defaultTranslationState: TranslationState = {
//   translations: [],
//   setTranslations: (): void => undefined,
// }
//
// export const TranslationsContext = createContext(defaultTranslationState as TranslationState)
//
// export default TranslationsContext



import React, { createContext } from 'react'

export interface TranslationState {
  translations: Array<any>
  setTranslations: React.Dispatch<React.SetStateAction<Array<any>>>
}

const defaultTranslationState: TranslationState = {
  translations: [],
  setTranslations: (): void => undefined,
}

export const TranslationsContext = createContext(defaultTranslationState as TranslationState)

