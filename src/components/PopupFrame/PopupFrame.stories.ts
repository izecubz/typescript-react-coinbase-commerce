import type { Meta, StoryObj } from "@storybook/react";

import { PopupFrame } from "./PopupFrame";

const meta: Meta<typeof PopupFrame> = {
  component: PopupFrame,
};

export default meta;
type Story = StoryObj<typeof PopupFrame>;

export const PopupFrameStory: Story = {
  args: {
    checkoutId: "897afe6f-6cd3-4449-802a-7227621765cc",
  },
};
