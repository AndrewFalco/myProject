import { useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon } from '../../Icon/Icon';
import { HStack } from '../../../redesigned/Stack';
import { FlexGap } from '../../../redesigned/Stack/Flex/Flex.types';

import cls from './StarRating.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
    gap?: FlexGap;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
    const { className, onSelect, size = 30, selectedStars = 0, gap = '4' } = props;

    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);

    const onHover = useCallback(
        (starsCount: number) => () => {
            if (!isSelected) {
                setCurrentStarsCount(starsCount);
            }
        },
        [isSelected],
    );

    const onLeave = useCallback(() => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    }, [isSelected]);

    const onClick = useCallback(
        (starsCount: number) => () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setCurrentStarsCount(starsCount);
                setIsSelected(Boolean(starsCount));
            }
        },
        [isSelected, onSelect],
    );

    return (
        <HStack gap={ gap } className={ className }>
            { stars.map((star) => (
                <Icon
                    className={ classNames(
                        toggleFeatures({
                            name: 'isAppRedesigned',
                            on: () => cls.starIconRedesigned,
                            off: () => cls.starIcon,
                        }),
                        {
                            [toggleFeatures({
                                name: 'isAppRedesigned',
                                on: () => cls.hoveredRedesigned,
                                off: () => cls.hovered,
                            })]: currentStarsCount >= star,
                            [cls.selected]: isSelected,
                        },
                        [className],
                    ) }
                    Svg={ StarIcon }
                    key={ star }
                    width={ size }
                    height={ size }
                    onMouseEnter={ onHover(star) }
                    onMouseLeave={ onLeave }
                    onClick={ onClick(star) }
                    hovered={ currentStarsCount >= star }
                    clickable
                />
            )) }
        </HStack>
    );
};
