import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CurrencySelect } from '../../Currency';

const meta = {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    argTypes: {},
    decorators: [
        (Story) => (
            <div style={ { padding: 150 } }>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof CurrencySelect>;

export default meta;
type Story = StoryObj<typeof CurrencySelect>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
