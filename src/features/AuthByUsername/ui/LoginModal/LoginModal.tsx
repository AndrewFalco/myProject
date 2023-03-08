import { FC, Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader, Modal } from 'shared/ui';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';

interface LoginModalProps {
    className?: string,
    isOpen?: boolean,
    onClose?: () => void,
}

export const LoginModal: FC<LoginModalProps> = (props) => {
    const { className, isOpen, onClose } = props;

    return (
        <Modal
            className={ classNames('', {}, [className]) }
            isOpen={ isOpen }
            onClose={ onClose }
        >
            <Suspense fallback={ <Loader /> }>
                <LoginFormLazy onSuccess={ onClose } />
            </Suspense>
        </Modal>
    );
};
