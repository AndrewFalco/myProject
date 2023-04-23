import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

const ForbiddenPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <h1>
                { t('Forbidden Page') }
            </h1>
        </Page>
    );
};

export default ForbiddenPage;
