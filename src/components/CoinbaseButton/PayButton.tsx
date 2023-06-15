import React, { CSSProperties, useState } from "react";
import type { MessageData } from "../../types";
import { StyledButton, StyledButtonProps } from "../StyledButton";
import { PopupFrame, PopupFrameProps } from "../PopupFrame";

/*
type Props = {
  styled?: boolean,
  children?: React.Node,
  checkoutId?: string,
  chargeId?: string,
  customMetadata?: string,
  onLoad: () => void,
  onChargeSuccess?: (MessageData) => void,
  onChargeFailure?: (MessageData) => void,
  onPaymentDetected?: (MessageData) => void,
  onModalClosed?: () => void,
  disableCaching: true,
  wrapperStyle?: { [string]: number | string }
};
 */
interface PayButtonProps extends StyledButtonProps, PopupFrameProps {
  onModalClosed: () => void;
  onLoad: () => void;
  wrapperStyle?: CSSProperties;
}

const getButtonProps = (props: PayButtonProps) => {
  const buttonProps = { ...props };
  const ignoredProps = [
    "onLoad",
    "onChargeSuccess",
    "onChargeFailure",
    "customMetadata",
    "onPaymentDetected",
    "onModalClosed",
    "checkoutId",
    "chargeId",
    "disableCaching",
    "wrapperStyle",
  ];
  ignoredProps.forEach((p) => delete buttonProps[p]);
  return buttonProps;
};

export const CoinbaseCommerceButton: React.FC<PayButtonProps> = ({
  onLoad,
  onChargeSuccess,
  onChargeFailure,
  checkoutId,
  chargeId,
  onPaymentDetected,
  disableCaching,
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

  const buttonProps = getButtonProps(props);

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
