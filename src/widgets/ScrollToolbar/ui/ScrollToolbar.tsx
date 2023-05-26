import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ScrollToolbar.module.scss';

export const ScrollToolbar = ({ className }: { className?: string }) => (
    <VStack max
            maxHeight
            justify="center"
            align="center"
            className={ classNames(cls.ScrollToolbar, {}, [className]) }>
        <ScrollToTopButton />
    </VStack>
);
