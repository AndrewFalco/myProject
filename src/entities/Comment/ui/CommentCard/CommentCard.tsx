import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar, Skeleton, Text } from 'shared/ui';
import { CommentType } from '../../model/types/comment';

import cls from './CommentCard.module.scss';

interface CommentCardProps {
    comment: CommentType,
    className?: string,
    isLoading?: boolean
}

export const CommentCard = (props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    return (
        <div className={ classNames(cls.CommentCard, {}, [className]) }>
            {
                isLoading
                    ? (
                        <>
                            <div className={ cls.header }>
                                <div className={ cls.ownerInfo }>
                                    <Skeleton width={ 30 } height={ 30 } borderRadius="50%" />
                                    <Skeleton height={ 16 } width={ 100 } />
                                </div>
                                <Skeleton height={ 16 } width={ 50 } />
                            </div>
                            <Skeleton height={ 50 } width={ 100 } className={ cls.text } />
                        </>
                    )
                    : (
                        <>
                            <div className={ cls.header }>
                                <div className={ cls.ownerInfo }>
                                    <Avatar className={ cls.avatar } src={ comment?.user.avatar } size={ 30 } />
                                    <Text title={ comment.user.username } />
                                </div>
                                <Text text={ new Date(comment?.date).toLocaleDateString() } />
                            </div>
                            <Text text={ comment.text } className={ cls.text } />
                        </>
                    )
            }
        </div>
    );
};
