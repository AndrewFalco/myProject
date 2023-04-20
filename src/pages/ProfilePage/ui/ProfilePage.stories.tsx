import { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ProfilePage from './ProfilePage';

const meta = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
    },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Light: Story = {
    decorators: [StoreDecorator({
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
    })],
};

export const Dark: Story = {
    decorators: [ThemeDecorator('app_dark_theme'), StoreDecorator({
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
    })],
};
