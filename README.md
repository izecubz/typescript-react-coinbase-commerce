
# typescript-react-coinbase-commerce

TypeScript rewrite of `react-coinbase-commerce` (unmaintained as of writing). This is my first attempt at making a typescript and react component library. As such I am thankful for any contributions to this repository.


## Installation

Install the component using your favorite package manager.
```bash
pnpm i typescript-react-coinbase-commerce
# OR
yarn add typescript-react-coinbase-commerce
# OR
npm i typescript-react-coinbase-commerce
```
    
## Usage/Examples

```typescript jsx
import { CoinbaseCommerceButton } from "typescript-react-coinbase-commerce";

function App() {
  return (
    <CoinbaseCommerceButton
      styled
      checkoutId="checkout-id-from-coinbase-commerce-dashboard"
    />
  );
}
```


## API Reference

#### CoinbaseCommerceButton
Below are additional types that are added on top of the regular `<button>` component.

| Parameter           | Type                  | Required                    | Default | Description                                                                 |
|:--------------------|:----------------------|:----------------------------|:--------|:----------------------------------------------------------------------------|
| `checkoutId`        | `string`              | **Yes**, if no `chargeId`   | `null`  | Checkout ID from Coinbase Dashboard                                         |
| `chargeId`          | `string`              | **Yes**, if no `checkoutId` | `null`  | Charge ID generated from Coinbase API                                       |
| `buttonRef`         | `React.RefObject`     | No                          | `null`  | Ref to the underlying `<button>` component                                  |
| `frameRef`          | `React.RefObject`     | No                          | `null`  | Ref to the underlying `<iframe>` component                                  |
| `customMetadata`    | `string`              | No                          | `null`  | Additional metadata passed to checkout                                      |
| `onChargeSuccess`   | `(MessageData)=>void` | No                          | `null`  | On payment success                                                          |
| `onChargeFailure`   | `(MessageData)=>void` | No                          | `null`  | On payment failure                                                          |
| `onPaymentDetected` | `(MessageData)=>void` | No                          | `null`  | On payment detected                                                         |
| `onModalClosed`     | `()=>void`            | No                          | `null`  | When the checkout popover is closed                                         |
| `disableCaching`    | `boolean`             | No                          | `false` | If cache will be saved when the checkout was clicked off without cancelling |

**Warning:** If `disableCaching` is set to true, users that accidentally close their payment windows will be unable to see their transaction's status upon reopening.
## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)

