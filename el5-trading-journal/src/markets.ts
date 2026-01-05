export type MarketKey = 'spot' | 'futures' | 'options' | 'margin' | 'nft';

export const MARKETS: Record<MarketKey, { label: string; symbols: string[] }> = {
  spot: {
    label: 'Spot Trading',
    symbols: ['BTCUSDT', 'ETHUSDT', 'AAPL', 'MSFT', 'TSLA'],
  },
  futures: {
    label: 'Futures Trading',
    symbols: ['BTC-DEC26', 'ETH-DEC26', 'ESZ3', 'NQZ3'],
  },
  options: {
    label: 'Options Trading',
    symbols: ['AAPL-20260121-C-150', 'TSLA-20260218-P-200', 'BTC-20260301-C-50000'],
  },
  margin: {
    label: 'Margin Trading',
    symbols: ['BTCUSDT', 'ETHUSDT', 'AAPL', 'MSFT'],
  },
  nft: {
    label: 'NFT Marketplace',
    symbols: ['CryptoPunk #3100', 'BoredApe #8585', 'ArtBlock #1234'],
  },
};

export default MARKETS;
