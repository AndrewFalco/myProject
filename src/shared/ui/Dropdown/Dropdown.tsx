/* eslint-disable react/no-array-index-key */
import { Fragment, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '../../lib/classNames/classNames';
import { Button } from '../Button';
import { DropdownDirection } from '../../types/ui';

import cls from './Dropdown.module.scss';
import { AppLink } from '../AppLink';

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

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight,
};

export const Dropdown = (props: DropdownProps) => {
    const {
        className, items, trigger, direction = 'bottom right',
    } = props;
    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu as="div" className={ classNames(cls.Dropdown, {}, [className]) }>
            <Menu.Button className={ cls.btn }>
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
                              [cls.active]: active,
                              [cls.disabled]: item.disabled,
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
