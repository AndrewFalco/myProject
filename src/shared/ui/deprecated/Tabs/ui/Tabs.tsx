import { ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../../Card';

import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
}

/**
 * @deprecated
 */
export const Tabs = (props: TabsProps) => {
    const { className, tabs, value, onTabClick } = props;

    const handleClick = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    const renderTab = useCallback(
        (tab: TabItem) => (
            <Card
                key={ tab.value }
                theme={ tab.value === value ? 'normal' : 'outlined' }
                onClick={ handleClick(tab) }
            >
                <div>{ tab.content }</div>
            </Card>
        ),
        [handleClick, value],
    );

    return (
        <div className={ classNames(cls.Tabs, {}, [className]) }>
            { tabs.map(renderTab) }
        </div>
    );
};
