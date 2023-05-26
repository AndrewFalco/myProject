import { memo } from 'react';
import { ToggleFeature } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

import cls from './CommentCard.module.scss';

export const CommentCardSkeleton = memo(() => (
    <ToggleFeature
        feature="isAppRedesigned"
        on={
            <>
                <div data-testid="CommentCard.Loading" className={ cls.header }>
                    <div className={ cls.ownerInfo }>
                        <Skeleton className={ cls.avatar }
                                  width={ 30 }
                                  height={ 30 }
                                  borderRadius="50%" />
                        <Skeleton height={ 16 } width={ 100 } />
                    </div>
                    <Skeleton height={ 16 } width={ 50 } />
                </div>
                <Skeleton height={ 24 } width="100%" className={ cls.text } />
            </>
        }
        off={
            <div data-testid="CommentCard" className={ cls.CommentCard }>
                <div data-testid="CommentCard.Loading" className={ cls.header }>
                    <div className={ cls.ownerInfo }>
                        <SkeletonDeprecated className={ cls.avatar }
                                            width={ 30 }
                                            height={ 30 }
                                            borderRadius="50%" />
                        <SkeletonDeprecated height={ 16 } width={ 100 } />
                    </div>
                    <SkeletonDeprecated height={ 16 } width={ 50 } />
                </div>
                <SkeletonDeprecated height={ 24 } width="100%" className={ cls.text } />
            </div>
        }
    />
));
