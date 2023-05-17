import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import MainIconDeprecated from '@/shared/assets/icons/mainIco.svg';
import AboutIconDeprecated from '@/shared/assets/icons/aboutIco.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profileIco.svg';

import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';

import { SidebarListProps } from '../types/sidebar';
import {
    getRoutAbout,
    getRoutArticles,
    getRoutMain,
    getRoutProfile,
} from '@/shared/consts/routes';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItems: SidebarListProps[] = [
        {
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon
            }),
            name: 'Main page',
            route: getRoutMain(),
        },
        {
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AboutIconDeprecated,
                on: () => AboutIcon
            }),
            name: 'About page',
            route: getRoutAbout(),
        },
    ];

    if (userData?.id) {
        sidebarItems.push(
            {
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ArticleIconDeprecated,
                    on: () => ArticleIcon
                }),
                name: 'Articles page',
                route: getRoutArticles(),
                authOnly: true,
            },
            {
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon
                }),
                name: 'Profile page',
                route: getRoutProfile(userData.id),
                authOnly: true,
            },
        );
    }

    return sidebarItems;
});
