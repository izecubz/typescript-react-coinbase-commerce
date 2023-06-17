import React, { forwardRef, useEffect, useState } from "react";
import { generateUUID } from "../../lib/utils";
import type { PopupFrameProps, SrcParams } from "./PopupFrame.types";
import styled from "styled-components";

const ContainerDiv = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99998;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  border: 3px solid rgba(6, 103, 208, 0.05);
  border-radius: 100%;
  border-top-color: white;
  animation: spin 1s infinite linear;
  @keyframes spin {
    33% {
      transform: rotate(90deg);
    }
    66% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledIframe = styled.iframe`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  border: none;
`;

export const PopupFrame: React.FC<PopupFrameProps> = forwardRef(
  function PopupFrame(props, ref) {
    const [loading, setLoading] = useState<boolean>(true);
    const [src, setSrc] = useState<string | undefined>();
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

      const isValidMessage = (msg: MessageEvent): boolean =>
        msg.origin === origin && msg.data.buttonId === uuid;

      const buildSrc = (hostName: string): string => {
        const { checkoutId, chargeId, customMetadata, disableCaching } = props;

        function encodeUriParams(params: SrcParams): string {
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
        if (customMetadata) {
          custom = customMetadata;
        }

        if (custom) {
          params.custom = custom;
        }

        return `${origin}/embed/${widgetType}/${encodeURI(
          id
        )}?${encodeUriParams(params)}`;
      };

      const hostName = `${window.location.protocol}//${
        window.location.hostname
      }${window.location.port ? ":" + window.location.port : ""}/`;
      setSrc(buildSrc(hostName));

      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, []);

    const handleFrameLoaded = () => {
      setLoading(false);
      props.onLoad?.();
    };

    return (
      <ContainerDiv>
        {(loading || src === null) && <Spinner />}
        {src !== null && (
          <StyledIframe ref={ref} onLoad={handleFrameLoaded} src={src} />
        )}
      </ContainerDiv>
    );
  }
);
