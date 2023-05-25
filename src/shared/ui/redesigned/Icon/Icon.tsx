import { SVGProps, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    hovered?: boolean;
    Svg: React.FC<SVGProps<SVGSVGElement>>;
    onClick?: () => void;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true;
    onClick?: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
    const { className, Svg, onClick, clickable, width = 32, height = 32, hovered = true, ...other } = props;

    const icon = useMemo(
        () => (
            <Svg
                onClick={ undefined }
                className={ classNames(cls.Icon, { [cls.hovered]: hovered }, [className]) }
                width={ width }
                height={ height }
                { ...other }
            />
        ),
        [Svg, className, height, hovered, other, width],
    );

    return clickable ? (
        <button type="button"
                onClick={ onClick }
                className={ cls.button }
                style={ { width, height } }>
            { icon }
        </button>
    ) : (
        icon
    );
});
