import { classNames } from 'shared/lib/classNames/classNames';
import { Button, Icon, Popover } from 'shared/ui';
import { NotificationList } from 'entities/Notification';
import NotificationIcon from 'shared/assets/icons/notification.svg';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string,
}

export const NotificationButton = (props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
          className={ classNames(cls.NotificationButton, {}, [className]) }
          direction="bottom left"
          trigger={ (
              <Button theme="clear">
                  <Icon Svg={ NotificationIcon } />
              </Button>
                                    ) }
        >
            <NotificationList className={ cls.notifications } />
        </Popover>
    );
};
