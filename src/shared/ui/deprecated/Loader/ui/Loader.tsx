import { classNames } from '@/shared/lib/classNames/classNames';

import './Loader.scss';

interface LoaderProps {
    className?: string;
}

/**
 * @deprecated
 */
export const Loader = (props: LoaderProps) => {
    const { className } = props;

    return (
        <div className={ classNames('lds-spinner', {}, [className]) }>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};
