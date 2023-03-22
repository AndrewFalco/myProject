export interface SidebarListProps {
    route: string,
    name: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>,
    authOnly?: boolean,
}
