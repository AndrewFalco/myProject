import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/test/componentRender/componentRender';
import { $api } from '@/shared/api/api';
import { EditableProfileCard } from './EditableProfileCard';
import { profileReducer } from '../../model/slices/profileSlice';

const profile = {
    id: '1',
    firstName: 'Levi',
    lastName: 'Ackerman',
    email: 'jabaTop@toptop.com',
    phone: '+7777777777',
    city: 'M',
    age: 30,
    username: 'Kpt. Levi',
    avatar: 'https://i1.sndcdn.com/artworks-000117082726-2z43hx-t500x500.jpg',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: '1',
            },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('feature/EditableProfileCard', () => {
    test('to be in document', async () => {
        componentRender(<EditableProfileCard id="1" />, options);

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.SaveButton')).toBeInTheDocument();
    });

    test('inputs will be return default state on cancel', async () => {
        componentRender(<EditableProfileCard id="1" />, options);

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
        await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');
        expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('user');

        await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));
        await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'user');
        expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('Levi');
        expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('Ackerman');
    });

    test('will be send put request, if has no error', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(mockPutReq).toHaveBeenCalled();
    });
});
