import { memo } from 'react';
import { NavbarNew } from './Navbar.new';
import { NavbarOld } from './Navbar.old';

import { ToggleFeature } from '@/shared/lib/features';

interface NavbarProps {
    className?: string;
}

const NavbarComponent = (props: NavbarProps) => {
    const { className } = props;

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={ <NavbarNew className={ className } /> }
            off={ <NavbarOld className={ className } /> }
        />
    );
};

export const Navbar = memo(NavbarComponent);
