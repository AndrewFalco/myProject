import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ExtendsRatingProps } from './Rating';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { StarRating } from '@/shared/ui/redesigned/StarRating';

export const RatingRedesigned = (props: ExtendsRatingProps) => {
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
            <VStack max
                    gap="16"
                    align="center">
                <Text title={ feedbackTitle } />
                <Input label={ t('Your feedback') || undefined } onChange={ setFeedback } />
                <HStack gap="16">
                    <Button onClick={ onClickCancel }>{ t('Close') }</Button>
                    <Button onClick={ onClickAccept }>{ t('Accept') }</Button>
                </HStack>
            </VStack>
        ),
        [feedbackTitle, onClickAccept, onClickCancel, setFeedback, t],
    );

    return (
        <Card className={ className }
              border="round"
              padding="16">
            <VStack align="center"
                    justify="center"
                    max
                    gap="16">
                <Text title={ starsCount ? t('Thanks for yor review') : title } />
                <StarRating size={ 40 }
                            onSelect={ onSelectStars }
                            selectedStars={ starsCount } />
            </VStack>
            { !isMobile ? (
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
