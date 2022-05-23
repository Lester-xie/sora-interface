import { useEffect, useState } from 'react'
import env, { MERGE } from 'config/env'

type ApiResponse = {
  prices: {
    [key: string]: string
  }
  update_at: string
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/cherryswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'http://t1.cherryswap.net/api/price'

const useGetCherryPrice = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const res = await response.json()

        console.log('555555', res)

          const prices = Object.keys(res.data).reduce((accum, token) => {
              return {
                ...accum,
                [token.toLowerCase()]: res.data[token].price,
              }
            }, {})


          // const cheprice = Number()




        setData(prices[env.che.toLocaleLowerCase()])
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetCherryPrice
