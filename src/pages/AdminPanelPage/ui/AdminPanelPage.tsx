import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

const AdminPanelPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <h1>
                { t('Admin Panel Page') }
            </h1>
        </Page>
    );
};

export default AdminPanelPage;
