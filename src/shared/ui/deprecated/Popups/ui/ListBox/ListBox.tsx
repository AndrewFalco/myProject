import { Fragment, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox as HListBox } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../../redesigned/Stack';
import { classNames } from '../../../../../lib/classNames/classNames';
import { Button } from '../../../Button';
import { mapDirectionClass } from '../../styles/consts';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';

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
    label?: string | null;
}

/**
 * @deprecated
 */
export const ListBox = (props: ListBoxProps) => {
    const { value, items, className, defaultValue, onChange, readonly, direction = 'bottom right', label } = props;

    const { t } = useTranslation();

    const optionClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap="8">
            { label && <span>{ label }</span> }
            <HListBox
                as="div"
                className={ classNames(cls.ListBox, {}, [className, popupCls.popup]) }
                value={ value }
                onChange={ onChange }
                disabled={ readonly }
            >
                <HListBox.Button className={ popupCls.trigger }>
                    <Button disabled={ readonly }>
                        { (typeof value === 'string' && t(value)) ?? defaultValue ?? t('Select value') }
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
