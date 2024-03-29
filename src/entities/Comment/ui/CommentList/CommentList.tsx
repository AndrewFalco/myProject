import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated';
import { Text } from '@/shared/ui/redesigned/Text';
import { CommentType } from '../../model/types/comment';

import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { ToggleFeature } from '@/shared/lib/features';

interface CommentListProps {
    className?: string;
    comments?: CommentType[];
    isLoading?: boolean;
}

export const CommentList = (props: CommentListProps) => {
    const { className, comments, isLoading } = props;
    const { t } = useTranslation();

    return (
        <div className={ classNames(cls.CommentList, {}, [className]) }>
            { comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        key={ `${comment.id}_${comment.articleId}_${comment.date} ` }
                        className={ cls.comment }
                        comment={ comment }
                        isLoading={ isLoading }
                    />
                ))
            ) : (
                <ToggleFeature
                    feature="isAppRedesigned"
                    on={ <Text text={ t('No comments at the moment') } /> }
                    off={ <TextDeprecated text={ t('No comments at the moment') } /> }
                />
            ) }
        </div>
    );
};
