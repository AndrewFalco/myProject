import { ReactElement } from 'react';
import { AppRoutes } from '@/shared/types/routes';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/hooks/useRouteChange';

export const useAppToolbar = () => {
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        articles: <ScrollToolbar />,
        articleDetails: <ScrollToolbar />,
    };

    return toolbarByAppRoute[appRoute];
};
