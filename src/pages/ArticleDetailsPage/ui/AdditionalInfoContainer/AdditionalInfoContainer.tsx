import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AdditionalInfoContainerProps {
    className?: string;
}

export const AdditionalInfoContainer = (props: AdditionalInfoContainerProps) => {
    const { className } = props;
    const article = useSelector(getArticleDetailsData);

    if (!article) {
        return null;
    }

    return (
        <Card padding="24"
              border="round"
              className={ classNames('', {}, [className]) }>
            <ArticleAdditionalInfo
                className={ className }
                author={ article.user }
                createdAt={ article.createdAt }
                views={ article.views }
            />
        </Card>
    );
};
