import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { EditableProfileCard } from './EditableProfileCard';

const meta = {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EditableProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
