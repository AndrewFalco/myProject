import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleEdit } from '@/shared/consts/routes';

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: string;
    views: number;
}

export const ArticleAdditionalInfo = (props: ArticleAdditionalInfoProps) => {
    const { className, author, createdAt, views } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return (
        <VStack gap="16" className={ className }>
            <HStack gap="16">
                <Avatar src={ author.avatar } size={ 32 } />
                <Text text={ author.username } bold />
                <Text text={ new Date(createdAt).toLocaleDateString() } />
            </HStack>
            <AppLink to={ getRouteArticleEdit(id) }>
                <Button>{ t('Edit') }</Button>
            </AppLink>
            <Text text={ `${t('Views')}: ${views}` } />
        </VStack>
    );
};
