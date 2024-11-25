import Link from 'next/link'
import Image from 'next/image'
import { Coin } from '@/types'

type CoinsListProps = {
  coins: Coin[]
}

export default function CoinsList({ coins }: CoinsListProps) {
  if (coins.length === 0) {
    return <div className="text-center py-4">No coins found.</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {coins.map((coin) => (
        <Link href={`/coins/${coin.id}`} key={coin.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center">
            <Image src={coin.image} alt={coin.name} width={64} height={64} className="mb-2" />
            <h2 className="text-lg font-semibold text-center">{coin.name}</h2>
            <p className="text-gray-600">{coin.symbol.toUpperCase()}</p>
            <p className="text-sm mt-2">${coin.current_price?.toLocaleString() ?? 'N/A'}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

