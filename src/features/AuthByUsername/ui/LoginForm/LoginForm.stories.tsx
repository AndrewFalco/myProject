import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LoginForm } from './LoginForm';

export default {
    title: 'feature/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
Primary.decorators = [StoreDecorator({
    loginForm: {
        username: 'username',
        password: 'password',
    }
})];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {

};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    loginForm: {
        username: 'username',
        password: 'password',
    }
})];

export const Error = Template.bind({});
Error.args = {

};
Error.decorators = [StoreDecorator({
    loginForm: {
        username: 'username',
        password: 'password',
        error: 'Invalid username or password',
    }
})];
