import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileError, ProfileType } from '../model/types/profile';
import { ToggleFeature } from '@/shared/lib/features';
import { ProfileCardDeprecated, ProfileCardDeprecatedError, ProfileCardDeprecatedLoader } from './ProfileCard.old';
import { ProfileCardRedesigned, ProfileCardRedesignedError, ProfileCardRedesignedSkeleton } from './ProfileCard.new';

export interface ProfileCardProps {
    className?: string;
    data?: ProfileType;
    isLoading?: boolean;
    error?: ProfileError[];
    readOnly?: boolean;
    onChangeFirstName?: (value?: string) => void;
    onChangeLastName?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCountry?: (value: Country) => void;
    onChangeCity?: (value?: string) => void;
    onChangeEmail?: (value?: string) => void;
    onChangePhone?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (value?: Currency) => void;
    onChangeSex?: (value?: string) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { error, isLoading } = props;

    if (isLoading) {
        return (
            <ToggleFeature
                feature="isAppRedesigned"
                on={ <ProfileCardRedesignedSkeleton /> }
                off={ <ProfileCardDeprecatedLoader /> }
            />
        );
    }

    if (error) {
        <ToggleFeature feature="isAppRedesigned"
                       on={ <ProfileCardRedesignedError /> }
                       off={ <ProfileCardDeprecatedError /> } />;
    }

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={ <ProfileCardRedesigned { ...props } /> }
            off={ <ProfileCardDeprecated { ...props } /> }
        />
    );
};
