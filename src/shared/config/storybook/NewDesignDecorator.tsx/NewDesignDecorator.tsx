import { StoryFn } from '@storybook/react';
import { Theme } from '../../../types/theme';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

// TODO: add for all stories
export const NewDesignDecorator = (theme: Theme) => (StoryComponent: StoryFn) => {
    setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
    return (
        <div className="app_redesigned">
            <StoryComponent />
        </div>
    );
};
