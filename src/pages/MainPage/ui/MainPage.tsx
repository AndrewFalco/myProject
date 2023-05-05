import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid="MainPage">
            <h1>
                { t('Main page') }
            </h1>
        </Page>
    );
};

export default MainPage;
