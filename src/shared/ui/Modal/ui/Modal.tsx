import { ReactNode } from 'react';
import { useModal } from '../../../lib/hooks/useModal';
import { classNames, Mods } from '../../../lib/classNames/classNames';
import { Overlay } from '../../Overlay';
import { Portal } from '../../Portal/Portal';

import cls from './Modal.module.scss';

export interface ModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
    children?: ReactNode;
}

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props;

    const { close, isClosing, isMounted } = useModal({
        animationDelay: 300,
        isOpen,
        onClose,
    });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    return lazy && !isMounted ? null : (
        <Portal>
            <div className={ classNames(cls.Modal, mods, [className]) }>
                <Overlay onClick={ close } />
                <div className={ classNames(cls.content) }>{ children }</div>
            </div>
        </Portal>
    );
};
