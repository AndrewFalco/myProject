import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/editableProfileCard';

import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
        <Page
            data-testid="ProfilePage"
            className={ classNames(cls.ProfilePage, {}, [className]) }
        >
            <EditableProfileCard id={ id } />
        </Page>
    );
};

export default ProfilePage;
