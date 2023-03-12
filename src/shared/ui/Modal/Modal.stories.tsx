import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'text',
    isOpen: true,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'text',
    isOpen: true,
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];
