import { useTranslation } from 'react-i18next';
import { ToggleFeature } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

export const ArticleDetailsError = ({ error }: { error?: string }) => {
    const { t } = useTranslation();

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={ <Text title={ t(error || 'Error with fetching article details') } align="center" variant="error" /> }
            off={ <TextDeprecated title={ t(error || 'Error with fetching article details') } align="center" theme="error" /> }
        />
    );
};
