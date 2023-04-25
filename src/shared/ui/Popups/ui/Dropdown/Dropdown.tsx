/* eslint-disable react/no-array-index-key */
import { Fragment, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '../../../../lib/classNames/classNames';
import { Button } from '../../../Button';
import { DropdownDirection } from '../../../../types/ui';
import { AppLink } from '../../../AppLink';
import { mapDirectionClass } from '../../styles/consts';
import cls from './Dropdown.module.scss';
import popupCls from '../../styles/popup.module.scss';

interface DropdownItem {
    disabled?: boolean;
    content: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    items: DropdownItem[];
    trigger: ReactNode;
    className?: string;
    direction?: DropdownDirection;
}

export const Dropdown = (props: DropdownProps) => {
    const {
        className, items, trigger, direction = 'bottom right',
    } = props;
    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu as="div" className={ classNames(cls.Dropdown, {}, [className, popupCls.popup]) }>
            <Menu.Button as="div" className={ classNames(popupCls.trigger, {}, [className]) }>
                <Button theme="clear">
                    { trigger }
                </Button>
            </Menu.Button>
            <Menu.Items className={ classNames(cls.items, {}, menuClasses) }>
                { items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <Button
                          onClick={ item.onClick }
                          theme="clear"
                          disabled={ item.disabled }
                          className={ classNames(
                            cls.item,
                            {
                              [popupCls.active]: active,
                              [popupCls.disabled]: item.disabled,
                            },
                            [className],
                          ) }
                        >
                            { item.content }
                        </Button>
                    );

                    return (
                        item.href
                            ? (
                                <Menu.Item
                                  as={ AppLink }
                                  to={ item.href }
                                  disabled={ item.disabled }
                                  key={ index }
                                >
                                    { content }
                                </Menu.Item>
                            )
                            : (
                                <Menu.Item
                                  as={ Fragment }
                                  disabled={ item.disabled }
                                  key={ index }
                                >
                                    { content }
                                </Menu.Item>
                            )
                    );
                }) }
            </Menu.Items>
        </Menu>
    );
};
