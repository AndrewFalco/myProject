import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './SettingsPage.module.scss';
import { Page } from '@/widgets';
import { UiDesignFeatures } from '@/features/uiDesignFeatures';
import { VStack } from '@/shared/ui/deprecated';

interface SettingsPageProps {
    className?: string;
}

// TODO: create storybook

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('settings');

    return (
        <Page className={ classNames(cls.SettingsPage, {}, [className]) }>
            <VStack max gap="16">
                <Text title={ t('User settings') } />
                <UiDesignFeatures />
            </VStack>
        </Page>
    );
});

export default SettingsPage;
