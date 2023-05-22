import { ReactElement, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Notification } from '../../model/types/notification';
import { ToggleFeature } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    data: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className, data } = props;

    const content = useMemo(
        (): ReactElement => (
            <ToggleFeature
                feature="isAppRedesigned"
                on={
                    <Card
                        variant="normal"
                        className={ classNames(cls.NotificationItem, {}, [
                            className,
                        ]) }
                    >
                        <Text title={ data.title } text={ data.description } />
                    </Card>
                }
                off={
                    <CardDeprecated
                        theme="normal"
                        className={ classNames(cls.NotificationItem, {}, [
                            className,
                        ]) }
                    >
                        <TextDeprecated
                            title={ data.title }
                            text={ data.description }
                        />
                    </CardDeprecated>
                }
            />
        ),
        [className, data.description, data.title],
    );

    return data.href ? (
        <a
            className={ cls.link }
            href={ data.href }
            target="_blank"
            rel="noreferrer"
        >
            { content }
        </a>
    ) : (
        content
    );
};
