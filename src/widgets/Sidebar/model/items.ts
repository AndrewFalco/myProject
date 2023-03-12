import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/mainIco.svg';
import AboutIcon from 'shared/assets/icons/aboutIco.svg';
import ProfileIcon from 'shared/assets/icons/profileIco.svg';

export interface SidebarListProps {
    route: AppRoutes,
    name: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>,
    authOnly?: boolean,
}

export const SidebarItems: SidebarListProps[] = [
    {
        Icon: MainIcon,
        name: 'Main page',
        route: 'main',
    },
    {
        Icon: AboutIcon,
        name: 'About page',
        route: 'about',
    },
    {
        Icon: ProfileIcon,
        name: 'Profile page',
        route: 'profile',
        authOnly: true,
    },
];