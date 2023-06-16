import React, { useState } from "react";
import { CoinbaseCommerceButton } from "typescript-react-coinbase-commerce";
import "../index.css";

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chargeError, setChargeError] = useState<string>("");

  return (
    <div>
      <h1>React App</h1>
      <CoinbaseCommerceButton
        checkoutId="c31bcc59-5983-4d7e-ab8c-18a2c3d583d5"
        onLoad={() => {
          setLoaded(true);
          setModalOpen(true);
        }}
        onModalClosed={() => {
          setLoaded(false);
          setModalOpen(false);
        }}
        onChargeFailure={(error) => {
          setChargeError(error.event);
        }}
        styled
        disableCaching={false}
      />
      <p>Loaded: {loaded ? "true" : "false"}</p>
      <p>Modal Open: {modalOpen ? "true" : "false"}</p>
      <p>Charge Error: {chargeError}</p>
    </div>
  );
}
