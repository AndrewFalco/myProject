import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, Textarea } from '@/shared/ui/deprecated';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getAddCommentFormText } from '../model/selectors/addCommentFormSelector';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../model/slices/addCommentFormSlice';

import cls from './AddCommentForm.module.scss';

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
            <div
                data-testid="AddCommentForm"
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
                <Button
                    data-testid="AddCommentForm.Button"
                    onClick={ onSendHandler }
                    colorType="success"
                >
                    { t('Send comment') }
                </Button>
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(AddCommentForm);
