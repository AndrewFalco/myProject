import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../Stack';
import { Icon } from '../../Icon/Icon';
import AppSvg from '../../../../assets/icons/falcon_1.svg';

import cls from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
    const { className, size = 50 } = props;

    return (
        <HStack
            max
            justify="center"
            className={ classNames(cls.appLogoWrapper, {}, [className]) }
        >
            <div className={ cls.gradientBig } />
            <div className={ cls.gradientSmall } />
            <Icon
                Svg={ AppSvg }
                className={ cls.appLogo }
                width={ size }
                height={ size }
            />
        </HStack>
    );
});
