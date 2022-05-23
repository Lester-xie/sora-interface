/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PriceList {
  [key: string]: any
}

export interface PriceApiListThunk {
  /* eslint-disable camelcase */
  [key: string]: any
}

export interface PriceState {
  isLoading: boolean
  lastUpdated: any
  data: any
}


const initialState: PriceState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
}

// Thunks
export const fetchPrices = createAsyncThunk('prices/fetch', async () => {
  const response = await fetch('http://t1.cherryswap.net/api/price')
  const data = (await response.json())

  console.log(Object.values(data.data),'Object.keys(data.data)')
  // Return normalized token names
  return {
    update_at: data.update_at,
    prices: Object.keys(data.data).reduce((accum, token) => {
      return {
        ...accum,
        [token.toLowerCase()]: data.data[token].price,
      }
    }, {}),
  }
})

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.pending, (state) => {
      state.isLoading = true
    })
    // @ts-ignore
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      state.isLoading = false
      state.lastUpdated = action.payload.update_at
      state.data = action.payload.prices
    })
  },
})


export default pricesSlice.reducer
