import { ToggleFeature } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './ArticleDetails.module.scss';

export const ArticleDetailsSkeleton = () => (
    <ToggleFeature
        feature="isAppRedesigned"
        on={
            <VStack gap="16" max grow>
                <Skeleton width="100%" height={ 200 } />
                <Skeleton width={ 300 } height={ 24 } />
                <Skeleton width="100%" height={ 24 } />
                <Skeleton width="100%" height={ 200 } />
                <Skeleton width="100%" height={ 200 } />
            </VStack>
        }
        off={
            <VStack gap="16" max grow>
                <SkeletonDeprecated width="100%" height={ 200 } />
                <SkeletonDeprecated className={ cls.title } width={ 300 } height={ 24 } />
                <SkeletonDeprecated width="100%" height={ 24 } />
                <SkeletonDeprecated width="100%" height={ 200 } />
                <SkeletonDeprecated width="100%" height={ 200 } />
            </VStack>
        }
    />
);
