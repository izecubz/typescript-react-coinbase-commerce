export type OrderCode = string;
export type Network =
  | "bitcoin"
  | "bitcoincash"
  | "ethereum"
  | "litecoin"
  | "dogecoin";
export type PricingType = "fixed_price" | "no_price";
export type PaymentStatus = "NEW" | "PENDING" | "CONFIRMED" | "FAILED";
export type FiatCurrency = string;
export type CryptoCurrency = string;

export interface CryptoMoney {
  amount: string;
  currency: CryptoCurrency;
}

export interface FiatMoney {
  amount: string;
  currency: FiatCurrency;
}

export interface ChargePricing {
  local: FiatMoney;
  bitcoin?: CryptoMoney | undefined;
  bitcoincash?: CryptoMoney | undefined;
  ethereum?: CryptoMoney | undefined;
  litecoin?: CryptoMoney | undefined;
  dogecoin?: CryptoMoney | undefined;
}

export interface Payment {
  network: Network;
  transactionId: string;
  status: PaymentStatus;
  value: {
    crypto: CryptoMoney;
    local: FiatMoney;
  };
  block: {
    height?: number;
    hash?: string;
    confirmations: number;
    confirmationsRequired: number;
  };
}

export type ChargeStatus = "NEW" | "UNRESOLVED" | "RESOLVED" | "EXPIRED";

export interface ChargeContext {
  timeline: ChargeState[];
  total: {
    local: FiatMoney;
    crypto: CryptoMoney;
  };
  metadata?: Record<string, string>;
}

export interface ChargeState {
  status: ChargeStatus;
  context?: ChargeContext | undefined;
  time: string;
  payment?: {
    network: Network;
    transactionId: string;
  };
}

export interface Charge {
  code: OrderCode;
  createdAt: string;
  confirmedAt?: string;
  expiresAt: string;
  addresses: { [key in Network]: string };
  pricingType: PricingType;
  pricing?: ChargePricing;
  payments: Payment[];
  timeline: ChargeState[];
  name?: string;
  description?: string;
  logoUrl?: string;
  checkout?: { id: string };
  redirectUrl?: string;
  thirdPartyProvider?: string;
}

export interface MessageData {
  event: "charge:created" | "charge:failed";
  charge: Charge;
}
