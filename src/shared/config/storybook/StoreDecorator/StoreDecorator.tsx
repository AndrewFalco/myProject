import { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'pages/ProfilePage';
import { ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducer: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={ state } asyncReducers={ { ...defaultAsyncReducer, ...asyncReducers } }>
        <StoryComponent />
    </StoreProvider>
);
