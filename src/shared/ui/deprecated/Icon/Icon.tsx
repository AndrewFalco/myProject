import { SVGProps, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.FC<SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

/**
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
    const { className, Svg, inverted, ...other } = props;

    return (
        <Svg
            className={ classNames(inverted ? cls.inverted : cls.Icon, {}, [
                className,
            ]) }
            { ...other }
        />
    );
});
