import React, { useEffect, useState } from "react";
import { generateUUID } from "../../lib/utils";
import type { MessageData } from "../../lib/types";

export interface PopupFrameProps {
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

interface SrcParams {
  origin: string;
  buttonId: string;
  custom?: string;
  cacheDisabled: boolean;
}

export const PopupFrame: React.FC<PopupFrameProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [src, setSrc] = useState<string | null>(null);
  const origin = "https://commerce.coinbase.com";
  const uuid: string = generateUUID();

  useEffect(() => {
    const handleMessage = (msg: MessageEvent) => {
      const {
        onChargeSuccess,
        onChargeFailure,
        onModalClose,
        onError,
        onPaymentDetected,
      } = props;

      if (!isValidMessage(msg)) {
        return;
      }

      const { data } = msg;
      switch (data.event) {
        case "charge_confirmed":
          onChargeSuccess?.(data);
          break;
        case "charge_failed":
          onChargeFailure?.(data);
          break;
        case "payment_detected":
          onPaymentDetected?.(data);
          break;
        case "error_not_found":
          onError?.(data);
          break;
        case "checkout_modal_closed":
          onModalClose?.();
          break;
        default:
          // Do nothing
          break;
      }
    };

    const isValidMessage = (msg: MessageEvent): boolean => {
      return msg.origin === origin && msg.data.buttonId === uuid;
    };

    const buildSrc = (hostName: string): string => {
      const { checkoutId, chargeId, customMetadata, disableCaching } = props;

      function encodeURIParams(params: SrcParams): string {
        const encoded: string[] = [];
        const quote = window.encodeURIComponent;
        const keys = Object.keys(params);

        for (const key of keys) {
          const value = params[key as keyof SrcParams];
          if (value !== undefined) {
            encoded.push(quote(key) + "=" + quote(value));
          }
        }

        return encoded.join("&");
      }

      let widgetType: string;
      let id: string;
      if (checkoutId) {
        id = checkoutId;
        widgetType = "checkout";
      } else if (chargeId) {
        id = chargeId;
        widgetType = "charges";
      } else {
        throw new Error("must supply either checkoutId or chargeId prop");
      }

      const params: SrcParams = {
        origin: hostName,
        buttonId: uuid,
        cacheDisabled: disableCaching ?? false,
      };

      let custom = "";
      if (customMetadata && typeof customMetadata !== "string") {
        console.error(
          'Received customMetadata not of "string" type. Ignoring.'
        );
      } else if (customMetadata) {
        custom = customMetadata;
      }

      if (custom) {
        params.custom = custom;
      }

      return `${origin}/embed/${widgetType}/${encodeURI(id)}?${encodeURIParams(
        params
      )}`;
    };

    const hostName = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? ":" + window.location.port : ""
    }/`;
    setSrc(buildSrc(hostName));

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [props]);

  const handleIFrameLoaded = () => {
    setLoading(false);
    props.onLoad?.();
  };

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 w-full h-full z-[99998] bg-black/50">
      {(loading || src === null) && (
        <div className="absolute top-1/2 left-1/2 -mt-20 -ml-20 w-40 h-40 border-3 border-solid border-blue-200 rounded-full border-t-white animate-spin" />
      )}
      {src !== null && (
        <iframe
          onLoad={handleIFrameLoaded}
          className="fixed left-0 right-0 top-0 bottom-0 w-full h-full !z-[99999] border-none"
          src={src}
          scrolling="no"
          frameBorder="no"
        />
      )}
    </div>
  );
};
