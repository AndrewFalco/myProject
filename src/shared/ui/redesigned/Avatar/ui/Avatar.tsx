import { useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import MaleAvt from '@/shared/assets/img/avatar_m.jpg';
import FemaleAvt from '@/shared/assets/img/avatar_fm.jpg';
import NoSexAvt from '@/shared/assets/img/noSexAvatar.jpg';
import { Sex } from '@/shared/consts/common';
import { AppImage } from '../../AppImage';
import { Skeleton } from '../../Skeleton';

import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    sex?: Sex;
    size?: number;
    alt?: string;
}

export const Avatar = (props: AvatarProps) => {
    const { className, src, sex, size = 100, alt } = props;
    const defaultAvatar = useMemo(() => {
        switch (true) {
            case sex === 'male':
                return MaleAvt;
            case sex === 'female':
                return FemaleAvt;
            default:
                return NoSexAvt;
        }
    }, [sex]);

    const styles = useMemo(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    return (
        <AppImage
            className={ classNames(cls.Avatar, {}, [className]) }
            src={ src || defaultAvatar }
            fallback={
                <Skeleton width={ size } height={ size } borderRadius="50%" />
            }
            errorFallback={ defaultAvatar }
            style={ styles }
            alt={ alt }
        />
    );
};
