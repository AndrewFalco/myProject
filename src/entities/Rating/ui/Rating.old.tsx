import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, VStack, Text, Textarea, Button, HStack } from '@/shared/ui/deprecated';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ExtendsRatingProps } from './Rating';
import { StarRating } from '@/shared/ui/redesigned/StarRating';

export const RatingDeprecated = (props: ExtendsRatingProps) => {
    const {
        className,
        feedbackTitle,
        title,
        isMobile,
        isModalOpen,
        onClickAccept,
        onClickCancel,
        onSelectStars,
        setFeedback,
        starsCount,
    } = props;
    const { t } = useTranslation();

    const modalContent = useMemo(
        () => (
            <VStack max gap="16" align="center">
                <Text title={ feedbackTitle } />
                <Textarea name={ t('Your feedback') || undefined } onChange={ setFeedback } />
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
        [feedbackTitle, onClickAccept, onClickCancel, setFeedback, t],
    );

    return (
        <Card className={ className }>
            <VStack align="center"
                    justify="center"
                    max
                    gap="16">
                <Text title={ starsCount ? t('Thanks for yor review') : title } />
                <StarRating size={ 40 } onSelect={ onSelectStars } selectedStars={ starsCount } />
            </VStack>
            { !isMobile ? (
                <Modal isOpen={ isModalOpen } onClose={ onClickCancel } lazy>
                    { modalContent }
                </Modal>
            ) : (
                <Drawer isOpen={ isModalOpen } onClose={ onClickCancel } lazy>
                    { modalContent }
                </Drawer>
            ) }
        </Card>
    );
};
