import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';
import ArrowSvg from '@/shared/assets/icons/arrow-up.svg';
import DeleteSvg from '@/shared/assets/icons/close.svg';
import cls from './ItemControlBlock.module.scss';

interface ItemControlBlockProps {
    currentIndex: number;
    length: number;
    onSwapUp: () => void;
    onSwapDown: () => void;
    onDelete: () => void;
}

export const ItemControlBlock = (props: ItemControlBlockProps) => {
    const { currentIndex, length, onDelete, onSwapDown, onSwapUp } = props;

    return (
        <VStack gap="8"
                justify="center"
                align="center">
            { Boolean(currentIndex) && <Icon onClick={ onSwapUp }
                                             clickable
                                             Svg={ ArrowSvg } /> }
            <Icon onClick={ onDelete }
                  Svg={ DeleteSvg }
                  clickable
                  className={ cls.deleteSvg } />
            { currentIndex !== length - 1 && <Icon onClick={ onSwapDown }
                                                   clickable
                                                   Svg={ ArrowSvg }
                                                   className={ cls.rotate }
                                                   hovered /> }
        </VStack>
    );
};
