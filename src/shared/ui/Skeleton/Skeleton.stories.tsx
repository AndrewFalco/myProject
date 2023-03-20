import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Skeleton } from './Skeleton';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    width: 100,
    height: 100,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    width: 100,
    height: 100,
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];

export const Round = Template.bind({});
Round.args = {
    borderRadius: '50%',
    width: 100,
    height: 100,
};

export const RoundDark = Template.bind({});
RoundDark.args = {
    borderRadius: '50%',
    width: 100,
    height: 100,
};
RoundDark.decorators = [ThemeDecorator('app_dark_theme')];
