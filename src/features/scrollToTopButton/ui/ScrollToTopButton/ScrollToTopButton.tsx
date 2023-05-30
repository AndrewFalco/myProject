import { useContext } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ScrollButton from '@/shared/assets/icons/circle-up.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { MainLayoutContext } from '@/shared/layouts/MainLayout';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = (props: ScrollToTopButtonProps) => {
    const { className } = props;
    const refLayout = useContext(MainLayoutContext);

    const onClick = () => {
        refLayout?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Icon Svg={ ScrollButton }
              width={ 32 }
              height={ 32 }
              className={ classNames('', {}, [className]) }
              onClick={ onClick }
              clickable />
    );
};
