import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const ForbiddenPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid="ForbiddenPage">
            <h1>
                { t('Forbidden Page') }
            </h1>
        </Page>
    );
};

export default ForbiddenPage;
