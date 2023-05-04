import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/mainIco.svg';
import AboutIcon from '@/shared/assets/icons/aboutIco.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/profileIco.svg';
import { SidebarListProps } from '../types/sidebar';
import {
    getRoutAbout, getRoutArticles, getRoutMain, getRoutProfile,
} from '@/shared/consts/routes';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItems: SidebarListProps[] = [
            {
                Icon: MainIcon,
                name: 'Main page',
                route: getRoutMain(),
            },
            {
                Icon: AboutIcon,
                name: 'About page',
                route: getRoutAbout(),
            },
        ];

        if (userData?.id) {
            sidebarItems.push(
                {
                    Icon: ArticleIcon,
                    name: 'Articles page',
                    route: getRoutArticles(),
                    authOnly: true,
                },
                {
                    Icon: ProfileIcon,
                    name: 'Profile page',
                    route: getRoutProfile(userData.id),
                    authOnly: true,
                },
            );
        }

        return sidebarItems;
    },
);
