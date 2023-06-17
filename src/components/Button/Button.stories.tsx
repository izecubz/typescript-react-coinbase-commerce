import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    styled: true,
  },
};

export const Disabled: Story = {
  args: {
    styled: true,
    disabled: true,
  },
};

export const Unstyled: Story = {
  args: {
    styled: false,
  },
};

export const CustomText: Story = {
  args: {
    children: "Custom Text",
  },
};
