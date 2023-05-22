import { ReactElement } from 'react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlags } from '../setGetFeatures';

interface ToggleFeatureProps {
    feature: keyof FeatureFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeature = (props: ToggleFeatureProps) => {
    const { feature, off, on } = props;

    return getFeatureFlags(feature) ? on : off;
};
