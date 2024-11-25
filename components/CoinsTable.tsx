import { Coin } from '@/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

type CoinsTableProps = {
  coins: Coin[]
}

export default function CoinsTable({ coins }: CoinsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[50px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h %</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Volume (24h)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium">{coin.market_cap_rank || 'N/A'}</TableCell>
              <TableCell>
                <Link href={`/coins/${coin.id}`} className="flex items-center">
                  <Image src={coin.image} alt={coin.name} width={24} height={24} className="mr-2" />
                  <span className="font-semibold">{coin.name}</span>
                  <span className="text-gray-500 ml-2">{coin.symbol.toUpperCase()}</span>
                </Link>
              </TableCell>
              <TableCell className="text-right">${coin.current_price?.toLocaleString() ?? 'N/A'}</TableCell>
              <TableCell className={`text-right ${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {coin.price_change_percentage_24h != null ? (
                  <>
                    {coin.price_change_percentage_24h > 0 ? (
                      <ArrowUpIcon className="inline mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="inline mr-1 h-4 w-4" />
                    )}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </>
                ) : 'N/A'}
              </TableCell>
              <TableCell className="text-right">${coin.market_cap?.toLocaleString() ?? 'N/A'}</TableCell>
              <TableCell className="text-right">${coin.total_volume?.toLocaleString() ?? 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

