import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string,
}

export const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id?: string }>();
    const isEdit = Boolean(id);
    return (
        <Page className={ classNames(cls.ArticleEditPage, {}, [className]) }>
            { isEdit ? t('Article edit page content') : t('Article create page content') }
        </Page>
    );
};

export default ArticleEditPage;
