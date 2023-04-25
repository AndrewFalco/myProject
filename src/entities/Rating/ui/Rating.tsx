import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Card, StarRating, VStack, Text, Modal, Textarea, Button, HStack, Drawer,
} from '@/shared/ui';

import cls from './Rating.module.scss';
import useDeviceDetect from '@/shared/lib/hooks/useDeviceDetected';

interface RatingProps {
    title: string;
    onAccept?: (starsCount: number, feedback?: string) => void;
    onCancel?: (starsCount: number) => void;
    className?: string,
    feedbackTitle?: string;
    hasFeedback?: boolean;
}

export const Rating = (props: RatingProps) => {
    const {
        className, onAccept, feedbackTitle, hasFeedback, onCancel, title,
    } = props;
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState('');
    const isMobile = useDeviceDetect();

    const onSelectStars = useCallback((stars: number) => {
        setStarsCount(stars);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(stars);
        }
    }, [hasFeedback, onAccept]);

    const onClickAccept = useCallback(() => {
        onAccept?.(starsCount, feedback);
        setIsModalOpen(false);
    }, [feedback, onAccept, starsCount]);

    const onClickCancel = useCallback(() => {
        onCancel?.(starsCount);
        setIsModalOpen(false);
    }, [onCancel, starsCount]);

    const modalContent = useMemo(() => (
        <VStack max gap="16" align="center">
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
    ), [feedbackTitle, onClickAccept, onClickCancel, t]);

    return (
        <Card className={ classNames(cls.Rating, {}, [className]) }>
            <VStack align="center" justify="center" max gap="16">
                <Text title={ title } />
                <StarRating size={ 40 } onSelect={ onSelectStars } />
            </VStack>
            {
                isMobile
                    ? (
                        <Modal
                          isOpen={ isModalOpen }
                          onClose={ onClickCancel }
                          lazy
                        >
                            { modalContent }
                        </Modal>
                    )
                    : (
                        <Drawer
                          isOpen={ isModalOpen }
                          onClose={ onClickCancel }
                          lazy
                        >
                            { modalContent }
                        </Drawer>
                    )
            }
        </Card>
    );
};
