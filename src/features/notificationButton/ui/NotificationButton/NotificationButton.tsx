import { useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, Drawer, Icon, Popover } from '@/shared/ui';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import useDeviceDetect from '@/shared/lib/hooks/useDeviceDetected';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const { isMobile } = useDeviceDetect();

    const onOpenDrawer = useCallback(() => setIsOpen(true), []);
    const onCloseDrawer = useCallback(() => setIsOpen(false), []);

    const trigger = useMemo(
        () => (
            <Button onClick={ onOpenDrawer } theme="clear">
                <Icon Svg={ NotificationIcon } width={ 32 } height={ 32 } />
            </Button>
        ),
        [onOpenDrawer],
    );

    return isMobile ? (
        <>
            { trigger }
            <Drawer isOpen={ isOpen } onClose={ onCloseDrawer }>
                <NotificationList className={ cls.notificationsMobile } />
            </Drawer>
        </>
    ) : (
        <Popover
            className={ classNames(cls.NotificationButton, {}, [className]) }
            direction="bottom left"
            trigger={ trigger }
        >
            <NotificationList className={ cls.notifications } />
        </Popover>
    );
};
