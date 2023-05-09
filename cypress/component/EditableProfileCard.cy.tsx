import { EditableProfileCard } from '@/features/editableProfileCard';
import { WrapperProvider } from '@/shared/lib/test/componentRender/componentRender';

const userId = '1';

describe('EditableProfileCard.cy.tsx', () => {
  it('playground', () => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
    cy.mount(
        <WrapperProvider options={
          {
            initialState: {
              user: {
                authData: {
                  id: userId,
                },
              },
            },
          }
        }
        >
            <EditableProfileCard id={ userId } />
        </WrapperProvider>,
  );
});
});
