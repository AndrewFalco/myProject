import { Fragment, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '../../lib/classNames/classNames';
import { Button } from '../Button';
import { HStack } from '../Stack/HStack/HStack';
import { DropdownDirection } from '../../types/ui';

import cls from './ListBox.module.scss';

interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    onChange: (value: string) => void;
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
};

export const ListBox = (props: ListBoxProps) => {
    const {
        value, items, className, defaultValue, onChange, readonly, direction = 'bottom right', label,
    } = props;

    const { t } = useTranslation();

    const optionClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap="8">
            { label && <span>{ label }</span> }
            <HListBox
              as="div"
              className={ classNames(cls.ListBox, {}, [className]) }
              value={ value }
              onChange={ onChange }
              disabled={ readonly }
            >
                <HListBox.Button className={ cls.trigger }>
                    <Button disabled={ readonly }>
                        { value ?? defaultValue ?? t('Select value') }
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={ classNames(cls.options, {}, optionClasses) }>
                    { items?.map((item) => (
                        <HListBox.Option
                          key={ item.value }
                          value={ item.value }
                          disabled={ item.disabled }
                          as={ Fragment }
                        >
                            {
                        ({ active, selected }) => (
                            <li className={ classNames(cls.item, {
                                [cls.active]: active,
                                [cls.selected]: selected,
                                [cls.disabled]: item.disabled,
                              }) }
                            >
                                { selected && '\u2713' }
                                { item.content }
                            </li>
                        )
                      }
                        </HListBox.Option>
                )) }
                </HListBox.Options>
            </HListBox>
        </HStack>
  );
};
