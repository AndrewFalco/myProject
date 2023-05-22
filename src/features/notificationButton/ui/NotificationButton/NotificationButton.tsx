import { useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import useDeviceDetect from '@/shared/lib/hooks/useDeviceDetected';

import cls from './NotificationButton.module.scss';
import { ToggleFeature } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

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
            <ToggleFeature
                feature="isAppRedesigned"
                on={
                    <Icon
                        Svg={ NotificationIcon }
                        width={ 40 }
                        height={ 40 }
                        clickable
                        onClick={ onOpenDrawer }
                    />
                }
                off={
                    <ButtonDeprecated onClick={ onOpenDrawer } theme="clear">
                        <IconDeprecated
                            Svg={ NotificationIconDeprecated }
                            width={ 32 }
                            height={ 32 }
                        />
                    </ButtonDeprecated>
                }
            />
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
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <Popover
                    className={ classNames(cls.NotificationButton, {}, [
                        className,
                    ]) }
                    direction="bottom left"
                    trigger={ trigger }
                >
                    <NotificationList className={ cls.notifications } />
                </Popover>
            }
            off={
                <PopoverDeprecated
                    className={ classNames(cls.NotificationButton, {}, [
                        className,
                    ]) }
                    direction="bottom left"
                    trigger={ trigger }
                >
                    <NotificationList className={ cls.notifications } />
                </PopoverDeprecated>
            }
        />
    );
};
