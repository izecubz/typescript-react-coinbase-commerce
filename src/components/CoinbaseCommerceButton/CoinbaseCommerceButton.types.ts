import { MessageData } from "../../lib/types";
import { CSSProperties, Ref } from "react";

interface CoinbaseCommerceButtonPropsNonExclusive {
  buttonRef?: Ref<HTMLButtonElement>;
  frameRef?: Ref<HTMLIFrameElement>;
  checkoutId?: string;
  chargeId?: string;
  customMetadata?: string;
  styled?: boolean;
  onLoad?: () => void;
  onChargeSuccess?: (messageData: MessageData) => void;
  onChargeFailure?: (messageData: MessageData) => void;
  onPaymentDetected?: (messageData: MessageData) => void;
  onModalClosed?: () => void;
  disableCaching?: boolean;
  wrapperStyle?: CSSProperties;
}

type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type CoinbaseCommerceButtonPropsWithExclusiveId = XOR<
  Pick<CoinbaseCommerceButtonPropsNonExclusive, "checkoutId">,
  Pick<CoinbaseCommerceButtonPropsNonExclusive, "chargeId">
>;

export type CoinbaseCommerceButtonProps = Omit<
  CoinbaseCommerceButtonPropsNonExclusive,
  "checkoutId" | "chargeId"
> &
  CoinbaseCommerceButtonPropsWithExclusiveId;
