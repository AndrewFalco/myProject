/* eslint-disable i18next/no-literal-string */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => <div style={ { padding: 100 } }><Story /></div>,
    ],
    args: {},
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox { ...args } />;

const mockData = [
    {
        value: 'Jhoe',
        content: <div>Jhoe Slavin</div>,
    },
    {
        value: 'Jhoe K',
        content: <div>Jhoe K Slavin</div>,
    },
    {
        value: 'Jhoe M',
        content: <div>Jhoe M Slavin</div>,
        disabled: false,
    },
    {
        value: 'Jhoe N',
        content: <div>Jhoe N Slavin</div>,
        disabled: true,
    },
    {
        value: 'Jhoe O',
        content: <div>Jhoe O Slavin</div>,
        disabled: false,
    },
];

export const Primary = Template.bind({});
Primary.args = {
    items: mockData,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    items: mockData,
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];
