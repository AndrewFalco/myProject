import { memo } from 'react';
import { ToggleFeature } from '@/shared/lib/features';
import { SidebarNew } from './SidebarNew/Sidebar.new';
import { SidebarOld } from './SidebarOld/Sidebar.old';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;

    return (
        <ToggleFeature
            feature='isAppRedesigned'
            on={ <SidebarNew className={ className } /> }
            off={ <SidebarOld className={ className } /> }
        />
    )
});
