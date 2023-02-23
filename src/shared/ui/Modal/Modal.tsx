import { useTheme } from 'app/providers/ThemeProvider';
import {
    FC, MouseEvent, useState, useRef, useEffect, useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';

import cls from './Modal.module.scss';

interface ModalProps {
    className?: string,
    isOpen?: boolean,
    onClose?: () => void
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = (props) => {
    const {
        className,
        children,
        isOpen,
        onClose,
    } = props;

    const { theme } = useTheme();
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
        [cls[theme]]: true,
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
    );
};
