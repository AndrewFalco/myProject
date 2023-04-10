import {
    FC, MouseEvent, useState, useRef, useEffect, useCallback,
} from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { Portal } from '../Portal/Portal';

import cls from './Modal.module.scss';

interface ModalProps {
    className?: string,
    isOpen?: boolean,
    onClose?: () => void,
    lazy?: boolean,
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = (props) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const onContentClick = useCallback((e: MouseEvent) => {
        e.stopPropagation();
    }, []);

    return (
        lazy && !isMounted
            ? null
            : (
                <Portal>
                    <div className={ classNames(cls.Modal, mods, [className]) }>
                        <div
                          className={ classNames(cls.overlay) }
                          onClick={ closeHandler }
                        >
                            <div
                              className={ classNames(cls.content) }
                              onClick={ onContentClick }
                            >
                                { children }
                            </div>
                        </div>
                    </div>
                </Portal>
            )
    );
};
