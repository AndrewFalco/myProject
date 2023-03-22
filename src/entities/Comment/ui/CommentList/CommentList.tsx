import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui';
import { CommentType } from '../../model/types/comment';

import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?: string,
    comments?: CommentType[],
    isLoading?: boolean,
}

export const CommentList = (props: CommentListProps) => {
    const { className, comments, isLoading } = props;
    const { t } = useTranslation();

    return (
        <div className={ classNames(cls.CommentList, {}, [className]) }>
            {
              comments?.length
                ? comments.map((comment) => (
                    <CommentCard
                      key={ `${comment.id}_${comment.articleId}_${comment.date} ` }
                      className={ cls.comment }
                      comment={ comment }
                      isLoading={ isLoading }
                    />
                ))
                : <Text text={ t('No comments at the moment') } />
            }
        </div>
    );
};
