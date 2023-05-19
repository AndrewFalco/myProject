import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, HStack, Icon, Skeleton } from '@/shared/ui';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleSkeletonListProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = (props: ArticleSkeletonListProps) => {
    const { className, view } = props;

    return (
        <div
            className={ classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ]) }
        >
            { view === 'LIST' ? (
                <Card className={ cls.cardListWrapper }>
                    <HStack justify="between">
                        <HStack justify="between" gap="8">
                            <Skeleton
                                width={ 30 }
                                height={ 30 }
                                borderRadius="50%"
                            />
                            <Skeleton
                                width={ 80 }
                                height={ 16 }
                                className={ cls.username }
                            />
                        </HStack>
                        <Skeleton width={ 40 }
                                  height={ 16 }
                                  className={ cls.date } />
                    </HStack>
                    <Skeleton width="100%"
                              height={ 24 }
                              className={ cls.title } />
                    <Skeleton width="100%"
                              height={ 16 }
                              className={ cls.types } />
                    <Skeleton width="100%"
                              height={ 480 }
                              className={ cls.img } />
                    <Skeleton
                        width="100%"
                        height={ 200 }
                        className={ cls.paragraph }
                    />
                    <HStack justify="between">
                        <Skeleton width={ 80 } height={ 40 } />
                        <HStack justify="between" gap="8">
                            <Skeleton
                                width={ 24 }
                                height={ 24 }
                                className={ cls.views }
                            />
                            <Icon Svg={ EyeIcon } />
                        </HStack>
                    </HStack>
                </Card>
            ) : (
                <Card>
                    <div className={ cls.imageWrapper }>
                        <Skeleton
                            width={ 200 }
                            height={ 200 }
                            className={ cls.img }
                        />
                        <Skeleton width={ 40 }
                                  height={ 16 }
                                  className={ cls.date } />
                    </div>
                    <HStack justify="between">
                        <Skeleton
                            width="100%"
                            height={ 16 }
                            className={ cls.types }
                        />
                        <HStack justify="between" gap="8">
                            <Skeleton
                                width={ 24 }
                                height={ 24 }
                                className={ cls.views }
                            />
                            <Icon Svg={ EyeIcon } />
                        </HStack>
                    </HStack>
                    <Skeleton width="100%"
                              height={ 24 }
                              className={ cls.title } />
                </Card>
            ) }
        </div>
    );
};
