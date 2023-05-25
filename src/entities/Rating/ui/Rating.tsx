import { useCallback, useState } from 'react';
import useDeviceDetect from '@/shared/lib/hooks/useDeviceDetected';
import { ToggleFeature } from '@/shared/lib/features';
import { RatingDeprecated } from './Rating.old';
import { RatingRedesigned } from './Rating.new';

export interface RatingProps {
    title: string;
    onAccept?: (starsCount: number, feedback?: string) => void;
    onCancel?: (starsCount: number) => void;
    className?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    rate?: number;
}

export interface ExtendsRatingProps extends RatingProps {
    setFeedback: (value: string) => void;
    onClickCancel: () => void;
    onClickAccept: () => void;
    starsCount: number;
    onSelectStars: (stars: number) => void;
    isModalOpen: boolean;
    isMobile: boolean;
}

export const Rating = (props: RatingProps) => {
    const { className, onAccept, hasFeedback, onCancel, rate = 0 } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');
    const isMobile = useDeviceDetect();

    const onSelectStars = useCallback(
        (stars: number) => {
            setStarsCount(stars);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(stars);
            }
        },
        [hasFeedback, onAccept],
    );

    const onClickAccept = useCallback(() => {
        onAccept?.(starsCount, feedback);
        setIsModalOpen(false);
    }, [feedback, onAccept, starsCount]);

    const onClickCancel = useCallback(() => {
        onCancel?.(starsCount);
        setIsModalOpen(false);
    }, [onCancel, starsCount]);

    const commonProps = {
        isMobile: isMobile.isMobile,
        isModalOpen,
        onClickAccept,
        onClickCancel,
        onSelectStars,
        setFeedback,
        starsCount,
        className,
        ...props,
    };

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={ <RatingRedesigned { ...commonProps } /> }
            off={ <RatingDeprecated { ...commonProps } /> }
        />
    );
};
