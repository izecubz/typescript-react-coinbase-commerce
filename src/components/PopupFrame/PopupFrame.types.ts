import type { MessageData } from "../../lib/types";
import type { Ref } from "react";

export interface PopupFrameProps {
  frameId?: string;
  containerId?: string;
  ref?: Ref<HTMLIFrameElement>;
  checkoutId?: string;
  chargeId?: string;
  customMetadata?: string;
  onLoad?: () => void;
  onChargeSuccess?: (messageData: MessageData) => void;
  onChargeFailure?: (messageData: MessageData) => void;
  onPaymentDetected?: (messageData: MessageData) => void;
  onError?: (messageData: MessageData) => void;
  onModalClose?: () => void;
  disableCaching?: boolean;
}

export interface SrcParams {
  origin: string;
  buttonId: string;
  custom?: string;
  cacheDisabled: boolean;
}
