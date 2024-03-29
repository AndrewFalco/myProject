import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '../../../model/types/article';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ArticleListItem.module.scss';

interface ArticleSkeletonListProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeletonRedesigned = (props: ArticleSkeletonListProps) => {
    const { className, view } = props;

    return (
        <div className={ classNames(cls.ArticleListItem, {}, [className, cls[view]]) }>
            { view === 'LIST' ? (
                <div className={ classNames(cls.separator, {}, [className, cls[view]]) }>
                    <Card className={ cls.card }>
                        <VStack gap="16" max>
                            <Skeleton borderRadius="50%" height={ 30 } width={ 30 } />
                            <Skeleton width={ 150 } height={ 32 } className={ cls.username } />
                            <Skeleton width={ 150 } height={ 24 } className={ cls.date } />
                        </VStack>
                        <Skeleton width={ 250 } height={ 24 } className={ cls.title } />
                        <Skeleton height={ 420 } className={ cls.img } />
                        <VStack gap="16" max>
                            <Skeleton height={ 72 } width={ 200 } />
                            <Skeleton height={ 34 } width={ 200 } />
                        </VStack>
                    </Card>
                </div>
            ) : (
                <div className={ classNames(cls.ArticleListItemRedesigned, {}, [className, cls[view]]) }>
                    <Card className={ cls.card }>
                        <div className={ cls.imageWrapper }>
                            <Skeleton width={ 200 } height={ 200 } className={ cls.img } />
                        </div>
                        <div className={ cls.infoWrapper }>
                            <Skeleton width={ 130 } height={ 16 } />
                        </div>
                        <Skeleton width={ 150 } height={ 16 } className={ cls.title } />
                    </Card>
                </div>
            ) }
        </div>
    );
};
