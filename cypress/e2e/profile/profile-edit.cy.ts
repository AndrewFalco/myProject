let profileId = '';

describe('User login', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${profileId}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('and profile existed', () => {
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'test');
  });

  it('and change it', () => {
    cy.updateProfile('new', 'name');
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'new');
    cy.getByTestId('ProfileCard.lastName').should('have.value', 'name');
  });
});
