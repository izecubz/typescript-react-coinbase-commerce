import type { Meta, StoryObj } from "@storybook/react";

import { PopupFrame } from "./PopupFrame";

const meta: Meta<typeof PopupFrame> = {
  component: PopupFrame,
};

export default meta;
type Story = StoryObj<typeof PopupFrame>;

export const Default: Story = {
  args: {
    checkoutId: "c31bcc59-5983-4d7e-ab8c-18a2c3d583d5",
  },
};
