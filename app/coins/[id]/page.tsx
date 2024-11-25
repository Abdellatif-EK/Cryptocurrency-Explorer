import { getCoinDetails, getCoinMarketChart } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import EnhancedPriceChart from '@/components/EnhancedPriceChart';
import { ArrowUpIcon, ArrowDownIcon, ExternalLinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default async function CoinDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [coin, marketData] = await Promise.all([
    getCoinDetails(params.id),
    getCoinMarketChart(params.id, 365), // Fetch up to 1 year of data
  ]);

  const formatNumber = (value: number | undefined, decimals = 2) => {
    return value !== undefined ? value.toFixed(decimals) : 'N/A';
  };

const formatLargeNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) return 'N/A'; // Handle null and undefined cases
  if (typeof value !== 'number') return 'N/A'; // Ensure value is a number
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`; // Format number with locale
};

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block "
      >
        <Button variant="outline" className="text-black">
          &larr; Back to Coins List
        </Button>
      </Link>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
          <CardHeader>
            <div className="flex items-center">
              <Image
                src={coin.image.large}
                alt={coin.name}
                width={64}
                height={64}
                className="mr-4"
              />
              <div>
                <CardTitle className="text-3xl">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Rank #{coin.market_cap_rank}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-300">Current Price</p>
                <p className="text-2xl font-bold">
                  ${formatNumber(coin.market_data.current_price.usd)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-300">24h Change</p>
                <p
                  className={`text-2xl font-bold flex items-center ${
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {coin.market_data.price_change_percentage_24h > 0 ? (
                    <ArrowUpIcon className="mr-1" />
                  ) : (
                    <ArrowDownIcon className="mr-1" />
                  )}
                  {formatNumber(coin.market_data.price_change_percentage_24h)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Market Cap</p>
                <p className="text-xl font-semibold">
                  {formatLargeNumber(coin.market_data.market_cap.usd)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-300">24h Volume</p>
                <p className="text-xl font-semibold">
                  {formatLargeNumber(coin.market_data.total_volume.usd)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between space-x-10">
                <span className="text-muted-foreground">All-Time High</span>
                <span className="font-semibold">
                  ${formatNumber(coin.market_data.ath.usd)}
                </span>
              </div>
              <div className="flex justify-between space-x-10">
                <span className="text-muted-foreground">All-Time Low</span>
                <span className="font-semibold">
                  ${formatNumber(coin.market_data.atl.usd)}
                </span>
              </div>
              <div className="flex justify-between space-x-10">
                <span className="text-muted-foreground">
                  Circulating Supply
                </span>
                <span className="font-semibold">
                  {formatLargeNumber(coin.market_data.circulating_supply)}
                </span>
              </div>
              <div className="flex justify-between space-x-10">
                <span className="text-muted-foreground">Max Supply</span>
                <span className="font-semibold">
                  {formatLargeNumber(coin.market_data.max_supply)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Price Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <EnhancedPriceChart data={marketData} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>About {coin.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {coin.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Links</h3>
                <ul className="space-y-1">
                  {coin.links.homepage[0] && (
                    <li>
                      <a
                        href={coin.links.homepage[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        Website <ExternalLinkIcon className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                  )}
                  {coin.links.blockchain_site[0] && (
                    <li>
                      <a
                        href={coin.links.blockchain_site[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        Blockchain Explorer{' '}
                        <ExternalLinkIcon className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Community</h3>
                <ul className="space-y-1">
                  {coin.links.twitter_screen_name && (
                    <li>
                      <a
                        href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        Twitter <ExternalLinkIcon className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                  )}
                  {coin.links.subreddit_url && (
                    <li>
                      <a
                        href={coin.links.subreddit_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        Reddit <ExternalLinkIcon className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Developer</h3>
                <ul className="space-y-1">
                  {coin.links.repos_url.github[0] && (
                    <li>
                      <a
                        href={coin.links.repos_url.github[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        GitHub <ExternalLinkIcon className="ml-1 h-4 w-4" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
