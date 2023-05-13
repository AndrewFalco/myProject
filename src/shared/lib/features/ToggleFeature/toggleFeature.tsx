import { ReactNode } from "react";
import { FeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlags } from "../setGetFeatures";

interface ToggleFeatureProps {
    feature: keyof FeatureFlags;
    on: ReactNode;
    off: ReactNode;
}

export const ToggleFeature = (props: ToggleFeatureProps) => {
    const { feature, off, on } = props;

    return getFeatureFlags(feature) ? on : off;
};
