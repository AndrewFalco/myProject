import { classNames } from 'shared/lib/classNames/classNames';
import { Card, Icon, Skeleton } from 'shared/ui';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleSkeletonListProps {
    className?: string,
    view: ArticleView,
}

export const ArticleListItemSkeleton = (props: ArticleSkeletonListProps) => {
    const { className, view } = props;

    return (
        <div className={ classNames(cls.ArticleListItem, {}, [className, cls[view]]) }>
            {
              view === 'LIST'
                ? (
                    <Card className={ cls.cardListWrapper }>
                        <div className={ cls.header }>
                            <div className={ cls.userInfo }>
                                <Skeleton width={ 30 } height={ 30 } borderRadius="50%" />
                                <Skeleton width={ 80 } height={ 16 } className={ cls.username } />
                            </div>
                            <Skeleton width={ 40 } height={ 16 } className={ cls.date } />
                        </div>
                        <Skeleton width="100%" height={ 24 } className={ cls.title } />
                        <Skeleton width="100%" height={ 16 } className={ cls.types } />
                        <Skeleton width={ 720 } height={ 480 } className={ cls.img } />
                        <Skeleton width="100%" height={ 200 } className={ cls.paragraph } />
                        <div className={ cls.footer }>
                            <Skeleton width={ 80 } height={ 40 } />
                            <div className={ cls.viewsBlock }>
                                <Skeleton width={ 24 } height={ 24 } className={ cls.views } />
                                <Icon Svg={ EyeIcon } />
                            </div>
                        </div>
                    </Card>
                )
                : (
                    <Card>
                        <div className={ cls.imageWrapper }>
                            <Skeleton width={ 200 } height={ 200 } className={ cls.img } />
                            <Skeleton width={ 40 } height={ 16 } className={ cls.date } />
                        </div>
                        <div className={ cls.infoWrapper }>
                            <Skeleton width="100%" height={ 16 } className={ cls.types } />
                            <div className={ cls.viewsBlock }>
                                <Skeleton width={ 24 } height={ 24 } className={ cls.views } />
                                <Icon Svg={ EyeIcon } />
                            </div>
                        </div>
                        <Skeleton width="100%" height={ 24 } className={ cls.title } />
                    </Card>
                )
            }
        </div>
    );
};
