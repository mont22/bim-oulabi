export enum DomainStatus {
  ACTIVE = 'ACTIVE',
  UPCOMING = 'UPCOMING',
  CLOSED = 'CLOSED',
}

export enum AuctionResult {
  WON = 'WON',
  CLOSED = 'CLOSED',
}

export interface Domain {
  id: number;
  domain: string; // API returns 'domain' not 'name'
  target: number;
  exists_since: string;
  starting_date: string;
  ending_date: string;
  status: DomainStatus;
  latest_bid: {
    id: number;
    amount: number;
    user: {
      id: number;
      name: string;
      email: string;
      wallet_balance: number;
    };
    created_at: string;
  } | null;
}

export interface DomainDetail extends Domain {
  description?: string;
  minimum_bid: number;
  bid_increment: number;
  total_bids: number;
  bids?: Bid[];
  highest_bidder_id?: number;
}

export interface Bid {
  id: number;
  domain_id: number;
  user_id: number;
  amount: number;
  created_at: string;
  user?: {
    id: number;
    name: string;
  };
}

export interface PlaceBidRequest {
  domain_id: number;
  amount: number;
}

export interface PlaceBidResponse {
  bid: Bid;
  domain: DomainDetail;
}

export interface DomainsState {
  domains: Domain[];
  currentDomain: DomainDetail | null;
  isLoading: boolean;
  error: string | null;
  activeTab: DomainStatus;
}

