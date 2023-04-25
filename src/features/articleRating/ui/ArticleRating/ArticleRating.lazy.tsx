import { Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Loader } from '@/shared/ui';

const ArticleRatingAsync = lazy(() => import('./ArticleRating'));

export const ArticleRatingLazy = (props: ArticleRatingProps) => (
    <Suspense fallback={ <Loader /> }>
        <ArticleRatingAsync { ...props } />
    </Suspense>
);
