import type { Meta, StoryObj } from '@storybook/react';

import { NotificationItem } from './NotificationItem';

const meta = {
  title: 'entities/NotificationItem',
  component: NotificationItem,
  argTypes: {},
  args: {
    data: {
      id: '1',
      title: 'Super title',
      description: 'Mega description of the notification',
      href: 'asdasdasdasdasdasdasdasdasd',
      userId: '1',
    },
  },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
