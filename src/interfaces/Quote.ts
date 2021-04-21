class Quote {
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  id: number;
  is_active: number;
  is_fiat: number;
  last_updated: string;
  max_supply: number;
  name: string;
  num_market_pairs: number;
  platform: string;
  quote: {
    USD: {
      last_updated: string;
      market_cap: number;
      percent_change_1h: number;
      percent_change_7d: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      price: number;
      volume_24h: number;
    };
  };
  slug: string;
  symbol: string;
  tags: any;
  total_supply: number;

  toString(): string {
    return "Coin";
  }
}

export default Quote;
