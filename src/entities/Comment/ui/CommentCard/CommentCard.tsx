import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as AppLinkDeprecated, Avatar as AvatarDeprecated, Text as TextDeprecated } from '@/shared/ui/deprecated';
import { CommentType } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/consts/routes';
import { CommentCardSkeleton } from './CommentCardSkeleton';
import { ToggleFeature } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';

import cls from './CommentCard.module.scss';

interface CommentCardProps {
    comment: CommentType;
    className?: string;
    isLoading?: boolean;
}

export const CommentCard = (props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    return isLoading ? (
        <div data-testid="CommentCard" className={ classNames(cls.CommentCard, {}, [className]) }>
            <CommentCardSkeleton />
        </div>
    ) : (
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <Card padding="24" border="round" className={ cls.CommentCardRedesigned }>
                    <VStack max gap="8" data-testid="CommentCard.Content">
                        <AppLink to={ getRouteProfile(comment.user.id) } className={ cls.ownerInfo }>
                            <HStack gap="8">
                                <Avatar className={ cls.avatar } src={ comment?.user.avatar } size={ 30 } />
                                <Text text={ comment.user.username } />
                            </HStack>
                        </AppLink>
                    </VStack>
                    <Text text={ comment.text } className={ cls.text } bold />
                </Card>
            }
            off={
                <div data-testid="CommentCard" className={ classNames(cls.CommentCard, {}, [className]) }>
                    <div data-testid="CommentCard.Content" className={ cls.header }>
                        <AppLinkDeprecated to={ getRouteProfile(comment.user.id) } className={ cls.ownerInfo }>
                            <AvatarDeprecated className={ cls.avatar } src={ comment?.user.avatar } size={ 30 } />
                            <TextDeprecated title={ comment.user.username } />
                        </AppLinkDeprecated>
                        <TextDeprecated text={ new Date(comment?.date).toLocaleDateString() } />
                    </div>
                    <TextDeprecated text={ comment.text } className={ cls.text } />
                </div>
            }
        />
    );
};
