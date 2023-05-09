import { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from '../../Profile';

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {},
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Primary: Story = {
    args: {
        data: {
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
};

export const WithError: Story = {
    args: {
        error: [
            { key: 'firstName', text: 'Error in first name' },
            { key: 'lastName', text: 'Error in last name' },
        ],
    },
};

export const LoadingError: Story = {
    args: {
        error: [{ key: 'loading', text: 'Error with loading' }],
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};
