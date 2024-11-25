'use client'

import { useState, useEffect } from 'react'
import { getTrendingCoins } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface TrendingCoin {
  id: string
  coin_id: number
  name: string
  symbol: string
  market_cap_rank: number
  thumb: string
  small: string
  large: string
  slug: string
  price_btc: number
  score: number
}

export default function TrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([])

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const data = await getTrendingCoins()
        setTrendingCoins(data.coins)
      } catch (error) {
        console.error('Failed to fetch trending coins:', error)
      }
    }

    fetchTrendingCoins()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Trending Coins</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {trendingCoins.slice(0, 5).map((coin) => (
            <li key={coin.id} className="flex items-center justify-between">
              <Link href={`/coins/${coin.id}`} className="flex items-center">
                <Image src={coin.small} alt={coin.name} width={24} height={24} className="mr-2" />
                <span>{coin.name}</span>
                <span className="text-gray-500 ml-2">{coin.symbol}</span>
              </Link>
              <div className="flex items-center">
                <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                <span>{coin.price_btc.toFixed(8)} BTC</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

