import { ReactNode } from 'react';
import { useModal } from '../../../../lib/hooks/useModal';
import { classNames, Mods } from '../../../../lib/classNames/classNames';
import { Overlay } from '../../../redesigned/Overlay';
import { Portal } from '../../../redesigned/Portal/Portal';

import cls from './Modal.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

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
            <div className={ classNames(cls.Modal, mods, [className, toggleFeatures({
                name: 'isAppRedesigned',
                on: () => cls.modalNew,
                off: () => cls.modalOld,
            })]) }>
                <Overlay onClick={ close } />
                <div className={ classNames(cls.content) }>{ children }</div>
            </div>
        </Portal>
    );
};
