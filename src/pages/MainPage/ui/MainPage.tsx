import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <h1>
            { t('Main page') }
        </h1>
    );
};

export default MainPage;
