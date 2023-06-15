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

export type CryptoMoney = {
  amount: string;
  currency: CryptoCurrency;
};
export type FiatMoney = {
  amount: string;
  currency: FiatCurrency;
};

export type ChargePricing = {
  local: FiatMoney;
  bitcoin?: CryptoMoney | null;
  bitcoincash?: CryptoMoney | null;
  ethereum?: CryptoMoney | null;
  litecoin?: CryptoMoney | null;
  dogecoin?: CryptoMoney | null;
};

export type Payment = {
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
};

export type ChargeStatus = "NEW" | "UNRESOLVED" | "RESOLVED" | "EXPIRED";

export type ChargeContext = {
  timeline: ChargeState[];
  total: {
    local: FiatMoney;
    crypto: CryptoMoney;
  };
  metadata?: {
    [key: string]: string;
  };
};

export type ChargeState = {
  status: ChargeStatus;
  context?: ChargeContext | null;
  time: string;
  payment?: {
    network: Network;
    transactionId: string;
  };
};

export type Charge = {
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
};

export type MessageData = {
  event: "charge:created" | "charge:failed";
  charge: Charge;
};
