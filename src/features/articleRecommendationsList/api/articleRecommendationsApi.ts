import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';
import { getRouteArticles } from '@/shared/consts/routes';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: getRouteArticles(),
                params: {
                    _limit: limit,
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
