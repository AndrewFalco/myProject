import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/mainIco.svg';
import AboutIcon from '@/shared/assets/icons/aboutIco.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/profileIco.svg';
import { SidebarListProps } from '../types/sidebar';
import { RoutePath } from '@/shared/consts/routes';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItems: SidebarListProps[] = [
            {
                Icon: MainIcon,
                name: 'Main page',
                route: RoutePath.main,
            },
            {
                Icon: AboutIcon,
                name: 'About page',
                route: RoutePath.about,
            },
        ];

        if (userData?.id) {
            sidebarItems.push(
                {
                    Icon: ArticleIcon,
                    name: 'Articles page',
                    route: RoutePath.articles,
                    authOnly: true,
                },
                {
                    Icon: ProfileIcon,
                    name: 'Profile page',
                    route: `${RoutePath.profile}${userData.id}`,
                    authOnly: true,
                },
            );
        }

        return sidebarItems;
    },
);
