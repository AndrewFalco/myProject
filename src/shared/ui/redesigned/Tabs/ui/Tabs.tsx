import { ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Tabs.module.scss';
import { Card } from '../../Card';
import { Flex } from '../../Stack/Flex/Flex';
import { FlexDirection } from '../../Stack/Flex/Flex.types';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

export const Tabs = (props: TabsProps) => {
    const { className, tabs, value, onTabClick, direction = 'row' } = props;

    const handleClick = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    const renderTab = useCallback(
        (tab: TabItem) => {
            const isSelected = tab.value === value;
            return (
                <Card
                    key={ tab.value }
                    className={ classNames(
                        cls.tabs,
                        { [cls.selected]: isSelected },
                        [className],
                    ) }
                    variant={ isSelected ? 'light' : 'normal' }
                    border="round"
                    onClick={ handleClick(tab) }
                >
                    <div>{ tab.content }</div>
                </Card>
            );
        },
        [className, handleClick, value],
    );

    return (
        <Flex
            gap="8"
            align="start"
            direction={ direction }
            className={ classNames(cls.Tabs, {}, [className]) }
        >
            { tabs.map(renderTab) }
        </Flex>
    );
};
