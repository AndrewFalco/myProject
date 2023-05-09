import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';
import { getRoutArticles } from '@/shared/consts/routes';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: getRoutArticles(),
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList =
    recommendationsApi.useGetArticleRecommendationsListQuery;
