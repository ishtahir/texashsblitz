describe('Main App Tests', () => {
  it('Main page loads with no errors', () => {
    cy.visit('/');
  });
});

describe('Class 6A Tests', () => {
  describe('Classes view', () => {
    it('Should have 245 total 6A teams', () => {
      cy.get('tbody')
        .children()
        .should('have.length', 245);
    });

    it('Should find 20 Eagles in class 6A', () => {
      cy.get('.search').type('eagles');
      cy.get('.total-number').contains('20');
      cy.get('.clear-search').click();
    });

    it('Should find 5 Klein schools in class 6A', () => {
      cy.get('.search').type('klein');
      cy.get('.total-number').contains('5');
      cy.get('.clear-search').click();
    });
  });

  describe('Districts View', () => {
    it('Loads District page for class 6A', () => {
      cy.get('.nav-items')
        .contains('District')
        .click();
    });

    it('Loads all 32 districts for class 6A', () => {
      cy.get('table').should('have.length', 32);
    });

    it('Loads all 21 teams with Houston in the city or school for class 6A', () => {
      cy.get('.search').type('houston');
      cy.get('.total-number').contains('21');
      cy.get('.clear-search').click();
    });

    it('Loads all 7 districts of teams with Houston in the city or school for class 6A', () => {
      cy.get('.search').type('houston');
      cy.get('table').should('have.length', 7);
      cy.get('.clear-search').click();
    });
  });

  describe('Enrollment View', () => {
    it('Loads Enrollment page for class 6A', () => {
      cy.get('.nav-items')
        .contains('Enrollment')
        .click();
    });

    it('Shows Allen as the highest enrollment in class 6A', () => {
      cy.get('tbody')
        .children()
        .first()
        .contains('Allen Eagles');
    });

    it('Shows South Garland as the lowest enrollment in class 6A', () => {
      cy.get('tbody')
        .children()
        .last()
        .contains('South Garland Colonels');
    });
  });

  describe('State Appearances View', () => {
    it('Loads State Appearances page for class 6A', () => {
      cy.get('.nav-items')
        .contains('State Appearances')
        .click();
    });

    it('Shows all 82 teams with a State Title Appearance in class 6A', () => {
      cy.get('.total-number').contains('82');
    });

    it('Loads Classes page after State Appearances page for class 6A', () => {
      cy.get('.nav-items')
        .contains('Classes')
        .click();
    });
  });
});
