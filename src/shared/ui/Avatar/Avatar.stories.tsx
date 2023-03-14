import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    // eslint-disable-next-line max-len
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/25/252371277b26a6a1d202497f72acc070e7dc6ba1_full.jpg',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    // eslint-disable-next-line max-len
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/25/252371277b26a6a1d202497f72acc070e7dc6ba1_full.jpg',
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];

export const PrimaryMale = Template.bind({});
PrimaryMale.args = {
    sex: 'male',
};

export const PrimaryFemale = Template.bind({});
PrimaryFemale.args = {
    sex: 'female',
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
    // eslint-disable-next-line max-len
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/25/252371277b26a6a1d202497f72acc070e7dc6ba1_full.jpg',
    size: 50,
};
