import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, Textarea } from '@/shared/ui/deprecated';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getAddCommentFormText } from '../model/selectors/addCommentFormSelector';
import { addCommentFormActions, addCommentFormReducer } from '../model/slices/addCommentFormSlice';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeature } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import cls from './AddCommentForm.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = (props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const text = useSelector(getAddCommentFormText);

    const onChangeText = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onChangeText('');
    }, [onChangeText, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <ToggleFeature
                feature="isAppRedesigned"
                on={
                    <Card padding="24"
                          border="round"
                          max>
                        <HStack
                            data-testid="AddCommentForm"
                            gap="16"
                            grow
                            align="center"
                            justify="between"
                            className={ classNames(cls.AddCommentFormRedesigned, {}, [className]) }
                        >
                            <Input
                                data-testid="AddCommentForm.Input"
                                className={ cls.input }
                                placeholder={ t('Comment') || undefined }
                                value={ text }
                                onChange={ onChangeText }
                            />
                            <Button data-testid="AddCommentForm.Button" onClick={ onSendHandler }>
                                { t('Send comment') }
                            </Button>
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        data-testid="AddCommentForm"
                        gap="16"
                        grow
                        align="center"
                        justify="between"
                        className={ classNames(cls.AddCommentForm, {}, [className]) }
                    >
                        <Textarea
                            data-testid="AddCommentForm.Input"
                            className={ cls.input }
                            name={ t('Comment') || undefined }
                            value={ text }
                            onChange={ onChangeText }
                            cols={ 100 }
                            rows={ 2 }
                        />
                        <ButtonDeprecated data-testid="AddCommentForm.Button"
                                          onClick={ onSendHandler }
                                          colorType="success">
                            { t('Send comment') }
                        </ButtonDeprecated>
                    </HStack>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(AddCommentForm);
