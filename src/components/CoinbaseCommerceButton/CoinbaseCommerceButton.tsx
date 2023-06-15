import React, { CSSProperties, useState } from "react";
import type { MessageData } from "../../lib/types";
import { StyledButton } from "../StyledButton";
import { PopupFrame } from "../PopupFrame";

interface CoinbaseCommerceButtonPropsNonExclusive {
  checkoutId?: string;
  chargeId?: string;
  customMetadata?: string;
  styled: boolean;
  onLoad: () => void;
  onChargeSuccess?: (messageData: MessageData) => void;
  onChargeFailure?: (messageData: MessageData) => void;
  onPaymentDetected?: (messageData: MessageData) => void;
  onModalClosed?: () => void;
  disableCaching: boolean;
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

const getButtonProps = (props: CoinbaseCommerceButtonProps) => {
  const buttonProps = { ...props };
  const ignoredProps: (keyof CoinbaseCommerceButtonProps)[] = [
    "onLoad",
    "onChargeSuccess",
    "onChargeFailure",
    "customMetadata",
    "onPaymentDetected",
    "onModalClosed",
    "disableCaching",
    "wrapperStyle",
  ];
  ignoredProps.forEach((p) => delete buttonProps[p]);
  return buttonProps as Omit<
    CoinbaseCommerceButtonProps,
    "checkoutId" | "chargeId"
  >;
};

/*
 * The CoinbaseCommerceButton component is a wrapper around the Coinbase Commerce embeddable checkout.
 * It renders a button that, when clicked, opens a modal with the Coinbase Commerce checkout as an iframe.
 */
export const CoinbaseCommerceButton: React.FC<CoinbaseCommerceButtonProps> = ({
  onLoad,
  onChargeSuccess,
  onChargeFailure,
  checkoutId,
  chargeId,
  onPaymentDetected,
  disableCaching = false,
  ...props
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (props.onModalClosed) {
      props.onModalClosed();
    }
  };

  /*
   * If we experience an unexpected error,
   * log it as an error to the console and close the modal.
   */
  const handleError = (msg: MessageData) => {
    console.error(msg);
    setShowModal(false);
  };

  const frameProps = {
    onLoad,
    onChargeSuccess,
    onChargeFailure,
    checkoutId,
    chargeId,
    onPaymentDetected,
    disableCaching,
  };

  const buttonProps = getButtonProps(
    props as
      | (Omit<
          CoinbaseCommerceButtonPropsNonExclusive,
          "checkoutId" | "chargeId"
        > &
          Without<
            Pick<CoinbaseCommerceButtonPropsNonExclusive, "checkoutId">,
            Pick<CoinbaseCommerceButtonPropsNonExclusive, "chargeId">
          > &
          Pick<CoinbaseCommerceButtonPropsNonExclusive, "chargeId">)
      | (Omit<
          CoinbaseCommerceButtonPropsNonExclusive,
          "checkoutId" | "chargeId"
        > &
          Without<
            Pick<CoinbaseCommerceButtonPropsNonExclusive, "chargeId">,
            Pick<CoinbaseCommerceButtonPropsNonExclusive, "checkoutId">
          > &
          Pick<CoinbaseCommerceButtonPropsNonExclusive, "checkoutId">)
  );

  return (
    <div style={props.wrapperStyle}>
      <a
        href="https://commerce.coinbase.com"
        rel="external"
        title="Pay with Bitcoin, Bitcoin Cash, DAI, Litecoin, Dogecoin, Ethereum, or USD Coin"
        onClick={(e) => e.preventDefault()}
      >
        <StyledButton {...buttonProps} onClick={handleButtonClick} />
      </a>
      {showModal && (
        <PopupFrame
          {...frameProps}
          onModalClose={handleModalClose}
          onError={handleError}
          customMetadata={props.customMetadata}
        />
      )}
    </div>
  );
};
