export const updateProfile = (firstName: string, lastName: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstName').clear().type(firstName);
  cy.getByTestId('ProfileCard.lastName').clear().type(lastName);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => cy.request({
  method: 'PUT',
  url: `http://localhost:8000/profile/${profileId}`,
  headers: { Authorization: 'someToken' },
  body: {
      id: '4',
      firstName: 'test',
      lastName: 'user',
      email: 'ggTop@toptop.com',
      phone: '+7777777777',
      country: 'Russian Federation',
      city: 'A',
      age: 27,
      username: 'testuser',
      avatar: '',
      currency: 'RUB',
      sex: 'female',
  },
});

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstName: string, lastName: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
