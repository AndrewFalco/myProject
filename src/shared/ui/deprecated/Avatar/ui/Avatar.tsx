import { useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import MaleAvt from '@/shared/assets/img/avatar_m.jpg';
import FemaleAvt from '@/shared/assets/img/avatar_fm.jpg';
import NoSexAvt from '@/shared/assets/img/noSexAvatar.jpg';
import { Gender } from '@/shared/consts/common';
import { AppImage } from '../../../redesigned/AppImage';
import { Skeleton } from '../../Skeleton';

import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    sex?: Gender;
    size?: number;
    alt?: string;
}

const defaultAvatar = (defaultSrc: string, styles: { width: number; height: number }) => (
    <AppImage src={ defaultSrc } style={ styles } />
);

/**
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const { className, src, sex, size = 100, alt } = props;

    const defaultAvatarSrc = useMemo(() => {
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
            src={ src || defaultAvatarSrc }
            fallback={ <Skeleton width={ size } height={ size } borderRadius="50%" /> }
            errorFallback={ defaultAvatar(defaultAvatarSrc, styles) }
            style={ styles }
            alt={ alt }
        />
    );
};
