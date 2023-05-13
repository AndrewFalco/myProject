import { FeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlags } from "./setGetFeatures";

interface ToggleFeatureOptions<T> {
    name: keyof FeatureFlags;
    on: () => T;
    off: () => T;
}

export const toggleFeatures = <T>({ name, off, on }: ToggleFeatureOptions<T>): T  =>
    getFeatureFlags(name) ? on() : off()