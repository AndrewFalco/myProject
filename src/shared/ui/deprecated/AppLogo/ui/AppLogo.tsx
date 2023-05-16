import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../Stack';
import { Icon } from '../../Icon/Icon';
import AppSvg from '../../../../assets/icons/falcon_1.svg';

import cls from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string,
}

/**
 * @deprecated
 */
export const AppLogo = memo((props: AppLogoProps) => {
    const { className } = props;

    return (
        <HStack
            max
            justify='center'
            className={ classNames(cls.appLogoWrapper, {}, [className]) }
        >
            <div className={ cls.gradientBig } />
            <div className={ cls.gradientSmall } />
            <Icon
                Svg={ AppSvg }
                className={ cls.appLogo }
                width={ 60 }
                height={ 60 }
            />
        </HStack>
    );
});
