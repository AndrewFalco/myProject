import type { Meta, StoryObj } from '@storybook/react';

import { Drawer } from './Drawer';

const meta = {
    title: 'shared/Drawer',
    component: Drawer,
    argTypes: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Primary: Story = {
    args: {},
};
