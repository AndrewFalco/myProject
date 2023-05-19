import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Card,
    StarRating,
    VStack,
    Text,
    Modal,
    Textarea,
    Button,
    HStack,
    Drawer,
} from '@/shared/ui';

import useDeviceDetect from '@/shared/lib/hooks/useDeviceDetected';

interface RatingProps {
    title: string;
    onAccept?: (starsCount: number, feedback?: string) => void;
    onCancel?: (starsCount: number) => void;
    className?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    rate?: number;
}

export const Rating = (props: RatingProps) => {
    const {
        className,
        onAccept,
        feedbackTitle,
        hasFeedback,
        onCancel,
        title,
        rate = 0,
    } = props;
    const { t } = useTranslation();

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

    const modalContent = useMemo(
        () => (
            <VStack max
                    gap="16"
                    align="center">
                <Text title={ feedbackTitle } />
                <Textarea
                    name={ t('Your feedback') || undefined }
                    onChange={ setFeedback }
                />
                <HStack gap="16">
                    <Button colorType="error" onClick={ onClickCancel }>
                        { t('Close') }
                    </Button>
                    <Button colorType="success" onClick={ onClickAccept }>
                        { t('Accept') }
                    </Button>
                </HStack>
            </VStack>
        ),
        [feedbackTitle, onClickAccept, onClickCancel, t],
    );

    return (
        <Card className={ className }>
            <VStack align="center"
                    justify="center"
                    max
                    gap="16">
                <Text title={ starsCount ? t('Thanks for yor review') : title } />
                <StarRating
                    size={ 40 }
                    onSelect={ onSelectStars }
                    selectedStars={ starsCount }
                />
            </VStack>
            { isMobile ? (
                <Modal isOpen={ isModalOpen }
                       onClose={ onClickCancel }
                       lazy>
                    { modalContent }
                </Modal>
            ) : (
                <Drawer isOpen={ isModalOpen }
                        onClose={ onClickCancel }
                        lazy>
                    { modalContent }
                </Drawer>
            ) }
        </Card>
    );
};
