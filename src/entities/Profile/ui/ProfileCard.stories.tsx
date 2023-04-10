import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from '../../Profile';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
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
};

export const WithError = Template.bind({});
WithError.args = {
    error: [
        { key: 'firstName', text: 'Error in first name' },
        { key: 'lastName', text: 'Error in last name' },
    ],
};

export const LoadingError = Template.bind({});
LoadingError.args = {
    error: [
        { key: 'loading', text: 'Error with loading' },
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
