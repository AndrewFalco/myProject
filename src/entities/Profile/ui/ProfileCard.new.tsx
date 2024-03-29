import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from './ProfileCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation();

    return (
        <HStack justify="center" max>
            <Text
                variant="error"
                title={ t('Произошла ошибка при загрузке профиля') }
                text={ t('Попробуйте обновить страницу') }
                align="center"
            />
        </HStack>
    );
};

export const ProfileCardRedesignedSkeleton = () => (
    <Card padding="24" max>
        <VStack gap="32">
            <HStack max justify="center">
                <Skeleton borderRadius="100%" width={ 128 } height={ 128 } />
            </HStack>
            <HStack gap="32" max>
                <VStack gap="16" max>
                    <Skeleton width="100%" height={ 38 } />
                    <Skeleton width="100%" height={ 38 } />
                    <Skeleton width="100%" height={ 38 } />
                    <Skeleton width="100%" height={ 38 } />
                </VStack>

                <VStack gap="16" max>
                    <Skeleton width="100%" height={ 38 } />
                    <Skeleton width="100%" height={ 38 } />
                    <Skeleton width="100%" height={ 38 } />
                    <Skeleton width="100%" height={ 38 } />
                </VStack>
            </HStack>
        </VStack>
    </Card>
);

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        readOnly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation('profile');

    return (
        <Card padding="24" max className={ className }>
            <VStack gap="32">
                { data?.avatar && (
                    <HStack justify="center" max>
                        <Avatar size={ 128 } src={ data?.avatar } sex={ data.sex } />
                    </HStack>
                ) }
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            value={ data?.firstName }
                            label={ t('First name') || 'First Name' }
                            onChange={ onChangeFirstName }
                            readonly={ readOnly }
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={ data?.lastName }
                            label={ t('Last name') || 'Last name' }
                            onChange={ onChangeLastName }
                            readonly={ readOnly }
                            data-testid="ProfileCard.lastname"
                        />
                        <Input value={ data?.age }
                               label={ t('Age') || 'Age' }
                               onChange={ onChangeAge }
                               readonly={ readOnly } />
                        <Input value={ data?.city }
                               label={ t('City') || 'CIty' }
                               onChange={ onChangeCity }
                               readonly={ readOnly } />
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            value={ data?.username }
                            label={ t('User name') || 'User name' }
                            onChange={ onChangeUsername }
                            readonly={ readOnly }
                        />
                        <Input
                            value={ data?.avatar }
                            label={ t('Avatar') || 'Avatar' }
                            onChange={ onChangeAvatar }
                            readonly={ readOnly }
                        />
                        <CurrencySelect value={ data?.currency } onChange={ onChangeCurrency } readonly={ readOnly } />
                        <CountrySelect value={ data?.country } onChange={ onChangeCountry } readonly={ readOnly } />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
