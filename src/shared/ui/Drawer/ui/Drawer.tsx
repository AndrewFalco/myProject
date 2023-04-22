import { ReactNode } from 'react';
import { Portal } from '../../Portal/Portal';
import { Overlay } from '../../Overlay';
import { Mods, classNames } from '../../../lib/classNames/classNames';
import { useModal } from '../../../lib/hooks/useModal';

import cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string,
    children: ReactNode,
    isOpen?: boolean,
    onClose?: () => void,
    lazy?: boolean,
}

export const Drawer = (props: DrawerProps) => {
    const {
        className,
        children,
        onClose,
        isOpen,
        lazy,
    } = props;

    const { close, isClosing, isMounted } = useModal({ animationDelay: 300, isOpen, onClose });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    return (
        lazy && !isMounted
        ? null
        : (
            <Portal>
                <div className={ classNames(cls.Drawer, mods, [className]) }>
                    <Overlay onClick={ close } />
                    <div
                      className={ cls.content }
                    >
                        { children }
                    </div>
                </div>
            </Portal>
        )
    );
};
