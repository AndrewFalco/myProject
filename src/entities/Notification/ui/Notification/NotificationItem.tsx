import { ReactElement, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, Text } from '@/shared/ui';
import { Notification } from '../../model/types/notification';

import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string,
    data: Notification,
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className, data } = props;

    const content = useMemo((): ReactElement => (
        <Card
          theme="normal"
          className={ classNames(cls.NotificationItem, {}, [className]) }
        >
            <Text title={ data.title } text={ data.description } />
        </Card>
    ), [className, data.description, data.title]);

    return (
        data.href
            ? (
                <a
                  className={ cls.link }
                  href={ data.href }
                  target="_blank"
                  rel="noreferrer"
                >
                    { content }
                </a>
            )
            : content
    );
};
