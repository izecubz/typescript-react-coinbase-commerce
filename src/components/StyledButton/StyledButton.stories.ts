import type { Meta, StoryObj } from "@storybook/react";

import { StyledButton } from "./StyledButton";

const meta: Meta<typeof StyledButton> = {
  component: StyledButton,
};

export default meta;
type Story = StoryObj<typeof StyledButton>;

export const StyledButtonStory: Story = {
  args: {},
};
