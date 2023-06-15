
# typescript-react-coinbase-commerce

TypeScript rewrite of `react-coinbase-commerce` (unmaintained as of writing). This is my first attempt at making a typescript and react component library. As such I am thankful for any contributions to this repository.


## Installation

Install the component using your favorite package manager. The example below uses PNPM.

```bash
  pnpm i typescript-react-coinbase-commerce
```
    
## Usage/Examples

```typescript jsx
// In progress

function App() {
  return <CoinbaseCommerceButton />
}
```


## API Reference

#### CoinbaseCommerceButton
Below are additional types that are added on top of the regular `<button>` component.

| Parameter           | Type                  | Required                    | Description                                                           |
|:--------------------|:----------------------|:----------------------------|:----------------------------------------------------------------------|
| `checkoutId`        | `string`              | **Yes**, if no `chargeId`   | Checkout ID from Coinbase Dashboard                                   |
| `chargeId`          | `string`              | **Yes**, if no `checkoutId` | Charge ID generated from Coinbase API                                 |
| `customMetadata`    | `string`              | No                          | Additional metadata passed to checkout                                |
| `onChargeSuccess`   | `(MessageData)=>void` | No                          | On payment success                                                    |
| `onChargeFailure`   | `(MessageData)=>void` | No                          | On payment failure                                                    |
| `onPaymentDetected` | `(MessageData)=>void` | No                          | On payment detected                                                   |
| `onModalClosed`     | `()=>void`            | No                          | When the checkout popover is closed                                   |
| `disableCaching`    | `boolean`             | No                          | Cache will not be saved when the checkout is closed, default: `false` |

**Warning:** If `disableCaching` is set to true, users that accidentally close their payment windows will be unable to see their transaction's status upon reopening.
## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)

