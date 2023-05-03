import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';
import { RoutePath } from '@/shared/consts/routes';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: RoutePath.articles,
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
