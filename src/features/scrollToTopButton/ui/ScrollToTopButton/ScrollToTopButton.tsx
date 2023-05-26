import { classNames } from '@/shared/lib/classNames/classNames';
import ScrollButton from '@/shared/assets/icons/circle-up.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = (props: ScrollToTopButtonProps) => {
    const { className } = props;

    const onClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
