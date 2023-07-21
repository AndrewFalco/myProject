import { Fragment, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox as HListBox } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../../redesigned/Stack';
import { classNames } from '../../../../../lib/classNames/classNames';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { Button } from '../../../Button/ui/Button';
import ArrowIcon from '../../../../../assets/icons/arrow-bottom.svg';
import cls from './ListBox.module.scss';
import { Icon } from '../../../Icon';

interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    onChange?: (value: T) => void;
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string | null;
    isMultiple?: boolean;
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
    const { value, items, className, defaultValue, onChange, readonly, direction = 'bottom right', label, isMultiple } = props;

    const { t } = useTranslation();

    const optionClasses = [mapDirectionClass[direction], popupCls.menu];

    return (
        <HStack gap="8">
            { label && <span>{ label }</span> }
            <HListBox
                as="div"
                className={ classNames(cls.ListBox, {}, [className, popupCls.popup]) }
                value={ value }
                onChange={ onChange }
                disabled={ readonly }
                multiple={ isMultiple }
            >
                <HListBox.Button as="div" className={ popupCls.trigger }>
                    <Button variant="filled"
                            disabled={ readonly }
                            addonRight={ <Icon Svg={ ArrowIcon } /> }>
                        { t(value || '') ?? t(defaultValue || '') ?? t('Select value') }
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={ classNames(cls.options, {}, optionClasses) }>
                    { items?.map((item) => (
                        <HListBox.Option key={ item.value }
                                         value={ item.value }
                                         disabled={ item.disabled }
                                         as={ Fragment }>
                            { ({ active, selected }) => (
                                <li
                                    className={ classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                        [cls.selected]: selected,
                                    }) }
                                >
                                    { selected && '\u2713' }
                                    { typeof item.content === 'string' ? t(item.content) : item.content }
                                </li>
                            ) }
                        </HListBox.Option>
                    )) }
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
};
