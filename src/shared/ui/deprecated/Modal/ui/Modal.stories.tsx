import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';

type Story = StoryObj<typeof Modal>;

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Modal>;

export const Primary: Story = {
    args: {
        children: 'text',
        isOpen: true,
    },
};

export const PrimaryDark: Story = {
    args: {
        children: 'text',
        isOpen: true,
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
