/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../../../config/storybook/ThemeDecorator/ThemeDecorator';

import { Popover } from './Popover';

const meta = {
    title: 'shared/Popups/Popover',
    component: Popover,
    argTypes: {},
    decorators: [
        (Story) => (
            <div style={ { padding: 100 } }>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const Primary: Story = {
    args: {
        children: [
            <div>child 1</div>,
            <div>child 2</div>,
            <div>child 3</div>,
            <div>child 4</div>,
        ],
        trigger: 'popover',
    },
};

export const PrimaryDark: Story = {
    args: {
        children: [
            <div style={ { padding: '8px' } }>child 1</div>,
            <div style={ { padding: '8px' } }>child 2</div>,
            <div style={ { padding: '8px' } }>child 3</div>,
            <div style={ { padding: '8px' } }>child 4</div>,
        ],
        trigger: (
            <button type="button" style={ { padding: '8px' } }>
                Push
            </button>
        ),
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
