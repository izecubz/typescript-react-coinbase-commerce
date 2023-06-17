import React, { useState } from "react";
import type { MessageData } from "../../lib/types";
import { PopupFrame } from "../PopupFrame";
import type { CoinbaseCommerceButtonProps } from "./CoinbaseCommerceButton.types";
import { Button } from "../Button";

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
    if (props.onModalClosed != null) {
      props.onModalClosed();
    }
  };

  const getButtonProps = (props: CoinbaseCommerceButtonProps) => {
    const buttonProps = { ...props };
    const ignoredProps: Array<keyof CoinbaseCommerceButtonProps> = [
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

  const buttonProps = getButtonProps(props as CoinbaseCommerceButtonProps);

  return (
    <div style={props.wrapperStyle}>
      <a
        href="https://commerce.coinbase.com"
        rel="external"
        title="Pay with Bitcoin, Bitcoin Cash, DAI, Litecoin, Dogecoin, Ethereum, or USD Coin"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <Button {...buttonProps} onClick={handleButtonClick} />
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
