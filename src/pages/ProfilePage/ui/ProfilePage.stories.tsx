import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/Profile',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
    profile: {
        form: {
            id: '1',
            firstName: 'Levi',
            lastName: 'Santor',
            email: 'jabaTop@toptop.com',
            phone: '+7777777777',
            country: 'Russian Federation',
            city: 'Kostenevo',
            age: 30,
            username: 'JabaTop',
            // eslint-disable-next-line max-len
            avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/25/252371277b26a6a1d202497f72acc070e7dc6ba1_full.jpg',
            currency: 'RUB',
            sex: 'male',
        },
    },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator('app_dark_theme'), StoreDecorator({
    profile: {
        form: {
            id: '1',
            firstName: 'Levi',
            lastName: 'Santor',
            email: 'jabaTop@toptop.com',
            phone: '+7777777777',
            country: 'Russian Federation',
            city: 'Kostenevo',
            age: 30,
            username: 'JabaTop',
            // eslint-disable-next-line max-len
            avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/25/252371277b26a6a1d202497f72acc070e7dc6ba1_full.jpg',
            currency: 'RUB',
            sex: 'male',
        },
    },
})];
