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

    it('Should match the number of total teams with the number of schools displaying for class 6A in Classes view', () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
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
    it('Loads Districts page for class 6A', () => {
      cy.get('.nav-items')
        .contains('Districts')
        .click();
    });

    it('Loads all 32 districts for class 6A', () => {
      cy.get('table').should('have.length', 32);
    });

    it('Should match the number of total teams with the number of schools displaying for class 6A in Districts view', () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
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

    it('Should match the number of total teams with the number of schools displaying for class 6A in Enrollments view', () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
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

    it('Should match the number of total teams with the number of schools displaying for class 6A for State Appearances view', () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it('Loads Classes page after State Appearances page for class 6A', () => {
      cy.get('.nav-items')
        .contains('Classes')
        .click();
    });
  });

  describe('One search all the way through', () => {
    it('Should search for Panthers', () => {
      cy.get('.search').type('panthers');
    });

    it('Should show 14 total Panthers in Classes view', () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it('Should show 12 districts containing Panthers in Districts view', () => {
      cy.get('.nav-items')
        .contains('Districts')
        .click();
      cy.get('table').should('have.length', 12);
    });

    it('Should show Plano East Panthers first in Enrollment view', () => {
      cy.get('.nav-items')
        .contains('Enrollment')
        .click();
      cy.get('tbody')
        .first()
        .contains('Plano East Panthers');
    });

    it('Should show Keller Fossil Ridge Panthers last in Enrollment view', () => {
      cy.get('tbody')
        .last()
        .contains('Keller Fossil Ridge Panthers');
    });

    it('Should show 4 Panthers in State Appearances view', () => {
      cy.get('.nav-items')
        .contains('State Appearances')
        .click();
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
      cy.get('.clear-search').click();
      cy.get('.nav-items')
        .contains('Classes')
        .click();
    });
  });
});
