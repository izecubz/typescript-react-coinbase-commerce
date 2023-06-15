import type { Meta, StoryObj } from "@storybook/react";

import { CoinbaseCommerceButton } from "./CoinbaseCommerceButton";

const meta: Meta<typeof CoinbaseCommerceButton> = {
  component: CoinbaseCommerceButton,
};

export default meta;
type Story = StoryObj<typeof CoinbaseCommerceButton>;

export const CoinbaseCommerceButtonStory: Story = {
  args: {
    checkoutId: "c31bcc59-5983-4d7e-ab8c-18a2c3d583d5",
    styled: true,
  },
};
