import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeature, getFeatureFlags, updateFeatureFlag } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useUserAuthData } from '@/entities/User';

interface UiDesignFeaturesProps {
    className?: string;
}
// TODO: cerate storybook

export const UiDesignFeatures = memo((props: UiDesignFeaturesProps) => {
    const { className } = props;
    const { t } = useTranslation('settings');
    const isAppRedesigned = getFeatureFlags('isAppRedesigned');
    const dispatch = useAppDispatch();
    const authUser = useUserAuthData();

    const items = [
        {
            content: t('New'),
            value: 'new',
        },
        {
            content: t('Old'),
            value: 'old',
        },
    ];

    const onChange = useCallback(
        (value: string) => {
            if (authUser) {
                dispatch(
                    updateFeatureFlag({
                        userId: authUser.id,
                        newFeatures: {
                            isAppRedesigned: value === 'new',
                        },
                    }),
                );
            }
        },
        [authUser, dispatch],
    );

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <ListBox
                    label={ t('Current design') }
                    items={ items }
                    onChange={ onChange }
                    value={ isAppRedesigned ? items[0].value : items[1].value }
                    className={ className }
                />
            }
            off={
                <ListBoxDeprecated
                    label={ t('Current design') }
                    items={ items }
                    onChange={ onChange }
                    value={ isAppRedesigned ? items[0].value : items[1].value }
                    className={ className }
                />
            }
        />
    );
});
