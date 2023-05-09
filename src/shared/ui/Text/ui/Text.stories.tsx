import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text } from './Text';

type Story = StoryObj<typeof Text>;

const meta = {
    title: 'shared/Text',
    component: Text,
    decorators: [(Story) => <Story />],
} satisfies Meta<typeof Text>;

export default meta;

export const Primary: Story = {
    args: {
        title: 'Title',
        text: 'lorem ipsum dolor sit amet',
    },
};

export const PrimaryDark = {
    args: {
        ...Primary.args,
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const Error = {
    args: {
        title: 'Title',
        text: 'lorem ipsum dolor sit amet',
        theme: 'error',
    },
};

export const ErrorDark = {
    args: {
        ...Primary.args,
        theme: 'error',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const SizeL = {
    args: {
        ...Primary.args,
        size: 'size_l',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const SizeM = {
    args: {
        ...Primary.args,
        size: 'size_m',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
